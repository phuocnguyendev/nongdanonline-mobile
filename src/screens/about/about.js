import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export function About({ navigation }) {
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleDropdown = (key) => {
    if (selectedDropdown === key) {
      setSelectedDropdown(null);
    } else {
      setSelectedDropdown(key);
    }
  };

  const DropdownItem = ({ title, content, isOpen, onPress }) => (
    <View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{ width: "100%" }}
      >
        <View style={styles.dropdownHeader}>
          <Text style={styles.dropdownTitle}>{title}</Text>
          <Ionicons size={22} name={isOpen ? "chevron-up" : "chevron-down"} />
        </View>
      </TouchableOpacity>
      {isOpen && <Text style={styles.dropdownContent}>{content}</Text>}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>
          NUÔI GÀ SẠCH, VUI CÙNG NÔNG DÂN, HẠNH PHÚC CÙNG GIA ĐÌNH
        </Text>
        <Text
          style={[
            styles.secondaryTitle,
            { color: "#00a86b", paddingHorizontal: 40 },
          ]}
        >
          Chào mừng bạn đến với cửa hàng của chúng tôi
        </Text>
        <View style={styles.mainContent}>
          <Text style={styles.text}>
            Chúng tôi tự hào là một trong những đơn vị tiên phong trong việc
            cung cấp gà sạch, an toàn và chất lượng nhất đến tay người tiêu
            dùng. Với tâm huyết mang lại sản phẩm tốt nhất cho gia đình bạn,
            chúng tôi cam kết nuôi dưỡng gà theo phương pháp tự nhiên, không sử
            dụng hóa chất độc hại.
          </Text>
          {loading && (
            <ActivityIndicator
              size="large"
              color="#00a86b"
              style={[
                styles.imageHeader,
                { justifyContent: "center", alignItems: "center" },
              ]}
            />
          )}
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/nongdanonline-458d0.appspot.com/o/LandingPage%2Fcropped-2028-scaled-1.jpg?alt=media&token=7729fcc1-e502-4d7f-89c5-8518d21ae342",
            }}
            style={styles.imageHeader}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />

          <View style={styles.viewContainer}>
            <Text style={styles.secondaryTitle}>Tại sao chọn chúng tôi</Text>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#00a86b"
                style={{ justifyContent: "center", alignItems: "center" }}
              />
            )}
            <Image
              source={{
                uri: "https://nongdanonline.vn/wp-content/uploads/2024/08/icon-hand.png",
              }}
              style={[styles.iconPointer, { transform: [{ rotate: "90deg" }] }]}
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Chọn Nuôi Gà Sạch</Text> là
              lựa chọn thông minh cho sức khỏe và sự an toàn của gia đình bạn.
              Chúng tôi cam kết cung cấp sản phẩm gà sạch, được nuôi dưỡng theo
              phương pháp tự nhiên và không sử dụng hóa chất độc hại, đảm bảo
              hương vị tươi ngon và dinh dưỡng tối ưu.
              {"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Bên cạnh đó</Text>, chúng tôi
              áp dụng quy trình kiểm soát chất lượng nghiêm ngặt, từ khâu nuôi
              trồng đến khi sản phẩm đến tay người tiêu dùng. Hơn nữa, khi lựa
              chọn sản phẩm của chúng tôi, bạn không chỉ bảo vệ sức khỏe cho gia
              đình mà còn hỗ trợ nông dân địa phương, góp phần xây dựng nền nông
              nghiệp bền vững và phát triển kinh tế cộng đồng. Hãy trải nghiệm
              sự khác biệt với gà sạch, vì sức khỏe của bạn luôn là sự ưu tiên
              hàng đầu đối với chúng tôi! Hãy để chúng tôi đồng hành cùng bạn
              trong hành trình chăm sóc sức khỏe và mang lại những bữa ăn ngon,
              bổ, rẻ!
            </Text>
          </View>
          <View style={styles.viewContainer}>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#00a86b"
                style={[
                  styles.imageAboutUs,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              />
            )}
            <Image
              source={{
                uri: "https://nongdanonline.vn/wp-content/uploads/2024/08/Gioi-thieu-du-an-Bao.png",
              }}
              style={styles.imageAboutUs}
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
            <View style={styles.box}>
              <Text style={[styles.secondaryTitle, { color: "#ea580c" }]}>
                Nông Dân Thời 4.0
              </Text>
            </View>
            <View style={styles.aboutUsContainer}>
              <View style={styles.iconView}>
                <Text style={styles.icon}>❤️</Text>
                <Text style={styles.iconContent}>An toàn{"\n"}sức khỏe</Text>
              </View>

              <View style={styles.iconView}>
                <Text style={styles.icon}>📄</Text>
                <Text style={styles.iconContent}>Hương vị{"\n"}tuyệt hảo</Text>
              </View>

              <View style={styles.iconView}>
                <Text style={styles.icon}>🎯</Text>
                <Text style={styles.iconContent}>Hỗ trợ{"\n"}nông dân</Text>
              </View>
            </View>
            <Text style={styles.text}>
              “Nông Dân Online” ra đời với mong muốn mang đến cho người tiêu
              dùng những sản phẩm nông nghiệp sạch, an toàn, đồng thời hỗ trợ
              nông dân phát triển bền vững trong bối cảnh nông nghiệp hiện đại.
            </Text>
          </View>

          <View style={styles.viewContainer}>
            <Text style={styles.secondaryTitle}>
              Kỹ Thuật <Text style={{ color: "#00a86b" }}>Chăn Nuôi Gà</Text>
            </Text>
            <Text style={styles.text}>
              Kỹ thuật chăn nuôi không chỉ là một quy trình mà còn là nghệ
              thuật, mỗi người có thể áp dụng những phương pháp khác nhau tùy
              thuộc vào điều kiện cụ thể của từng trang trại. Ví dụ, mình nuôi
              gà tre và dưới đây là một số lưu ý và kỹ thuật mà mình muốn chia
              sẻ với các bạn.
            </Text>
          </View>
          <View>
            <DropdownItem
              title="Cho ăn"
              content="Trong giai đoạn úm (1-14 ngày tuổi), nên cho gà ăn uống tự do để đảm bảo sự phát triển tối đa. Sau này, chuyển sang cho gà ăn từ máng lớn, chia cử ra ăn vào các buổi sáng và chiều, với khẩu phần khuyến khích 60:40."
              isOpen={selectedDropdown === 1}
              onPress={() => toggleDropdown(1)}
            />
            <DropdownItem
              title="Uống nước"
              content="Lắp đặt máng uống tự động để giảm công lao động và đảm bảo nguồn nước sạch. Định kỳ vệ sinh máng uống hàng ngày để giảm áp lực bệnh."
              isOpen={selectedDropdown === 2}
              onPress={() => toggleDropdown(2)}
            />
            <DropdownItem
              title="Thuốc thú y và thuốc bổ"
              content="Cho uống thuốc vào buổi sáng hoặc tối. Trưa chỉ uống cân bằng điện giải để giảm stress. Nhưng cũng đừng lạm dụng thuốc quá nhiều."
              isOpen={selectedDropdown === 3}
              onPress={() => toggleDropdown(3)}
            />
            <DropdownItem
              title="Vaccine"
              content="Đây như một loại “bảo hiểm” cho đàn gà của bạn, đừng bỏ qua bất kỳ loại vaccine nào trong lịch trình tiêm phòng để bảo vệ sức khỏe và nâng cao hiệu quả chăn nuôi."
              isOpen={selectedDropdown === 4}
              onPress={() => toggleDropdown(4)}
            />
            <DropdownItem
              title="Cắt mỏ gà"
              content="Cần thực hiện đúng kỹ thuật để hạn chế tình trạng cắn mổ và đảm bảo mẫu mã sản phẩm cuối cùng. Quan sát tỉ lệ cắn mổ."
              isOpen={selectedDropdown === 5}
              onPress={() => toggleDropdown(5)}
            />
            <DropdownItem
              title="Xổ giun"
              content="Xổ giun định kỳ: 45-50 ngày tuổi cho lần đầu, 80-85 ngày tuổi ở giai đoạn xuất bán."
              isOpen={selectedDropdown === 6}
              onPress={() => toggleDropdown(6)}
            />
          </View>

          <View style={styles.viewContainer}>
            <Text style={styles.secondaryTitle}>Hãy gặp Team Chúng tôi</Text>
            <View style={styles.profileContainer}>
              <Image
                source={require("../../assets/profile.png")}
                style={styles.profileImage}
              />
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.role}>CEO & Người sáng lập</Text>
            </View>

            <View style={styles.profileContainer}>
              <Image
                source={require("../../assets/profile.png")}
                style={styles.profileImage}
              />
              <Text style={styles.name}>Jane Smith</Text>
              <Text style={styles.role}>Giám đốc tiếp thị</Text>
            </View>

            <View style={styles.profileContainer}>
              <Image
                source={require("../../assets/profile.png")}
                style={styles.profileImage}
              />
              <Text style={styles.name}>David Nguyen</Text>
              <Text style={styles.role}>Quản lý hoạt động</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.detailTitle}>Điều khoản</Text>
            <View>
              <Text style={styles.detailText}>Điều khoản sử dụng</Text>
              <Text style={styles.detailText}>
                Chính sách bảo mật thông tin
              </Text>
              <Text style={styles.detailText}>Hướng dẫn xuất hoá đơn GTGT</Text>
            </View>
          </View>

          <View>
            <Text style={styles.detailTitle}>Liên hệ chúng tôi</Text>
            <View>
              <View style={styles.iconText}>
                <Ionicons
                  name="location-outline"
                  size={24}
                  color={"#e74c3c"}
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.detailText}>
                  CH52+69 Gò Công Tây, Tiền Giang, Việt Nam
                </Text>
              </View>
              <View style={styles.iconText}>
                <Ionicons
                  name="call-outline"
                  size={24}
                  color={"#e74c3c"}
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.detailText}>Hotline: 03922723536</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignContent: "center",
    textAlign: "center",
    paddingVertical: 40,
  },
  mainContent: {
    padding: 30,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#347928",
    paddingHorizontal: 40,
  },
  secondaryTitle: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "700",
  },
  viewContainer: {
    marginVertical: 50,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 28,
    marginTop: 10,
  },
  imageHeader: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    marginVertical: 20,
    borderRadius: 15,
  },
  iconPointer: {
    width: 150,
    height: 150,
    marginVertical: 10,
    alignSelf: "center",
  },
  imageAboutUs: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  box: {
    borderColor: "#ea580c",
    borderWidth: 2,
    borderRadius: 5,
    elevation: 4,
    backgroundColor: "#fff",
    marginTop: 30,
    width: "70%",
    padding: 10,
  },
  icon: {
    fontSize: 24,
    marginBottom: 5,
  },
  aboutUsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  iconView: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  iconContent: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  dropdownHeader: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownContent: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    elevation: 3,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
  },

  profileContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 5,
  },
  role: {
    fontSize: 16,
  },
  footer: {
    borderTopWidth: 2,
    borderColor: "#00a86b",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  detailTitle: {
    fontSize: 16,
    color: "#00a86b",
    marginBottom: 10,
    fontWeight: "bold",
  },
  detailText: {
    fontSize: 16,
    lineHeight: 30,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },
});
