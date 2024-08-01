import dayjs from "dayjs";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import RNDatePicker from "react-native-date-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../common/theme";
import FormInput from "./FormInput";
import RNText from "./RNText";

const FORM_FIELDS = [
  {
    formKey: "name",
    title: "Name",
  },
  {
    formKey: "phone",
    title: "Phone",
    inputProps: {
      keyboardType: "numeric",
    },
  },
  {
    formKey: "email",
    title: "Email",
    inputProps: {
      keyboardType: "email",
    },
  },
  {
    formKey: "address",
    title: "Address",
  },
];

interface Props {
  form?: any;
}

export default function UserForm({ form }: Props) {
  const { handleChange, handleBlur, values, errors, touched } = form;

  const [showDatePicker, setShowDatePicker] = React.useState<boolean>(false);
  const openDatePicker = () => setShowDatePicker(true);
  const closeDatePicker = () => setShowDatePicker(false);

  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        email: "",
        address: "",
        dayOfBirth: "",
      }}
      onSubmit={(values) => {
      }}
    >
      <View>
        <View style={styles.formContainer}>
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
          <RNText style={[styles.formTitleText]}>{"Birth day"}</RNText>
          <TouchableOpacity style={[styles.input]} onPress={openDatePicker}>
            <RNText>
              {values.dayOfBirth &&
                dayjs(values.dayOfBirth).format("DD/MM/YYYY")}
            </RNText>
          </TouchableOpacity>
          {errors["dayOfBirth"] && touched["dayOfBirth"] ? (
            <RNText style={styles.errorText}>{errors["dayOfBirth"]}</RNText>
          ) : null}
        </View>

        <RNDatePicker
          modal
          mode="date"
          title={"Select Date"}
          maximumDate={new Date()}
          open={showDatePicker}
          date={new Date(values.dayOfBirth || new Date())}
          onCancel={closeDatePicker}
          onConfirm={(date) => {
            handleChange("dayOfBirth")(date.toISOString());
            closeDatePicker();
          }}
        />
      </View>
    </Formik>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 60,
    padding: theme.defaultPadding * 2,
    width: "100%",
    backgroundColor: theme.lightPurple,
  },
  formTitleText: {
    marginTop: 8,
    fontSize: 16,
  },
  input: {
    marginTop: 8,
    backgroundColor: theme.white,
    padding: theme.defaultPadding,
    borderRadius: 24,
  },
  errorText: {
    marginTop: 8,
    color: "red",
  },
});
