import React from "react";
import RNText from "./RNText";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewProps,
} from "react-native";
import theme from "../common/theme";

type FormInputProps = {
  handleChange: any;
  handleBlur: any;
  values: any;
  errors: any;
  touched: any;
  title: string;
  inputStyle?: StyleProp<TextStyle>;
  titleStyle?: TextStyle;
  formKey: string;
  inputProps?: TextInputProps;
};

export default function FormInput({
  handleBlur,
  handleChange,
  errors,
  touched,
  values,
  inputStyle,
  titleStyle,
  formKey,
  title,
  inputProps,
}: FormInputProps) {
  return (
    <>
      <RNText style={[styles.formTitleText, titleStyle]}>{title}</RNText>
      <TextInput
        style={[styles.input, inputStyle]}
        onChangeText={handleChange(formKey)}
        onBlur={handleBlur(formKey)}
        value={
          typeof values[formKey] === "number"
            ? values[formKey].toString()
            : values[formKey]
        }
        {...inputProps}
      />
      {errors[formKey] && touched[formKey] ? (
        <RNText style={styles.errorText}>{errors[formKey]}</RNText>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 8,
    backgroundColor: theme.white,
    padding: theme.defaultPadding,
    borderRadius: 24,
  },
  formTitleText: {
    marginTop: 8,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
});
