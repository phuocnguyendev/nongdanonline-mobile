import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Layout({ children }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LanguageSwitchButton />
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
})
