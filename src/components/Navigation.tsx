import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('doener');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef(null);
  const navRef = useRef(null);

  const navigationItems = [
    ['doener', '🥙', 'Dönergerichte'],
    ['pizza', '🍕', 'Pizza'],
    ['burger', '🍔', 'Hamburger'],
    ['pide', '🫓', 'Pide'],
    ['salate', '🥗', 'Salate'],
    ['dips', '🥄', 'Dips & Soßen'],
    ['getraenke', '🥤', 'Getränke']
  ];

  // Mobile control
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const nav = navRef.current;
      if (nav) {
        const rect = nav.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection observer - Fixed to work properly
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            console.log('Section in view:', entry.target.id); // Debug log
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-100px 0px -50% 0px', 
        threshold: [0.1, 0.3, 0.5] 
      }
    );

    // Wait for DOM to be ready
    setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      console.log('Found sections:', Array.from(sections).map(s => s.id)); // Debug log
      sections.forEach((section) => observer.observe(section));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.7;
    const targetScroll = direction === 'left' 
      ? Math.max(0, container.scrollLeft - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, container.scrollLeft + scrollAmount);
    
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  const getMagneticOffset = (itemIndex) => {
    const container = scrollContainerRef.current;
    if (!container) return { x: 0, y: 0 };
    
    const itemWidth = 70;
    const itemCenterX = (itemIndex * itemWidth) + (itemWidth / 2) - container.scrollLeft;
    const distance = Math.abs(mousePosition.x - itemCenterX);
    
    if (distance < 60) {
      const strength = (60 - distance) / 60;
      return { 
        x: (mousePosition.x - itemCenterX) * strength * 0.1,
        y: (mousePosition.y - 50) * strength * 0.08
      };
    }
    return { x: 0, y: 0 };
  };

  const handleItemClick = (id) => {
    console.log('Clicking navigation item:', id); // Debug log
    setActiveSection(id);
    
    // Find the target element
    const targetElement = document.getElementById(id);
    console.log('Target element found:', targetElement); // Debug log
    
    if (targetElement) {
      // Calculate scroll position manually
      const navbarHeight = 140; // Fixed navbar height
      const extraOffset = 20; // Extra spacing
      const elementTop = targetElement.offsetTop;
      const scrollPosition = elementTop - navbarHeight - extraOffset;
      
      console.log('Scrolling to position:', scrollPosition); // Debug log
      
      // Scroll to the calculated position
      window.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    } else {
      console.error('Element not found with id:', id);
    }
  };

  return (
    <div className="w-full py-2 sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <nav 
        ref={navRef}
        className="relative overflow-hidden shadow-2xl border-b-4 border-orange-400 w-full max-w-full mx-auto"
        style={{
          background: `
            linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,248,240,0.95) 100%),
            repeating-linear-gradient(45deg, rgba(255,165,0,0.05) 0px, rgba(255,165,0,0.05) 10px, transparent 10px, transparent 20px)
          `,
          borderRadius: '20px'
        }}
      >
        <div className="relative w-full">
          {/* Left arrow - Only show on mobile */}
          {isMobile && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                boxShadow: '0 2px 8px rgba(255, 107, 53, 0.4)'
              }}
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
          )}

          {/* Right arrow - Only show on mobile */}
          {isMobile && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                boxShadow: '0 2px 8px rgba(255, 107, 53, 0.4)'
              }}
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          )}

          {/* Navigation items - Desktop center, mobile scroll */}
          <div 
            ref={scrollContainerRef}
            className={`flex items-center gap-1 py-2 ${
              isMobile 
                ? 'overflow-x-auto scrollbar-hide px-12' 
                : 'justify-center px-4'
            }`}
            style={isMobile ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
          >
            {navigationItems.map(([id, emoji, label], index) => {
              const magneticOffset = getMagneticOffset(index);
              const isActive = activeSection === id;
              
              return (
                <button
                  key={id}
                  onClick={() => handleItemClick(id)}
                  className={`flex flex-col items-center px-3 py-2 min-w-[60px] transition-all duration-200 rounded-xl ${
                    isActive ? 'text-white font-bold' : 'text-gray-700 hover:text-white font-medium'
                  }`}
                  style={{
                    background: isActive 
                      ? 'linear-gradient(135deg, #ff6b35, #f7931e)' 
                      : 'transparent',
                    boxShadow: isActive 
                      ? '0 4px 12px rgba(255, 107, 53, 0.4)' 
                      : 'none',
                    transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px) scale(${isActive ? 1.05 : 1})`
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 107, 53, 0.8), rgba(247, 147, 30, 0.8))';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span className={`text-lg mb-0.5 transition-all duration-200 ${
                    isActive ? 'scale-110' : 'group-hover:scale-110'
                  }`}>
                    {emoji}
                  </span>
                  <span className="text-xs whitespace-nowrap">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom decoration */}
        <div 
          className="absolute bottom-0 left-0 w-full h-0.5"
          style={{
            background: 'linear-gradient(90deg, #ff6b35, #f7931e, #ffb347, #f7931e, #ff6b35)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite'
          }}
        />
      </nav>

      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 200% 0; }
          50% { background-position: -200% 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(180deg); }
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Navigation;