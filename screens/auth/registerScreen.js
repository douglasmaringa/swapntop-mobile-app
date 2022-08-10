import React, { Component } from "react";
import firebase from 'firebase'
import {auth,db} from "../../firebase"
import { BackHandler, SafeAreaView, View, StatusBar, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

class RegisterScreen extends Component {

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
        this.props.navigation.pop();
        return true;
    };

    state = {
        name: null,
        email: null,
        mobileNumber: null,
        password: null,
        securePassword: true,
        confirmPassword: null,
        secureConfirmPassword: true,
        rememberPassword: false,
    }

        register = () =>  {
            console.log("clicked")
        
        auth
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: this.state.name,
                    photoURL: 'https://secure.gravatar.com/avatar/d3afc60628a78f856952f6d76a2f37b8?s=150&r=g&d=https://delivery.farmina.com.br/wp-content/plugins/userswp/assets/images/no_profile.png',
                })
                 db.collection('users').add({
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    email:this.state.email.toLowerCase(),
                    name:this.state.name,
                    image:'https://secure.gravatar.com/avatar/d3afc60628a78f856952f6d76a2f37b8?s=150&r=g&d=https://delivery.farmina.com.br/wp-content/plugins/userswp/assets/images/no_profile.png',
                    userid:authUser.user.uid,
                    contact:this.state.mobileNumber,
                    chatroom:[],
                    friends:[],
                   
                  }).then((res)=>{
                      console.log("done",res.id)
                      this.props.navigation.push('BottomTabBar')
                  }).catch(error => alert(error.message))
                  })
            .catch(error => alert(error.message))
   
        }

    render() {
       
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <View style={styles.pageStyle}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}>
                            {this.registerTextWithBackArrow()}
                            {this.fullNameTextField()}
                            {this.emailTextField()}
                            {this.mobileNumberTextField()}
                            {this.passwordTextField()}
                            {/*{this.confirmPasswordTextField()}*/}
                            {this.registerButton()}
                            {this.orConnectWithIndicator()}
                            {this.socialMediaOptions()}
                            {this.alreadyAccountInfo()}
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    alreadyAccountInfo() {
        return (
            <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, textAlign: 'center' }}>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Already have an account?{` `}
                </Text>
                <Text
                    onPress={() => this.props.navigation.push('Login')}
                    style={{ ...Fonts.primaryColor16Medium }}
                >
                    Login Now
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

    registerButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.register()}
                style={styles.registerButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    REGISTER
                </Text>
            </TouchableOpacity>
        )
    }

    confirmPasswordTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, marginTop: Sizes.fixPadding + 10.0, }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 20.0, }}>
                        <FontAwesome5 name="unlock-alt" size={16} color={Colors.primaryColor} style={{ marginLeft: Sizes.fixPadding - 7.0, }} />
                    </View>
                    <TextInput
                        secureTextEntry={this.state.secureConfirmPassword}
                        placeholder="Confirm Password"
                        placeholderTextColor={Colors.grayColor}
                        style={{ flex: 1, ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding, }}
                        value={this.state.confirmPassword}
                        onChangeText={(text) => this.setState({ confirmPassword: text })}
                    />
                </View>
                <MaterialIcons
                    name={this.state.secureConfirmPassword ? "visibility-off" : 'visibility'}
                    color={Colors.grayColor}
                    size={16}
                    onPress={() => this.setState({ secureConfirmPassword: !this.state.secureConfirmPassword })}
                />
            </View>
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
                        placeholder="Create Password"
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

    mobileNumberTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, marginTop: Sizes.fixPadding + 10.0, }}>
                <View style={{ width: 20.0, }}>
                    <MaterialIcons
                        name="phone-android"
                        color={Colors.primaryColor}
                        size={18}
                        style={{ marginLeft: Sizes.fixPadding - 9.0, }}
                    />
                </View>
                <TextInput
                    placeholder="Mobile Number"
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding, }}
                    value={this.state.mobileNumber}
                    onChangeText={(text) => this.setState({ mobileNumber: text })}
                    selectionColor={Colors.primaryColor}
                    keyboardType="numeric"
                />
            </View>
        )
    }

    emailTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, marginTop: Sizes.fixPadding + 10.0, }}>
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

    fullNameTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle }}>
                <View style={{ width: 20.0, }}>
                    <FontAwesome5 name="user-alt" size={13} color={Colors.primaryColor} style={{ marginLeft: Sizes.fixPadding - 7.0, }} />
                </View>
                <TextInput
                    placeholder="Full Name"
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding, }}
                    value={this.state.name}
                    onChangeText={(text) => this.setState({ name: text })}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    registerTextWithBackArrow() {
        return (
            <View style={styles.registerTextWithBackArrowWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => this.props.navigation.pop()}
                />
                <Text style={styles.registerTextStyle}>
                    Create Your Account
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
    registerTextStyle: {
        textAlign: 'center',
        flex: 1,
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
    registerButtonStyle: {
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
    registerTextWithBackArrowWrapStyle: {
        marginVertical: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

RegisterScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(RegisterScreen);
