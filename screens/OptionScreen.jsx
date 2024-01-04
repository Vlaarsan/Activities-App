import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OptionScreen = () => {
  return (
    <View style={styles.container}>
      <Text>OptionScreen</Text>
    </View>
  )
}

export default OptionScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
      },
})