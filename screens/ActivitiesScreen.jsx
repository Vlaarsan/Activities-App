import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ActivitiesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ActivitiesScreen</Text>
    </View>
  );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgreen",
  },
});
