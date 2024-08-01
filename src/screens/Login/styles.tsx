import { StyleSheet } from "react-native";
import theme from "../../common/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  textTitle: {
    marginTop: "20%",
    textAlign: "center",
    fontWeight: "bold",
    color: theme.limeGreen,
    fontSize: theme.titleFontSize,
  },
  formContainer: {
    marginTop: 64,
  },
  btn: {
    width: "50%",
    alignSelf: "center",
    marginTop: 32,
    paddingHorizontal: 24,
  },
  btnText: {
    color: theme.white,
    fontWeight: "bold",
    fontSize: theme.buttonFontSize,
  },
});
