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
    fontSize: 30,
    color: "#403b3b",
    fontWeight: 'bold',
    paddingVertical: 12,
    textAlign: 'center',
  },
})
