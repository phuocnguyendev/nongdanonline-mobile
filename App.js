import { Navigator } from "./src/navigators";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Navigator />
    </>
  );
}
