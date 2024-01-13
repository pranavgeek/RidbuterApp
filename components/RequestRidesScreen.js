import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firestore } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const RequestRidesScreen = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date());
  const [matchingRides, setMatchingRides] = useState([]);
  const [error, setError] = useState(null);

  const searchRide = async () => {
    try {
      if (!origin || !destination) {
        setError("Origin and destination are required fields.");
        return;
      }

      setError(null);

      const rideDB = collection(firestore, "rides");
      const q = query(
        rideDB,
        where("origin", "==", origin),
        where("destination", "==", destination)
      );
      const querySnapshot = await getDocs(q);
      const ridesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      ridesList.filter((ride) => ride.date === date);
      setMatchingRides(ridesList);

      setDestination("");
      setOrigin("");

      console.log("Ridelist: ", ridesList);
    } catch (error) {
      console.error("Error posting ride:", error);
    }
  };

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
  };

  const BookedTrip = async (ride) => {
    const formattedDepartureTime = ride.departureTime
            ? new Date(ride.departureTime).toLocaleString()
            : "N/A";
    try {
      // Immediately show a notification
      await Notifications.presentNotificationAsync({
        title: "Trip booked!",
        body: `You've reserved a journey from ${ride.origin} to ${ride.destination}. You've secured ${ride.seats} seats, and your departure is scheduled for ${formattedDepartureTime}`,
      });
      console.log("Notification shown successfully.");
    } catch (error) {
      console.error("Error showing notification:", error);
    }
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

      <Text style={styles.label}>Leaving:</Text>
      <DateTimePicker
        style={styles.dateTimePicker}
        value={date}
        mode={"date"}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />

      <TouchableOpacity style={styles.customButton} onPress={searchRide}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
        Matching results:{" "}
      </Text>
      <FlatList
        data={matchingRides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const formattedDepartureTime = item.departureTime
            ? new Date(item.departureTime).toLocaleString()
            : "N/A";
          return (
            <View style={styles.searchList}>
              <Text>
                Origin: {item.origin}
                {"\n"}
                Destination: {item.destination}
                {"\n"}
                Departure time: {formattedDepartureTime}
                {"\n"}
                Seates: {item.seats}
              </Text>
              <TouchableOpacity
                style={styles.bookBtn}
                onPress={() => BookedTrip(item)}
              >
                <Text style={styles.bookBtnText}>Book trip</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
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
  dateTimePicker: {
    height: 40,
    marginBottom: 12,
    marginRight: 240,
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

  searchList: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderColor: "green",
    borderWidth: 1,
    width: "100%",
    alignSelf: "center",
    padding: 10,
    marginTop: 15,
  },
  bookBtn: {
    backgroundColor: "#2a52be",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 40,
  },
  bookBtnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
});

export default RequestRidesScreen;
