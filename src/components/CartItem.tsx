import React, { useContext } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import theme from "../common/theme";
import RNText from "./RNText";
import CartContext from "../contexts/CartContext";
import { Swipeable } from "react-native-gesture-handler";

type CartItemProps = {
  item: CartItem;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeItem, updateItem } = useContext(CartContext);
  const handleDelete = () => {
    removeItem(item);
  };

  const onIncrease = () => {
    updateItem(item, item.quantity + 1);
  };

  const onDecrease = () => {
    if (item.quantity === 1) {
      removeItem(item);
    } else {
      updateItem(item, item.quantity - 1);
    }
  };

  const renderLeftActions = (
    //@ts-ignore
    progress: Animated.AnimatedInterpolation,
    //@ts-ignore
    dragX: Animated.AnimatedInterpolation
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-1, 0, 0, 20],
    });
    return (
      <TouchableOpacity style={styles.leftAction} onPress={handleDelete}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          {"Delete"}
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderLeftActions}
      containerStyle={{ marginBottom: 16 }}
    >
      <View style={[styles.container]}>
        <FastImage source={{ uri: item.image?.[0] }} style={styles.image} />
        <View style={styles.contentContainer}>
          <RNText>{item.name}</RNText>
          <RNText numberOfLines={3}>{item.description}</RNText>
          <RNText style={styles.price}>{item.price}$</RNText>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={onDecrease}>
            <RNText>-</RNText>
          </TouchableOpacity>
          <RNText style={styles.quantityText}>{item?.quantity}</RNText>
          <TouchableOpacity style={styles.action} onPress={onIncrease}>
            <RNText>+</RNText>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  price: { fontWeight: "bold", marginTop: 4 },
  actions: {
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
    alignSelf: "center",
    marginRight: 8,
  },
  action: { padding: 4 },
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
  quantityText: {},
  leftAction: {
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  actionText: {
    color: "#FF0000",
  },
});

export default CartItem;
