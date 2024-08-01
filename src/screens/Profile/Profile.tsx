import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import React from "react";
import { Text } from "react-native";
import Layout from "../../components/Layout";
import MyButton from "../../components/MyButton";
import UserForm from "../../components/UserForm";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import { loginSchema } from "../../lib/yup";
import { styles } from "./styles";

export default function Profile() {
  const { user, updateUser } = React.useContext(UserContext);
  const { clearCart } = React.useContext(CartContext);
  const { replace } = useNavigation<any>();
  const logout = () => {
    updateUser(undefined);
    clearCart();
    replace("Login");
  };
  const form = useFormik({
    validationSchema: loginSchema,
    initialValues: user!,
    onSubmit: (values) => {
      updateUser(values);
    },
  });
  return (
    <Layout style={styles.container}>
      <UserForm form={form} />
      <MyButton onPress={() => form.submitForm()} style={styles.btn}>
        <Text style={styles.btnText}>Update</Text>
      </MyButton>
      <MyButton
        onPress={logout}
        style={[styles.btn, { backgroundColor: "red" }]}
      >
        <Text style={styles.btnText}>Log out</Text>
      </MyButton>
    </Layout>
  );
}
