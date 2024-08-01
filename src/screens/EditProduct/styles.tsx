import { StyleSheet } from "react-native";
import theme from "../../common/theme";

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
    marginTop: 12,
    flexDirection: "row",
  },
  smallImage: {
    width: 50,
    height: 50,
    marginRight: 4,
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
  btn: {
    alignSelf: "center",
    marginTop: 12,
    paddingHorizontal: 24,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: theme.buttonFontSize,
  },
  formTitleText: {
    marginTop: 8,
    fontSize: 16,
  },
});
