import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Toast from 'react-native-toast-message';
import { fetchSensorData } from '../../../api/sensor/sensorService';

const screenWidth = Dimensions.get('window').width;

interface SensorProps {
  route: { params: { sensorResponses: any[] } };
}

const Sensor: React.FC<SensorProps> = ({ route }) => {
  const { sensorResponses } = route.params;
  const [_sensorData, setSensorData] = useState<any>(null); // Replaced with _ to disable unused warning since logic remains from original code
  const [selectedTab, setSelectedTab] = useState('H2S');
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any>(null);

  const tabOrder = ['H2S', 'NH3', 'Nhiệt độ', 'Độ ẩm'];
  const sortedSensorResponses = useMemo(() => {
    return sensorResponses
      .map((sensor) => ({ ...sensor, sensorName: sensor.sensorName.trim() }))
      .sort((a, b) => tabOrder.indexOf(a.sensorName) - tabOrder.indexOf(b.sensorName));
  }, [sensorResponses]); // Add missing deps

  const getMidnightVietnamTime = (): Date => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  };

  const getChartData = useCallback((data: any) => {
    if (!data || !Array.isArray(data.dataLogs)) return null;

    const startDate = getMidnightVietnamTime();
    const fullDayLabels: string[] = [];
    const totalHours = 24;
    for (let i = 0; i < totalHours; i += 3) {
      const currentHour = new Date(startDate.getTime() + i * 60 * 60 * 1000);
      const formattedDateTime = `${currentHour.getHours().toString().padStart(2, '0')}:00`;
      fullDayLabels.push(formattedDateTime);
    }

    const dataMap = new Map();
    data.dataLogs.forEach((entry: any) => {
      const date = new Date(entry.time);
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
      const formattedTime = `${date.getHours().toString().padStart(2, '0')}:00`;
      dataMap.set(formattedTime, entry.data);
    });

    const chartDataArray = fullDayLabels.map((label) => dataMap.get(label) || 0);

    return {
      labels: fullDayLabels,
      datasets: [
        {
          data: chartDataArray,
          color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  }, []);

  const getSensorData = useCallback(async (): Promise<void> => {
    try {
      const selectedSensor = sortedSensorResponses.find((sensor) => sensor.sensorName === selectedTab);

      if (!selectedSensor) {
        Toast.show({ type: 'error', text1: 'No sensor data available.' });
        setLoading(false);
        setSensorData(null);
        return;
      }

      setLoading(true);
      const gmt7Midnight = getMidnightVietnamTime();
      const fromUTC = new Date(gmt7Midnight.getTime() - 7 * 60 * 60 * 1000);
      const from = fromUTC.toISOString();

      const data = await fetchSensorData(selectedSensor.urlLogSensorByHours, selectedSensor.sensorCode, from);

      if (data && Array.isArray(data.dataLogs)) {
        setSensorData(data);
        const newChartData = getChartData(data);
        setChartData(newChartData);
      } else {
        setSensorData(null);
        setChartData(null);
      }

      setLoading(false);
    } catch (error) {
      console.log('Error Sensor', error);
      Toast.show({ type: 'error', text1: 'Error fetching sensor data.' });
      setLoading(false);
      setSensorData(null);
      setChartData(null);
    }
  }, [selectedTab, sortedSensorResponses, getChartData]);

  useEffect(() => {
    getSensorData();
  }, [selectedTab, getSensorData]);

  const handleTabChange = (tab: string): void => {
    setSelectedTab(tab.trim());
  };

  const memoizedChartData = useMemo(() => chartData, [chartData]);

  return (
    <View className="flex-1 bg-[#f7f7f7] p-5">
      <View className="border border-[#ddd] rounded-[10px] p-1 mb-4">
        <View className="flex-row justify-around bg-transparent">
          {sortedSensorResponses.map((sensor) => (
            <TouchableOpacity
              key={sensor.sensorCode}
              onPress={() => handleTabChange(sensor.sensorName)}
              className={`py-1.5 px-2.5 rounded-md ${selectedTab === sensor.sensorName ? 'bg-[#66bb6a]' : ''}`}
              disabled={loading}
            >
              <Text className={`text-[13px] text-center ${selectedTab === sensor.sensorName ? 'text-white' : 'text-[#333]'}`}>
                {sensor.sensorName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="items-center mt-2.5">
        {loading ? (
          <ActivityIndicator size="large" color="#009688" />
        ) : !memoizedChartData ? (
          <Text className="text-[#777] text-center py-5">
            Không có dữ liệu cảm biến. Vui lòng kiểm tra lại kết nối hoặc chọn cảm biến khác.
          </Text>
        ) : (
          <LineChart
            data={memoizedChartData}
            width={screenWidth - 40}
            height={300}
            chartConfig={{
              backgroundColor: '#f7f7f7',
              backgroundGradientFrom: '#f7f7f7',
              backgroundGradientTo: '#f7f7f7',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
              labelColor: () => '#333',
              style: {
                borderRadius: 8,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '1',
                stroke: '#009688',
              },
            }}
            style={{ borderRadius: 8, paddingVertical: 10 }}
          />
        )}
      </View>
    </View>
  );
};

export default Sensor;
