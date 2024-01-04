import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Activity = ({ name, description, category, onDelete}) => {
  return (
    <TouchableOpacity style={styles.container} onLongPress={onDelete}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 150, // Ajustez la largeur selon vos besoins
    maxHeight: 150, // Ajustez la hauteur selon vos besoins
    backgroundColor: 'black', // Couleur de fond du bloc
    padding: 15, // Espace intérieur du bloc
    borderRadius: 15, // Bordure arrondie du bloc
    margin: 15, // Marge autour du bloc
    alignContent: "center"
  },
  text: {
    fontSize: 17, // Taille de la police du texte
    marginBottom: 5, // Marge en bas de chaque texte
    color: "white",
    textAlign: "center",
  },
});

export default Activity;
