import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AsYouType } from 'libphonenumber-js';
import { Phone, ShoppingCart, X, Minus, Plus, Clock, MapPin, User, MessageSquare } from 'lucide-react';

// Types
interface OrderItem {
  menuItem: {
    id: number;
    name: string;
    price: number;
    number: string;
  };
  quantity: number;
}

interface OrderFormProps {
  orderItems: OrderItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

// Constants
const DELIVERY_ZONES = {
  'zone1': { label: '0-2km', fee: 2 },
  'zone2': { label: '2-4km', fee: 3 },
  'zone3': { label: '4-6km', fee: 3.5 }
} as const;

const WEEKEND_START_HOUR = 12;
const WEEKDAY_START_HOUR = 14;
const END_HOUR = 20;
const AVAILABLE_MINUTES = ['00', '15', '30', '45'];

// Custom Hooks
const useTimeSlots = () => {
  return useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const isWeekend = [0, 6].includes(now.getDay());
    
    const startHour = isWeekend ? WEEKEND_START_HOUR : WEEKDAY_START_HOUR;
    
    const availableHours = Array.from(
      { length: END_HOUR - startHour + 1 },
      (_, i) => startHour + i
    ).filter(hour => hour >= currentHour || currentHour > END_HOUR);

    const getAvailableMinutes = (selectedHour: number): string[] => {
      if (selectedHour === currentHour) {
        return AVAILABLE_MINUTES.filter(min => parseInt(min) > currentMinute);
      }
      return AVAILABLE_MINUTES;
    };

    return { availableHours, getAvailableMinutes };
  }, []);
};

const useOrderCalculation = (orderItems: OrderItem[], orderType: 'pickup' | 'delivery', deliveryZone?: keyof typeof DELIVERY_ZONES) => {
  return useMemo(() => {
    // Filter out invalid items first
    const validItems = orderItems.filter(item => 
      item && 
      item.menuItem && 
      typeof item.menuItem.price === 'number' && 
      typeof item.quantity === 'number'
    );
    
    const subtotal = validItems.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0
    );
    
    const deliveryFee = orderType === 'delivery' && deliveryZone ? DELIVERY_ZONES[deliveryZone].fee : 0;
    const total = subtotal + deliveryFee;

    return { subtotal, deliveryFee, total };
  }, [orderItems, orderType, deliveryZone]);
};

// Validation Schema
const orderFormSchema = z
  .object({
    orderType: z.enum(['pickup', 'delivery'], {
      errorMap: () => ({ message: 'Bitte wählen Sie Abholung oder Lieferung' })
    }),
    deliveryZone: z.enum(['zone1', 'zone2', 'zone3']).optional(),
    deliveryTime: z.enum(['asap', 'specific'], {
      errorMap: () => ({ message: 'Bitte wählen Sie eine Lieferzeit' })
    }),
    specificTime: z.string().optional(),
    name: z
      .string()
      .min(2, 'Name muss mindestens 2 Zeichen haben')
      .max(50, 'Name darf maximal 50 Zeichen haben'),
    phone: z
      .string()
      .min(10, 'Telefonnummer ist zu kurz')
      .max(16, 'Telefonnummer ist zu lang')
      .refine(val => /^\+49\s?[1-9]\d{1,4}\s?\d{5,10}$/.test(val), {
        message: 'Gültige deutsche Telefonnummer eingeben (+49 Format)'
      }),
    street: z.string().optional(),
    houseNumber: z.string().optional(),
    postcode: z.string().optional(),
    note: z
      .string()
      .max(500, 'Anmerkung darf maximal 500 Zeichen haben')
      .optional()
  })
  .refine(
    data => data.deliveryTime !== 'specific' || (data.specificTime && data.specificTime.length > 0),
    { message: 'Bitte wählen Sie eine Uhrzeit', path: ['specificTime'] }
  )
  .refine(
    data => data.orderType !== 'delivery' || !!data.deliveryZone,
    { message: 'Bitte wählen Sie eine Lieferzone', path: ['deliveryZone'] }
  )
  .refine(
    data => data.orderType !== 'delivery' || (data.street && data.street.length >= 3),
    { message: 'Straße ist bei Lieferung erforderlich', path: ['street'] }
  )
  .refine(
    data => data.orderType !== 'delivery' || (data.houseNumber && /^[0-9]+[a-zA-Z]*$/.test(data.houseNumber)),
    { message: 'Gültige Hausnummer eingeben (z.B. 123 oder 123a)', path: ['houseNumber'] }
  )
  .refine(
    data => data.orderType !== 'delivery' || (data.postcode && /^3119[0-9]$/.test(data.postcode)),
    { message: 'Postleitzahl muss mit 3119 beginnen', path: ['postcode'] }
  );

