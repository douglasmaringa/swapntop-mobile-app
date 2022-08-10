import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, Dimensions, StatusBar, Animated, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import { NavigationEvents } from 'react-navigation';
import { auth } from "../../firebase";

const { height } = Dimensions.get('window');

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(100);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentDidMount(){
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                this.props.navigation.push('BottomTabBar')
            }
        })

    }

    handleBackButton = () => {
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
        return true;
    };

    _spring() {
        this.setState({ backClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.03 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
            ]).start(() => {
                this.setState({ backClickCount: 0 });
            });
        });
    }

    state = {
        email: null,
        password: null,
        securePassword: true,
        rememberPassword: false,
        backClickCount: 0,
    }

    login = ()=>{
        console.log(this.state.email)
        auth
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res=> this.props.navigation.push('BottomTabBar'))
        .catch(error => alert(error))

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <NavigationEvents onDidFocus={() => {
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
                }} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <View style={styles.pageStyle}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}>
                            {this.loginText()}
                            {this.emailTextField()}
                            {this.passwordTextField()}
                            {this.forgetPasswordText()}
                            {this.loginButton()}
                            {this.orConnectWithIndicator()}
                            {this.socialMediaOptions()}
                            {this.dontAccountInfo()}
                        </ScrollView>
                    </View>
                </View>
                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <Text style={{ ...Fonts.whiteColor12Medium }}>
                        Press Back Once Again to Exit
                    </Text>
                </Animated.View>
            </SafeAreaView>
        )
    }

    dontAccountInfo() {
        return (
            <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, textAlign: 'center' }}>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Don’t have an account?{` `}
                </Text>
                <Text
                    onPress={() => this.props.navigation.push('Register')}
                    style={{ ...Fonts.primaryColor16Medium }}
                >
                    Register Now
                </Text>
            </Text>
        )
    }

    socialMediaOptions() {
        return (
            <View style={styles.socialMediaOptionsWrapStyle}>
                {this.socialMediaOptionsSort({ icon: require('../../assets/images/icons/google.png') })}
                {this.socialMediaOptionsSort({ icon: require('../../assets/images/icons/facebook.png') })}
                {this.socialMediaOptionsSort({ icon: require('../../assets/images/icons/twitter.png') })}
            </View>
        )
    }

    socialMediaOptionsSort({ icon }) {
        return (
            <View style={styles.socialMediaIconWrapStyle}>
                <Image
                    source={icon}
                    style={{ width: 25.0, height: 25.0, }}
                    resizeMode="contain"
                />
            </View>
        )
    }

    orConnectWithIndicator() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, flex: 1 }} />
                <Text style={{ marginHorizontal: Sizes.fixPadding - 2.0, ...Fonts.grayColor16Medium }}>
                    Or connect with
                </Text>
                <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, flex: 1 }} />
            </View>
        )
    }

    loginButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.login()}
                style={styles.loginButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    LOGIN
                </Text>
            </TouchableOpacity>
        )
    }

    forgetPasswordText() {
        return (
            <Text style={styles.forgetPasswordTextStyle}>
                Forget Password?
            </Text>
        )
    }

    passwordTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, marginTop: Sizes.fixPadding + 10.0, }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 20.0, }}>
                        <FontAwesome5 name="unlock-alt" size={16} color={Colors.primaryColor} style={{ marginLeft: Sizes.fixPadding - 7.0, }} />
                    </View>
                    <TextInput
                        secureTextEntry={this.state.securePassword}
                        placeholder="Password"
                        placeholderTextColor={Colors.grayColor}
                        style={{ flex: 1, ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding, }}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                </View>
                <MaterialIcons
                    name={this.state.securePassword ? "visibility-off" : 'visibility'}
                    color={Colors.grayColor}
                    size={16}
                    onPress={() => this.setState({ securePassword: !this.state.securePassword })}
                />
            </View>
        )
    }

    emailTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle }}>
                <View style={{ width: 20.0, }}>
                    <MaterialIcons
                        name="email"
                        color={Colors.primaryColor}
                        size={18}
                        style={{ marginLeft: Sizes.fixPadding - 9.0, }}
                    />
                </View>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding, }}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    loginText() {
        return (
            <Text style={styles.loginTextStyle}>
                Login to Your Account
            </Text>
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
    loginTextStyle: {
        marginVertical: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        textAlign: 'center',
        ...Fonts.primaryColor18SemiBold
    },
    textFieldWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: '#e0e0e0',
        borderWidth: 0.50,
        elevation: 2.0,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        height: 50.0,
    },
    loginButtonStyle: {
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
    forgetPasswordTextStyle: {
        marginTop: Sizes.fixPadding - 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        textAlign: 'right',
        ...Fonts.grayColor14Medium
    },
    socialMediaIconWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        elevation: 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderColor: '#ececec',
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding,
    },
    socialMediaOptionsWrapStyle: {
        marginVertical: Sizes.fixPadding + 5.0,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    }
});

LoginScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(LoginScreen);
