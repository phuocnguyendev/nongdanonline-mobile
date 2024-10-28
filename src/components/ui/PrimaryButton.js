import { View, Text, StyleSheet, Pressable } from "react-native";
function PrimaryButton({ children, onPress }) {

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: "#729c69" }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: "white",
    borderRadius: 14,
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#00a86b",
    backgroundColor: "#00a86b",
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
