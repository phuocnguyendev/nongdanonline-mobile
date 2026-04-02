import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DropdownItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onPress: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ title, content, isOpen, onPress }) => (
  <View>
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ width: '100%' }}>
      <View className="p-5 bg-white rounded-md mb-2.5 flex-row justify-between items-center">
        <Text className="text-base font-bold">{title}</Text>
        <Ionicons size={22} name={isOpen ? 'chevron-up' : 'chevron-down'} />
      </View>
    </TouchableOpacity>
    {isOpen && <Text className="bg-white p-4 rounded-md shadow-sm mb-2.5 text-base leading-6">{content}</Text>}
  </View>
);

export function About(): React.ReactElement {
  const [selectedDropdown, setSelectedDropdown] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const toggleDropdown = (key: number): void => {
    setSelectedDropdown(selectedDropdown === key ? null : key);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 items-center py-10">
        <Text className="text-[30px] text-center font-bold text-[#347928] px-10">
          NUÔI GÀ SẠCH, VUI CÙNG NÔNG DÂN, HẠNH PHÚC CÙNG GIA ĐÌNH
        </Text>
        <Text className="text-2xl text-center my-2.5 font-bold text-primary px-10">
          Chào mừng bạn đến với cửa hàng của chúng tôi
        </Text>
        <View className="p-8">
          <Text className="text-base text-center leading-7 mt-2.5">
            Chúng tôi tự hào là một trong những đơn vị tiên phong trong việc cung cấp gà sạch, an toàn và chất lượng nhất đến tay người tiêu dùng.
          </Text>
          {loading && <ActivityIndicator size="large" color="#00a86b" className="w-full h-[180px] justify-center items-center" />}
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nongdanonline-458d0.appspot.com/o/LandingPage%2Fcropped-2028-scaled-1.jpg?alt=media&token=7729fcc1-e502-4d7f-89c5-8518d21ae342' }}
            className="w-full h-[180px] my-5 rounded-[15px]"
            resizeMode="cover"
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />

          <View className="my-12 items-center">
            <Text className="text-2xl text-center my-2.5 font-bold">Tại sao chọn chúng tôi</Text>
            <Text className="text-base text-center leading-7 mt-2.5">
              <Text className="font-bold">Chọn Nuôi Gà Sạch</Text> là lựa chọn thông minh cho sức khỏe và sự an toàn của gia đình bạn. Chúng tôi cam kết cung cấp sản phẩm gà sạch, được nuôi dưỡng theo phương pháp tự nhiên.
            </Text>
          </View>

          <View className="my-12 items-center">
            <Image
              source={{ uri: 'https://nongdanonline.vn/wp-content/uploads/2024/08/Gioi-thieu-du-an-Bao.png' }}
              className="w-full h-[200px]"
              resizeMode="contain"
            />
            <View className="border-2 border-orange-600 rounded-md shadow bg-white mt-8 w-[70%] p-2.5">
              <Text className="text-2xl text-center my-2.5 font-bold text-orange-600">Nông Dân Thời 4.0</Text>
            </View>
            <View className="flex-row justify-between items-center my-5">
              <View className="items-center mx-2.5">
                <Text className="text-2xl mb-1.5">❤️</Text>
                <Text className="font-bold text-center text-base">An toàn{'\n'}sức khỏe</Text>
              </View>
              <View className="items-center mx-2.5">
                <Text className="text-2xl mb-1.5">📄</Text>
                <Text className="font-bold text-center text-base">Hương vị{'\n'}tuyệt hảo</Text>
              </View>
              <View className="items-center mx-2.5">
                <Text className="text-2xl mb-1.5">🎯</Text>
                <Text className="font-bold text-center text-base">Hỗ trợ{'\n'}nông dân</Text>
              </View>
            </View>
            <Text className="text-base text-center leading-7 mt-2.5">
              "Nông Dân Online" ra đời với mong muốn mang đến cho người tiêu dùng những sản phẩm nông nghiệp sạch, an toàn.
            </Text>
          </View>

          <View className="my-12 items-center">
            <Text className="text-2xl text-center my-2.5 font-bold">
              Kỹ Thuật <Text className="text-primary">Chăn Nuôi Gà</Text>
            </Text>
            <Text className="text-base text-center leading-7 mt-2.5">
              Kỹ thuật chăn nuôi không chỉ là một quy trình mà còn là nghệ thuật.
            </Text>
          </View>

          <DropdownItem title="Cho ăn" content="Trong giai đoạn úm (1-14 ngày tuổi), nên cho gà ăn uống tự do." isOpen={selectedDropdown === 1} onPress={() => toggleDropdown(1)} />
          <DropdownItem title="Uống nước" content="Lắp đặt máng uống tự động để giảm công lao động." isOpen={selectedDropdown === 2} onPress={() => toggleDropdown(2)} />
          <DropdownItem title="Thuốc thú y và thuốc bổ" content="Cho uống thuốc vào buổi sáng hoặc tối." isOpen={selectedDropdown === 3} onPress={() => toggleDropdown(3)} />
          <DropdownItem title="Vaccine" content="Đây như một loại 'bảo hiểm' cho đàn gà." isOpen={selectedDropdown === 4} onPress={() => toggleDropdown(4)} />
          <DropdownItem title="Cắt mỏ gà" content="Cần thực hiện đúng kỹ thuật." isOpen={selectedDropdown === 5} onPress={() => toggleDropdown(5)} />
          <DropdownItem title="Xổ giun" content="Xổ giun định kỳ: 45-50 ngày tuổi cho lần đầu." isOpen={selectedDropdown === 6} onPress={() => toggleDropdown(6)} />

          <View className="my-12 items-center">
            <Text className="text-2xl text-center my-2.5 font-bold">Hãy gặp Team Chúng tôi</Text>
            {['John Doe', 'Jane Smith', 'David Nguyen'].map((name, i) => (
              <View key={i} className="my-5 items-center">
                <Image source={require('../../assets/profile.png')} className="w-[150px] h-[150px] rounded-full" />
                <Text className="font-bold text-xl mt-1.5">{name}</Text>
                <Text className="text-base">{i === 0 ? 'CEO & Người sáng lập' : i === 1 ? 'Giám đốc tiếp thị' : 'Quản lý hoạt động'}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="border-t-2 border-primary pt-5 px-2.5">
          <View className="mb-2.5">
            <Text className="text-base text-primary mb-2.5 font-bold">Điều khoản</Text>
            <Text className="text-base leading-8">Điều khoản sử dụng</Text>
            <Text className="text-base leading-8">Chính sách bảo mật thông tin</Text>
            <Text className="text-base leading-8">Hướng dẫn xuất hoá đơn GTGT</Text>
          </View>
          <View>
            <Text className="text-base text-primary mb-2.5 font-bold">Liên hệ chúng tôi</Text>
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={24} color="#e74c3c" style={{ marginRight: 5 }} />
              <Text className="text-base leading-8">CH52+69 Gò Công Tây, Tiền Giang</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="call-outline" size={24} color="#e74c3c" style={{ marginRight: 5 }} />
              <Text className="text-base leading-8">Hotline: 03922723536</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
