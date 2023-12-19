import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import CustomToast from "./screens/CustomToast";
import image from "./assets/farmart.png";
import Modal from "react-native-modal";

export default function App() {
  const [message, setMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [animationType, setAnimationType] = useState("fadeIn");
  const [toastMessage, setToastMessage] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const emoji1Ref = useRef(null);
  const emoji2Ref = useRef(null);
  const emoji3Ref = useRef(null);
  const department = ["Technology","Procurement", "Sales", "Vas", "Human Capital", "Marketing", "Finance", "Data Science", "Product", "Impact-ESG","CEO Office","Export","Spices"];

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
      setTimeout(() => {
        setToDefault();
      }, 2000);
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
        setTimeout(() => {
          setToDefault();
        }, 2000);
      } else {
        setToastMessage("Error submitting feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      setToastMessage("Error submitting feedback");
      setTimeout(() => {
        setToDefault();
      }, 2000);
    }

    function setToDefault() {
      setToastMessage("");
      setMessage("");
      setFeedbackMessage("");
      setModalVisible(false); // Close the modal after submitting feedback
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
         
        </Text>
      </Animatable.View>

      <Animatable.View animation={animationType} style={styles.greetingContainer}>
        <Text style={styles.greetingText}>How is your mood today?</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.departmentPicker}>
            <Text style={styles.dropdownButtonText}>{selectedDepartment || 'Choose Your Department'}</Text>
          </View>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <ScrollView>
              {department.map((item) => (
                <TouchableOpacity key={item} onPress={() => { setSelectedDepartment(item); setModalVisible(false); }}>
                  <Text style={styles.modalItem}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </Animatable.View>

      <View style={styles.emojiContainer}>
        <TouchableOpacity onPress={() => showMessage("😊")}>
          <Animatable.Text ref={emoji1Ref} animation="swing" style={styles.emojiTextHappy}>
            😊
          </Animatable.Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showMessage("😐")}>
          <Animatable.Text ref={emoji3Ref} animation="swing" style={styles.emojiTextNormal}>
            😐
          </Animatable.Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showMessage("😢")}>
          <Animatable.Text ref={emoji2Ref} animation="swing" style={styles.emojiTextSad}>
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
    fontSize: 60,
    color: "#fff",
    textAlign: "center",
    display:"flex",
    top:0,
  },
  emojiContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    position: "relative",
  },
  emojiTextHappy: {
    fontSize: 60,
    margin: 20,
    
    borderRadius: 50,
    padding: 40,
  },
  emojiTextNormal: {
    fontSize: 60,
    margin: 20,
    
    borderRadius: 50,
    padding: 40,
  },
  emojiTextSad: {
    fontSize: 60,
    margin: 20,
   
    borderRadius: 50,
    padding: 40,
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
    fontSize: 40,
    display:"flex",
    bottom:80,

  },
  departmentPicker: {
    width: 350,
    marginTop: 10,
    marginLeft: 0,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: 'row',
  
    justifyContent: "center",
    paddingRight: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#005A54",
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    margin: -40,
    maxHeight: 500,
    height: 500,
    display: 'flex',
    top: "32%",
    
  },
  modalItem: {
    fontSize: 25,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    display:"flex",
    justifyContent:"center"
  },
});