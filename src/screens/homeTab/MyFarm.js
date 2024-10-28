import { FlatList } from "react-native";
import MyFarmItem from "../../components/app/MyFarmItem";
import { MYFARMS } from "../../data/data-myFarm";
import { EmptyPage } from "../emptyView";

export function MyFarm({ navigation }) {
  function pressHandler(title) {
    navigation.navigate("My Farm Edit", { title });
  }

  const farms = MYFARMS;

  if (farms.length === 0) {
    return <EmptyPage />;
  }

  function renderMyFarmItem(itemData) {
    return (
      <MyFarmItem
        image={itemData.item.farmImages[0].imagesUrl}
        title={itemData.item.farmName}
        farmCode={itemData.item.farmID}
        area={itemData.item.farmArea}
        mapLink={itemData.item.mapLink}
        quantityBlock={itemData.item.quantityBlock}
        onPress={pressHandler}
      />
    );
  }

  return (
    <>
      <FlatList
        data={MYFARMS}
        renderItem={renderMyFarmItem}
        keyExtractor={(item) => item.farmID}
      />
    </>
  );
}
