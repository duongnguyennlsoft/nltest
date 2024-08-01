import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface Props {
  headerTransparent?: boolean;
  style: StyleProp<ViewStyle> | undefined;
  children: React.ReactNode;
}

export default function Layout({ children, style }: Props) {
  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      style={[styles.container, style]}
    >
      <ScrollView>{children}</ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
