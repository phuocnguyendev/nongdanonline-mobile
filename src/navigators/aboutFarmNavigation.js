import { createStackNavigator } from "@react-navigation/stack";
import { FarmInfo, ProductFarm } from "../screens/homeTab/farm";
import { CardStyleInterpolators } from "@react-navigation/stack"
import IconButton from "../components/ui/IconButton";

const Stack = createStackNavigator();

export default function AboutFarmNavigation({ route, navigation }) {
  const title = route.params?.title;
  const image = route.params?.image;
  const farmOwner = route.params?.farmOwner;
  const phone = route.params?.phone;
  const farmArea = route.params?.farmArea;
  const mapLink = route.params?.mapLink;

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Farm Info"
        component={FarmInfo}
        initialParams={{ title, image, farmOwner, phone, farmArea, mapLink }}
        options={{
          title: "Thông tin Trang trại",
          headerStyle: {
            backgroundColor: "#00a86b",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <IconButton
              icon="cart-outline"
              color="green"
              onPress={() => navigation.navigate("ShoppingCart")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Product Farm"
        component={ProductFarm}
        options={{
          title: "Sản phẩm & Dịch vụ",
          headerStyle: {
            backgroundColor: "#00a86b",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerLeft: null,
          headerRight: () => (
            <IconButton
              icon="cart-outline"
              color="green"
              onPress={() => navigation.navigate("ShoppingCart")}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
