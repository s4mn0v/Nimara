import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import Svg from 'react-native-svg'

interface SVGBackgroundProps {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  viewBox?: string;
}

export default function SVGBackground({ children, width = '100%', height = '100%', viewBox = '0 0 100 100' }: SVGBackgroundProps) {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox={viewBox} preserveAspectRatio="xMidYMid slice">
        {children}
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})