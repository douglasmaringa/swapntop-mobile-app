import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

const aboutInfoList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare tortor ac enim sed in.',
    'Pharetra, bibendum iaculis faucibus vel fames placerat. Vivamus at in euismod in suspendisse. Tortor augue vitae faucibus nec vulputate dolor.',
    'usto, pulvinar donec vitae tincidunt posuere morbi sapien. Gravida viverra sed id at vel etiam facilisi. Congue commodo, amet lacus ac arcu morbi. Elit sit pellentesque ornare diam, dolor eu nisi pellentesque aliquam. Id quis consequat auctor adipiscing eget porta arcu, proin.',
];

class AboutUsScreen extends Component {

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
                    {this.aboutInfo()}
                </View>
            </SafeAreaView>
        )
    }

    aboutInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                {
                    aboutInfoList.map((item, index) => (
                        <Text key={`${index}`} style={{ textAlign: 'justify', marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                            {item}
                        </Text>
                    ))
                }
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
                    About us
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
});

AboutUsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(AboutUsScreen);
