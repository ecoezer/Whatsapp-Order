import React, { memo, useMemo } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { useOpeningHours } from '../hooks/useOpeningHours';

// Constants
const ANIMATION_DURATION = 1000;
const GRADIENT_TRANSFORM = {
  INITIAL: '-200%',
  FINAL: '200%'
};

const SHARED_CLASSES = {
  card: 'rounded-xl shadow-md transition-colors group relative overflow-hidden',
  gradientOverlay: 'absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%]',
  timeSlot: 'text-center bg-yellow-100 rounded-lg p-3'
};

// Types
interface OpeningHoursData {
  isOpen: boolean;
  currentHours: string;
  nextOpeningTime: string;
}

// Sub-components
const OpeningHoursCard: React.FC<{ data: OpeningHoursData }> = memo(({ data }) => {
  const { isOpen, nextOpeningTime } = data;

  return (
    <div className={`bg-yellow-50 border-2 border-yellow-200 hover:border-yellow-300 ${SHARED_CLASSES.card}`}>
      <div className='flex flex-col items-center text-center p-4 relative z-10' role="region" aria-live="polite" aria-label="Açılış saatleri durumu">
        <div className='flex items-center justify-center gap-2 mb-4'>
          <Clock
            className={`h-5 w-5 ${isOpen ? 'text-green-500' : 'text-red-500'}`}
            aria-hidden="true"
          />
          <h2 className='font-semibold text-gray-900 text-lg'>
            Öffnungszeiten
          </h2>
        </div>

        <div className='mb-4'>
          {isOpen ? (
            <span className='px-4 py-1.5 bg-green-500 text-white rounded-full text-sm font-medium'>
              Jetzt geöffnet ⚽
            </span>
          ) : (
            <div className='text-center'>
              <span className='px-4 py-1.5 bg-red-500 text-white rounded-full text-sm font-medium inline-block mb-2'>
                Geschlossen 🏠
              </span>
              {nextOpeningTime && (
                <p className='text-sm text-gray-700 font-medium'>
                  {nextOpeningTime}
                </p>
              )}
            </div>
          )}
        </div>

        <div className='space-y-3 w-full'>
          <div className={SHARED_CLASSES.timeSlot}>
            <span className='text-sm text-gray-700 block mb-1'>
              Montag - Freitag
            </span>
            <span className='text-lg font-bold text-gray-900'>
              14:00–21:00
            </span>
          </div>
          <div className={SHARED_CLASSES.timeSlot}>
            <span className='text-sm text-gray-700 block mb-1'>
              Samstag - Sonntag
            </span>
            <span className='text-lg font-bold text-gray-900'>
              12:00–21:00
            </span>
          </div>
        </div>
      </div>
      <div 
        className={SHARED_CLASSES.gradientOverlay}
        style={{ transitionDuration: `${ANIMATION_DURATION}ms` }}
      />
    </div>
  );
});

const AddressCard: React.FC = memo(() => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.open(
        'https://www.google.com/maps?rlz=1C5CHFA_enDE1136DE1136&um=1&ie=UTF-8&fb=1&gl=de&sa=X&geocode=KZ1ySXg0sbpHMSYr8zPizKSl&daddr=In+den+Sundern+1,+31199+Diekholzen',
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <a
      href='https://www.google.com/maps?rlz=1C5CHFA_enDE1136DE1136&um=1&ie=UTF-8&fb=1&gl=de&sa=X&geocode=KZ1ySXg0sbpHMSYr8zPizKSl&daddr=In+den+Sundern+1,+31199+Diekholzen'
      target='_blank'
      rel='noopener noreferrer'
      className={`bg-black text-white hover:bg-gray-900 flex items-center ${SHARED_CLASSES.card}`}
      aria-label="Google Maps'te konumu görüntüle - In den Sundern 1, 31199 Diekholzen"
      onKeyDown={handleKeyDown}
    >
      <div className='absolute inset-0 opacity-10' aria-hidden="true">
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '16px 16px',
            backgroundPosition: '-8px -8px',
            transform: 'rotate(30deg)'
          }}
        />
      </div>
      <div className='text-center relative z-10 py-8 px-4 w-full'>
        <div className='flex items-center justify-center gap-2 mb-4'>
          <MapPin className='h-5 w-5 text-yellow-400' aria-hidden="true" />
          <h2 className='font-semibold text-white text-lg'>Adresse</h2>
        </div>
        <div className='space-y-2'>
          <p className='text-xl font-bold text-yellow-400'>
            IN DEN SUNDERN 1
            <br />
            31199 DIEKHOLZEN
          </p>
          <p className='text-sm text-gray-300 bg-gray-800 inline-block px-4 py-1.5 rounded-full'>
            🏟️ SV-Hildesia e.V. Clubhaus 🏠
          </p>
        </div>
      </div>
      <div 
        className={SHARED_CLASSES.gradientOverlay}
        style={{ transitionDuration: `${ANIMATION_DURATION}ms` }}
      />
    </a>
  );
});

const Header: React.FC = memo(() => {
  const openingHoursData = useOpeningHours();

  // Memoize the opening hours data to prevent unnecessary re-renders
  const memoizedOpeningHours = useMemo(() => openingHoursData, [
    openingHoursData.isOpen,
    openingHoursData.currentHours,
    openingHoursData.nextOpeningTime
  ]);

  // Null check for opening hours data
  if (!memoizedOpeningHours) {
    return (
      <header className='bg-white pt-8 border-b'>
        <div className='container mx-auto px-3 sm:px-4 py-4 sm:py-8 flex flex-col items-center max-w-5xl'>
          <div className='text-center text-gray-500'>Yükleniyor...</div>
        </div>
      </header>
    );
  }

  return (
    <header className='bg-white pt-8 border-b'>
      <div className='container mx-auto px-3 sm:px-4 py-4 sm:py-8 flex flex-col items-center max-w-5xl'>
        <h1 className='text-3xl sm:text-4xl font-bold tracking-tighter mb-6 text-gray-900 relative animate-fade-in text-center'>
          <span className='relative'>
            <span>Bistro</span>
            <span className='absolute -bottom-1 left-0 w-full h-1 bg-yellow-200 transform -skew-x-12' aria-hidden="true" />
          </span>
          <span className='text-yellow-500 relative ml-2'>
            <span>Diekholzen</span>
            <span className='absolute -bottom-1 left-0 w-full h-1 bg-yellow-200 transform -skew-x-12' aria-hidden="true" />
          </span>
        </h1>

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl'>
          <OpeningHoursCard data={memoizedOpeningHours} />
          <AddressCard />
        </div>
      </div>
    </header>
  );
});

// Display names for better debugging
OpeningHoursCard.displayName = 'OpeningHoursCard';
AddressCard.displayName = 'AddressCard';
Header.displayName = 'Header';

export default Header;