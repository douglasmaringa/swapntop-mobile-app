import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, ScrollView, TouchableOpacity, TextInput, FlatList, Image, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

const itemPhotosList = [
    {
        id: '1',
        itemPhoto: require('../../assets/images/mobiles/mobile13.png'),
        itemDescription: 'Cover photo',
    },
    {
        id: '2',
        itemPhoto: require('../../assets/images/mobiles/mobile14.png'),
        itemDescription: 'Item picture 1',
    }
];

class EditAdScreen extends Component {

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
        brand: 'IPhone',
        title: 'Apple IPhone 11 Pro Max 256Gb Black',
        price: '$999',
        purchasedOn: '10-20-2020',
        condition: 'New',
        location: 'Mumbai, Maharashtra',
        description: 'Apple Iphone 11 Pro Max',
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}>
                        {this.itemPhotosInfo()}
                        {this.divider()}
                        {this.itemInfo()}
                    </ScrollView>
                    {this.updateInfoButton()}
                </View>
            </SafeAreaView>
        )
    }

    updateInfoButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.pop()}
                style={styles.updateInfoButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    UPDATE INFO
                </Text>
            </TouchableOpacity>
        )
    }

    itemInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    Item Info
                </Text>
                {this.itemBrandInfo()}
                {this.adTitleInfo()}
                {this.itemPriceInfo()}
                {this.purchashedOnInfo()}
                {this.conditionInfo()}
                {this.locationInfo()}
                {this.descriptionInfo()}
            </View>
        )
    }

    descriptionInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor12SemiBold }}>
                    Write Short Description About Item
                </Text>
                <TextInput
                    placeholder="Write here..."
                    style={styles.textFieldWrapStyle}
                    selectionColor={Colors.primaryColor}
                    value={this.state.description}
                    onChangeText={(value) => this.setState({ description: value })}
                    multiline={true}
                    numberOfLines={5}
                />
            </View>
        )
    }

    locationInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding - 5.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor12SemiBold }}>
                    Location
                </Text>
                <TextInput
                    placeholder="Mumbai, Maharashtra"
                    style={styles.textFieldWrapStyle}
                    selectionColor={Colors.primaryColor}
                    value={this.state.location}
                    onChangeText={(value) => this.setState({ location: value })}
                />
            </View>
        )
    }

    conditionInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor12SemiBold }}>
                    Condition
                </Text>
                <TextInput
                    placeholder="New"
                    style={styles.textFieldWrapStyle}
                    selectionColor={Colors.primaryColor}
                    value={this.state.condition}
                    onChangeText={(value) => this.setState({ condition: value })}
                />
            </View>
        )
    }

    purchashedOnInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding - 5.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor12SemiBold }}>
                    Purchased on
                </Text>
                <TextInput
                    placeholder="mm-dd-yyyy"
                    style={styles.textFieldWrapStyle}
                    selectionColor={Colors.primaryColor}
                    value={this.state.purchasedOn}
                    onChangeText={(value) => this.setState({ purchasedOn: value })}
                />
            </View>
        )
    }

    itemPriceInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor12SemiBold }}>
                    Set Item Price (In $)
                </Text>
                <TextInput
                    placeholder="$999"
                    style={styles.textFieldWrapStyle}
                    selectionColor={Colors.primaryColor}
                    value={this.state.price}
                    onChangeText={(value) => this.setState({ price: value })}
                />
            </View>
        )
    }

    adTitleInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding - 5.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor12SemiBold }}>
                    Ad Title
                </Text>
                <TextInput
                    placeholder="Apple IPhone 11 Pro Max 256Gb Black"
                    style={styles.textFieldWrapStyle}
                    selectionColor={Colors.primaryColor}
                    value={this.state.title}
                    onChangeText={(value) => this.setState({ title: value })}
                />
            </View>
        )
    }

    itemBrandInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor12SemiBold }}>
                    Item Brand
                </Text>
                <TextInput
                    placeholder="IPhone"
                    style={styles.textFieldWrapStyle}
                    selectionColor={Colors.primaryColor}
                    value={this.state.brand}
                    onChangeText={(value) => this.setState({ brand: value })}
                />
            </View>
        )
    }

    divider() {
        return (
            <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, margin: Sizes.fixPadding * 2.0, }} />
        )
    }

    itemPhotosInfo() {
        const renderItem = ({ item }) => (
            <View style={{ alignItems: 'center', marginRight: Sizes.fixPadding, }}>
                <Image
                    source={item.itemPhoto}
                    style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding - 5.0, }}
                />
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor10SemiBold }}>
                    {item.itemDescription}
                </Text>
            </View>
        )
        return (
            <View>
                <View style={styles.itemPhotosTitleWrapStyle}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        Item Photos
                    </Text>
                    <Text style={{ ...Fonts.grayColor10SemiBold }}>
                        Add upto 8 photos
                    </Text>
                </View>
                <FlatList
                    data={itemPhotosList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0, }}
                    ListFooterComponent={
                        <View style={{ alignItems: 'center', }}>
                            <View style={styles.addPhotoIconWrapStyle}>
                                <MaterialIcons
                                    name="photo-camera"
                                    color={Colors.whiteColor}
                                    size={24}
                                />
                            </View>
                            <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor10SemiBold }}>
                                Add more photo
                            </Text>
                        </View>
                    }
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
                    Edit Ad
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
    itemPhotosTitleWrapStyle: {
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    addPhotoIconWrapStyle: {
        width: 80.0,
        height: 80.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textFieldWrapStyle: {
        ...Fonts.blackColor14Medium,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding,
        borderColor: '#ececec',
        borderWidth: 1.0,
        elevation: 2.0,
    },
    updateInfoButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 5.0,
        shadowColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderColor: 'rgba(75, 44, 32, 0.5)',
        borderWidth: 1.0,
    },
});

EditAdScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(EditAdScreen);