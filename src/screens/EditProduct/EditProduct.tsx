import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import React from "react";
import { TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import ImageCropPicker from "react-native-image-crop-picker";
import FormInput from "../../components/FormInput";
import Layout from "../../components/Layout";
import MyButton from "../../components/MyButton";
import RNText from "../../components/RNText";
import ProductsContext from "../../contexts/ProductsContext";
import { productSchema } from "../../lib/yup";
import { styles } from "./styles";

const FORM_FIELDS = [
  {
    formKey: "name",
    title: "Name",
  },
  {
    formKey: "description",
    title: "Description",
    inputProps: {
      multiline: true,
      numberOfLines: 4,
      height: 100,
    },
  },
  {
    formKey: "price",
    title: "Price",
    inputProps: {
      keyboardType: "numeric",
    },
  },
];
export default function EditProduct({ route }: RootScreenProps<"EditProduct">) {
  const { goBack } = useNavigation<any>();
  const { updateItem, removeItem, addItem } = React.useContext(ProductsContext);
  const [images, setImages] = React.useState<string[]>(
    route.params?.item?.image ?? []
  );

  const onSubmit = (values: any) => {
    if (route.params?.item?.id) {
      updateItem({ ...values, image: images });
    } else {
      addItem({ ...values, image: images });
    }
    goBack();
  };
  const { handleChange, handleBlur, values, errors, touched, submitForm } =
    useFormik({
      validationSchema: productSchema,
      initialValues: route.params?.item ?? {
        name: "",
        description: "",
        price: 0,
      },
      onSubmit: (values) => onSubmit(values),
    });
  const onRemove = () => {
    if (!route.params?.item) return;
    removeItem(route.params.item);
    goBack();
    goBack();
  };

  const onPressUpdateImage = () => {
    ImageCropPicker.openPicker({
      forceJpg: true,
      maxFiles: 5,
      multiple: true,
      compressImageQuality: 0.8,
      mediaType: "photo",
    }).then((images) => setImages(images.map((e) => e.path)));
  };

  return (
    <Layout style={styles.container}>
      {FORM_FIELDS.map((field) => (
        <FormInput
          key={field.formKey}
          formKey={field.formKey}
          title={field.title}
          handleBlur={handleBlur}
          handleChange={handleChange}
          values={values}
          errors={errors}
          touched={touched}
          //@ts-ignore
          inputProps={field?.inputProps}
        />
      ))}
      <RNText style={styles.formTitleText}>Images</RNText>

      <TouchableOpacity onPress={onPressUpdateImage} style={styles.smallImages}>
        {images.length > 0 ? (
          images.map((e, index) => {
            return (
              <FastImage
                key={index}
                source={{ uri: e }}
                style={styles.smallImage}
              />
            );
          })
        ) : (
          <RNText>Add images</RNText>
        )}
      </TouchableOpacity>
      <MyButton onPress={submitForm} style={styles.btn}>
        <RNText style={styles.btnText}>
          {route.params?.item ? "Update" : "Create"}
        </RNText>
      </MyButton>
      {route.params?.item && (
        <MyButton
          onPress={onRemove}
          style={[styles.btn, { backgroundColor: "red" }]}
        >
          <RNText style={styles.btnText}>Log out</RNText>
        </MyButton>
      )}
    </Layout>
  );
}
