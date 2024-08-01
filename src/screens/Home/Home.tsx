// Home.js
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import ProductItem from "../../components/ProductItem";
import { styles } from "./styles";
import ProductsContext from "../../contexts/ProductsContext";
import RNText from "../../components/RNText";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const { products } = React.useContext(ProductsContext);
  const { navigate } = useNavigation<any>();
  const onPressAdd = () => {
    navigate("EditProduct");
  };

  const renderItem = ({ item }: { item: Product }) => {
    return <ProductItem item={item} />;
  };
  return (
    <View style={styles.container}>
      <FlashList
        data={products}
        renderItem={renderItem}
        estimatedItemSize={1000}
      />
      <TouchableOpacity style={styles.btn} onPress={onPressAdd}>
        <RNText style={styles.btnText}>+</RNText>
      </TouchableOpacity>
    </View>
  );
}
