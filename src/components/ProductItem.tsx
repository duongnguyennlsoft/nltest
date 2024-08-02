import React, { memo, useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import theme from "../common/theme";
import CartContext from "../contexts/CartContext";
import RNText from "./RNText";
import { useNavigation } from "@react-navigation/native";

type ProductItemProps = {
  item: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const { navigate } = useNavigation<any>();
  const { updateItem, removeItem, cart } = useContext(CartContext);
  const itemInCart = cart?.find((product) => product.id === item.id);
  const [quantity, setQuantity] = useState(0);

  const onIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const onDecrease = () => {
    if (quantity === 1) {
      removeItem(item);
    }
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const onPressItem = () => {
    navigate("ProductDetails", {
      id: item.id,
    });
  };

  useEffect(() => {
    if (!itemInCart) return;
    if (itemInCart?.quantity !== 0) {
      setQuantity(itemInCart?.quantity);
    }
  }, [itemInCart?.quantity]);

  useEffect(() => {
    updateItem(item, quantity);
  }, [quantity]);

  return (
    <TouchableOpacity style={[styles.container]} onPress={onPressItem}>
      <FastImage source={{ uri: item.image?.[0] }} style={styles.image} />
      <View style={styles.contentContainer}>
        <RNText>{item.name}</RNText>
        <RNText numberOfLines={2}>{item.description}</RNText>
        <RNText style={styles.price}>{item.price}$</RNText>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={onDecrease}>
          <RNText>-</RNText>
        </TouchableOpacity>
        <RNText>{quantity}</RNText>
        <TouchableOpacity style={styles.action} onPress={onIncrease}>
          <RNText>+</RNText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  price: { fontWeight: "bold", marginTop: 4 },
  image: { width: 100, height: 100 },
  contentContainer: { flex: 1, padding: 8 },
  container: {
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 8,
    flexDirection: "row",
    backgroundColor: theme.white,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    backgroundColor: "#E4E4E4",
  },
  actions: {
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
    alignSelf: "center",
    marginRight: 8,
  },
  action: { padding: 4 },
});

export default memo(ProductItem);
