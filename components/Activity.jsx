import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Activity = ({ name, description, category, onDelete, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
  };
  return (
    <TouchableOpacity
    style={[
      styles.container,
      isPressed ? styles.containerDone : null,
    ]}
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
    maxWidth: 200, // Ajustez la largeur selon vos besoins
    maxHeight: 200, // Ajustez la hauteur selon vos besoins
    backgroundColor: "black", // Couleur de fond du bloc
    padding: 15, // Espace intérieur du bloc
    borderRadius: 15, // Bordure arrondie du bloc
    margin: 15, // Marge autour du bloc
    alignContent: "center",
    borderWidth: 2,
    borderColor: "skyblue"
  },
  text: {
    fontSize: 17, // Taille de la police du texte
    marginBottom: 5, // Marge en bas de chaque texte
    color: "white",
    textAlign: "center",
  },
  containerDone: {
    flex: 1,
    backgroundColor: "skyblue", // Couleur de fond du bloc
    borderWidth: 2,
    borderColor: "black"
  },
});

export default Activity;
