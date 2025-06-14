import React, { useState } from 'react';
import { MenuItem } from '../types';
import { useInView } from 'react-intersection-observer';
import { Plus } from 'lucide-react';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  description?: string;
  subTitle?: string;
  bgColor: string;
  onAddToOrder: (item: MenuItem) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  title,
  items,
  description,
  subTitle,
  bgColor,
  onAddToOrder
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});

  const isPizzaSection = title.toLowerCase().includes('pizza');

  const handleSizeChange = (itemId: number, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [itemId]: size
    }));
  };

  const handleAddToOrder = (item: MenuItem) => {
    if (isPizzaSection && typeof item.price === 'object') {
      const selectedSize = selectedSizes[item.id] || 'medium';
      const priceForSize = item.price[selectedSize as keyof typeof item.price];
      
      const itemWithSelectedSize: MenuItem = {
        ...item,
        name: `${item.name} (${getSizeLabel(selectedSize)})`,
        price: priceForSize
      };
      
      onAddToOrder(itemWithSelectedSize);
    } else {
      onAddToOrder(item);
    }
  };

  const getSizeLabel = (size: string): string => {
    const sizeLabels = {
      medium: 'Ø 26cm',
      large: 'Ø 30cm', 
      family: 'Ø 40cm',
      mega: 'Ø 50cm'
    };
    return sizeLabels[size as keyof typeof sizeLabels] || size;
  };

  const getCurrentPrice = (item: MenuItem): number => {
    if (typeof item.price === 'object') {
      const selectedSize = selectedSizes[item.id] || 'medium';
      return item.price[selectedSize as keyof typeof item.price] || 0;
    }
    return typeof item.price === 'number' ? item.price : 0;
  };

  return (
    <section
      ref={ref}
      className={`mb-6 transform transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Category header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {title}
        </h2>
        {subTitle && (
          <h3 className="text-sm text-gray-600 mb-2 font-medium">
            {subTitle}
          </h3>
        )}
        {description && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
        
        {/* Pizza size info */}
        {isPizzaSection && (
          <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800 font-medium mb-2">🍕 Verfügbare Größen:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-orange-700">
              <span>• Medium: Ø 26cm</span>
              <span>• Large: Ø 30cm</span>
              <span>• Family: Ø 40cm</span>
              <span>• Mega: Ø 50cm</span>
            </div>
          </div>
        )}
      </div>

      {/* Menu items container */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 hover:border-orange-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
            style={{
              animationDelay: `${index * 50}ms`,
              transform: inView ? 'translateX(0)' : 'translateX(-20px)',
              opacity: inView ? 1 : 0,
              transition: `all 300ms ${index * 50}ms`
            }}
          >
            <div className="p-5 flex items-start justify-between gap-4 relative">
              {/* Subtle background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-50/0 to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Left side - Item info */}
              <div className="flex-1 min-w-0 relative z-10">
                <div className="flex items-start gap-4 mb-3">
                  {/* Enhanced number badge */}
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <span className="text-white font-bold text-xl tracking-tight">
                      {item.number}
                    </span>
                  </div>
                  
                  <div className="flex-1 pt-1">
                    {/* Enhanced item name */}
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-orange-700 transition-colors duration-300">
                      {item.name}
                    </h3>
                    
                    {/* Enhanced allergen badge */}
                    {item.allergens && (
                      <span className="inline-flex items-center text-xs font-medium text-orange-700 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full mb-3 group-hover:bg-orange-200 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                        {item.allergens}
                      </span>
                    )}
                    
                    {/* Enhanced description */}
                    {item.description && (
                      <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 max-w-lg">
                        {item.description}
                      </p>
                    )}

                    {/* Pizza size selector */}
                    {isPizzaSection && typeof item.price === 'object' && (
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Größe wählen:
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(item.price).map(([size, price]) => (
                            <label
                              key={size}
                              className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                                selectedSizes[item.id] === size || (!selectedSizes[item.id] && size === 'medium')
                                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                                  : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                              }`}
                            >
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  name={`size-${item.id}`}
                                  value={size}
                                  checked={selectedSizes[item.id] === size || (!selectedSizes[item.id] && size === 'medium')}
                                  onChange={() => handleSizeChange(item.id, size)}
                                  className="sr-only"
                                />
                                <div className="text-xs">
                                  <div className="font-medium capitalize">{size}</div>
                                  <div className="text-gray-500">{getSizeLabel(size)}</div>
                                </div>
                              </div>
                              <span className="text-sm font-bold">
                                {(price || 0).toFixed(2).replace('.', ',')} €
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced right side - Price and add button */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0 relative z-10">
                {/* Enhanced price display */}
                <div className="text-right">
                  <div className="bg-gray-50 rounded-lg px-4 py-2 group-hover:bg-orange-50 transition-colors duration-300 border border-gray-200 group-hover:border-orange-200">
                    <span className="font-bold text-gray-900 text-lg group-hover:text-orange-700 transition-colors duration-300">
                      {getCurrentPrice(item).toFixed(2).replace('.', ',')} €
                    </span>
                  </div>
                </div>
                
                {/* Enhanced add button */}
                <button
                  type="button"
                  onClick={() => handleAddToOrder(item)}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 group-hover:rotate-3"
                  title="Zum Warenkorb hinzufügen"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Subtle bottom accent line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-orange-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;