import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, Dimensions, StatusBar, TouchableOpacity, ImageBackground, FlatList, Image, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import { SharedElement } from 'react-navigation-shared-element';

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

const numberofFullRow = Math.floor(userPostedAdsList.length / 2);

let numberOfElementLatRow = userPostedAdsList.length - (numberofFullRow * 2);

if (numberOfElementLatRow == 0) {
    while (numberOfElementLatRow !== 1) {
        userPostedAdsList.push({ id: `${userPostedAdsList.length + 1}`, empty: true });
        numberOfElementLatRow = numberOfElementLatRow + 1;
    }
}
else {
    while (numberOfElementLatRow !== 2) {
        userPostedAdsList.push({ id: `${userPostedAdsList.length + 1}`, empty: true });
        numberOfElementLatRow = numberOfElementLatRow + 1;
    }
}

class UserProfile2Screen extends Component {

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

    id = this.props.navigation.getParam('id');

    static sharedElements = (navigation) => {
        const id = navigation.getParam('id');
        return [id];
    }

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

    postNewAdInfo() {
        return (
            <View style={styles.postNewAdInfoWrapStyle} >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.push('UploadAd')}
                    style={styles.cameraIconWrapStyle}
                >
                    <Image
                        source={require('../../assets/images/icons/camera.png')}
                        style={{ width: 20.0, height: 20.0, resizeMode: 'contain', tintColor: Colors.whiteColor }}
                    />
                </TouchableOpacity>
                <Text style={{ marginTop: Sizes.fixPadding - 8.0, ...Fonts.grayColor12SemiBold }}>
                    Post New ad
                </Text>
            </View>
        )
    }

    userPostedAdsInfo() {
        const renderItem = ({ item }) => (
            item.empty ?
                this.postNewAdInfo()
                :
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
                    columnWrapperStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding + 5.0, paddingHorizontal: Sizes.fixPadding + 5.0 }}
                    showsVerticalScrollIndicator={false}
                />
            </>
        )
    }

    profileInfo() {
        return (
            <View style={{ alignItems: 'center', marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <SharedElement id={this.id}>
                    <Image
                        source={require('../../assets/images/users/user1.png')}
                        style={{ width: 60.0, height: 60.0, borderRadius: 30.0, }}
                    />
                </SharedElement>
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    Samantha Smith
                </Text>
                <Text style={{ ...Fonts.grayColor12Medium }}>
                    Mumbai, Maharashtra
                </Text>
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
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding + 5.0,
    },
    cameraIconWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        backgroundColor: Colors.primaryColor,
        elevation: 5.0,
        shadowColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    postNewAdInfoWrapStyle: {
        backgroundColor: '#F4F4F4',
        elevation: 4.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
        flex: 1,
        maxWidth: (width / 2.0) - 25.0,
        height: 170.0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

UserProfile2Screen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(UserProfile2Screen);