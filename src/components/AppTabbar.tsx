import React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, View } from "react-native";
import Home from "../screens/Home/Home";
import RNText from "./RNText";
import Cart from "../screens/Cart/Cart";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Profile from "../screens/Profile/Profile";

const BottomTab = createBottomTabNavigator<AppStackParamList>();

export const AppBottomTab = () => {
  return (
    <BottomTab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Cart" component={Cart} />
      <BottomTab.Screen name="Profile" component={Profile} />
    </BottomTab.Navigator>
  );
};

const MyTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();

  const renderItems = () => {
    return state.routes.map((route, index) => {
      const label = route.name;
      const isFocused = state.index === index;
      const onPress = () => {
        navigation.navigate(route.name, route.params);
      };

      return (
        <Pressable key={index} onPress={onPress} style={styles.btn}>
          <RNText
            style={[
              styles.text,
              {
                color: isFocused ? "#00B6FD" : "#808998",
              },
            ]}
          >
            {label}
          </RNText>
        </Pressable>
      );
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      {renderItems()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFF",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    paddingTop: 6,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    paddingTop: 8,
  },
});
