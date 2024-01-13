// ProfileScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import firebase from '../firebase'

const ProfileScreen = ({navigation}) => {
  const auth = getAuth();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login'); // Navigate back to the login screen after logout
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40}}>Hello Pranav!</Text>
      <TouchableOpacity
        style={styles.customButton}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  customButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 400,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
})

export default ProfileScreen;
