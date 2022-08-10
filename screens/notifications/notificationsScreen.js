import React, { useState, useRef, Component } from 'react';
import { Fonts, Colors, Sizes, } from "../../constants/styles";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Animated,
    Dimensions,
    BackHandler
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from "react-navigation";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { TransitionPresets } from 'react-navigation-stack';

const notificationList = [
    {
        key: '1',
        notification: 'Your ad just went online!',
        receiveTime: '2 days ago',
    },
    {
        key: '2',
        notification: 'Your ad has been rejected, because duplic-ate ads are not allowed...',
        receiveTime: '3 days ago',
    },
    {
        key: '3',
        notification: 'Your ad just went online!',
        receiveTime: '3 days ago',
    },
];

class NotificationsScreen extends Component {

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
                <StatusBar backgroundColor={Colors.primaryColor} />
                <Notifications props={this.props} />
            </SafeAreaView>
        )
    }
}

const rowTranslateAnimatedValues = {};

const Notifications = ({ props }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(notificationList);

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if (
            value < -Dimensions.get('window').width &&
            !animationIsRunning.current
        ) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.notification} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: ['0%', '100%'],
                        outputRange: ['0%', '100%'],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 5.0, }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', }}>
                        <View style={styles.notificationIconWrapStyle}>
                            <MaterialIcons name="notifications" size={22} color={Colors.whiteColor} />
                        </View>
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                            <Text numberOfLines={2} style={{ ...Fonts.blackColor14SemiBold }}>
                                {data.item.notification}
                            </Text>
                            <Text style={{ ...Fonts.grayColor12Medium }}>
                                {data.item.receiveTime}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Animated.View >
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.whiteColor}
                    size={22}
                    onPress={() => props.navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, flex: 1, ...Fonts.whiteColor18SemiBold }}>
                    Notifications
                </Text>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: Colors.whiteColor, flex: 1, }}>
            {header()}
            {listData.length == 0 ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <MaterialIcons name="notifications-off" size={26} color={Colors.grayColor} />
                    <Text style={{ ...Fonts.grayColor16SemiBold, marginTop: Sizes.fixPadding }}>
                        No new notifications
                    </Text>
                </View>
                :
                <SwipeListView
                    disableRightSwipe
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-Dimensions.get('window').width}
                    onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
                />
            }
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                {snackBarMsg}
            </Snackbar>
        </View>
    );
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
    notificationIconWrapStyle: {
        height: 50.0,
        width: 50.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: 25.0,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.whiteColor,
        borderWidth: 2.0,
        elevation: 3.0,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        flex: 1,
        marginBottom: Sizes.fixPadding,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    },
});

NotificationsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS
    }
}

export default withNavigation(NotificationsScreen);