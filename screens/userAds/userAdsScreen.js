import React, { Component, useState } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import { TabView, TabBar } from 'react-native-tab-view';
import AllAds from "../allAds/allAds";

const allAdsList = [
    {
        id: '1',
        productImage: require('../../assets/images/sofas/sofa1.png'),
        productAmount: '$99',
        productName: 'Three Seater Sofa with Table',
        productAge: '6 months',
        published: '17 Oct,2020',
        productStatus: 'ACTIVE',
        productStatusDescription: 'This ad currently live',
        views: 525,
        likes: 10,
    },
    {
        id: '2',
        productImage: require('../../assets/images/sofas/sofa8.png'),
        productAmount: '$199',
        productName: 'Wooden Sofa Set',
        productAge: '6 months',
        published: '18 Jun,2020',
        productStatus: 'INACTIVE',
        productStatusDescription: 'This ad currently live',
        views: 525,
        likes: 10,
    },
    {
        id: '3',
        productImage: require('../../assets/images/sofas/sofa7.png'),
        productAmount: '$299',
        productName: 'Wooden Sofa Set',
        productAge: '6 months',
        published: '18 Jun,2020',
        productStatus: 'PENDING',
        productStatusDescription: 'This ad was disabled',
        views: 525,
        likes: 10,
    },
    {
        id: '4',
        productImage: require('../../assets/images/sofas/sofa6.png'),
        productAmount: '$99',
        productName: 'Three Seater Sofa with Table',
        productAge: '6 months',
        published: '17 Oct,2020',
        productStatus: 'ACTIVE',
        productStatusDescription: 'This ad currently live',
        views: 525,
        likes: 10,
    }
];

class UserAdsScreen extends Component {

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

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <AdsOptionsTabs props={this.props} />
                </View>
            </SafeAreaView>
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
                    My Ads
                </Text>
            </View>
        )
    }

}

const AdsOptionsTabs = ({ props }) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Viewall' },
        { key: 'second', title: 'Active' },
        { key: 'third', title: 'Inactive' },
        { key: 'forth', title: 'Pending' },
    ]);

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <AllAds
                    props={props}
                    ads={allAdsList}
                    emptyMessage='There is no any Ads'
                />;
            case 'second':
                return <AllAds
                    props={props}
                    ads={allAdsList.filter((item) => item.productStatus == 'ACTIVE')}
                    emptyMessage='There is no Active Ads'
                />;
            case 'third':
                return <AllAds
                    props={props}
                    ads={allAdsList.filter((item) => item.productStatus == null)}
                    emptyMessage='There is no Inactive Ads'
                />;
            case 'forth':
                return <AllAds
                    props={props}
                    ads={allAdsList.filter((item) => item.productStatus == 'PENDING')}
                    emptyMessage='There is no Pending Ads'
                />;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    activeColor={Colors.primaryColor}
                    indicatorStyle={styles.tabIndicatorStyle}
                    style={styles.adOptionsTabStyle}
                    tabStyle={{ width: 'auto' }}
                    renderLabel={({ route, focused }) => (
                        <Text
                            style={focused ? { ...Fonts.primaryColor16SemiBold } : { ...Fonts.grayColor16SemiBold }}>
                            {route.title}
                        </Text>
                    )}
                />
            )}
        />
    )
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
    adOptionsTabStyle: {
        marginTop: Sizes.fixPadding,
        borderBottomColor: Colors.lightGrayColor,
        borderBottomWidth: 4.0,
        backgroundColor: Colors.whiteColor,
        elevation: 0.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    tabIndicatorStyle: {
        height: 4.0,
        position: 'absolute',
        bottom: -4.0,
        backgroundColor: Colors.primaryColor,
    }
});

UserAdsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(UserAdsScreen);
