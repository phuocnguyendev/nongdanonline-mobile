import { format } from 'date-fns';
import React, { useState } from 'react';
import { FlatList, ListRenderItem, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Vaccine {
  vaccineName?: string;
  vaccineDescription?: string;
}

interface HealthTableItem {
  date: string;
  weight: number;
  feedIntake?: number;
  vaccines?: Vaccine[];
}

interface HealthTableProps {
  data: HealthTableItem[];
}

const HealthTable: React.FC<HealthTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getCurrentData = (): HealthTableItem[] => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  };

  if (!data || data.length === 0) {
    return (
      <View className="bg-white rounded-2xl p-5 shadow-sm m-2.5 items-center min-h-[180px] justify-center">
        <MaterialCommunityIcons name="clipboard-text-clock" size={80} color="#CBD5E1" />
        <Text className="text-[15px] text-slate-500 text-center font-semibold mt-4">Không có dữ liệu chăm sóc</Text>
        <Text className="text-[13px] text-slate-400 text-center mt-2 px-5">Hãy thêm dữ liệu chăm sóc để theo dõi</Text>
      </View>
    );
  }

  const renderTableHeader = (): React.ReactElement => (
    <View className="flex-row py-4 px-3 bg-slate-50 rounded-lg mb-3">
      <View className="flex-1 flex-row items-center justify-center px-2">
        <Text className="ml-1.5 text-[15px] font-semibold text-slate-600">Ngày</Text>
      </View>
      <View style={{ flex: 0.8 }} className="flex-row items-center justify-center px-2">
        <Ionicons name="fitness" size={18} color="#007BFF" />
        <Text className="ml-1.5 text-[15px] font-semibold text-slate-600">KG</Text>
      </View>
      <View className="flex-1 flex-row items-center justify-center px-2">
        <Ionicons name="fast-food" size={18} color="#28A745" />
        <Text className="ml-1.5 text-[15px] font-semibold text-slate-600">G/Ngày</Text>
      </View>
      <View style={{ flex: 2 }} className="flex-row items-center justify-center px-2">
        <Ionicons name="medkit" size={18} color="#DC3545" />
        <Text className="ml-1.5 text-[15px] font-semibold text-slate-600">Thuốc/Vaccine</Text>
      </View>
    </View>
  );

  const renderTableRow: ListRenderItem<HealthTableItem> = ({ item }) => (
    <View className="flex-row py-4 px-3 border-b border-slate-200 items-center min-h-[60px]">
      <Text className="flex-1 text-[15px] text-slate-500 text-center px-2">{format(new Date(item.date), 'dd/MM')}</Text>
      <Text style={{ flex: 0.8 }} className="text-[15px] text-slate-500 text-center px-2">{(item.weight / 1000).toFixed(1)}</Text>
      <Text className="flex-1 text-[15px] text-slate-500 text-center px-2">{item.feedIntake || '-'}</Text>
      <Text style={{ flex: 2 }} className="text-[15px] text-slate-500 text-left px-2 leading-5">
        {item.vaccines && item.vaccines.length > 0
          ? item.vaccines.map((vaccine) => `${vaccine.vaccineName || '-'}: ${vaccine.vaccineDescription || '-'}`).join('\n')
          : '-'}
      </Text>
    </View>
  );

  return (
    <View className="bg-white rounded-2xl p-5 shadow-sm m-2.5">
      <View className="flex-row items-center justify-center mb-5">
        <MaterialCommunityIcons name="clipboard-list" size={24} color="#1E293B" />
        <Text className="text-lg font-bold text-slate-800 ml-2 text-center uppercase tracking-wide">Lịch sử chăm sóc</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ minWidth: '100%' }}>
          {renderTableHeader()}
          <FlatList
            data={getCurrentData()}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderTableRow}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      <View className="flex-row justify-center items-center mt-5 pt-5 border-t border-slate-200">
        <TouchableOpacity
          onPress={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`py-2.5 px-5 rounded-lg mx-2.5 ${currentPage === 1 ? 'bg-slate-100' : 'bg-indigo-50'}`}
        >
          <Text className={`font-semibold text-sm ${currentPage === 1 ? 'text-slate-400' : 'text-indigo-600'}`}>Trước</Text>
        </TouchableOpacity>
        <Text className="text-sm text-slate-600 font-semibold">Trang {currentPage} / {totalPages}</Text>
        <TouchableOpacity
          onPress={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`py-2.5 px-5 rounded-lg mx-2.5 ${currentPage === totalPages ? 'bg-slate-100' : 'bg-indigo-50'}`}
        >
          <Text className={`font-semibold text-sm ${currentPage === totalPages ? 'text-slate-400' : 'text-indigo-600'}`}>Sau</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HealthTable;
