import React from "react";
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
  const { navigate } = useNavigation<any>();
  const { getDetails } = React.useContext(ProductsContext);
  const details = getDetails(route.params.id);

  const [currentImage, setCurrentImage] = React.useState(0);
  const onPressEdit = () => {
    navigate("EditProduct", {
      item: details,
    });
  };
  return (
    <Layout style={styles.container}>
      <View style={styles.images}>
        <FastImage
          source={{ uri: details?.image[currentImage] }}
          style={styles.mainImage}
        />
        <View style={styles.smallImages}>
          {details?.image?.map((e, index) => {
            const isActive = index === currentImage;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentImage(index)}
                style={[isActive ? styles.activeImage : {}, {marginBottom: 6}]}
              >
                <FastImage source={{ uri: e }} style={styles.smallImage} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.name}>
        <RNText style={styles.nameText}>
          {details?.name} - {details?.price}$
        </RNText>
        <TouchableOpacity onPress={onPressEdit}>
          <RNText style={styles.nameText}>Edit</RNText>
        </TouchableOpacity>
      </View>
      <RNText style={styles.desText}>{details?.description}</RNText>
    </Layout>
  );
}
