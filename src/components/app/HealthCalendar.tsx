import React from 'react';
import { View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

interface HealthDataItem {
  date: string;
  [key: string]: unknown;
}

interface MarkedDate {
  marked?: boolean;
  dotColor?: string;
  selected?: boolean;
  selectedColor?: string;
}

interface HealthCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  healthData: HealthDataItem[];
}

const HealthCalendar: React.FC<HealthCalendarProps> = ({
  selectedDate,
  onDateChange,
  healthData,
}) => {
  const markedDates: Record<string, MarkedDate> = healthData.reduce(
    (acc: Record<string, MarkedDate>, record) => {
      const date = new Date(record.date).toISOString().split('T')[0];
      acc[date] = { marked: true, dotColor: 'green' };
      return acc;
    },
    {},
  );

  if (selectedDate) {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    markedDates[formattedDate] = {
      ...(markedDates[formattedDate] || {}),
      selected: true,
      selectedColor: 'blue',
    };
  }

  return (
    <View className="bg-white rounded-[10px] p-2.5 shadow-sm">
      <Calendar
        onDayPress={(day: DateData) => onDateChange(new Date(day.dateString))}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: 'blue',
          todayTextColor: 'red',
          arrowColor: 'blue',
          dotColor: 'green',
        }}
      />
    </View>
  );
};

export default HealthCalendar;
