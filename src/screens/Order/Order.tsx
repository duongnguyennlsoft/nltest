import { FlashList } from "@shopify/flash-list";
import dayjs from "dayjs";
import React, { useContext, useMemo } from "react";
import { View } from "react-native";
import Layout from "../../components/Layout";
import MyButton from "../../components/MyButton";
import OrderItem from "../../components/OrderItem";
import RNText from "../../components/RNText";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import { getDiscountValue } from "../../utils";
import { styles } from "./styles";

/**
 * Displays the shopping cart with item details, applied discount, total price, and user information.
 *
 * Renders a list of cart items, shows discount information if available, calculates and displays the final total, and presents user details. Includes a confirmation button for proceeding with the order.
 */
export default function Cart({ route }: RootScreenProps<"Order">) {
  const { discount } = route.params;
  const { cart, total: totalInCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const a = null;

  const discountValue = useMemo(
    () => getDiscountValue(discount, totalInCart),
    [discount, totalInCart]
  );

  const total = useMemo(
    () => totalInCart - discountValue,
    [totalInCart, discountValue]
  );

  const renderItem = ({ item }: { item: CartItem }) => (
    <OrderItem item={item} />
  );

  const renderDisCount = () =>
    discount && (
      <View style={styles.row}>
        <RNText style={styles.itemTitle}>Discount Code: {discount.code}</RNText>
        <RNText style={styles.itemPrice}>{discountValue}$</RNText>
      </View>
    );

  const renderUserInformation = () =>
    Object.entries(user ?? {}).map(([key, value]) => (
      <View style={styles.row} key={key}>
        <RNText style={styles.itemTitle}>{key.toLowerCase()}</RNText>
        <RNText style={styles.itemPrice}>
          {key === "dayOfBirth" ? dayjs(value).format("DD/MM/YYYY") : value}
        </RNText>
      </View>
    ));

  return (
    <Layout style={styles.container}>
      <View style={styles.items}>
        <RNText
          style={[styles.itemTitle, { alignSelf: "center", marginBottom: 8 }]}
        >
          Your items
        </RNText>
        <FlashList
          data={cart}
          renderItem={renderItem}
          estimatedItemSize={1000}
        />
        {renderDisCount()}
        <View style={styles.row}>
          <RNText style={styles.itemTitle}>Total</RNText>
          <RNText style={styles.itemPrice}>{total}$</RNText>
        </View>
      </View>
      <View style={styles.items}>
        <RNText
          style={[styles.itemTitle, { alignSelf: "center", marginBottom: 8 }]}
        >
          Your information
        </RNText>
        {renderUserInformation()}
      </View>
      <MyButton style={styles.btn}>
        <RNText style={styles.btnText}>Confirm</RNText>
      </MyButton>
    </Layout>
  );
}
