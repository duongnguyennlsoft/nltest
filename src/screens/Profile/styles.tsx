import { StyleSheet } from "react-native";
import theme from "../../common/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightPurple,
  },
  btn: {
    alignSelf: "center",
    marginTop: 12,
    paddingHorizontal: 24,
  },
  btnText: {
    color: theme.white,
    fontWeight: "bold",
    fontSize: theme.buttonFontSize,
  },
});
