import React, { Component, useState } from "react";
import { SafeAreaView, View, StatusBar, TouchableOpacity, FlatList, StyleSheet, Image, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TabView, TabBar } from 'react-native-tab-view';

const allChatsList = [
    {
        id: '1',
        userImage: require('../../assets/images/users/user2.png'),
        userName: 'Jane Cooper',
        lastMessage: 'Oky, great',
        lastMessageTime: '22 Oct,2020',
    },
    {
        id: '2',
        userImage: require('../../assets/images/users/user3.png'),
        userName: 'Annette Black',
        lastMessage: 'Thank you',
        lastMessageTime: '20 Oct,2020',
    },
    {
        id: '3',
        userImage: require('../../assets/images/users/user4.png'),
        userName: 'Courtney Henry',
        lastMessage: 'Yeah! Sure deal done...',
        lastMessageTime: '19 Oct,2020',
    },
    {
        id: '4',
        userImage: require('../../assets/images/users/user5.png'),
        userName: 'Jane Cooper',
        lastMessage: '8502 Preston Rd. Inglewood, Maine',
        lastMessageTime: '19 Oct,2020',
    },
    {
        id: '5',
        userImage: require('../../assets/images/users/user6.png'),
        userName: 'Wade Warren',
        lastMessage: 'Oky, great',
        lastMessageTime: '22 Oct,2020',
    },
    {
        id: '6',
        userImage: require('../../assets/images/users/user7.png'),
        userName: 'Devon Lane',
        lastMessage: 'Thank you',
        lastMessageTime: '20 Oct,2020',
    },
    {
        id: '7',
        userImage: require('../../assets/images/users/user8.png'),
        userName: 'Courtney Henry',
        lastMessage: 'Yeah! Sure deal done...',
        lastMessageTime: '19 Oct,2020',
    },
    {
        id: '8',
        userImage: require('../../assets/images/users/user9.png'),
        userName: 'Jerome Bell',
        lastMessage: '8502 Preston Rd. Inglewood, Maine',
        lastMessageTime: '19 Oct,2020',
    },
    {
        id: '9',
        userImage: require('../../assets/images/users/user10.png'),
        userName: 'Darrell Steward',
        lastMessage: 'Oky, great',
        lastMessageTime: '22 Oct,2020',
    },
    {
        id: '10',
        userImage: require('../../assets/images/users/user11.png'),
        userName: 'Wade Warren',
        lastMessage: 'Thank you',
        lastMessageTime: '20 Oct,2020',
    },
    {
        id: '11',
        userImage: require('../../assets/images/users/user12.png'),
        userName: 'Annette Black',
        lastMessage: 'Yeah! Sure deal done...',
        lastMessageTime: '19 Oct,2020',
    },
    {
        id: '12',
        userImage: require('../../assets/images/users/user13.png'),
        userName: 'Ralph Edwards',
        lastMessage: '8502 Preston Rd. Inglewood, Maine',
        lastMessageTime: '19 Oct,2020',
    },
];

const buyingChatsList = [
    {
        id: '1',
        userImage: require('../../assets/images/users/user2.png'),
        userName: 'Jane Cooper',
        lastMessage: 'Oky, great',
        lastMessageTime: '22 Oct,2020',
    },
    {
        id: '2',
        userImage: require('../../assets/images/users/user3.png'),
        userName: 'Annette Black',
        lastMessage: 'Thank you',
        lastMessageTime: '20 Oct,2020',
    },
    {
        id: '3',
        userImage: require('../../assets/images/users/user4.png'),
        userName: 'Courtney Henry',
        lastMessage: 'Yeah! Sure deal done...',
        lastMessageTime: '19 Oct,2020',
    },
    {
        id: '4',
        userImage: require('../../assets/images/users/user5.png'),
        userName: 'Jane Cooper',
        lastMessage: '8502 Preston Rd. Inglewood, Maine',
        lastMessageTime: '19 Oct,2020',
    },
    {
        id: '5',
        userImage: require('../../assets/images/users/user6.png'),
        userName: 'Wade Warren',
        lastMessage: 'Oky, great',
        lastMessageTime: '22 Oct,2020',
    },
    {
        id: '6',
        userImage: require('../../assets/images/users/user7.png'),
        userName: 'Devon Lane',
        lastMessage: 'Thank you',
        lastMessageTime: '20 Oct,2020',
    },
];

