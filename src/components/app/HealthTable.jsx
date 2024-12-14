import { Ionicons } from '@expo/vector-icons'
import { format } from 'date-fns'
import React, { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const HealthTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage)

  // Get data for the current page
  const getCurrentData = () => {
    const begin = (currentPage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    return data.slice(begin, end)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lịch sử chăm sóc</Text>

      {/* Column Headers */}
      <View style={styles.rowHeader}>
        <Text style={styles.headerCell}>Ngày</Text>
        <View style={styles.headerCellIcon}>
          <Ionicons name="fitness" size={16} color="#007BFF" />
          <Text style={styles.headerCellText}>Cân nặng (kg)</Text>
        </View>
        <View style={styles.headerCellIcon}>
          <Ionicons name="fast-food" size={16} color="#28A745" />
          <Text style={styles.headerCellText}>Thức ăn (gam/ngày)</Text>
        </View>
        <View style={styles.headerCellIcon}>
          <Ionicons name="medkit" size={16} color="#DC3545" />
          <Text style={styles.headerCellText}>Thuốc/Vaccine</Text>
        </View>
      </View>

      <FlatList
        data={getCurrentData()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>
              {format(new Date(item.date), 'dd/MM/yyyy')}
            </Text>
            <Text style={styles.cell}>
              {(item.weight / 1000).toFixed(2) || 'N/A'}
            </Text>
            <Text style={styles.cell}>{item.feedIntake || 'N/A'}</Text>
            <Text style={[styles.cell, styles.vaccineCell]}>
              {item.vaccines && item.vaccines.length > 0
                ? item.vaccines
                    .map(
                      (vaccine) =>
                        `${vaccine.vaccineName || 'N/A'} - ${vaccine.vaccineDescription || 'N/A'}`,
                    )
                    .join('\n')
                : 'N/A'}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.tableBody}
      />

      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={[
            styles.pageButton,
            currentPage === 1 && styles.disabledButton,
          ]}
        >
          <Text style={styles.pageButtonText}>Trước</Text>
        </TouchableOpacity>
        <Text style={styles.pageIndicator}>
          Trang {currentPage} / {totalPages}
        </Text>
        <TouchableOpacity
          onPress={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={[
            styles.pageButton,
            currentPage === totalPages && styles.disabledButton,
          ]}
        >
          <Text style={styles.pageButtonText}>Sau</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333333',
  },
  rowHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 14,
  },
  headerCellIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCellText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  tableBody: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#333333',
    paddingHorizontal: 4,
  },
  vaccineCell: {
    textAlign: 'left',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  pageButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  disabledButton: {
    backgroundColor: '#D6D8DB',
  },
  pageButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  pageIndicator: {
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold',
  },
})

export default HealthTable
