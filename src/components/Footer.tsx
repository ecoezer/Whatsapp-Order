import React, { useState } from 'react';
import { MapPin, Phone, Heart } from 'lucide-react';

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = '+4917621925497';

  const handleWhatsApp = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-orange-50 border-t-2 border-orange-400 py-8">
      <div className="container mx-auto px-4 max-w-lg text-center space-y-6">
        
        {/* Address */}
        <div className="bg-white/60 rounded-xl p-4 hover:bg-white/80 transition-colors">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-full">
              <MapPin className="h-4 w-4 text-orange-600" />
            </div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-800">🏠 IN DEN SUNDERN 1</div>
            <div className="text-sm text-gray-600">📮 31199 DIEKHOLZEN</div>
            <p className="text-xs text-gray-500 mt-1">⚽ (SV-Hildesia e.V. Clubhaus)</p>
          </div>
        </div>

        {/* WhatsApp Button */}
        <div className="relative">
          <a 
            href={`https://wa.me/${phoneNumber}`}
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="p-2 bg-white/20 rounded-full">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-medium">💬 WhatsApp & Anrufen</div>
              <div className="font-bold text-lg">0176 219 25 497</div>
            </div>
          </a>
          {copied && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-full text-xs">
              ✅ Kopyalandı!
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300" />
          <Heart className="h-4 w-4 text-orange-400" />
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Footer Text */}
        <div className="space-y-1">
          <div className="font-medium text-gray-700">
            🍽️ Leckere Döner, Pizza & mehr in Diekholzen
          </div>
          <p className="text-xs text-gray-500">
            © 2025 Bistro Diekholzen - Alle Rechte vorbehalten
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;