import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebase from "../firebase";
import { useNavigation } from "@react-navigation/native";

const LoginForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const auth = getAuth();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError("Email and password are required fields.");
        return;
      }
      setError(null);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      setEmail("");
      setPassword("");

      console.log("User created:", user);
      navigation.navigate("Ridbuter");
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  const handleSignup = async () => {
    try {
      if (!signupEmail || !signupPassword) {
        setError("Email and password are required fields.");
        return;
      }
      setError(null);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );

      const user = userCredential.user;

      setSignupEmail("");
      setSignupPassword("");

      console.log("User created:", user);

      // Navigate to the main page after successful signup
      navigation.navigate("Ridbuter");
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/originals/b3/c3/0d/b3c30da5ce1f74ea0530dd8c9003c74c.jpg",
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign in to Ridbuter</Text>
        <View style={styles.form}>
          <Text
            style={{ color: "red", textAlign: "center", fontWeight: "800" }}
          >
            {error}
          </Text>
          {isLoginForm ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLogin()}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <Text style={styles.message}>
                Not registered?{" "}
                <Text style={styles.link} onPress={toggleForm}>
                  Create an account
                </Text>
              </Text>
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={signupPassword}
                onChangeText={(text) => setSignupPassword(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={signupEmail}
                onChangeText={(text) => setSignupEmail(text)}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSignup()}
              >
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
              <Text style={styles.message}>
                Already registered?{" "}
                <Text style={styles.link} onPress={toggleForm}>
                  Sign In
                </Text>
              </Text>
            </>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "whitesmoke",
    fontWeight: "900",
    fontFamily: 'Gill Sans", sans-serif',
    fontSize: 24,
    marginBottom: 20,
  },
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  input: {
    fontFamily: 'Gill Sans", sans-serif',
    backgroundColor: "#f2f2f2",
    width: "100%",
    height: 40,
    marginBottom: 10,
    padding: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#2a52be",
    width: "100%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    textTransform: "uppercase",
  },
  message: {
    marginVertical: 15,
    color: "black",
    fontSize: 12,
    textAlign: "center",
  },
  link: {
    color: "#4caf50",
    textDecorationLine: "underline",
  },
});

export default LoginForm;