type OrderFormData = z.infer<typeof orderFormSchema>;

// Sub-components
const OrderItemComponent = memo<{
  item: OrderItem;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}>(({ item, onRemove, onUpdateQuantity }) => {
  // Add safety check for invalid items
  if (!item || !item.menuItem) {
    return null;
  }

  return (
    <div className="flex items-start justify-between bg-gray-50 p-4 rounded-lg group hover:bg-gray-100 transition-all duration-200">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{item.menuItem.name}</p>
        <p className="text-sm text-gray-600 mt-1">
          {(item.menuItem.price * item.quantity).toFixed(2).replace('.', ',')} €
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.menuItem.id, Math.max(0, item.quantity - 1))}
            className="p-1 hover:bg-gray-100 rounded-l-lg transition-colors"
            aria-label="Menge verringern"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
          <span className="w-8 text-center font-medium text-gray-900">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
            className="p-1 hover:bg-gray-100 rounded-r-lg transition-colors"
            aria-label="Menge erhöhen"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => onRemove(item.menuItem.id)}
          className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded-full"
          aria-label="Artikel entfernen"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
});

const FormField = memo<{
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}>(({ label, error, icon, children }) => (
  <div className="space-y-1">
    {label && (
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {icon}
        {label}
      </label>
    )}
    {children}
    {error && (
      <p className="text-red-500 text-sm animate-pulse" role="alert">
        {error}
      </p>
    )}
  </div>
));

