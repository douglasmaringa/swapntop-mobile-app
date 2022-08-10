import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, Dimensions, StyleSheet, ImageBackground, TouchableOpacity, Text, FlatList } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('window');

const favoriteProductsList = [
    {
        id: '1',
        productImage: require('../../assets/images/recommended/recommended1.png'),
        productAmount: '$12,560',
        productName: 'Maruti suzuki alto 800',
        address: 'Swargate, Pune',
        timeOfPublish: '2 Days ago',
    },
    {
        id: '2',
        productImage: require('../../assets/images/recommended/recommended2.png'),
        productAmount: '$999',
        productName: 'IPhone 11 white',
        address: 'Kochi, India',
        timeOfPublish: '3 Days ago',
    },
    {
        id: '3',
        productImage: require('../../assets/images/recommended/recommended3.png'),
        productAmount: '$299',
        productName: 'Elegant cotton silk saree',
        address: 'Samudrapur, Maharashtra',
        timeOfPublish: '17 Oct',
    },
    {
        id: '4',
        productImage: require('../../assets/images/recommended/recommended4.png'),
        productAmount: '$120',
        productName: 'Cotton shirt for mens',
        address: 'Kochi, India',
        timeOfPublish: '2 Days ago',
    },
    {
        id: '5',
        productImage: require('../../assets/images/recommended/recommended5.png'),
        inFavorite: false,
        productAmount: '$199',
        productName: 'Watch for women',
        address: 'Swargate, Pune',
        timeOfPublish: '3 Days ago',
    },
];

class FavoriteAdScreen extends Component {

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
        favoriteProducts: favoriteProductsList,
        showSnackBar: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.state.favoriteProducts.length != 0
                        ?
                        this.favoriteProductsDetail()
                        :
                        this.noItemsInfo()
                    }
                </View>
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={this.state.showSnackBar}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    Item Removed From Favorite
                </Snackbar>
            </SafeAreaView>
        )
    }

    noItemsInfo() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialIcons
                    name="favorite"
                    color={Colors.grayColor}
                    size={26}
                />
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor16SemiBold }}>
                    No items in favorite
                </Text>
            </View>
        )
    }

    removeFromFavorite({ id }) {
        const newList = this.state.favoriteProducts.filter((item) => item.id != id);
        this.setState({ favoriteProducts: newList })
    }

    favoriteProductsDetail() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('ProductDetail')}
                style={styles.favoriteProductsWrapStyle}
            >
                <ImageBackground
                    source={item.productImage}
                    style={{ height: 170.0 }}
                    borderRadius={Sizes.fixPadding - 5.0}
                >
                    <View style={styles.favoriteIconWrapStyle}>
                        <MaterialCommunityIcons
                            name="heart-remove"
                            color={Colors.whiteColor}
                            size={14}
                            onPress={() => {
                                this.removeFromFavorite({ id: item.id })
                                this.setState({ showSnackBar: true })
                            }}
                        />
                    </View>
                    <View style={styles.productInfoOuterWrapStyle}>
                        <View style={styles.productInfoWrapStyle}>
                            <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                {item.productAmount}
                            </Text>
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.grayColor12Medium }}>
                                {item.productName}
                            </Text>
                            <View style={styles.productDetailWrapStyle}>
                                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.grayColor10Regular }}>
                                    {item.address}
                                </Text>
                                <Text style={{ ...Fonts.grayColor10Regular }}>
                                    {item.timeOfPublish}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={this.state.favoriteProducts}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding + 5.0, paddingVertical: Sizes.fixPadding * 2.0, }}
            />
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
                    Favorite
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
    favoriteProductsWrapStyle: {
        flex: 1,
        maxWidth: (width / 2.0) - 25.0,
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
    },
    favoriteIconWrapStyle: {
        backgroundColor: Colors.primaryColor,
        borderTopRightRadius: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
        alignSelf: 'flex-end',
        padding: Sizes.fixPadding - 5.0,
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
    productDetailWrapStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    }
});

FavoriteAdScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(FavoriteAdScreen);
