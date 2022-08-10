import React, { Component, useState, useCallback } from "react";
import { BackHandler, SafeAreaView, View, Dimensions, StatusBar, ImageBackground, FlatList, ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import { Menu } from 'react-native-material-menu';
import RangeSlider from 'rn-range-slider';
import { Snackbar } from 'react-native-paper';
import { db } from "../../firebase";

const { width } = Dimensions.get('window');

const categoriesList = [
    'Mobile Phones',
    'Accessories',
    'Tablets'
];

const locationList = [
    'harare',
    'bulawayo',
    'gweru',
    'kwekwe',
];

const priceList = [
    100,
    200,
    300,
    400,
    500,
    1000,
    2000,
    3000,
    4000,
    5000
];

const brandList = [
    'Iphone', 'Samsung', 'Mi', 'Vivo', 'Oppo', 'Realme', 'Honor', 'Nokia', 'Asus', 'Micromax', 'Sony', 'BlackBerry'
];

const availableProductsList = [
    {
        id: '1',
        productImage: require('../../assets/images/mobiles/mobile1.png'),
        inFavorite: false,
        productAmount: '$699',
        productName: 'IPhone X',
        address: 'Swargate, Pune',
        timeOfPublish: '2 Days ago',
    },
    {
        id: '2',
        productImage: require('../../assets/images/mobiles/mobile2.png'),
        inFavorite: false,
        productAmount: '$999',
        productName: 'IPhone 11 white',
        address: 'Kochi, India',
        timeOfPublish: '3 Days ago',
    },
    {
        id: '3',
        productImage: require('../../assets/images/mobiles/mobile3.png'),
        inFavorite: false,
        productAmount: '$999',
        productName: 'IPhone 11 pro max',
        address: 'Swargate, Pune',
        timeOfPublish: '2 Days ago',
    },
    {
        id: '4',
        productImage: require('../../assets/images/mobiles/mobile4.png'),
        inFavorite: false,
        productAmount: '$1,999',
        productName: 'IPhone 11',
        address: 'Kochi, India',
        timeOfPublish: '3 Days ago',
    },
    {
        id: '5',
        productImage: require('../../assets/images/mobiles/mobile5.png'),
        inFavorite: false,
        productAmount: '$859',
        productName: 'IPhone 11 pro',
        address: 'Swargate, Pune',
        timeOfPublish: '2 Days ago',
    },
    {
        id: '6',
        productImage: require('../../assets/images/mobiles/mobile6.png'),
        inFavorite: false,
        productAmount: '$555',
        productName: 'IPhone 6s',
        address: 'Kochi, India',
        timeOfPublish: '3 Days ago',
    },
    {
        id: '7',
        productImage: require('../../assets/images/mobiles/mobile7.png'),
        inFavorite: false,
        productAmount: '$699',
        productName: 'IPhone X',
        address: 'Swargate, Pune',
        timeOfPublish: '2 Days ago',
    },
    {
        id: '8',
        productImage: require('../../assets/images/mobiles/mobile8.png'),
        inFavorite: false,
        productAmount: '$999',
        productName: 'IPhone 11 white',
        address: 'Kochi, India',
        timeOfPublish: '3 Days ago',
    },
    {
        id: '9',
        productImage: require('../../assets/images/mobiles/mobile9.png'),
        inFavorite: false,
        productAmount: '$999',
        productName: 'IPhone 11 pro max',
        address: 'Swargate, Pune',
        timeOfPublish: '2 Days ago',
    },
    {
        id: '10',
        productImage: require('../../assets/images/mobiles/mobile10.png'),
        inFavorite: false,
        productAmount: '$1,999',
        productName: 'IPhone 11',
        address: 'Kochi, India',
        timeOfPublish: '3 Days ago',
    },
    {
        id: '11',
        productImage: require('../../assets/images/mobiles/mobile11.png'),
        inFavorite: false,
        productAmount: '$859',
        productName: 'IPhone 11 pro',
        address: 'Swargate, Pune',
        timeOfPublish: '2 Days ago',
    },
    {
        id: '12',
        productImage: require('../../assets/images/mobiles/mobile12.png'),
        inFavorite: false,
        productAmount: '$555',
        productName: 'IPhone 6s',
        address: 'Kochi, India',
        timeOfPublish: '3 Days ago',
    },
]

class CategoriesItemsScreen extends Component {

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
        selectedCategory: categoriesList[0],
        showCategoriesOptions: false,
        showpriceOptions: false,
        selectedLocation: null,
        showLocationsOptions: false,
        selectedBrand: brandList[0],
        selectedPrice: 0,
        showBrandOptions: false,
        availableProducts: availableProductsList,
        showSnackBar: false,
        snackBarMsg: null,
        low:0,
        high:5000,
        data:[]
    }

    componentDidMount(){
        db.collection("products").where("mainCategory","==",this.props.navigation.state.params.category).onSnapshot(querySnapshot=>{
          this.setState({data:querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))})
          })
    }

    filter = (item)=>{
        if(this.state.selectedPrice){
            db.collection("products").where("mainCategory","==",this.props.navigation.state.params.category).where("location","==",item).where("price","<=",this.state.selectedPrice).onSnapshot(querySnapshot=>{
                this.setState({data:querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))})
                })
        }else{
            db.collection("products").where("mainCategory","==",this.props.navigation.state.params.category).where("location","==",item).onSnapshot(querySnapshot=>{
                this.setState({data:querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))})
                })
        }
    }

    filterPrice = (item)=>{
        if(this.state.selectedLocation){
            db.collection("products").where("mainCategory","==",this.props.navigation.state.params.category).where("location","==",this.state.selectedLocation).where("price","<=",item).onSnapshot(querySnapshot=>{
                this.setState({data:querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))})
                })
        }else{
            db.collection("products").where("mainCategory","==",this.props.navigation.state.params.category).where("price","<=",item).onSnapshot(querySnapshot=>{
                this.setState({data:querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))})
                })
        }
       
    }
    render() {
       
      
        console.log(this.state.selectedPrice)
        //console.log(this.props.navigation.state.params.category)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.categoryLocationAndBrandInfo()}
                    {this.budgetRangeInfo()}
                    {this.divider()}
                    {this.availableProducts()}
                </View>
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={this.state.showSnackBar}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    {this.state.snackBarMsg}
                </Snackbar>
            </SafeAreaView>
        )
    }

    updateAvailableProducts({ id }) {
        const newList = this.state.availableProducts.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, inFavorite: !item.inFavorite };
                this.setState({
                    snackBarMsg: updatedItem.inFavorite ? `${updatedItem.productName} Added To Favorite` : `${updatedItem.productName} Removed From Favorite`
                })
                return updatedItem;
            }
            return item;
        });
        this.setState({ availableProducts: newList })
    }

    availableProducts() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('ProductDetail', {
                    data:item
                })}
                style={styles.availableProductsWrapStyle}
            >
                <ImageBackground
                    source={{uri:item?.images[0]}}
                    style={{ height: 170.0 }}
                    borderRadius={Sizes.fixPadding - 5.0}
                >
                    <View style={styles.favoriteIconWrapStyle}>
                        <MaterialIcons
                            name={item.inFavorite ? "favorite" : "favorite-border"}
                            color={Colors.whiteColor}
                            size={14}
                            onPress={() => {
                                this.updateAvailableProducts({ id: item.id })
                                this.setState({ showSnackBar: true })
                            }}
                        />
                    </View>
                    <View style={styles.productInfoOuterWrapStyle}>
                        <View style={styles.productInfoWrapStyle}>
                            <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                ${item?.price}
                            </Text>
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.grayColor12Medium }}>
                                {item?.title}
                            </Text>
                            <View style={styles.productDetailWrapStyle}>
                                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.grayColor10Regular }}>
                                    {item?.location}
                                </Text>
                                <Text style={{ ...Fonts.grayColor10Regular }}>
                                    {item?.purchasedOn}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding + 5.0, paddingHorizontal: Sizes.fixPadding + 5.0 }}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    divider() {
        return (
            <View style={styles.dividerStyle} />
        )
    }

    budgetRangeInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    
                  
                   
                </View>
             
            </View>
        )
    }

    categoryLocationAndBrandInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding + 5.0, flexDirection: 'row', }}>
               {/*  {this.categoryInfo()} */}
                {this.locationInfo()}
                {this.priceInfo()}
              {/*  {this.brandInfo()}  */}
               
            </View>
        )
    }

    brandInfo() {
        return (
            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding - 5.0, }}>
                <Text style={{ ...Fonts.grayColor12Medium }}>
                    Select Brand
                </Text>
                <Menu
                    visible={this.state.showBrandOptions}
                    style={{ paddingVertical: Sizes.fixPadding - 5.0, paddingRight: Sizes.fixPadding - 5.0, }}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ showBrandOptions: true })}
                            style={styles.categoryLocationAndBrandWrapStyle}
                        >
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor12SemiBold }}>
                                {this.state.selectedBrand}
                            </Text>
                            <MaterialCommunityIcons name="chevron-down" size={15} color={Colors.blackColor} />
                        </TouchableOpacity>
                    }
                    onRequestClose={() => this.setState({ showBrandOptions: false })}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            brandList.map((item, index) => (
                                <Text
                                    key={index}
                                    style={{ marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding, ...Fonts.blackColor12SemiBold }}
                                    onPress={() => this.setState({ selectedBrand: item, showBrandOptions: false })}
                                >
                                    {item}
                                </Text>
                            ))
                        }
                    </ScrollView>
                </Menu>
            </View>
        )
    }

    locationInfo() {
        return (
            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding - 5.0, }}>
                <Text style={{ ...Fonts.grayColor12Medium }}>
                    Select Location
                </Text>
                <Menu
                    visible={this.state.showLocationsOptions}
                    style={{ paddingVertical: Sizes.fixPadding - 5.0, paddingRight: Sizes.fixPadding - 5.0, }}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ showLocationsOptions: true })}
                            style={styles.categoryLocationAndBrandWrapStyle}
                        >
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor12SemiBold }}>
                                {this.state.selectedLocation}
                            </Text>
                            <MaterialCommunityIcons name="chevron-down" size={15} color={Colors.blackColor} />
                        </TouchableOpacity>
                    }
                    onRequestClose={() => this.setState({ showLocationsOptions: false })}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            locationList.map((item, index) => (
                                <Text
                                    key={index}
                                    style={{ marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding, ...Fonts.blackColor12SemiBold }}
                                    onPress={() => {
                                        this.filter(item)
                                        this.setState({ selectedLocation: item, showLocationsOptions: false })
                                           
                                }}
                                >
                                    {item}
                                </Text>
                            ))
                        }
                    </ScrollView>
                </Menu>
            </View>
        )
    }

    categoryInfo() {
        return (
            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding - 5.0, }}>
                <Text style={{ ...Fonts.grayColor12Medium }}>
                    Select Category
                </Text>
                <Menu
                    visible={this.state.showCategoriesOptions}
                    style={{ paddingVertical: Sizes.fixPadding - 5.0, paddingRight: Sizes.fixPadding - 5.0 }}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ showCategoriesOptions: true })}
                            style={styles.categoryLocationAndBrandWrapStyle}
                        >
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor12SemiBold }}>
                                {this.state.selectedCategory}
                            </Text>
                            <MaterialCommunityIcons name="chevron-down" size={15} color={Colors.blackColor} />
                        </TouchableOpacity>
                    }
                    onRequestClose={() => this.setState({ showCategoriesOptions: false })}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            categoriesList.map((item, index) => (
                                <Text
                                    key={index}
                                    style={{ marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding, ...Fonts.blackColor12SemiBold }}
                                    onPress={() => this.setState({ selectedCategory: item, showCategoriesOptions: false })}
                                >
                                    {item}
                                </Text>
                            ))
                        }
                    </ScrollView>
                </Menu>
            </View>
        )
    }

    priceInfo() {
        return (
            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding - 5.0, }}>
                <Text style={{ ...Fonts.grayColor12Medium }}>
                    Filter by Price
                </Text>
                <Menu
                    visible={this.state.showpriceOptions}
                    style={{ paddingVertical: Sizes.fixPadding - 5.0, paddingRight: Sizes.fixPadding - 5.0 }}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ showpriceOptions: true })}
                            style={styles.categoryLocationAndBrandWrapStyle}
                        >
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor12SemiBold }}>
                                {this.state.selectedPrice}
                            </Text>
                            <MaterialCommunityIcons name="chevron-down" size={15} color={Colors.blackColor} />
                        </TouchableOpacity>
                    }
                    onRequestClose={() => this.setState({ showpriceOptions: false })}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            priceList.map((item, index) => (
                                <Text
                                    key={index}
                                    style={{ marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding, ...Fonts.blackColor12SemiBold }}
                                    onPress={() => {
                                        this.filterPrice(item)
                                        this.setState({ selectedPrice: item, showpriceOptions: false })}
                                }
                                >
                                   less than ${item}
                                </Text>
                            ))
                        }
                    </ScrollView>
                </Menu>
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
                    {this.props.navigation.state.params.category}
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
    categoryLocationAndBrandWrapStyle: {
        marginTop: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sliderThumbStyle: {
        width: 16,
        height: 16,
        borderRadius: 8.0,
        backgroundColor: Colors.primaryColor,
        borderWidth: 1.5,
        borderColor: Colors.whiteColor,
        elevation: 1.5,
    },
    inactiveSliderStyle: {
        flex: 1,
        height: 4.0,
        borderRadius: Sizes.fixPadding,
        backgroundColor: Colors.lightGrayColor,
    },
    selectedSliderStyle: {
        height: 4,
        backgroundColor: Colors.primaryColor,
    },
    priceSliderLabelWrapStyle: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.primaryColor,
        borderRadius: 20,
    },
    sliderNotchStyle: {
        width: 10,
        height: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: Colors.primaryColor,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 15,
        marginBottom: -7.0,
        marginTop: -1.0,
    },
    dividerStyle: {
        backgroundColor: Colors.lightGrayColor,
        height: 1.0,
        marginTop: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    availableProductsWrapStyle: {
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

CategoriesItemsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(CategoriesItemsScreen);