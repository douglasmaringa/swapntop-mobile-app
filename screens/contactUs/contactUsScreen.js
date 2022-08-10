import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, ScrollView, TextInput, StatusBar, TouchableOpacity, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

class ContactUsScreen extends Component {

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

    state = {
        name: '',
        email: '',
        support: '',
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
                    >
                        {this.nameTextField()}
                        {this.emailTextField()}
                        {this.supportTextField()}
                        {this.submitButton()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.pop()}
                style={styles.submitButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    SUBMIT
                </Text>
            </TouchableOpacity>
        )
    }

    supportTextField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 3.0, }}>
                <TextInput
                    placeholder="Write your message"
                    multiline={true}
                    numberOfLines={6}
                    mode="outlined"
                    value={this.state.support}
                    onChangeText={text => this.setState({ support: text })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                />
            </View>

        )
    }

    emailTextField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 3.0 }}>
                <TextInput
                    placeholder="Email"
                    mode="outlined"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    style={{
                        ...styles.textFieldStyle,
                        paddingVertical: Sizes.fixPadding + 2.0,
                    }}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    nameTextField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 3.0 }}>
                <TextInput
                    placeholder="Full Name"
                    mode="outlined"
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                    style={{
                        ...styles.textFieldStyle,
                        paddingVertical: Sizes.fixPadding + 2.0,
                    }}
                    selectionColor={Colors.primaryColor}
                />
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
                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, flex: 1, ...Fonts.whiteColor18SemiBold }}>
                    Contact us
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
    textFieldStyle: {
        ...Fonts.blackColor14Medium,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: '#ececec',
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding,
    },
    submitButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 5.0,
        shadowColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
        borderColor: 'rgba(75, 44, 32, 0.5)',
        borderWidth: 1.0,
    },
});

ContactUsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(ContactUsScreen);
