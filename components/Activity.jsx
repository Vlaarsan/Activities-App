import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Activity = ({ name, category, onDelete }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [doneText, setDoneText] = useState("");

  const handlePress = () => {
    const currentDate = format(new Date(), "PP", { locale: fr });
    setDoneText(`Réalisé le ${currentDate}`);
    setIsPressed(!isPressed);
  };
  return (
    <TouchableOpacity
      style={[styles.container, isPressed ? styles.containerPressed : null]}
      onLongPress={onDelete}
      onPress={handlePress}
    >
      <Text style={styles.text}>{name}</Text>
      {isPressed && (
        <Text style={styles.doneText}>{doneText}</Text>
      )}
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
    fontWeight: "bold",
    fontSize: 17, 
    marginBottom: 5,
    color: "white",
    textAlign: "center",
  },
  doneText: {
    fontStyle: "italic",
    fontSize: 14, 
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
