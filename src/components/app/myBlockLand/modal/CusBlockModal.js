import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import CarePackageTab from "./CarePackageTab";
import ActionTab from "./ActionTab";
import InfoTab from "./Infotab";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const modalWidth = width - 50;

function CusBlockModal({ farm, visible, onClose, navigation }) {
  const [activeTab, setActiveTab] = useState("info");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (!visible) {
      setActiveTab("info");
    }
  }, [visible]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!farm) return null;

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  const tabs = ["info", "carePackage", "action"];

  const handleGestureEvent = (event) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      const currentIndex = tabs.indexOf(activeTab);

      if (translationX < -50 && currentIndex < tabs.length - 1) {
        // Lướt sang trái
        const newIndex = currentIndex + 1;
        setActiveTab(tabs[newIndex]);
        scrollViewRef.current.scrollTo({ x: newIndex * width, animated: true });
      } else if (translationX > 50 && currentIndex > 0) {
        // Lướt sang phải
        const newIndex = currentIndex - 1;
        setActiveTab(tabs[newIndex]);
        scrollViewRef.current.scrollTo({ x: newIndex * width, animated: true });
      }
    }
  };

  const handleTabPress = (tab) => {
    const newIndex = tabs.indexOf(tab);
    setActiveTab(tab);
    scrollViewRef.current.scrollTo({
      x: newIndex * modalWidth,
      animated: true,
    });
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setActiveTab(tabs[newIndex]);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <LinearGradient
              colors={["#ffe24d", "#cc8900"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.titleContainer}
            >
              <Text style={styles.title}>Chip Chip</Text>
              <Text style={styles.subTitle}>Gà con</Text>
            </LinearGradient>
            <Image
              source={require("../../../../assets/images/chicken.png")}
              style={styles.farmImage}
            />
            <View style={styles.tabContainer}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tabRow, activeTab === tab && styles.activeTab]}
                  onPress={() => handleTabPress(tab)}
                >
                  <Ionicons
                    name={
                      tab === "info"
                        ? "information-circle"
                        : tab === "carePackage"
                        ? "leaf"
                        : "heart"
                    }
                    size={20}
                    color={activeTab === tab ? "green" : "black"}
                    style={styles.iconHeader}
                  />
                  <Text
                    style={
                      activeTab === tab ? styles.activeTabText : styles.tabText
                    }
                  >
                    {tab === "info"
                      ? "Thông tin"
                      : tab === "carePackage"
                      ? "Gói chăm sóc"
                      : "Hành động"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <PanGestureHandler onHandlerStateChange={handleGestureEvent}>
              <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={handleScroll}
                onMomentumScrollEnd={handleScroll}
              >
                <View style={[styles.tabContent, { width: modalWidth }]}>
                  <InfoTab formatDate={formatDate} />
                </View>
                <View style={[styles.tabContent, { width: modalWidth }]}>
                  <CarePackageTab />
                </View>
                <View style={[styles.tabContent, { width: modalWidth }]}>
                  <ActionTab onClose={handleClose} />
                </View>
              </ScrollView>
            </PanGestureHandler>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default CusBlockModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: modalWidth,
    backgroundColor: "white",
    borderRadius: 9,
    alignItems: "center",
    position: "relative",
    maxHeight: "90%",
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    height: 75,
    justifyContent: "center",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
  subTitle: {
    fontSize: 14,
    color: "white",
    marginBottom: 5,
  },
  farmImage: {
    width: 250,
    height: 130,
    borderRadius: 9,
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },

  iconHeader: {
    marginRight: 5,
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "green",
  },
  tabText: {
    color: "black",
  },
  activeTabText: {
    color: "green",
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 10,
    zIndex: 1,
  },
  tabContent: {
    width: modalWidth,
    marginLeft: 10,
  },
});
