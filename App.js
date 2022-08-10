import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import LoadingScreen from "./components/loadingScreen";
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import { LogBox } from 'react-native';
import categoriesItemsScreen from "./screens/categoriesItems/categoriesItemsScreen";
import productDetailScreen from "./screens/productDetail/productDetailScreen";
import userProfileScreen from "./screens/userProfile/userProfileScreen";
import chatWithUserScreen from "./screens/chatWithUser/chatWithUserScreen";
import searchResultsScreen from "./screens/searchResults/searchResultsScreen";
import uploadAdScreen from "./screens/uploadAd/uploadAdScreen";
import adDetailScreen from "./screens/adDetail/adDetailScreen";
import reviewItemScreen from "./screens/reviewItem/reviewItemScreen";
import adSuccessfullyPostScreen from "./screens/adSuccessfullyPost/adSuccessfullyPostScreen";
import userProfile2Screen from "./screens/userProfile2/userProfile2Screen";
import accountSettingsScreen from "./screens/accountSettings/accountSettingsScreen";
import userAdsScreen from "./screens/userAds/userAdsScreen";
import editAdScreen from "./screens/editAd/editAdScreen";
import favoriteAdScreen from "./screens/favoriteAd/favoriteAdScreen";
import notificationsScreen from "./screens/notifications/notificationsScreen";
import aboutUsScreen from "./screens/aboutUs/aboutUsScreen";
import contactUsScreen from "./screens/contactUs/contactUsScreen";
import splashScreen from "./screens/splashScreen";
import onboardingScreen from "./screens/onboarding/onboardingScreen";
import loginScreen from "./screens/auth/loginScreen";
import registerScreen from "./screens/auth/registerScreen";
import verificationScreen from "./screens/auth/verificationScreen";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
"Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.",
"AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  Splash: splashScreen,
  mainFlow: createSharedElementStackNavigator(
    {
      Onboarding: onboardingScreen,
      Login: loginScreen,
      Register: registerScreen,
      Verification: verificationScreen,
      BottomTabBar: bottomTabBarScreen,
      CategoriesItems: categoriesItemsScreen,
      ProductDetail: productDetailScreen,
      UserProfile: userProfileScreen,
      ChatWithUser: chatWithUserScreen,
      SearchResults: searchResultsScreen,
      UploadAd: uploadAdScreen,
      AdDetail: adDetailScreen,
      ReviewItem: reviewItemScreen,
      AdSuccessfullyPost: adSuccessfullyPostScreen,
      UserProfile2: userProfile2Screen,
      AccountSettings: accountSettingsScreen,
      UserAds: userAdsScreen,
      EditAd: editAdScreen,
      FavoriteAd: favoriteAdScreen,
      Notifications: notificationsScreen,
      AboutUs: aboutUsScreen,
      ContactUs: contactUsScreen,
    },
    {
      initialRouteName: 'BottomTabBar',
    }
  ),
},
  {
    initialRouteName: 'Loading',
  });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App />
  );
};
