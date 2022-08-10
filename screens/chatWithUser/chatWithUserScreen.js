import React, { Component, } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, FlatList, TextInput, Image, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, Ionicons, Feather, } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

const userMessagesList = [
    {
        id: '1',
        message: `Lorem ipsum dolor sit amet, consectetur\nadipiscing elit.`,
        time: '10:49 AM',
        isSender: true,
        isSeen: true,
    },
    {
        id: '2',
        message: `Lorem ipsum dolor sit amet, consectetur\nadipiscing elit.`,
        time: '10:49 AM',
        isSender: false,
    },
    {
        id: '3',
        message: `Lorem ipsum dolor sit amet.`,
        time: '10:49 AM',
        isSender: false,
    },
    {
        id: '4',
        message: `Lorem ipsum dolor`,
        time: '10:49 AM',
        isSender: false,
    },
    {
        id: '5',
        message: `Lorem ipsum dolor sit amet.`,
        time: '10:49 AM',
        isSender: true,
        isSeen: true,
    },
];

class ChatWithUserScreen extends Component {

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

    state = {
        userMessages: userMessagesList,
        message: null,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <View style={{ flex: 1, }}>
                        {this.messages()}
                        {this.typeMessage()}
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    addMessage({ message }) {

        const oldMessages = this.state.userMessages;
        let date = Date();
        let hour = (new Date(date)).getHours();
        let minute = (new Date(date)).getMinutes();
        let AmPm = hour >= 12 ? 'pm' : 'am';
        let finalhour = hour > 12 ? (hour - 12) : hour;

        const newMessage = {
            id: this.state.userMessages.length + 1,
            message: message,
            time: `${finalhour}:${minute} ${AmPm}`,
            isSender: true,
            isSeen: false,
        }

        oldMessages.push(newMessage);
        this.setState({ userMessages: oldMessages });
    }

    typeMessage() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Feather
                        name="plus-circle"
                        size={16}
                        color={Colors.grayColor}
                        style={{ marginRight: Sizes.fixPadding, }}
                    />
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={this.state.message}
                        onChangeText={(text) => this.setState({ message: text })}
                        placeholder='Type your message...'
                        style={{ flex: 1, ...Fonts.blackColor12Medium }}
                        placeholderTextColor={Colors.grayColor}
                    />
                </View>
                <MaterialCommunityIcons
                    name="send"
                    size={18}
                    color={Colors.primaryColor}
                    onPress={() => {
                        if (this.state.message != null) {
                            this.addMessage({ message: this.state.message })
                            this.setState({ message: null })
                        }
                    }}
                    style={{ alignSelf: 'center' }}
                />
            </View>
        )
    }

    messages() {

        const renderItem = ({ item }) => {
            return (
                <View style={{
                    alignItems: item.isSender == true ? 'flex-end' : 'flex-start',
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginVertical: Sizes.fixPadding,
                }}>
                    {
                        < View style={{
                            ...styles.messageWrapStyle,
                            elevation: 1.0,
                            borderColor: item.isSender == true ? Colors.primaryColor : '#ececec',
                            borderWidth: 1.0,
                            backgroundColor: item.isSender == true ? Colors.primaryColor : Colors.whiteColor,
                        }}>
                            <Text style={item.isSender ? { ...Fonts.whiteColor14Medium } : { ...Fonts.blackColor14Medium }}>
                                {item.message}
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: Sizes.fixPadding - 5.0, alignSelf: 'flex-end'
                            }}>
                                <Text style={{
                                    ...item.isSender ? { ...Fonts.whiteColor10SemiBold } : { ...Fonts.grayColor10SemiBold },
                                }}>
                                    {item.time}
                                </Text>
                                {item.isSender == true ?
                                    <Ionicons
                                        name={item.isSeen == true ? "checkmark-done-sharp" : "checkmark-sharp"}
                                        size={14}
                                        color={Colors.whiteColor}
                                        style={{ marginLeft: Sizes.fixPadding - 5.0, }}
                                    />
                                    :
                                    null
                                }
                            </View>
                        </View>
                    }
                </View >
            )
        }
        return (
            <FlatList
                inverted
                data={this.state.userMessages}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: Sizes.fixPadding * 2.0,
                    flexDirection: 'column-reverse',
                }}
            />
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="arrow-back-ios"
                        color={Colors.whiteColor}
                        size={22}
                        onPress={() => this.props.navigation.pop()}
                    />
                    <Image
                        source={this.item.userImage}
                        style={{ marginLeft: Sizes.fixPadding - 5.0, width: 40.0, height: 40.0, borderRadius: 20.0, }}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.whiteColor18SemiBold }}>
                        {this.item.userName}
                    </Text>
                </View>
                <MaterialIcons
                    name="more-vert"
                    color={Colors.whiteColor}
                    size={22}
                />
            </View>
        )
    }
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
    messageWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    textFieldWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        height: 50.0,
        elevation: 1.0,
        borderColor: '#ececec',
        borderWidth: 1.0,
        justifyContent: 'center',
        paddingLeft: Sizes.fixPadding,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding + 5.0,
    },
    sendOrReceiveImageWrapStyle: {
        width: 200.0,
        height: 150.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

ChatWithUserScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(ChatWithUserScreen);