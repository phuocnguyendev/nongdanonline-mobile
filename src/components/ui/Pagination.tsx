import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <View className="flex-row justify-between items-center py-2.5">
      <TouchableOpacity
        className="p-2.5 bg-[#d0d0d0] rounded-md"
        onPress={onPreviousPage}
        disabled={currentPage === 1}
      >
        <Text className="text-base">Trang trước</Text>
      </TouchableOpacity>

      <Text className="text-base">
        Trang {currentPage} trong {totalPages}
      </Text>

      <TouchableOpacity
        className="p-2.5 bg-[#d0d0d0] rounded-md"
        onPress={onNextPage}
        disabled={currentPage === totalPages}
      >
        <Text className="text-base">Trang sau</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;
