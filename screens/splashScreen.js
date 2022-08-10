import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, } from "../constants/styles";

class SplashScreen extends Component {

    render() {

        setTimeout(() => {
            this.props.navigation.navigate('Onboarding')
        }, 2000);

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', ...Fonts.whiteColor30AclonicaRegular }}>
                        SELLHUB
                    </Text>
                </View>
            </SafeAreaView>
        )
    }
}

export default withNavigation(SplashScreen);
