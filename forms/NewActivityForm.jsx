import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import categories from "../others/CategoryList";
import { LinearGradient } from "expo-linear-gradient";

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
    <LinearGradient colors={["#3498db", "#1abc9c"]} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}> Créer une nouvelle activité</Text>
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
            dropdownIconColor={"black"}
          >
            {categories.map((category, index) => (
              <Picker.Item
                key={index}
                label={category}
                value={category}
                style={styles.pickerItems}
              />
            ))}
          </Picker>
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text>Enregistrer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text>Annuler</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 120,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "skyblue",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 30,
    paddingHorizontal: 10,
    backgroundColor: "white",
    alignSelf: "center",
    textAlign: "center",
  },
  button: {
    backgroundColor: "skyblue",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  picker: {
    alignSelf: "center",
    width: 250,
    marginBottom: 50,
    backgroundColor: "skyblue",
  },
  pickerItems: {
    backgroundColor: "skyblue",
    borderWidth: 1,
    borderColor: "black",
  },
});
