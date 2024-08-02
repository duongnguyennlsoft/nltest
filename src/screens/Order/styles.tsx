import { StyleSheet } from "react-native";
import theme from "../../common/theme";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  items: {
    borderRadius: 12,
    marginHorizontal: 16,
    backgroundColor: "#FFF",
    marginTop: 16,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    textTransform: 'capitalize',
    marginTop: 8,
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
  },
  btn: {
    backgroundColor: theme.lightPurple,
    alignSelf: "center",
    marginTop: 16,
  },
  btnText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
