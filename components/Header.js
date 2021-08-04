import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Header(props) {
    return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
    header: {
        // color: theme.colors.primary,
        color: "white",
        fontSize: 32,
        fontWeight: 'bold',
        paddingVertical: 12,
        textAlign: 'center',
        textShadowColor: "black",
        textShadowRadius: 16,
        // 100 will produce overlapping elements
        top: 10,
        position: 'absolute',
    },
})
