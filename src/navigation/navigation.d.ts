import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  EventMapBase,
  NavigationState,
  RouteConfig,
  RouteGroupConfig,
} from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

type ScreenConfig<PL> = RouteConfig<
  PL,
  keyof PL,
  NavigationState,
  NativeStackNavigationOptions,
  EventMapBase
>;
type ScreenGroupConfig<PL> = Omit<
  RouteGroupConfig<PL, NativeStackNavigationOptions>,
  "children"
> & { screens: ScreenConfig<PL>[] };

declare global {
  type AppScreenConfig =
    | ScreenConfig<RootStackParamList>
    | ScreenGroupConfig<RootStackParamList>;

  type AuthStackParamList = {};

  type RootStackParamList = {
    App: undefined;
    Login: undefined;
    ProductDetails: {
      id: string;
    };
    EditProduct: {
      item?: Product;
    };
  };

  type AppStackParamList = {
    Home: undefined;
    Cart: undefined;
    Profile: undefined;
  };

  type RootScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

  type AuthScreenProps<T extends keyof AuthStackParamList> =
    NativeStackScreenProps<AuthStackParamList, T>;

  type AppScreenProps<T extends keyof AppStackParamList> = CompositeScreenProps<
    RootScreenProps<string>,
    BottomTabScreenProps<AppStackParamList, T>
  >;
}
