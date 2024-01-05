import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import * as Animatable from "react-native-animatable";

const Activity = ({ name, category, onDelete }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [doneText, setDoneText] = useState("");

  const handlePress = async () => {
    const currentDate = format(new Date(), "PP", { locale: fr });
    setDoneText(`Réalisé le ${currentDate}`);
    setIsPressed(!isPressed);

    try {
      await AsyncStorage.setItem(
        `activity_${name}_isPressed`,
        JSON.stringify(!isPressed)
      );
      await AsyncStorage.setItem(
        `activity_${name}_doneText`,
        JSON.stringify(doneText)
      );
    } catch (error) {
      console.error("Error saving to AsyncStorage:", error);
    }
  };

  useEffect(() => {
    const loadActivityState = async () => {
      try {
        const storedIsPressed = await AsyncStorage.getItem(
          `activity_${name}_isPressed`
        );
        if (storedIsPressed !== null) {
          setIsPressed(JSON.parse(storedIsPressed));
        }

        const storedDoneText = await AsyncStorage.getItem(
          `activity_${name}_doneText`
        );
        if (storedDoneText !== null) {
          setDoneText(JSON.parse(storedDoneText));
        }
      } catch (error) {
        console.error("Error loading from AsyncStorage:", error);
      }
    };

    loadActivityState();
  }, []);

  return (
    <TouchableOpacity
      style={[styles.container, isPressed ? styles.containerPressed : null]}
      onLongPress={onDelete}
      onPress={handlePress}
    >
      <Animatable.Text
        animation={isPressed ? "bounceIn" : null}
        style={styles.text}
      >
        {name}
      </Animatable.Text>
      {isPressed && (
        <Animatable.Text
          animation="zoomIn"
          duration={1500}
          style={styles.doneText}
        >
          {doneText}
        </Animatable.Text>
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
    borderWidth: 2,
    borderColor: "blue",
    alignSelf: "center",
    borderStyle: "dashed",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  containerPressed: {
    flex: 1,
    backgroundColor: "skyblue",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
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
});

export default Activity;
