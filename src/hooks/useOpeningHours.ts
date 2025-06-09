export const useOpeningHours = () => {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTime = hour + minute / 60;

  const isWeekend = day === 0 || day === 6;
  const openingTime = isWeekend ? 12 : 14;
  const closingTime = 21;

  const isOpen = currentTime >= openingTime && currentTime < closingTime;

  const nextOpeningTime = () => {
    if (currentTime >= closingTime) {
      // If it's after closing time, calculate next day's opening
      const nextDay = new Date(now);
      nextDay.setDate(now.getDate() + 1);
      const nextDayName = new Intl.DateTimeFormat('de-DE', {
        weekday: 'long'
      }).format(nextDay);
      const nextDayIsWeekend = nextDay.getDay() === 0 || nextDay.getDay() === 6;
      return `${nextDayName} ab ${nextDayIsWeekend ? '12' : '14'}:00 Uhr wieder geöffnet`;
    }
    if (currentTime < openingTime) {
      // If it's before opening time today
      return `heute ab ${openingTime}:00 Uhr wieder geöffnet`;
    }
    return `heute ab ${openingTime}:00 Uhr wieder geöffnet`;
  };

  return {
    isOpen,
    openingTime,
    closingTime,
    nextOpeningTime: nextOpeningTime(),
    currentHours: isWeekend ? '12:00–21:00' : '14:00–21:00'
  };
};

