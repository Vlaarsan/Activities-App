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
    width: 170,
    height: 100,
    backgroundColor: "black",
    padding: 25,
    margin: 15,
    borderWidth: 4,
    borderColor: "skyblue",
    alignSelf: "center",
    borderStyle: "dotted",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
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
    fontSize: 12, 
    marginBottom: 5,
    color: "white",
    textAlign: "center",
  },
  containerPressed: {
    flex: 1,
    backgroundColor: "skyblue",
    borderWidth: 2,
    borderColor: "black",
    borderStyle:"solid"
  },
});

export default Activity;
