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
import { createActivity } from "../fonctions/HandleActivities";
import { deleteActivity } from "../fonctions/HandleActivities";

const ActivitiesScreen = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////
  //                                           @VARIABLES
  ///////////////////////////////////////////////////////////////////////////////////////////////
  const [activities, setActivities] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //                                           @USE EFFECT
  ///////////////////////////////////////////////////////////////////////////////////////////////

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
    const newActivity = createActivity(formData.name, formData.category);
    setActivities((prevActivities) => [...prevActivities, newActivity]);
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
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={styles.container}
        style={{ backgroundColor: "lightgreen" }}
      >
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityContainer}>
            <Activity
              name={activity.name}
              category={activity.category}
              onDelete={() => handleDeleteActivity(activity.name)}
            />
          </View>
        ))}

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
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.addButtonContainer}
      >
        <View style={styles.addButton}>
          <Text>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "lightgreen",
  },
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
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  addButton: {
    backgroundColor: "skyblue",
    padding: 15,
    borderRadius: 15,
  },
});
