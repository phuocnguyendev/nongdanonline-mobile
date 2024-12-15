import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { format } from 'date-fns'
import React, { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'

const HealthTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const getCurrentData = () => {
    const begin = (currentPage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    return data.slice(begin, end)
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons
          name="clipboard-text-clock"
          size={80}
          color="#CBD5E1"
        />
        <Text style={styles.emptyText}>Không có dữ liệu chăm sóc</Text>
        <Text style={styles.emptySubText}>
          Hãy thêm dữ liệu chăm sóc để theo dõi
        </Text>
      </View>
    )
  }

  const renderTableHeader = () => (
    <View style={styles.rowHeader}>
      <View style={[styles.headerCell, { flex: 1 }]}>
        <Text style={styles.headerCellText}>Ngày</Text>
      </View>
      <View style={[styles.headerCell, { flex: 0.8 }]}>
        <Ionicons name="fitness" size={18} color="#007BFF" />
        <Text style={styles.headerCellText}>KG</Text>
      </View>
      <View style={[styles.headerCell, { flex: 1 }]}>
        <Ionicons name="fast-food" size={18} color="#28A745" />
        <Text style={styles.headerCellText}>G/Ngày</Text>
      </View>
      <View style={[styles.headerCell, { flex: 2 }]}>
        <Ionicons name="medkit" size={18} color="#DC3545" />
        <Text style={styles.headerCellText}>Thuốc/Vaccine</Text>
      </View>
    </View>
  )

  const renderTableRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 1 }]}>
        {format(new Date(item.date), 'dd/MM')}
      </Text>
      <Text style={[styles.cell, { flex: 0.8 }]}>
        {(item.weight / 1000).toFixed(1)}
      </Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.feedIntake || '-'}</Text>
      <Text style={[styles.cell, styles.vaccineCell, { flex: 2 }]}>
        {item.vaccines && item.vaccines.length > 0
          ? item.vaccines
              .map(
                (vaccine) =>
                  `${vaccine.vaccineName || '-'}: ${vaccine.vaccineDescription || '-'}`,
              )
              .join('\n')
          : '-'}
      </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="clipboard-list"
          size={24}
          color="#1E293B"
        />
        <Text style={styles.header}>Lịch sử chăm sóc</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          {renderTableHeader()}
          <FlatList
            data={getCurrentData()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTableRow}
            scrollEnabled={false}
            contentContainerStyle={styles.tableBody}
          />
        </View>
      </ScrollView>

      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={[
            styles.pageButton,
            currentPage === 1 && styles.disabledButton,
          ]}
        >
          <Text
            style={[
              styles.pageButtonText,
              currentPage === 1 && styles.disabledButtonText,
            ]}
          >
            Trước
          </Text>
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
          <Text
            style={[
              styles.pageButtonText,
              currentPage === totalPages && styles.disabledButtonText,
            ]}
          >
            Sau
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    margin: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableContainer: {
    minWidth: '100%',
  },
  rowHeader: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    marginBottom: 12,
  },
  headerCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  headerCellText: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },
  tableBody: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
    minHeight: 60,
  },
  cell: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 8,
    lineHeight: 20,
  },
  vaccineCell: {
    textAlign: 'left',
    lineHeight: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  pageButton: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  disabledButton: {
    backgroundColor: '#F1F5F9',
  },
  pageButtonText: {
    color: '#4F46E5',
    fontWeight: '600',
    fontSize: 14,
  },
  disabledButtonText: {
    color: '#94A3B8',
  },
  pageIndicator: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
  },
  emptyContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    margin: 10,
    alignItems: 'center',
    minHeight: 180,
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
})

export default HealthTable
