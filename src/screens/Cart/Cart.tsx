import { FlashList } from "@shopify/flash-list";
import React from "react";
import { TextInput, View } from "react-native";
import CartItem from "../../components/CartItem";
import MyButton from "../../components/MyButton";
import RNText from "../../components/RNText";
import CartContext from "../../contexts/CartContext";
import { styles } from "./styles";
import Layout from "../../components/Layout";
import { useNavigation } from "@react-navigation/native";

export default function Cart() {
  const [code, setCode] = React.useState<string>("");
  const { cart, total } = React.useContext(CartContext);
  const { navigate } = useNavigation<any>();

  const onChangeText = (t: string) => {
    setCode(t);
  };

  const onPressView = () => {
    navigate("Home");
  };

  const renderItem = ({ item }: { item: CartItem }) => {
    return <CartItem item={item} />;
  };

  return (
    <Layout style={styles.container}>
      {cart && cart.length > 0 && (
        <>
          <View style={styles.discountContainer}>
            <RNText>Discount Code</RNText>
            <TextInput
              value={code}
              onChangeText={onChangeText}
              style={styles.input}
            />
          </View>
          <View style={styles.header}>
            <RNText>Total: {total}$</RNText>
            <MyButton style={styles.btn}>
              <RNText style={styles.btnText}>Pay</RNText>
            </MyButton>
          </View>
        </>
      )}
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
