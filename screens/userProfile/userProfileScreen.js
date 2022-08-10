import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, Dimensions, StatusBar, TouchableOpacity, ImageBackground, FlatList, Image, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

const { width } = Dimensions.get('window');

const userPostedAdsList = [
    {
        id: '1',
        productImage: require('../../assets/images/mobiles/mobile1.png'),
        productAmount: '$699',
        productName: 'IPhone X',
    },
    {
        id: '2',
        productImage: require('../../assets/images/mobiles/mobile2.png'),
        productAmount: '$999',
        productName: 'IPhone 11 white',
    },
    {
        id: '3',
        productImage: require('../../assets/images/mobiles/mobile11.png'),
        productAmount: '$649',
        productName: 'IPhone X',
    },
    {
        id: '4',
        productImage: require('../../assets/images/mobiles/mobile5.png'),
        productAmount: '$799',
        productName: 'IPhone 11',
    },
    {
        id: '5',
        productImage: require('../../assets/images/mobiles/mobile9.png'),
        productAmount: '$499',
        productName: 'IPhone 7',
    },
];

class UserProfileScreen extends Component {

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

    item = this.props.navigation.getParam('item');

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.profileInfo()}
                    {this.userPostedAdsInfo()}
                </View>
            </SafeAreaView>
        )
    }

    userPostedAdsInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('ProductDetail')}
                style={styles.availableProductsWrapStyle}
            >
                <ImageBackground
                    source={item.productImage}
                    style={{ height: 170.0 }}
                    borderRadius={Sizes.fixPadding - 5.0}
                >
                    <View style={styles.productInfoOuterWrapStyle}>
                        <View style={styles.productInfoWrapStyle}>
                            <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                {item.productAmount}
                            </Text>
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.grayColor12Medium }}>
                                {item.productName}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
        return (
            <>
                <View style={styles.userPostedAdsInfoWrapStyle}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {userPostedAdsList.length} Ads Posted
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                        Active since June 17
                    </Text>
                </View>
                <FlatList
                    data={userPostedAdsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={2}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding + 5.0, paddingHorizontal: Sizes.fixPadding + 5.0 }}
                    showsVerticalScrollIndicator={false}
                />
            </>
        )
    }

    profileInfo() {
        return (
            <View style={{ alignItems: 'center', margin: Sizes.fixPadding * 2.0, }}>
                <Image
                    source={this.item.userImage}
                    style={{ width: 60.0, height: 60.0, borderRadius: 30.0, }}
                />
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    {this.item.userName}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 4.0, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.props.navigation.push('ChatWithUser', { item: this.item })}
                        style={styles.chatAndCallButtonStyle}
                    >
                        <Image
                            source={require('../../assets/images/icons/chat.png')}
                            style={{ width: 18.0, height: 18.0, tintColor: Colors.primaryColor }}
                        />
                    </TouchableOpacity>
                    <View style={styles.chatAndCallButtonStyle}>
                        <MaterialIcons
                            name="phone"
                            color={Colors.primaryColor}
                            size={20}
                        />
                    </View>
                </View>
            </View>
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
    chatAndCallButtonStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        width: 40.0,
        height: 40.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
    },
    availableProductsWrapStyle: {
        flex: 1,
        maxWidth: (width / 2.0) - 25.0,
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
    },
    productInfoOuterWrapStyle: {
        position: 'absolute',
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomRightRadius: Sizes.fixPadding - 5.0,
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        overflow: 'hidden',
        paddingTop: Sizes.fixPadding - 5.0,
    },
    productInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 10.0,
        paddingBottom: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 5.0,
    },
    userPostedAdsInfoWrapStyle: {
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

UserProfileScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(UserProfileScreen);