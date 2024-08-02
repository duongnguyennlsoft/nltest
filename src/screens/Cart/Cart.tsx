import { FlashList } from "@shopify/flash-list";
import React, { useContext, useState } from "react";
import { TextInput, View } from "react-native";
import CartItem from "../../components/CartItem";
import MyButton from "../../components/MyButton";
import RNText from "../../components/RNText";
import CartContext from "../../contexts/CartContext";
import { styles } from "./styles";
import Layout from "../../components/Layout";
import { useNavigation } from "@react-navigation/native";
import { checkDiscountCode, getDiscountValue } from "../../utils";

export default function Cart() {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [discount, setDiscount] = useState<Discount | undefined>();
  const { cart, total: totalInCart } = useContext(CartContext);
  const discountValue = getDiscountValue(discount, totalInCart);
  const total = totalInCart - discountValue;
  const { navigate } = useNavigation<any>();

  const onPay = () => {
    navigate("Order", {
      discount,
    });
  };

  const onApply = () => {
    if (!code) return;
    const discount = checkDiscountCode(code);
    setError(!discount);
    if (discount) {
      setDiscount(checkDiscountCode(code));
    }
  };

  const onChangeText = (t: string) => {
    setCode(t);
    setDiscount(undefined);
  };

  const onPressView = () => {
    navigate("Home");
  };

  const renderItem = ({ item }: { item: CartItem }) => {
    return <CartItem item={item} />;
  };

  const renderDiscount = () => {
    return (
      cart &&
      cart.length > 0 && (
        <>
          <View style={styles.discountContainer}>
            <RNText>Discount Code</RNText>
            <TextInput
              value={code}
              onChangeText={onChangeText}
              style={styles.input}
              onSubmitEditing={onApply}
            />
            <MyButton onPress={onApply}>
              <RNText style={[styles.btnText, { color: "#000" }]}>Apply</RNText>
            </MyButton>
          </View>
          {error ? (
            <RNText style={styles.errorText}>Invalid code</RNText>
          ) : discountValue ? (
            <RNText style={styles.errorText}>Discount: {discountValue}$</RNText>
          ) : undefined}
          <View style={styles.header}>
            <RNText>Total: {total}$</RNText>
            <MyButton style={styles.btn} onPress={onPay}>
              <RNText style={styles.btnText}>Pay</RNText>
            </MyButton>
          </View>
        </>
      )
    );
  };

  return (
    <Layout style={styles.container}>
      {renderDiscount()}
      <FlashList
        data={cart}
        renderItem={renderItem}
        estimatedItemSize={1000}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <RNText>Your cart is empty!</RNText>
            <MyButton onPress={onPressView}>
              <RNText>View Products</RNText>
            </MyButton>
          </View>
        }
      />
    </Layout>
  );
}
