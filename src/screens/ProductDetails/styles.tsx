import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  mainImage: {
    flex: 1,
    aspectRatio: 1,
  },
  images: {
    flexDirection: "row",
  },
  smallImages: {
    marginLeft: 16,
  },
  smallImage: {
    width: 50,
    height: 50,
  },
  activeImage: {
    borderWidth: 1,
    borderColor: "red",
  },
  name: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameText: {
    marginTop: 8,
    fontWeight: "600",
    fontSize: 16,
  },
  desText: {
    marginTop: 8,
    fontSize: 14,
  },
});
