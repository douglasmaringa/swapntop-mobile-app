import React, { Component } from "react";
import { SafeAreaView, View, Dimensions, ScrollView, StatusBar, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';
import Dialog from "react-native-dialog";
import {auth} from "../../firebase"

const { width } = Dimensions.get('window');

class AccountScreen extends Component {

    state = {
        showLogoutDialog: false,
    }
   

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, }}
                    >
                        {this.accountInfo()}
                        {this.divider()}
                        {this.accountOptions()}
                        {this.logoutOption()}
                        {this.divider()}
                    </ScrollView>
                    {this.logoutDialog()}
                </View>
            </SafeAreaView>
        )
    }

    logoutDialog() {
        return (
            <Dialog.Container
                visible={this.state.showLogoutDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
                onRequestClose={() => this.setState({ showLogoutDialog: false })}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold, }}>
                        Sure you want to Logout?
                    </Text>
                    <View style={{ marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ showLogoutDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.primaryColor14Bold }}>
                                CANCEL
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                this.setState({ showLogoutDialog: false })
                                auth.signOut().then(() => {
                                    this.props.navigation.push('Login')
                                })
                                
                            }}
                            style={styles.logoutButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor14Bold }}>
                                LOGOUT
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    logoutOption() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ showLogoutDialog: true })}
                style={{ flexDirection: 'row', alignItems: 'center', margin: Sizes.fixPadding * 2.0, }}
            >
                <Image
                    source={require('../../assets/images/icons/logout.png')}
                    style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
                />
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor14SemiBold }}>
                    Logout
                </Text>
            </TouchableOpacity>
        )
    }

    accountOptions() {
        return (
            <>
                {this.accountOptionsSort({
                    icon: <MaterialIcons name="person" color={Colors.blackColor} size={18} />,
                    option: 'Account Settings',
                    navigateTo: 'AccountSettings'
                })}
                {this.divider()}
                {this.accountOptionsSort({
                    icon: <MaterialIcons name="assignment" size={18} color={Colors.blackColor} />,
                    option: 'My Ads',
                    navigateTo: 'UserAds'
                })}
                {this.divider()}
                {this.accountOptionsSort({
                    icon: <MaterialIcons name="favorite" size={18} color={Colors.blackColor} />,
                    option: 'Favorite',
                    navigateTo: 'FavoriteAd'
                })}
                {this.divider()}
                {this.accountOptionsSort({
                    icon: <MaterialIcons name="notifications" size={18} color={Colors.blackColor} />,
                    option: 'Notifications',
                    navigateTo: 'Notifications'
                })}
                {this.divider()}
                {this.accountOptionsSort({
                    icon: <MaterialIcons name="info" size={18} color={Colors.blackColor} />,
                    option: 'About us',
                    navigateTo: 'AboutUs',
                })}
                {this.divider()}
                {this.accountOptionsSort({
                    icon: <MaterialIcons name="email" size={18} color={Colors.blackColor} />,
                    option: 'Contact us',
                    navigateTo: 'ContactUs',
                })}
                {this.divider()}
                {this.accountOptionsSort({
                    icon: <MaterialIcons name="share" size={18} color={Colors.blackColor} />,
                    option: 'Share app'
                })}
                {this.divider()}
            </>
        )
    }

    accountOptionsSort({ icon, option, navigateTo }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push(navigateTo)}
                style={{ flexDirection: 'row', alignItems: 'center', margin: Sizes.fixPadding * 2.0, }}
            >
                {icon}
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14SemiBold }}>
                    {option}
                </Text>
            </TouchableOpacity>
        )
    }

    divider() {
        return (
            <View
                style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, marginHorizontal: Sizes.fixPadding * 2.0, }}
            />
        )
    }

    accountInfo() {
        return (
            <View style={styles.accountInfoWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <SharedElement id="photo">
                        <Image source={require('../../assets/images/users/user1.png')}
                            style={{ width: 50.0, height: 50.0, borderRadius: 25.0, }}
                        />
                    </SharedElement>
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            Samantha Smith
                        </Text>
                        <Text style={{ ...Fonts.grayColor12Medium }}>
                            Mumbai, Maharashtra
                        </Text>
                    </View>
                </View>
                <MaterialIcons
                    name="arrow-forward-ios"
                    color={Colors.blackColor}
                    size={15}
                    onPress={() => this.props.navigation.push('UserProfile2', { id: 'photo' })}
                />
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                    Account
                </Text>
            </View>
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
    accountInfoWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: width - 40,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    cancelButtonStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderColor: '#ececec',
        borderWidth: 1.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutButtonStyle: {
        flex: 1,
        marginHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 5.0,
        shadowColor: Colors.primaryColor,
        borderColor: 'rgba(75, 44, 32, 0.5)',
        borderWidth: 1.0,
    }
});

export default withNavigation(AccountScreen);