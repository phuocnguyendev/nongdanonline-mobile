import { createStackNavigator } from "@react-navigation/stack";
import {
  InvoiceInfo, InvoiceDetail
} from "../screens/user/profile";

const Stack = createStackNavigator();

export default function InvoiceNavigation({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InvoiceInfo"
        component={InvoiceInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InvoiceDetail"
        component={InvoiceDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