const TimeSelector = memo<{
  availableHours: number[];
  getAvailableMinutes: (hour: number) => string[];
  onTimeChange: (time: string) => void;
  error?: string;
}>(({ availableHours, getAvailableMinutes, onTimeChange, error }) => {
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<string>('');

  const availableMinutes = useMemo(() => 
    selectedHour !== null ? getAvailableMinutes(selectedHour) : [],
    [selectedHour, getAvailableMinutes]
  );

  const handleHourChange = useCallback((hour: string) => {
    const hourNum = parseInt(hour) || null;
    setSelectedHour(hourNum);
    setSelectedMinute('');
    
    if (hourNum && selectedMinute) {
      onTimeChange(`${hourNum}:${selectedMinute}`);
    }
  }, [selectedMinute, onTimeChange]);

  const handleMinuteChange = useCallback((minute: string) => {
    setSelectedMinute(minute);
    
    if (selectedHour !== null && minute) {
      onTimeChange(`${selectedHour}:${minute}`);
    }
  }, [selectedHour, onTimeChange]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField label="Stunde *" icon={<Clock className="w-4 h-4" />}>
        <select
          value={selectedHour?.toString() || ''}
          onChange={e => handleHourChange(e.target.value)}
          className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition-colors ${
            error ? 'border-red-500' : ''
          }`}
        >
          <option value="">Stunde wählen</option>
          {availableHours.map(hour => (
            <option key={hour} value={hour.toString()}>
              {hour}:00
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Minute *">
        <select
          value={selectedMinute}
          onChange={e => handleMinuteChange(e.target.value)}
          disabled={selectedHour === null}
          className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error ? 'border-red-500' : ''
          }`}
        >
          <option value="">Minute wählen</option>
          {availableMinutes.map(minute => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </FormField>

      {error && (
        <p className="text-red-500 text-sm col-span-2 animate-pulse" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

const OrderSummary = memo<{
  subtotal: number;
  deliveryFee: number;
  total: number;
  orderType: 'pickup' | 'delivery';
}>(({ subtotal, deliveryFee, total, orderType }) => (
  <div className="flex flex-col space-y-2 py-4 border-t border-b border-gray-100 bg-gray-50 px-4 rounded-lg">
    <div className="flex items-center justify-between">
      <span className="font-medium text-gray-900">Zwischensumme:</span>
      <span className="font-medium text-gray-900">
        {subtotal.toFixed(2).replace('.', ',')} €
      </span>
    </div>

    {orderType === 'delivery' && (
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900">Liefergebühr:</span>
        <span className="font-medium text-gray-900">
          {deliveryFee.toFixed(2).replace('.', ',')} €
        </span>
      </div>
    )}

    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
      <span className="font-bold text-gray-900">Gesamtbetrag:</span>
      <span className="text-xl font-bold text-orange-600">
        {total.toFixed(2).replace('.', ',')} €
      </span>
    </div>
  </div>
));

const EmptyCart = memo(() => (
  <div className="bg-white rounded-xl shadow-lg p-8 text-center">
    <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ihr Warenkorb ist leer</h3>
    <p className="text-gray-600">Fügen Sie Artikel aus dem Menü hinzu, um eine Bestellung aufzugeben</p>
  </div>
));

// Main Component
const OrderForm: React.FC<OrderFormProps> = ({ orderItems, onRemoveItem, onUpdateQuantity }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { availableHours, getAvailableMinutes } = useTimeSlots();

  // Filter out invalid items before processing
  const validOrderItems = useMemo(() => 
    orderItems.filter(item => 
      item && 
      item.menuItem && 
      typeof item.menuItem.price === 'number' && 
      typeof item.quantity === 'number'
    ), [orderItems]
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors, isValid }
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    mode: 'onChange',
    defaultValues: {
      orderType: 'pickup',
      deliveryZone: undefined,
      deliveryTime: 'asap',
      specificTime: '',
      name: '',
      phone: '+49 1',
      street: '',
      houseNumber: '',
      postcode: '3119',
      note: ''
    }
  });

  const orderType = watch('orderType');
  const deliveryZone = watch('deliveryZone');
  const deliveryTime = watch('deliveryTime');
  
  const { subtotal, deliveryFee, total } = useOrderCalculation(validOrderItems, orderType, deliveryZone);

  const formatPhone = useCallback((value: string): string => {
    let input = value;
    if (!input.startsWith('+49 1')) {
      input = '+49 1' + input.replace(/^\+49 1/, '');
    }
    return new AsYouType('DE').input(input);
  }, []);

  const handleTimeChange = useCallback((time: string) => {
    setValue('specificTime', time, { shouldValidate: true });
  }, [setValue]);

  const onSubmit = useCallback(async (data: OrderFormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const orderDetails = validOrderItems
        .map(item => `${item.quantity}x Nr. ${item.menuItem.number} ${item.menuItem.name}`)
        .join('\n');

      const timeInfo = data.deliveryTime === 'asap' 
        ? 'So schnell wie möglich' 
        : `Um ${data.specificTime} Uhr`;

      let messageText = `🍕 Neue Bestellung von ${data.name}\n\n`;
      messageText += `📞 Telefon: ${data.phone}\n\n`;
      messageText += `${data.orderType === 'pickup' ? '🏃‍♂️' : '🚗'} Bestellart: ${data.orderType === 'pickup' ? 'Abholung' : 'Lieferung'}\n`;
      messageText += `⏰ Lieferzeit: ${timeInfo}\n\n`;

      if (data.orderType === 'delivery') {
        messageText += `📍 Lieferadresse:\n`;
        messageText += `   ${data.street} ${data.houseNumber}\n`;
        messageText += `   ${data.postcode}\n\n`;
      }

      messageText += `🛒 Bestellung:\n${orderDetails}\n\n`;
      messageText += `💰 Zwischensumme: ${subtotal.toFixed(2).replace('.', ',')} €\n`;

      if (data.orderType === 'delivery' && data.deliveryZone) {
        const zone = DELIVERY_ZONES[data.deliveryZone];
        messageText += `🚚 Lieferkosten (${zone.label}): ${zone.fee.toFixed(2).replace('.', ',')} €\n`;
      }

      messageText += `💳 Gesamtbetrag: ${total.toFixed(2).replace('.', ',')} €\n\n`;
      
      if (data.note) {
        messageText += `📝 Anmerkung: ${data.note}\n`;
      }

      const whatsappURL = `https://wa.me/+4917621925497?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappURL, '_blank');
      
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [validOrderItems, subtotal, total, isSubmitting]);

  if (validOrderItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="bg-white w-full flex flex-col gap-6 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3">
        <ShoppingCart className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-bold text-gray-900">Ihre Bestellung</h3>
        <span className="bg-orange-100 text-orange-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {validOrderItems.length} Artikel
        </span>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {validOrderItems.map(item => (
          <OrderItemComponent
            key={item.menuItem.id}
            item={item}
            onRemove={onRemoveItem}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="orderType"
            control={control}
            render={({ field }) => (
              <FormField label="Bestellart *" error={errors.orderType?.message}>
                <select
                  {...field}
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition-colors ${
                    errors.orderType ? 'border-red-500' : ''
                  }`}
                >
                  <option value="pickup">🏃‍♂️ Abholung</option>
                  <option value="delivery">🚗 Lieferung</option>
                </select>
              </FormField>
            )}
          />

          <Controller
            name="deliveryTime"
            control={control}
            render={({ field }) => (
              <FormField label="Lieferzeit *" error={errors.deliveryTime?.message}>
                <select
                  {...field}
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition-colors ${
                    errors.deliveryTime ? 'border-red-500' : ''
                  }`}
                >
                  <option value="asap">⚡ So schnell wie möglich</option>
                  <option value="specific">🕐 Zu bestimmter Zeit</option>
                </select>
              </FormField>
            )}
          />
        </div>

        {orderType === 'delivery' && (
          <Controller
            name="deliveryZone"
            control={control}
            render={({ field }) => (
              <FormField label="Lieferzone *" error={errors.deliveryZone?.message}>
                <select
                  {...field}
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition-colors ${
                    errors.deliveryZone ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Bitte wählen Sie Ihre Entfernung</option>
                  {Object.entries(DELIVERY_ZONES).map(([key, zone]) => (
                    <option key={key} value={key}>
                      {zone.label} - {zone.fee.toFixed(2).replace('.', ',')} €
                    </option>
                  ))}
                </select>
              </FormField>
            )}
          />
        )}

        {deliveryTime === 'specific' && (
          <>
            <TimeSelector
              availableHours={availableHours}
              getAvailableMinutes={getAvailableMinutes}
              onTimeChange={handleTimeChange}
              error={errors.specificTime?.message}
            />
            <input type="hidden" {...register('specificTime')} />
          </>
        )}

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormField label="Name *" icon={<User className="w-4 h-4" />} error={errors.name?.message}>
              <input
                {...field}
                type="text"
                placeholder="Ihr vollständiger Name"
                className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition-colors ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
            </FormField>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <FormField label="Telefonnummer *" icon={<Phone className="w-4 h-4" />} error={errors.phone?.message}>
              <input
                {...field}
                type="tel"
                placeholder="+49 1XX XXXXXXX"
                value={value}
                onChange={e => onChange(formatPhone(e.target.value))}
                className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition-colors ${
                  errors.phone ? 'border-red-500' : ''
                }`}
              />
            </FormField>
          )}
        />

        {orderType === 'delivery' && (
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-blue-800 font-medium">
              <MapPin className="w-4 h-4" />
              Lieferadresse
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Controller
                  name="street"
                  control={control}
                  render={({ field }) => (
                    <FormField error={errors.street?.message}>
                      <input
                        {...field}
                        type="text"
                        placeholder="Straßenname *"
                        className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition-colors ${
                          errors.street ? 'border-red-500' : ''
                        }`}
                      />
                    </FormField>
                  )}
                />
              </div>

              <Controller
                name="houseNumber"
                control={control}
                render={({ field }) => (
                  <FormField error={errors.houseNumber?.message}>
                    <input
                      {...field}
                      type="text"
                      placeholder="Nr. *"
                      className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition-colors ${
                        errors.houseNumber ? 'border-red-500' : ''
                      }`}
                    />
                  </FormField>
                )}
              />
            </div>

            <Controller
              name="postcode"
              control={control}
              render={({ field }) => (
                <FormField error={errors.postcode?.message}>
                  <input
                    {...field}
                    type="text"
                    placeholder="Postleitzahl (3119X) *"
                    maxLength={5}
                    className={`w-full max-w-xs rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition-colors ${
                      errors.postcode ? 'border-red-500' : ''
                    }`}
                  />
                </FormField>
              )}
            />
          </div>
        )}

        <Controller
          name="note"
          control={control}
          render={({ field }) => (
            <FormField label="Anmerkungen (optional)" icon={<MessageSquare className="w-4 h-4" />} error={errors.note?.message}>
              <textarea
                {...field}
                placeholder="z.B. Funghi-Pizza ohne Zwiebeln, Klingel defekt, etc."
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition-colors resize-none"
                rows={3}
              />
            </FormField>
          )}
        />

        <OrderSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
          orderType={orderType}
        />

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold transition-all duration-300 transform ${
            isValid && !isSubmitting
              ? 'bg-green-500 text-white hover:bg-green-600 hover:scale-[1.02] shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Wird gesendet...
            </>
          ) : (
            <>
              <Phone className="w-6 h-6" />
              Bestellung per WhatsApp senden
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;