import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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
  )
}

export default Pagination

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#d0d0d0',
    borderRadius: 5,
  },
  paginationText: {
    fontSize: 16,
  },
  paginationInfo: {
    fontSize: 16,
  },
})
