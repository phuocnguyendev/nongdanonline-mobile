import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginNavigation from "./loginNavigation";
import DrawerNavigation from "./drawerNavigation";
import ShoppingCart from "../components/app/cusFarm/ShoppingCart";
import { CartProvider } from "../reducers/CartContext";

const Stack = createStackNavigator();

export function Navigator() {
  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
          <Stack.Screen
            name="Login Navigation"
            component={LoginNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main Screen"
            component={DrawerNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ShoppingCart"
            component={ShoppingCart}
            options={{
              title: "Giỏ hàng",
              headerStyle: {
                backgroundColor: "#00a86b",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
}
