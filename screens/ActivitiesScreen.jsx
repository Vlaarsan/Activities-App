import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import Activity from "../components/Activity";
import NewActivityForm from "../forms/NewActivityForm";
import {
  createActivity,
  deleteActivity,
  filterActivitiesByName,
} from "../fonctions/HandleActivities";
import categories from "../others/CategoryList";


const ActivitiesScreen = () => {
  const [activities, setActivities] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState(""); // Nouvel état pour le texte de recherche
  const [selectedCategory, setSelectedCategory] = useState("Toute");

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const storedActivities = await AsyncStorage.getItem("activities");
        if (storedActivities) {
          setActivities(JSON.parse(storedActivities));
        }
      } catch (error) {
        console.error("Error loading activities from AsyncStorage:", error);
      }
    };
    setSelectedCategory("Toutes");
    loadActivities();
  }, []);

  useEffect(() => {
    const saveActivities = async () => {
      try {
        await AsyncStorage.setItem("activities", JSON.stringify(activities));
      } catch (error) {
        console.error("Error saving activities to AsyncStorage:", error);
      }
    };

    saveActivities();
  }, [activities]);

  const handleCreateActivity = (formData) => {
    const newActivity = createActivity(formData.name, formData.category);
    setActivities((prevActivities) => [...prevActivities, newActivity]);
    setModalVisible(false);
  };

  const handleDeleteActivity = (name) => {
    const updatedActivities = deleteActivity(activities, name);
    setActivities(updatedActivities);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>MES ACTIVITÉS</Text>
      {/* Ajout de la barre de recherche */}
      <TextInput
        placeholder="Rechercher par nom..."
        style={styles.searchInput}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      {/* Ajout du sélecteur de catégorie */}
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
        dropdownIconColor={"skyblue"}
      >
        {/* Ajoutez les options du Picker en utilisant le tableau categories */}
        <Picker.Item label="Filtrer par catégorie..." value="Toutes" />
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>
      <ScrollView contentContainerStyle={styles.container}>
        {filterActivitiesByName(activities, searchText)
          .filter((activity) =>
            selectedCategory === "Toutes"
              ? true
              : activity.category === selectedCategory
          )
          .map((activity, index) => (
            <View key={index} style={styles.activityContainer}>
              <Activity
                name={activity.name}
                category={activity.category}
                onDelete={() => handleDeleteActivity(activity.name)}
              />
            </View>
          ))}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <NewActivityForm
            onSave={handleCreateActivity}
            onClose={() => setModalVisible(false)}
          />
        </Modal>
      </ScrollView>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.addButtonContainer}
      >
        <View style={styles.addButton}>
          <Text style={styles.textPlus}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#666",
  },
  title: {
    alignSelf: "center",
    width: "90%",
    textAlign: "center",
    marginTop: 70,
    fontSize: 28,
    backgroundColor: "skyblue",
    borderRadius: 25,
    borderWidth: 1,
    paddingVertical: 5,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  activityContainer: {
    width: "48%",
    marginBottom: 10,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  addButton: {
    backgroundColor: "skyblue",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 25,
  },
  textPlus: {
    textAlign: "center",
    fontSize: 28,
  },
  searchInput: {
    alignSelf: "center",
    width: "50%",
    backgroundColor: "#fff",
    padding: 2,
    marginTop: 30,
    borderRadius: 10,
    textAlign: "center",
  },
  picker: {
    width: 230,
    marginTop: 10,
    marginLeft: "25%",
    marginRight: "25%",
    height: 40,
  },
});

export default ActivitiesScreen;
