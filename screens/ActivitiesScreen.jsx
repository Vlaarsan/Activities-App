import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Activity from "../components/Activity";
import NewActivityForm from "../forms/NewActivityForm";
import { createActivity } from "../Fonctions/HandleActivities";
import { deleteActivity } from "../Fonctions/HandleActivities";

const ActivitiesScreen = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////
  //                                           @VARIABLES
  ///////////////////////////////////////////////////////////////////////////////////////////////
  const [activities, setActivities] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //                                           @USE EFFECT
  ///////////////////////////////////////////////////////////////////////////////////////////////

  // Charger les activités depuis le stockage lors du montage initial
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

    loadActivities();
  }, []);

  // Utiliser Async Storage pour sauvegarder le tableau d'activités à chaque changement
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

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //                                           @FONCTIONS
  ///////////////////////////////////////////////////////////////////////////////////////////////

  const handleCreateActivity = (formData) => {
    // Utilisez les données du formulaire pour créer une nouvelle activité
    const newActivity = createActivity(formData.name, formData.description);

    // Mettez à jour la liste des activités
    setActivities((prevActivities) => [...prevActivities, newActivity]);

    // Masquer la modal après la création de l'activité
    setModalVisible(false);
  };

  const handleDeleteActivity = (name) => {
    // Utiliser la fonction deleteActivity pour mettre à jour la liste d'activités
    const updatedActivities = deleteActivity(activities, name);
    setActivities(updatedActivities);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //                                           @AFFICHAGE
  ///////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: "lightgreen" }}
    >
      {activities.map((activity, index) => (
        <View key={index} style={styles.activityContainer}>
          <Activity
            name={activity.name}
            description={activity.description}
            onDelete={() => handleDeleteActivity(activity.name)}
          />
        </View>
      ))}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.addButton}>
          <Text>Ajouter une activité</Text>
        </View>
      </TouchableOpacity>

      {/* Modal pour le formulaire */}
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
  );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  activityContainer: {
    width: "48%",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
