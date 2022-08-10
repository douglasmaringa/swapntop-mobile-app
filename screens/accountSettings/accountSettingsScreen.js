import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, Image, ScrollView, StatusBar, TextInput, TouchableOpacity, StyleSheet, Text, } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import { BottomSheet } from 'react-native-elements';
import {auth} from "../../firebase"

class AccountSettingsScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop()
        return true;
    };

    state = {
        name: 'Samantha Smith',
        email: 'smithsamantha@gmail.com',
        mobileNo: '+91 1236547890',
        password: '12345678901',
        showBottomSheet: false,
    }

    
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.changeProfilePic()}
                        {this.nameInfo()}
                        {this.emailInfo()}
                        {this.mobileNumberInfo()}
                        {this.passwordInfo()}
                        {this.updateInfoButton()}
                    </ScrollView>
                    {this.changeProfilePicOptionsSheet()}
                </View>
            </SafeAreaView>
        )
    }

    changeProfilePicOptionsSheet() {
        return (
            <BottomSheet
                isVisible={this.state.showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { this.setState({ showBottomSheet: false }) } }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showBottomSheet: false })}
                    style={styles.changeProfilePicBottomSheetStyle}
                >
                    <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor16SemiBold, textAlign: 'center' }}>
                        Choose Option
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <MaterialIcons
                            name="photo-camera"
                            color={Colors.blackColor}
                            size={17}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14SemiBold, }}>
                            Take a picture
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: Sizes.fixPadding + 5.0 }}>
                        <MaterialCommunityIcons
                            name="image-area"
                            color={Colors.blackColor}
                            size={17}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14SemiBold, }}>
                            Select from gallery
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <MaterialIcons
                            name="delete"
                            color={Colors.blackColor}
                            size={17}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14SemiBold, }}>
                            Remove Profile Picture
                        </Text>
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    updateInfoButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.pop()}
                style={styles.updateInfoButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    UPDATE INFO
                </Text>
            </TouchableOpacity>
        )
    }

    passwordInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 10.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor12SemiBold }}>
                    Password
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        value={this.state.password}
                        onChangeText={(value) => this.setState({ password: value })}
                        style={{ ...Fonts.blackColor14Medium, height: 20.0 }}
                        secureTextEntry={true}
                        selectionColor={Colors.primaryColor}
                    />
                </View>
            </View>
        )
    }

    mobileNumberInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 10.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor12SemiBold }}>
                    Mobile Number
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={this.state.mobileNo}
                        onChangeText={(value) => this.setState({ mobileNo: value })}
                        style={{ ...Fonts.blackColor14Medium, height: 20.0 }}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        )
    }

    emailInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 10.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor12SemiBold }}>
                    Email
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        value={this.state.email}
                        onChangeText={(value) => this.setState({ email: value })}
                        style={{ ...Fonts.blackColor14Medium, height: 20.0 }}
                        selectionColor={Colors.primaryColor}
                    />
                </View>
            </View>
        )
    }

    nameInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 10.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor12SemiBold }}>
                    Full Name
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        value={this.state.name}
                        onChangeText={(value) => this.setState({ name: value })}
                        style={{ ...Fonts.blackColor14Medium, height: 20.0 }}
                        selectionColor={Colors.primaryColor}
                    />
                </View>
            </View>
        )
    }

    changeProfilePic() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ showBottomSheet: true })}
                style={{ margin: Sizes.fixPadding * 2.0, alignItems: 'center' }}
            >
                <Image
                    source={require('../../assets/images/users/user1.png')}
                    style={{ width: 80.0, height: 80.0, borderRadius: 40.0, }}
                />
                <View style={styles.changeOptionWrapStyle}>
                    <MaterialIcons
                        name="photo-camera"
                        color={Colors.whiteColor}
                        size={14}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.whiteColor12Bold }}>
                        Change
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.whiteColor}
                    size={22}
                    onPress={() => this.props.navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, flex: 1, ...Fonts.whiteColor18SemiBold }}>
                    Account Info
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
    },
    changeOptionWrapStyle: {
        position: 'absolute',
        bottom: -5.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        elevation: 10.0,
        shadowColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding - 3.0,
        paddingVertical: Sizes.fixPadding - 8.0,
    },
    textFieldWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderColor: '#ececec',
        borderWidth: 1.0,
    },
    updateInfoButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 5.0,
        shadowColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderColor: 'rgba(75, 44, 32, 0.5)',
        borderWidth: 1.0,
    },
    changeProfilePicBottomSheetStyle: {
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
    },
});

AccountSettingsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(AccountSettingsScreen);