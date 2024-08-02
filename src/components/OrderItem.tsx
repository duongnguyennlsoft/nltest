import React from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import theme from "../common/theme";
import RNText from "./RNText";

type CartItemProps = {
  item: CartItem;
};

const OrderItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <View style={[styles.container]}>
      <FastImage source={{ uri: item.image[0] }} style={styles.image} />
      <View style={styles.contentContainer}>
        <RNText>{item.name}</RNText>
        <RNText style={styles.price}>
          {item.price}$ x {item.quantity}
        </RNText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  price: { fontWeight: "bold", marginTop: 4 },
  image: { width: 30, height: 30 },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
    flexDirection: "row",
    backgroundColor: theme.white,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    backgroundColor: "#E4E4E4",
  },
  quantityText: {},
  leftAction: {
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  actionText: {
    color: "#FF0000",
  },
});

export default OrderItem;
