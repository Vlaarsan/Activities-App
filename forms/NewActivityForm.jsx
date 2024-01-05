import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import categories from "../others/CategoryList";

export default function NewActivityForm({ onSave, onClose }) {
  const [activityName, setActivityName] = useState("");
  const [activityCategory, setActivityCategory] = useState(categories[0]); // Initialiser avec la première catégorie

  const handleSave = () => {
    if (activityName.trim() === "") {
      alert("Veuillez saisir le nom de l'activité.");
      return;
    }

    onSave({
      name: activityName,
      category: activityCategory,
    });

    setActivityName("");
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
      <Picker
        selectedValue={activityCategory}
        onValueChange={(itemValue) => setActivityCategory(itemValue)}
        style={styles.picker}
      >
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>
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
  picker: {
    height: 40,
    width: "100%",
    borderColor: "#555",  
    borderWidth: 2,      
    borderRadius: 8,     
    color: "#333",      
    marginBottom: 10,
    backgroundColor: "#fff",  // Couleur de fond
  },
  

  
});
