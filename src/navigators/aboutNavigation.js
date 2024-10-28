import { createStackNavigator } from "@react-navigation/stack";
import { About } from "../screens/about";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/ui/IconButton";

const Stack = createStackNavigator();

export default function ContactNavigation({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: "Về chúng tôi",
        headerStyle: {
          backgroundColor: "#00a86b",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        // Define headerLeft globally for all screens
        headerLeft: () => (
          <Ionicons
            name="menu" // Hamburger icon
            size={24}
            color="#fff"
            style={{ marginLeft: 15 }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
        headerRight: () => (
          <IconButton
            icon="cart-outline"
            color="green"
            onPress={() => navigation.navigate("ShoppingCart")}
          />
        ),
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="AboutUs"
        component={About}
      />
    </Stack.Navigator>
  );
}
