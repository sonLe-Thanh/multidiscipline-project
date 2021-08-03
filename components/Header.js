import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Header(props) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 10,
    fontSize: 32,
    // color: theme.colors.primary,
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 16,
    fontWeight: 'bold',
    paddingVertical: 12,
    textAlign: 'center',
  },
})
