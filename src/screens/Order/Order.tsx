import { FlashList } from "@shopify/flash-list";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { View } from "react-native";
import Layout from "../../components/Layout";
import MyButton from "../../components/MyButton";
import OrderItem from "../../components/OrderItem";
import RNText from "../../components/RNText";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import { getDiscountValue } from "../../utils";
import { styles } from "./styles";

export default function Cart({ route }: RootScreenProps<"Order">) {
  const { discount } = route.params;
  const { cart, total: totalInCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const discountValue = getDiscountValue(discount, totalInCart);
  const total = totalInCart - discountValue;
  const renderItem = ({ item }: { item: CartItem }) => {
    return <OrderItem item={item} />;
  };

  const renderDisCount = () => {
    return (
      discount && (
        <View style={styles.row}>
          <RNText style={styles.itemTitle}>
            Discount Code: {discount.code}
          </RNText>
          <RNText style={styles.itemPrice}>{discountValue}$</RNText>
        </View>
      )
    );
  };

  const renderUserInformation = () => {
    return Object.keys(user ?? {}).map((e) => {
      const renderValue = () => {
        const isDate = e === "dayOfBirth";
        if (isDate) return dayjs(user[e]).format("DD/MM/YYYY");
        return user[e];
      };
      return (
        <View style={styles.row} key={e}>
          <RNText style={[styles.itemTitle]}>{e.toLowerCase()}</RNText>
          <RNText style={styles.itemPrice}>{renderValue()}</RNText>
        </View>
      );
    });
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.items}>
        <RNText
          style={[
            styles.itemTitle,
            { alignSelf: "center", marginBottom: 8, marginTop: 0 },
          ]}
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
          <RNText style={[styles.itemTitle]}>Total</RNText>
          <RNText style={styles.itemPrice}>{total}$</RNText>
        </View>
      </View>
      <View style={styles.items}>
        <RNText
          style={[
            styles.itemTitle,
            { alignSelf: "center", marginBottom: 8, marginTop: 0 },
          ]}
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
