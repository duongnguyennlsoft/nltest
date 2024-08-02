import { StyleSheet } from "react-native";
import theme from "../../common/theme";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    alignItems: "center",
  },
  btn: {
    marginVertical: 16,
    backgroundColor: theme.lightPurple,
    alignSelf: "center",
    paddingHorizontal: 32,
  },
  btnText: {
    fontWeight: "600",
    fontSize: 16,
    color: theme.white,
  },
  emptyContainer: {
    marginTop: "25%",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
  },
  input: {
    height: "80%",
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#FFF",
    flex: 1,
    marginLeft: 16,
  },
  discountContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginHorizontal: 16,
  },
});
