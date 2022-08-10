import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, TouchableOpacity, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { Feather } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

class AdSuccessfullyPostScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.push('BottomTabBar');
        return true;
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {this.successIconWithText()}
                    {this.backToHomeButton()}
                </View>
            </SafeAreaView>
        )
    }

    backToHomeButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('BottomTabBar')}
                style={styles.backToHomeButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    BACK TO HOME
                </Text>
            </TouchableOpacity>
        )
    }

    successIconWithText() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Feather name="check-circle" size={90} color={Colors.primaryColor} />
                <Text style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.blackColor18SemiBold }}>
                    Success!
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor14Medium }}>
                    Your ad posted successfully.
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backToHomeButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 5.0,
        shadowColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderColor: 'rgba(75, 44, 32, 0.5)',
        borderWidth: 1.0,
        alignSelf: 'stretch'
    },
});

AdSuccessfullyPostScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(AdSuccessfullyPostScreen);