const sellingChatsList = [
    {
        id: '1',
        userImage: require('../../assets/images/users/user2.png'),
        userName: 'Jane Cooper',
        lastMessage: 'Oky, great',
        lastMessageTime: '22 Oct,2020',
    },
    {
        id: '2',
        userImage: require('../../assets/images/users/user3.png'),
        userName: 'Annette Black',
        lastMessage: 'Thank you',
        lastMessageTime: '20 Oct,2020',
    },
    {
        id: '3',
        userImage: require('../../assets/images/users/user4.png'),
        userName: 'Courtney Henry',
        lastMessage: 'Yeah! Sure deal done...',
        lastMessageTime: '19 Oct,2020',
    },
];

class ChatsScreen extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ChatTabs props={this.props} />
                </View>
            </SafeAreaView>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ flex: 1, ...Fonts.whiteColor18SemiBold }}>
                    Chats
                </Text>
                <MaterialIcons
                    name="search"
                    color={Colors.whiteColor}
                    size={19}
                />
            </View>
        )
    }
}

const ChatTabs = ({ props }) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'All' },
        { key: 'second', title: 'Buying' },
        { key: 'third', title: 'Selling' },
    ]);

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <AllChats props={props} />;
            case 'second':
                return <BuyingChats props={props} />;
            case 'third':
                return <SellingChats props={props} />;
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
                    style={styles.chatsTabStyle}
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

const AllChats = ({ props }) => {
    const renderItem = ({ item }) => (
        <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => props.navigation.push('ChatWithUser', { item: item })}
                style={{ flexDirection: 'row', alignItems: 'center', }}
            >
                <View style={styles.userImageWrapStyle}>
                    <Image
                        source={item.userImage}
                        style={{ width: 46.0, height: 46.0, borderRadius: 23.0, }}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                            {item.userName}
                        </Text>
                        <Text style={{ ...Fonts.grayColor10Medium }}>
                            {item.lastMessageTime}
                        </Text>
                    </View>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
                        {item.lastMessage}
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, marginVertical: Sizes.fixPadding, }} />
        </View>
    )
    return (
        <FlatList
            data={allChatsList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, paddingBottom: Sizes.fixPadding * 6.0, }}
        />
    )
}

const BuyingChats = ({ props }) => {
    const renderItem = ({ item }) => (
        <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => props.navigation.push('ChatWithUser', { item: item })}
                style={{ flexDirection: 'row', alignItems: 'center', }}
            >
                <View style={styles.userImageWrapStyle}>
                    <Image
                        source={item.userImage}
                        style={{ width: 46.0, height: 46.0, borderRadius: 23.0, }}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                            {item.userName}
                        </Text>
                        <Text style={{ ...Fonts.grayColor10Medium }}>
                            {item.lastMessageTime}
                        </Text>
                    </View>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
                        {item.lastMessage}
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, marginVertical: Sizes.fixPadding, }} />
        </View>
    )
    return (
        <FlatList
            data={buyingChatsList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, paddingBottom: Sizes.fixPadding * 6.0, }}
        />
    )
}

const SellingChats = ({ props }) => {
    const renderItem = ({ item }) => (
        <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => props.navigation.push('ChatWithUser', { item: item })}
                style={{ flexDirection: 'row', alignItems: 'center', }}
            >
                <View style={styles.userImageWrapStyle}>
                    <Image
                        source={item.userImage}
                        style={{ width: 46.0, height: 46.0, borderRadius: 23.0, }}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                            {item.userName}
                        </Text>
                        <Text style={{ ...Fonts.grayColor10Medium }}>
                            {item.lastMessageTime}
                        </Text>
                    </View>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
                        {item.lastMessage}
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, marginVertical: Sizes.fixPadding, }} />
        </View>
    )
    return (
        <FlatList
            data={sellingChatsList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, paddingBottom: Sizes.fixPadding * 6.0, }}
        />
    )
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
    },
    userImageWrapStyle: {
        width: 50.0,
        height: 50.0,
        backgroundColor: Colors.whiteColor,
        elevation: 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25.0,
    },
    chatsTabStyle: {
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

export default withNavigation(ChatsScreen);