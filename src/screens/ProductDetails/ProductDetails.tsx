import React, { useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import Layout from "../../components/Layout";
import RNText from "../../components/RNText";
import ProductsContext from "../../contexts/ProductsContext";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function ProductDetails({
  route,
}: RootScreenProps<"ProductDetails">) {
  const { id } = route.params;
  const { navigate } = useNavigation<any>();
  const { getDetails } = useContext(ProductsContext);
  const { name, description, price, image } = getDetails(id) ?? {
    name: "",
    description: "",
    price: 0,
    image: [],
  };

  const [currentImage, setCurrentImage] = useState(0);

  const onPressEdit = () => {
    navigate("EditProduct", {
      item: { name, description, price, id, image },
    });
  };

  const renderImages = () => {
    return image?.map((e, index) => {
      const isActive = index === currentImage;

      return (
        <TouchableOpacity
          key={index}
          onPress={() => setCurrentImage(index)}
          style={[isActive ? styles.activeImage : {}, { marginBottom: 6 }]}
        >
          <FastImage source={{ uri: e }} style={styles.smallImage} />
        </TouchableOpacity>
      );
    });
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.images}>
        <FastImage
          source={{ uri: image[currentImage] }}
          style={styles.mainImage}
        />
        <View style={styles.smallImages}>{renderImages()}</View>
      </View>
      <View style={styles.name}>
        <RNText style={styles.nameText}>
          {name} - {price}$
        </RNText>
        <TouchableOpacity onPress={onPressEdit}>
          <RNText style={styles.nameText}>Edit</RNText>
        </TouchableOpacity>
      </View>
      <RNText style={styles.desText}>{description}</RNText>
    </Layout>
  );
}
