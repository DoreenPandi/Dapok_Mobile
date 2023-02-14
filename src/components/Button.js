import React from 'react'
import { Button as PaperButton } from 'react-native-paper'
import { StyleSheet } from 'react-native'

export default function Button({ mode, style, ...props }) {
    return (
        <PaperButton
            style={[
                styles.button,
                mode === 'outlined',
                style,
            ]}
            labelStyle={styles.text}
            mode={mode}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 2,
    },
    text: {
        fontWeight: 'normal',
        fontSize: 15,
        lineHeight: 26,
    },
})