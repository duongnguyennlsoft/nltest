import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { AppBottomTab } from "../components/AppTabbar";
import UserContext from "../contexts/UserContext";
import EditProduct from "../screens/EditProduct/EditProduct";
import Login from "../screens/Login/Login";
import ProductDetails from "../screens/ProductDetails/ProductDetails";
import Order from "../screens/Order/Order";

const Stack = createStackNavigator();
const NativeStack = createNativeStackNavigator<RootStackParamList>();

const screensConfig: AppScreenConfig[] = [
  {
    name: "App",
    component: AppBottomTab,
    options: {
      headerShown: false,
      title: "Home",
    },
  },
  {
    name: "Login",
    component: Login,
    options: {
      headerTransparent: true,
      headerShown: false,
    },
  },
  {
    name: "ProductDetails",
    component: ProductDetails,
    options: {
      title: "Product Details",
    },
  },
  {
    name: "Order",
    component: Order,
    options: {
      title: "Order",
    },
  },
  {
    name: "EditProduct",
    component: EditProduct,
    options: (props) => {
      return {
        title: props.route.params?.item ? "Edit Product" : "Create Product",
      };
    },
  },
];

function generateScreens(screensConfig: AppScreenConfig[]) {
  return screensConfig.map((config, idx) => {
    if ("screens" in config) {
      const { screens, ...props } = config;

      return (
        <NativeStack.Group key={idx} {...props}>
          {generateScreens(screens)}
        </NativeStack.Group>
      );
    }

    return <NativeStack.Screen key={idx} {...config} />;
  });
}

export default function Navigation() {
  const { user } = useContext(UserContext);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "App" : "Login"}>
        {generateScreens(screensConfig)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
