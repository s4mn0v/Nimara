import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function WebView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Web View!</Text>
      <Text style={styles.subtitle}>This content is specific to web platforms.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
})