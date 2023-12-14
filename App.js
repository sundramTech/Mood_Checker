import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import CustomToast from "./screens/CustomToast";
import image from "./assets/farmart.png";
import { Picker } from "native-base";
import SelectDropdown from "react-native-select-dropdown";

export default function App() {
  const [message, setMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [animationType, setAnimationType] = useState("fadeIn");
  const [toastMessage, setToastMessage] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const emoji1Ref = useRef(null);
  const emoji2Ref = useRef(null);
  const emoji3Ref = useRef(null);
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];

  useEffect(() => {
    setAnimationType("fadeIn");
    const intervalId = setInterval(() => {
      vibrateEmojis();
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const showMessage = async (emoji) => {
    if (!selectedDepartment) {
      setToastMessage("Please select your department");
      setTimeout(()=>{
        setToDefault()
      },2000)
      return;
    }

    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    try {
      const response = await axios.post(
        "https://sheet.best/api/sheets/c11f1220-d748-4bde-a7bb-9266d21bd0b8",
        {
          emoji_name: emoji,
          department: selectedDepartment,
          date: `${day}/${month}/${year}`,
          time: `${currentDate.toLocaleTimeString()}`,
        }
      );

      if (response.status === 200) {
        switch (emoji) {
          case "😊":
            setFeedbackMessage("Be Happy EveryDay Buddy");
            break;
          case "😐":
            setFeedbackMessage("Be Silent like a Spring");
            break;
          case "😢":
            setFeedbackMessage("Don't Be Sad Buddy, This Time Will Also Pass");
            break;
          default:
            setFeedbackMessage("");
        }
        setToastMessage("Thanks For Your Feedback");
        setTimeout(()=>{
          setToDefault()
        },2000)
      } else {
        setToastMessage("Error submitting feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      setToastMessage("Error submitting feedback");
      setTimeout(()=>{
        setToDefault()
      },2000)
    }


    function setToDefault(){
      setToastMessage("");
      setMessage("");
      setFeedbackMessage("");
    }
  };

  const vibrateEmojis = () => {
    emoji1Ref.current.swing(800);
    emoji2Ref.current.swing(800);
    emoji3Ref.current.swing(800);
  };

  return (
    <ImageBackground source={image} style={styles.container}>
      <Animatable.View animation="fadeIn" style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Welcome to FarMart Office. {"\n"}
          Building Good Food Economy
        </Text>
      </Animatable.View>

      <Animatable.View
        animation={animationType}
        style={styles.greetingContainer}
      >
        <Text style={styles.greetingText}>How is your mood toda?</Text>
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            setSelectedDepartment(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem , index) => {
            return selectedItem|| 'Choose Your Department'
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          style={styles.departmentPicker}
        />
      </Animatable.View>

      <View style={styles.emojiContainer}>
        <TouchableOpacity onPress={() => showMessage("😊")}>
          <Animatable.Text
            ref={emoji1Ref}
            animation="swing"
            style={styles.emojiTextHappy}
          >
            😊
          </Animatable.Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showMessage("😐")}>
          <Animatable.Text
            ref={emoji3Ref}
            animation="swing"
            style={styles.emojiTextNormal}
          >
            😐
          </Animatable.Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showMessage("😢")}>
          <Animatable.Text
            ref={emoji2Ref}
            animation="swing"
            style={styles.emojiTextSad}
          >
            😢
          </Animatable.Text>
        </TouchableOpacity>
        {feedbackMessage !== "" && (
          <View style={styles.feedbackMessageContainer}>
            <Text style={styles.feedbackMessageText}>{feedbackMessage}</Text>
          </View>
        )}
      </View>

      {toastMessage !== "" && <CustomToast message={toastMessage} />}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#005A54",
  },
  headerContainer: {
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
  emojiContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    position: "relative",
  },
  emojiTextHappy: {
    fontSize: 50,
    margin: 10,
    backgroundColor: "#005A54",
    borderRadius: 50,
    padding: 20,
  },
  emojiTextNormal: {
    fontSize: 50,
    margin: 10,
    backgroundColor: "#005A54",
    borderRadius: 50,
    padding: 20,
  },
  emojiTextSad: {
    fontSize: 50,
    margin: 10,
    backgroundColor: "#005A54",
    borderRadius: 50,
    padding: 20,
  },
  greetingContainer: {
    padding: 20,
    marginTop: 20,
    alignItems: "center",
  },
  feedbackMessageContainer: {
    position: "absolute",
    top: 130,
    backgroundColor: "transparent",
  },
  feedbackMessageText: {
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
  },
  greetingText: {
    color: "#FFF",
    fontSize: 20,
  },
  departmentPicker: {
    flex: 1,
    height: 50,
    marginBottom: 20,
    backgroundColor: "black",
    color: "#fff",
    zIndex: 1000,
  },
});
