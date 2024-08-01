import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 40,
    bottom: 60,
    right: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  btnText: {
    fontSize: 32,
    color: "#FFF",
  },
});
