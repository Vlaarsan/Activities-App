import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function NewActivityForm({ onSave, onClose }) {
  const [activityName, setActivityName] = useState("");

  const handleSave = () => {
    // Vérifier si le nom de l'activité est saisi avant de sauvegarder
    if (activityName.trim() === "") {
      alert("Veuillez saisir le nom de l'activité.");
      return;
    }

    // Appeler la fonction onSave avec les données du formulaire
    onSave({
      name: activityName,
    });

    // Réinitialiser les champs du formulaire
    setActivityName("");

    // Fermer la modal
    onClose();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nom de l'activité"
        value={activityName}
        onChangeText={setActivityName}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text>Enregistrer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={styles.button}>
        <Text>Annuler</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    position: "relative",
    top: "25%",
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
  },
});
