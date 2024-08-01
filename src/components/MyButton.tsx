import React, { ReactNode } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import theme from "../common/theme";

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

const MyButton: React.FC<ButtonProps> = ({ children, style, ...props }) => {
  return (
    <TouchableOpacity
      style={[styles.default, style, props.disabled && styles.disabled]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: "rgba(255, 255, 255, 0.09)",
    borderRadius: 100,
    padding: 16,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    backgroundColor: "#E4E4E4",
  },
});

export default MyButton;
