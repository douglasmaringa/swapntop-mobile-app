import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, Dimensions, ScrollView, TouchableOpacity, TextInput, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import Dialog from "react-native-dialog";
import { CircleFade } from 'react-native-animated-spinkit';

const { width } = Dimensions.get('window');

class VerificationScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    state = {
        firstDigit: '',
        secondDigit: '',
        thirdDigit: '',
        forthDigit: '',
        isLoading: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <View style={styles.pageStyle}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {this.verifyTextWithBackArrow()}
                            {this.verifyInfo()}
                            {this.otpInfo()}
                            {this.resendInfo()}
                            {this.continueButton()}
                        </ScrollView>
                    </View>
                    {this.loadingDialog()}
                </View>
            </SafeAreaView>
        )
    }

    loadingDialog() {
        return (
            <Dialog.Container
                visible={this.state.isLoading}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center', }}>
                    <CircleFade size={56} color={Colors.primaryColor} />
                    <Text style={{ ...Fonts.grayColor14Regular, marginTop: Sizes.fixPadding * 2.0 }}>
                        Please wait...
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.setState({ isLoading: true })
                    setTimeout(() => {
                        this.setState({ isLoading: false })
                        this.props.navigation.push('BottomTabBar')
                    }, 2000);
                }}
                style={styles.continueButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    CONTINUE
                </Text>
            </TouchableOpacity>
        )
    }

    resendInfo() {
        return (
            <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, textAlign: 'center' }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Didn’t receive you any code?{` `}
                </Text>
                <Text style={{ ...Fonts.primaryColor14Medium }}>
                    Resend
                </Text>
            </Text>
        )
    }

    otpInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0 }}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor16SemiBold }}>
                    Entre Code Here
                </Text>
                <View style={styles.otpFieldsWrapStyle}>
                    <View style={styles.textFieldWrapStyle}>
                        <TextInput
                            selectionColor={Colors.primaryColor}
                            value={this.state.firstDigit}
                            style={{ ...Fonts.blackColor18Medium, paddingLeft: Sizes.fixPadding }}
                            onChangeText={(text) => {
                                this.setState({ firstDigit: text })
                                this.secondTextInput.focus();
                            }}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.textFieldWrapStyle}>
                        <TextInput
                            selectionColor={Colors.primaryColor}
                            value={this.state.secondDigit}
                            style={{ ...Fonts.blackColor18Medium, paddingLeft: Sizes.fixPadding - 3.0 }}
                            ref={(input) => { this.secondTextInput = input; }}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                this.setState({ secondDigit: text })
                                this.thirdTextInput.focus();
                            }}
                        />
                    </View>

                    <View style={styles.textFieldWrapStyle}>
                        <TextInput
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor18Medium, paddingLeft: Sizes.fixPadding - 3.0 }}
                            keyboardType="numeric"
                            value={this.state.thirdDigit}
                            ref={(input) => { this.thirdTextInput = input; }}
                            onChangeText={(text) => {
                                this.setState({ thirdDigit: text })
                                this.forthTextInput.focus();
                            }}
                        />
                    </View>

                    <View style={styles.textFieldWrapStyle}>
                        <TextInput
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor18Medium, paddingLeft: Sizes.fixPadding - 3.0 }}
                            keyboardType="numeric"
                            value={this.state.forthDigit}
                            ref={(input) => { this.forthTextInput = input; }}
                            onChangeText={(text) => {
                                this.setState({ forthDigit: text })
                                this.setState({ isLoading: true })
                                setTimeout(() => {
                                    this.setState({ isLoading: false })
                                    this.props.navigation.push('BottomTabBar')
                                }, 2000);
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    verifyInfo() {
        return (
            <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.grayColor14Medium }}>
                {`Please check your messages and enter the verification code we just sent you on\n+91 1236547890`}
            </Text>
        )
    }

    verifyTextWithBackArrow() {
        return (
            <View style={styles.verifyTextWithBackArrowWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => this.props.navigation.pop()}
                />
                <Text style={{ textAlign: 'center', flex: 1, ...Fonts.primaryColor18SemiBold }}>
                    Verify Your Mobile Number
                </Text>
            </View>
        )
    }

    header() {
        return (
            <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding * 3.0, ...Fonts.whiteColor24AclonicaRegular }}>
                SELLHUB
            </Text>
        )
    }

}

const styles = StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
    },
    pageStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
    },
    verifyTextWithBackArrowWrapStyle: {
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    otpFieldsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding,
    },
    textFieldWrapStyle: {
        height: 50.0,
        width: 50.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        borderColor: '#ececec',
        borderWidth: 1.0,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        margin: Sizes.fixPadding * 2.0,
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        shadowColor: Colors.primaryColor,
        elevation: 5.0,
        borderColor: 'rgba(75, 44, 32, 0.5)',
        borderWidth: 1.0,
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: width - 40,
        padding: Sizes.fixPadding * 2.0,
    },
});

VerificationScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(VerificationScreen);
