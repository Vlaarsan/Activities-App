import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Activity = ({ name, description, category, onDelete }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
  };
  return (
    <TouchableOpacity
      style={[styles.container, isPressed ? styles.containerPressed : null]}
      onLongPress={onDelete}
      onPress={handlePress}
    >
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 200,
    maxHeight: 200,
    backgroundColor: "black", 
    padding: 15,
    margin: 15,
    alignContent: "center",
    borderWidth: 2,
    borderColor: "skyblue",
  },
  text: {
    fontSize: 17, 
    marginBottom: 5,
    color: "white",
    textAlign: "center",
  },
  containerPressed: {
    flex: 1,
    backgroundColor: "skyblue",
    borderWidth: 2,
    borderColor: "black",
  },
});

export default Activity;
