import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Modal, ActivityIndicator, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { Ionicons } from "@expo/vector-icons";

export function CameraModal({ visible, onClose }) {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const videoHeight = (Dimensions.get('window').width * 9) / 16;

  const handleFullscreenUpdate = (status) => {
    const update = status.fullscreenUpdate;
    if (update === 0 || update === 1) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else if (update === 2 || update === 3) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        {loading && (
          <ActivityIndicator size="large" color="#4d6bff" style={styles.loadingIndicator} />
        )}
        <Video
          ref={videoRef}
          source={{
            uri: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", // Thử URL m3u8 khác
          }}
          style={[styles.video, { height: videoHeight }]}
          useNativeControls
          resizeMode="contain"
          shouldPlay
          onBuffer={() => console.log("Buffering...")}
          onError={(error) => console.log("Video Error:", error)}
          onLoad={() => setLoading(false)}
          onFullscreenUpdate={handleFullscreenUpdate}
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: "100%",
  },
  loadingIndicator: {
    position: "absolute",
    zIndex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 2,
  },
});
