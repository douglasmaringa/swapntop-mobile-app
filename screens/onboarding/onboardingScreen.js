import React, { Component, useRef, useState } from "react";
import { BackHandler, Animated, SafeAreaView, View, StatusBar, StyleSheet, Image, Dimensions, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { NavigationEvents } from 'react-navigation';;

const { width, height } = Dimensions.get('window');

const onboardingScreenList = [
    {
        id: '1',
        onboardingImage: require('../../assets/images/onboardings/onboarding1.png'),
        title: 'Launch Your Classifieds Marketplace',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id tellus nisl, praesent neque molestie.`,
    },
    {
        id: '2',
        onboardingImage: require('../../assets/images/onboardings/onboarding2.png'),
        title: 'Find What You Need',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id tellus nisl, praesent neque molestie.`,
    },
    {
        id: '3',
        onboardingImage: require('../../assets/images/onboardings/onboarding3.png'),
        title: 'Sell Your Products',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id tellus nisl, praesent neque molestie.`,
    },
    {
        id: '4',
        onboardingImage: require('../../assets/images/onboardings/onboarding4.png'),
        title: 'Map View',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id tellus nisl, praesent neque molestie.`,
    },
];

class OnboardingScreen extends Component {

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
        backClickCount: 0
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <NavigationEvents onDidFocus={() => {
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
                }} />
                <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                    <Onboarding props={this.props} />
                </View>
                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <Text style={{ ...Fonts.whiteColor12Medium }}>
                        Press Back Once Again to Exit
                    </Text>
                </Animated.View>
            </SafeAreaView>
        )
    }
}

const Onboarding = ({ props }) => {

    const [onboardingScreens, setOnboardingScreen] = useState(onboardingScreenList);
    const [activeSlide, setActiveSlide] = useState(0);

    const flatListRef = useRef();

    const renderItem = ({ item }) => {
        return (
            <>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Image
                        source={item.onboardingImage}
                        style={{ width: width - 40.0, height: height / 2.5, }}
                    />
                    <View style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                        <Text style={{ textAlign: 'center', ...Fonts.blackColor18SemiBold }}>
                            {item.title}
                        </Text>
                        <Text style={{ marginTop: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                            {item.description}
                        </Text>
                    </View>
                </View>
            </>
        )
    }

    return (
        <>
            <Carousel
                ref={flatListRef}
                data={onboardingScreens}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
                lockScrollWhileSnapping={true}
                showsHorizontalScrollIndicator={false}
                onSnapToItem={(index) => setActiveSlide(index)}
                autoplay={true}
                loop={true}
               
                autoplayInterval={4000}
                slideStyle={{ width: width }}
            />
            {pagination()}
            {skipNextAndLogin()}
        </>
    )

    function skipNextAndLogin() {
        return (
            <View style={styles.skipAndLoginWrapStyle}>
                {activeSlide != 3
                    ?
                    <Text
                        onPress={() => props.navigation.push('Login')}
                        style={{ ...Fonts.grayColor14SemiBold }}>
                        Skip
                    </Text>
                    :
                    <Text>
                    </Text>
                }
                {
                    activeSlide == 3
                        ?
                        <Text
                            onPress={() => props.navigation.push('Login')}
                            style={{ ...Fonts.primaryColor14SemiBold }}
                        >
                            Login
                        </Text>
                        :
                        <Text
                            onPress={() => {
                                if (activeSlide == 0) {
                                    flatListRef.current.snapToItem(1);
                                }
                                else if (activeSlide == 1) {
                                    flatListRef.current.snapToItem(2);
                                }
                                else if (activeSlide == 2) {
                                    flatListRef.current.snapToItem(3);
                                }
                            }}
                            style={{ ...Fonts.primaryColor14SemiBold }}
                        >
                            Next
                        </Text>
                }
            </View>
        )
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={onboardingScreens.length}
                activeDotIndex={activeSlide}
                containerStyle={{
                    position: 'absolute',
                    bottom: 0.0,
                    alignSelf: 'center'
                }}
                dotStyle={styles.activeDotStyle}
                inactiveDotStyle={styles.dotStyle}
                inactiveDotScale={1}
            />
        );
    }
}

const styles = StyleSheet.create({
    dotStyle: {
        backgroundColor: Colors.lightGrayColor,
        marginHorizontal: Sizes.fixPadding - 15.0,
        width: 16.0,
        height: 8.0,
        borderRadius: Sizes.fixPadding,
    },
    activeDotStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        height: 8.0,
        width: 26.0,
        marginHorizontal: Sizes.fixPadding - 15.0,
    },
    skipAndLoginWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 25.0,
        left: 20.0,
        right: 20.0,
    },
    nextAndLoginButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        alignItems: 'center',
        justifyContent: 'center',
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

OnboardingScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(OnboardingScreen);