import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the About View!</Text>
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