import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { getAnimalHistoryHealth } from '../../api/farm/farm';
import FeedChart from './FeedChart';
import HealthCalendar from './HealthCalendar';
import HealthStats from './HealthStats';
import HealthTable from './HealthTable';
import WeightChart from './WeightChart';

interface HealthRecordProps {
  animalOwnerUserId: string;
}

interface HealthDataItem {
  date: string;
  weight: number;
  feedIntake: number;
  [key: string]: unknown;
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const HealthRecord: React.FC<HealthRecordProps> = ({ animalOwnerUserId }) => {
  const [healthData, setHealthData] = useState<HealthDataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [filteredData, setFilteredData] = useState<HealthDataItem | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const fetchHealthData = async (filters: { specificDate?: string; startDate?: string; endDate?: string } = {}): Promise<void> => {
    setLoading(true);
    try {
      const response = await getAnimalHistoryHealth(
        animalOwnerUserId,
        filters.specificDate || null,
        filters.startDate || null,
        filters.endDate || null,
      );
      if (response?.data) {
        const sortedData = [...response.data.data].sort(
          (a: HealthDataItem, b: HealthDataItem) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setHealthData(sortedData);
        setFilteredData(sortedData[0] || null);
      } else {
        setHealthData([]);
        setFilteredData(null);
      }
    } catch (error) {
      console.error('Error fetching health data:', error);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Không thể tải dữ liệu sức khỏe' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animalOwnerUserId]);

  const handleDateRangeChange = (start: Date | null, end: Date | null): void => {
    setDateRange({ startDate: start, endDate: end });
    fetchHealthData({
      startDate: start ? start.toISOString().split('T')[0] : undefined,
      endDate: end ? end.toISOString().split('T')[0] : undefined,
    });
  };

  return (
    <ScrollView className="flex-1 p-4 bg-[#F8F9FB]">
      <Text className="text-[22px] font-bold mb-4 text-center">Sổ Sức Khỏe Vật Nuôi</Text>

      <View className="mb-4">
        <View>
          <Text className="text-sm text-[#34495E] mb-2">Chọn khoảng thời gian</Text>
          <View className="flex-row items-center">
            <Text
              className="p-2 bg-white border border-[#ccc] rounded text-center flex-1"
              onPress={() => setShowStartDatePicker(true)}
            >
              {dateRange.startDate ? dateRange.startDate.toDateString() : 'Ngày bắt đầu'}
            </Text>
            <Text> - </Text>
            <Text
              className="p-2 bg-white border border-[#ccc] rounded text-center flex-1"
              onPress={() => setShowEndDatePicker(true)}
            >
              {dateRange.endDate ? dateRange.endDate.toDateString() : 'Ngày kết thúc'}
            </Text>
          </View>
        </View>
      </View>

      {showStartDatePicker && (
        <DateTimePicker
          value={dateRange.startDate || new Date()}
          mode="date"
          display="default"
          onChange={(_: DateTimePickerEvent, selected?: Date) => {
            setShowStartDatePicker(false);
            if (selected) handleDateRangeChange(selected, dateRange.endDate);
          }}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={dateRange.endDate || new Date()}
          mode="date"
          display="default"
          onChange={(_: DateTimePickerEvent, selected?: Date) => {
            setShowEndDatePicker(false);
            if (selected) handleDateRangeChange(dateRange.startDate, selected);
          }}
        />
      )}

      <View className="flex-row flex-wrap justify-between">
        <View className="w-full mb-4">
          <HealthCalendar
            selectedDate={selectedDate}
            onDateChange={(date: Date) => setSelectedDate(date)}
            healthData={healthData}
          />
          <HealthStats data={filteredData ? [filteredData] : []} />
        </View>
        <View className="w-full">
          <WeightChart data={healthData} />
          <FeedChart data={healthData} />
          <HealthTable data={healthData} />
        </View>
      </View>

      <Toast />
    </ScrollView>
  );
};

export default HealthRecord;
