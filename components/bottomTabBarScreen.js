import React, { Component } from "react";
import { View, Text, TouchableOpacity, Animated, Dimensions, StyleSheet, Image, BackHandler, SafeAreaView, StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { NavigationEvents } from 'react-navigation';
import HomeScreen from "../screens/home/homeScreen";
import SearchScreen from "../screens/search/searchScreen";
import ChatsScreen from "../screens/chats/chatsScreen";
import AccountScreen from "../screens/account/accountScreen";

const { height } = Dimensions.get('window');

class BottomTabBarScreen extends Component {

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
                        toValue: -.1 * height,
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

    index = this.props.navigation.getParam('index');

    state = {
        currentIndex: this.index ? this.index : 1,
        backClickCount: 0
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <NavigationEvents onDidFocus={() => {
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
                }} />
                <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                    {this.state.currentIndex == 1 ?
                        <HomeScreen /> :
                        this.state.currentIndex == 2 ?
                            <SearchScreen />
                            :
                            this.state.currentIndex == 4 ?
                                <ChatsScreen />
                                :
                                <AccountScreen />
                    }
                    <View style={styles.bottomTabBarStyle}>
                        <View style={{ width: '30%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            {this.bottomTabBarItem({
                                index: 1,
                                tabImage: require('../assets/images/icons/home.png')
                            })}
                            {this.bottomTabBarItem({
                                index: 2,
                                tabImage: require('../assets/images/icons/search.png')
                            })}
                        </View>
                        <View style={{ alignSelf: 'center', }}>
                            {this.bottomTabBarItem({
                                index: 3,
                                tabImage: require('../assets/images/icons/camera.png')
                            })}
                        </View>
                        <View style={{ width: '30%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            {this.bottomTabBarItem({
                                index: 4,
                                tabImage: require('../assets/images/icons/chat.png')
                            })}
                            {this.bottomTabBarItem({
                                index: 5,
                                tabImage: require('../assets/images/icons/account.png')
                            })}
                        </View>
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

    bottomTabBarItem({ index, tabImage }) {
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        index == 3
                            ?
                            this.props.navigation.push('UploadAd')
                            :
                            this.setState({ currentIndex: index })
                    }}
                >
                    {
                        index == 3
                            ?
                            <View style={styles.uploadIconWrapStyle}>
                                <Image
                                    source={tabImage}
                                    style={{ width: 22.0, height: 22.0, resizeMode: 'contain', tintColor: Colors.primaryColor, }}
                                />
                            </View>
                            :
                            <Image
                                source={tabImage}
                                style={{
                                    width: 24.0,
                                    height: 24.0,
                                    resizeMode: 'contain',
                                    tintColor: this.state.currentIndex == index ? Colors.primaryColor : Colors.grayColor
                                }}
                            />
                    }
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 50.0,
        backgroundColor: Colors.whiteColor,
        borderTopColor: '#ececec',
        borderTopWidth: 1.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 10.0,
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
    },
    uploadIconWrapStyle: {
        backgroundColor: Colors.whiteColor,
        width: 45.0,
        height: 45.0,
        borderColor: Colors.primaryColor,
        borderWidth: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22.5,
        bottom: 15.0,
    }
});

BottomTabBarScreen.navigationOptions = () => {
    return {
        header: () => null,
    }
}

export default withNavigation(BottomTabBarScreen);







