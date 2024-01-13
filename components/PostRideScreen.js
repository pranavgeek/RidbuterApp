// PostRideScreen.js
import React, { useState } from "react";
import { Alert } from "react-native";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Firestore } from "firebase/firestore";
import { firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const PostRideScreen = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [seats, setSelectedSeats] = useState("");
  const [date, setDate] = useState(new Date());
  const [isPickerModalVisible, setPickerModalVisible] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      if (!origin || !destination) {
        setError("Origin and destination are required fields.");
        return;
      }

      setError(null);

      const rideDB = collection(firestore, "rides");
      const newRide = await addDoc(rideDB, {
        origin,
        destination,
        seats,
        departureTime: new Date(date).toISOString(),
      });

      // setSetPostMess("Ride posted successfully")
      Alert.alert(
        "Ride Posted",
        "Your ride has been posted successfully!",
        [{ text: "OK" }]
      );

      setDestination("");
      setOrigin("");
      setSelectedSeats("")

      console.log("Firestore:", collection);
      console.log("Data Added:", newRide);
    } catch (error) {
      console.error("Error posting ride:", error);
    }
  };

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
  };

  const openPickerModal = () => {
    setPickerModalVisible(true);
  };

  const closePickerModal = () => {
    setPickerModalVisible(false);
  };

  const handlePickerSelect = (itemValue) => {
    setSelectedSeats(itemValue);
    closePickerModal();
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "red", textAlign: "center", fontWeight: "800" }}>
        {error}
      </Text>
      <Text style={styles.label}>Origin:</Text>
      <TextInput
        style={styles.input}
        value={origin}
        onChangeText={(text) => setOrigin(text)}
        placeholder="Enter an origin"
      />

      <Text style={styles.label}>Destination:</Text>
      <TextInput
        style={styles.input}
        value={destination}
        onChangeText={(text) => setDestination(text)}
        placeholder="Enter a destination"
      />

      <Text style={styles.label}>Number of Seats:</Text>

      <TouchableOpacity onPress={openPickerModal}>
        <TextInput
          style={styles.input}
          value={seats}
          placeholder="Select a number of seats"
          editable={false}
        />
      </TouchableOpacity>

      <Modal
        visible={isPickerModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerModal}>
            <Picker
              style={{ width: 200 }}
              selectedValue={seats}
              onValueChange={(itemValue, itemIndex) =>
                handlePickerSelect(itemValue)
              }
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
            </Picker>
            <Button title="Close" onPress={closePickerModal} />
          </View>
        </View>
      </Modal>

      <Text style={styles.label}>Leaving Date:</Text>
      <DateTimePicker
        style={styles.dateTimePicker}
        value={date}
        mode={"date"}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />

      <TouchableOpacity style={styles.customButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Post a trip</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  pickerModal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dateTimePicker: {
    height: 40,
    marginRight: 240,
    marginBottom: 12,
  },
  customButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default PostRideScreen;
