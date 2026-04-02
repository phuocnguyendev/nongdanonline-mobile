import React, { useState } from 'react';
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';

interface DeleteConfirmationPopupProps {
  visible: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteConfirmationPopup: React.FC<DeleteConfirmationPopupProps> = ({ visible, message, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (): Promise<void> => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/60 justify-center items-center">
        <View className="bg-white p-5 rounded-lg w-[90%] max-w-[400px] items-center shadow-lg elevation-[10]">
          <Text className="text-lg font-bold text-center mb-2.5">Xác nhận xóa</Text>
          <Text className="text-sm text-[#555] text-center mb-5">{message}</Text>
          <View className="flex-row justify-between w-full">
            <TouchableOpacity className="flex-1 py-2.5 mx-1.5 rounded-lg items-center bg-[#ddd]" onPress={onClose} disabled={loading}>
              <Text className="text-[#333] text-sm">Trở lại</Text>
            </TouchableOpacity>
            <TouchableOpacity className={`flex-1 py-2.5 mx-1.5 rounded-lg items-center bg-[#e3342f] ${loading ? 'opacity-50' : ''}`} onPress={handleConfirm} disabled={loading}>
              {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text className="text-white text-sm">Xóa</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationPopup;
