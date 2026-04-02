import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface AddressItemProps {
  name: string;
  phone: string;
  address: string;
  isdefault: boolean;
  onUpdate: () => void;
  onSetDefault: () => Promise<void>;
  onDelete: () => void;
}

const AddressItem: React.FC<AddressItemProps> = ({
  name,
  phone,
  address,
  isdefault,
  onUpdate,
  onSetDefault,
  onDelete,
}) => {
  const [loadingSetDefault, setLoadingSetDefault] = useState(false);

  const handleSetDefaultClick = async (): Promise<void> => {
    setLoadingSetDefault(true);
    try {
      await onSetDefault();
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Error setting default address:', err.message);
    } finally {
      setLoadingSetDefault(false);
    }
  };

  return (
    <View className="bg-white border border-[#ddd] rounded-lg p-4 mb-4 shadow-sm">
      <View className="mb-4">
        <Text className="text-base font-bold text-[#333]">
          {name} <Text className="text-sm text-[#555]">({phone})</Text>
        </Text>
        <Text className="text-sm text-[#555] my-2">{address}</Text>
        {isdefault ? (
          <View className="bg-red-400 rounded-2xl px-2.5 py-1 self-start">
            <Text className="text-xs text-white font-bold">Mặc định</Text>
          </View>
        ) : (
          <TouchableOpacity
            className={`bg-emerald-500 rounded-lg py-2.5 items-center ${
              loadingSetDefault ? 'opacity-70' : ''
            }`}
            onPress={handleSetDefaultClick}
            disabled={loadingSetDefault}
          >
            {loadingSetDefault ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white font-bold">Thiết lập mặc định</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-col">
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity onPress={onUpdate}>
            <Text className="text-blue-600 font-semibold">Cập nhật</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Text className="text-red-600 font-semibold">Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddressItem;
