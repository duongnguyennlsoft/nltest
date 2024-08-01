// Login.js
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import React from "react";
import { Text, View } from "react-native";
import theme from "../../common/theme";
import Layout from "../../components/Layout";
import UserForm from "../../components/UserForm";
import UserContext from "../../contexts/UserContext";
import { loginSchema } from "../../lib/yup";
import { styles } from "./styles";
import MyButton from "../../components/MyButton";
import RNText from "../../components/RNText";

export default function Login() {
  const { updateUser } = React.useContext(UserContext);
  const { replace } = useNavigation<any>();
  const form = useFormik({
    validationSchema: loginSchema,
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      dayOfBirth: "",
    },
    onSubmit: (values) => {
      updateUser(values);
      replace("App");
    },
  });

  return (
    <Layout headerTransparent style={styles.container}>
      <Text style={[styles.textTitle, { color: theme.white }]}>
        Login D-shop
      </Text>
      <View style={styles.formContainer}>
        <UserForm form={form} />
      </View>
      <MyButton onPress={() => form.submitForm()} style={styles.btn}>
        <RNText style={styles.btnText}>Login</RNText>
      </MyButton>
    </Layout>
  );
}
