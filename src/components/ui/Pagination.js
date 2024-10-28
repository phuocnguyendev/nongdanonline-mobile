import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Pagination({ currentPage, totalPages, onPreviousPage, onNextPage }) {
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={styles.paginationButton}
        onPress={onPreviousPage}
        disabled={currentPage === 1}
      >
        <Text style={styles.paginationText}>Trang trước</Text>
      </TouchableOpacity>

      <Text style={styles.paginationInfo}>
        Trang {currentPage} trong {totalPages}
      </Text>

      <TouchableOpacity
        style={styles.paginationButton}
        onPress={onNextPage}
        disabled={currentPage === totalPages}
      >
        <Text style={styles.paginationText}>Trang sau</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    position: "absolute", // Fix position
    bottom: 0, // Stick to the bottom
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff", // Make sure pagination stays visible
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "center",
  },
  paginationButton: {
    padding: 10,
    backgroundColor: "#d0d0d0",
    borderRadius: 5,
  },
  paginationText: {
    fontSize: 16,
  },
  paginationInfo: {
    fontSize: 16,
  },
});
