// BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RequestRideScreen from "./RequestRidesScreen"; // Create this component
import PostRideScreen from "./PostRideScreen"; // Create this component
import ProfileScreen from "./ProfileScreen"; // Create this component
import carIcon from "../assets/icons/car.png";
import postIcon from "../assets/icons/post.png";
import wheelIcon from "../assets/icons/wheel.png";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Request Ride") {
            iconName = carIcon;
          } else if (route.name === "Post Ride") {
            iconName = postIcon;
          } else if (route.name === "Profile") {
            iconName = wheelIcon;
          }

          return (
            <Image source={iconName} style={{ width: size, height: size }} />
          );
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      })}
    >
      <Tab.Screen name="Request Ride" component={RequestRideScreen} />
      <Tab.Screen name="Post Ride" component={PostRideScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
