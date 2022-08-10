import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, ScrollView, TouchableOpacity, FlatList, Image, Dimensions, StyleSheet, ImageBackground, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Snackbar } from 'react-native-paper';
import { Menu } from 'react-native-material-menu';
import MapView, { Marker } from "react-native-maps";
import { db } from "../../firebase";

const locationsList = [
    'Harare',
    'Gweru',
    'Bulawayo',
    'Kwekwe',
];

const { width } = Dimensions.get('window');

const bannersList = [
    {
        id: '1',
        bannerImage: require('../../assets/images/banners/banner1.png'),
        bannerTitle: 'Bose Home Speaker',
        bannerDescription: `Lorem Ipsum is simply dummy\ntext of the printing.`
    },
    {
        id: '2',
        bannerImage: require('../../assets/images/banners/banner2.png'),
        bannerTitle: 'Now, Buy and Sell Cars on SELLHUB',
        bannerDescription: `Lorem Ipsum is simply dummy\ntext of the printing.`
    },
    {
        id: '3',
        bannerImage: require('../../assets/images/banners/banner1.png'),
        bannerTitle: 'Bose Home Speaker',
        bannerDescription: `Lorem Ipsum is simply dummy\ntext of the printing.`
    }
];

const categoriesList = [
    {
        id: '1',
        categoryImage: require('../../assets/images/categories/mobile.png'),
        categoryName: 'Mobile',
    },
    {
        id: '2',
        categoryImage: require('../../assets/images/categories/properties.png'),
        categoryName: 'Property',
    },
    {
        id: '3',
        categoryImage: require('../../assets/images/categories/electronics.png'),
        categoryName: 'Electronics',
    },
    {
        id: '4',
        categoryImage: require('../../assets/images/categories/car.png'),
        categoryName: 'Cars',
    },
    {
        id: '6',
        categoryImage: require('../../assets/images/categories/music.png'),
        categoryName: 'Music',
    },
    {
        id: '7',
        categoryImage: require('../../assets/images/categories/bikes.png'),
        categoryName: 'Bikes',
    },
    {
        id: '8',
        categoryImage: require('../../assets/images/categories/books.png'),
        categoryName: 'Books',
    },
    {
        id: '9',
        categoryImage: require('../../assets/images/categories/fashion.png'),
        categoryName: 'Fashion',
    },
    {
        id: '10',
        categoryImage: require('../../assets/images/categories/job.png'),
        categoryName: 'Jobs',
    },
    
];
const freshRecommendedList = [
    {
        id: '1',
        productImage: require('../../assets/images/recommended/recommended1.png'),
        inFavorite: false,
        productAmount: '$12,560',
        productName: 'Maruti suzuki alto 800',
        address: 'Swargate, Pune',
        timeOfPublish: '2 Days ago',
    },
    {
        id: '2',
        productImage: require('../../assets/images/recommended/recommended2.png'),
        inFavorite: false,
        productAmount: '$999',
        productName: 'IPhone 11 white',
        address: 'Kochi, India',
        timeOfPublish: '3 Days ago',
    },
    {
        id: '3',
        productImage: require('../../assets/images/recommended/recommended3.png'),
        inFavorite: false,
        productAmount: '$299',
        productName: 'Elegant cotton silk saree',
        address: 'Samudrapur, Maharashtra',
        timeOfPublish: '17 Oct',
    },
    {
        id: '4',
        productImage: require('../../assets/images/recommended/recommended4.png'),
        inFavorite: false,
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
    {
        id: '6',
        productImage: require('../../assets/images/recommended/recommended6.png'),
        inFavorite: false,
        productAmount: '$99',
        productName: 'I7S Bluetooth earphone',
        address: 'Kochi, India',
        timeOfPublish: '5 Days ago',
    },
    {
        id: '7',
        productImage: require('../../assets/images/recommended/recommended7.png'),
        inFavorite: false,
        productAmount: '$199',
        productName: 'Sewing machine',
        address: 'Swargate, Pune',
        timeOfPublish: '5 Days ago',
    },
    {
        id: '8',
        productImage: require('../../assets/images/recommended/recommended8.png'),
        inFavorite: false,
        productAmount: '$9,850',
        productName: 'IPhone 8',
        address: 'Kochi, India',
        timeOfPublish: '6 Days ago',
    },
    {
        id: '9',
        productImage: require('../../assets/images/recommended/recommended9.png'),
        inFavorite: false,
        productAmount: '$99',
        productName: 'Baby walker',
        address: 'Swargate, Pune',
        timeOfPublish: '5 Days ago',
    },
    {
        id: '10',
        productImage: require('../../assets/images/recommended/recommended10.png'),
        inFavorite: false,
        productAmount: '$150',
        productName: 'Men’s sports shoes',
        address: 'Kochi, India',
        timeOfPublish: '6 Days ago',
    },
    {
        id: '11',
        productImage: require('../../assets/images/recommended/recommended11.png'),
        inFavorite: false,
        productAmount: '$999',
        productName: 'Dell laptop',
        address: 'Swargate, Pune',
        timeOfPublish: '6 Days ago',
    },
    {
        id: '12',
        productImage: require('../../assets/images/recommended/recommended12.png'),
        inFavorite: false,
        productAmount: '$199',
        productName: 'Women’s sports shoes',
        address: 'Kochi, India',
        timeOfPublish: '6 Days ago',
    },
];

const locationsAccordingPlaceList = [
    {
        id: '1',
        coordinate: {
            latitude: 22.6293867,
            longitude: 88.4354486,
        },
        categoryTypeIcon: require('../../assets/images/categories/properties.png')
    },
    {
        id: '2',
        coordinate: {
            latitude: 22.6345648,
            longitude: 88.4377279,
        },
        categoryTypeIcon: require('../../assets/images/categories/mobile.png')
    },
    {
        id: '3',
        coordinate: {
            latitude: 22.6281662,
            longitude: 88.4410113,
        },
        categoryTypeIcon: require('../../assets/images/categories/furniture.png')
    },
    {
        id: '4',
        coordinate: {
            latitude: 22.6341137,
            longitude: 88.4497463,
        },
        categoryTypeIcon: require('../../assets/images/categories/electronics.png')
    },
    {
        id: '5',
        coordinate: {
            latitude: 22.618100,
            longitude: 88.456747,
        },
        categoryTypeIcon: require('../../assets/images/categories/properties.png')
    },
    {
        id: '6',
        coordinate: {
            latitude: 22.640124,
            longitude: 88.438968,
        },
        categoryTypeIcon: require('../../assets/images/categories/furniture.png')
    },
    {
        id: '7',
        coordinate: {
            latitude: 22.616357,
            longitude: 88.442317,
        },
        categoryTypeIcon: require('../../assets/images/categories/mobile.png')
    },
    {
        id: '8',
        coordinate: {
            latitude: 22.624423,
            longitude: 88.435018,
        },
        categoryTypeIcon: require('../../assets/images/categories/electronics.png')
    },
    {
        id: '9',
        coordinate: {
            latitude: 22.624200,
            longitude: 88.453999,
        },
        categoryTypeIcon: require('../../assets/images/categories/furniture.png')
    },
];

class HomeScreen extends Component {

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
        bannersData: bannersList,
        activeSlide: 0,
        freshRecommendeds: null,
        showSnackBar: false,
        snackBarMsg: null,
        showLocationOptions: false,
        selectedLocation: locationsList[0],
        showMapView: false,
    }

    componentDidMount(){
        db.collection("products").limit(12).onSnapshot(querySnapshot=>{
            this.setState({freshRecommendeds:querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))})
            })
    }

    filter = (item)=>{
        db.collection("products").where("location","==",item.toLowerCase()).limit(12).onSnapshot(querySnapshot=>{
            this.setState({freshRecommendeds:querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))})
            })
    }

    render() {
        //console.log(this.state.freshRecommendedList)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {
                        this.state.showMapView
                            ?
                            this.mapView()
                            :
                            <FlatList
                                ListHeaderComponent={
                                    <>
                                        {this.banners()}
                                        {this.browseCategoriesInfo()}
                                        {this.freshRecommendations()}
                                    </>
                                }
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 6.0, }}
                            />
                    }
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

    mapView() {
        return (
            <MapView
                style={{ flex: 1, }}
                initialRegion={{
                    latitude: 22.6292757,
                    longitude: 88.444781,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                }}
            >
                {
                    locationsAccordingPlaceList.map((item) => (
                        <Marker
                            key={`${item.id}`}
                            coordinate={item.coordinate}
                        >
                            <View style={{
                                width: 40.0, height: 40.0, borderRadius: 20.0, backgroundColor: Colors.whiteColor,
                                elevation: 3.0, alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Image
                                    source={item.categoryTypeIcon}
                                    style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
                                />
                            </View>
                        </Marker>
                    ))
                }
            </MapView>
        )
    }

    updateRecommended({ id }) {
        const newList = this.state.freshRecommendeds.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, inFavorite: !item.inFavorite };
                this.setState({
                    snackBarMsg: updatedItem.inFavorite ? `${updatedItem.productName} Added To Favorite` : `${updatedItem.productName} Removed From Favorite`
                })
                return updatedItem;
            }
            return item;
        });
        this.setState({ freshRecommendeds: newList })
    }

    freshRecommendations() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('ProductDetail',{
                    data:item
                })}
                style={styles.freshRecommendationWrapStyle}
            >
                <ImageBackground
                    source={{uri:item.images[0]}}
                    style={{ height: 170.0 }}
                    borderRadius={Sizes.fixPadding - 5.0}
                >
                    <View style={styles.favoriteIconWrapStyle}>
                        <MaterialIcons
                            name={item.inFavorite ? "favorite" : "favorite-border"}
                            color={Colors.whiteColor}
                            size={14}
                            onPress={() => {
                                this.updateRecommended({ id: item.id })
                                this.setState({ showSnackBar: true })
                            }}
                        />
                    </View>
                    <View style={styles.productInfoOuterWrapStyle}>
                        <View style={styles.productInfoWrapStyle}>
                            <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                {item?.price}
                            </Text>
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.grayColor12Medium }}>
                                {item?.title}
                            </Text>
                            <View style={styles.productDetailWrapStyle}>
                                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.grayColor10Regular }}>
                                    {item?.location}
                                </Text>
                                <Text style={{ ...Fonts.grayColor10Regular }}>
                                    {item.purchasedOn}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
        return (
            <View>
                <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    Fresh Recommendations
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, }}>
                    <FlatList
                        listKey="recommended"
                        data={this.state.freshRecommendeds}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        numColumns={2}
                        scrollEnabled={false}
                    />
                </View>
            </View>
        )
    }

    browseCategoriesInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>{ 
                this.props.navigation.push('CategoriesItems', {
                    category: item.categoryName,
                })
            }}
                style={styles.categoryWrapStyle}
            >
                <View style={styles.categoryImageWrapStyle}>
                    <Image
                        source={item.categoryImage}
                        style={{ width: 30.0, height: 30.0, resizeMode: 'contain' }}
                    />
                </View>
                <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.blackColor14Medium }}>
                    {item.categoryName}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginBottom: Sizes.fixPadding, marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    Browse Categories
                </Text>
                <FlatList
                    listKey="categories"
                    data={categoriesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={4}
                    scrollEnabled={false}
                />
            </View >
        )
    }

    banners() {
        const renderItem = ({ item, index }) => {
            return (
                <ImageBackground
                    source={item.bannerImage}
                    style={{ width: width - 40.0, height: 120.0, }}
                    borderRadius={Sizes.fixPadding - 5.0}
                >
                    <View style={styles.bannerWrapStyle}>
                        <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                            {item.bannerTitle}
                        </Text>
                        <Text style={{ ...Fonts.whiteColor12Regular }}>
                            {item.bannerDescription}
                        </Text>
                    </View>
                </ImageBackground>
            )
        }
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, }}>
                <Carousel
                    data={this.state.bannersData}
                    sliderWidth={width}
                    autoplay={true}
                    loop={true}
                    autoplayInterval={4000}
                    itemWidth={width - 45}
                    renderItem={renderItem}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}

                />
                {this.pagination()}
            </View>
        )
    }

    pagination() {
        const { bannersData, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={bannersData.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.sliderPaginationWrapStyle}
                dotElement={<View style={styles.activeDotStyle} />}
                inactiveDotElement={<View style={styles.inActiveDotStyle} />}
            />
        );
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ textAlign: 'center', ...Fonts.whiteColor22AclonicaRegular }}>
                    SELLHUB
                </Text>
                <View style={styles.cityAndMapInfoWrapStyle}>
                    <Menu
                        visible={this.state.showLocationOptions}
                        style={{ paddingVertical: Sizes.fixPadding - 5.0, }}
                        anchor={
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => this.setState({ showLocationOptions: true })}
                                style={{ flexDirection: 'row', alignItems: 'center', }}
                            >
                                <MaterialCommunityIcons
                                    name="map-marker"
                                    size={18}
                                    color={Colors.whiteColor}
                                />
                                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.whiteColor14SemiBold }}>
                                    {this.state.selectedLocation}
                                </Text>
                                <MaterialCommunityIcons name="chevron-down" size={22} color={Colors.whiteColor} />
                            </TouchableOpacity>
                        }
                        onRequestClose={() => this.setState({ showLocationOptions: false })}
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                locationsList.map((item, index) => (
                                    <Text
                                        key={index}
                                        style={{ marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding, ...Fonts.blackColor14SemiBold }}
                                        onPress={() => {
                                            this.filter(item)
                                            this.setState({ selectedLocation: item, showLocationOptions: false })}}
                                    >
                                        {item}
                                    </Text>
                                ))
                            }
                        </ScrollView>
                    </Menu>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.setState({ showMapView: !this.state.showMapView })}
                        style={styles.mapIconWrapStyle}
                    >
                        {
                            this.state.showMapView
                                ?
                                <MaterialCommunityIcons name="view-grid" size={20} color={Colors.primaryColor} />
                                :
                                <FontAwesome name="map" size={16} color={Colors.primaryColor} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
    },
    cityAndMapInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mapIconWrapStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeDotStyle: {
        marginHorizontal: Sizes.fixPadding - 7.0,
        width: 12.0,
        height: 12.0,
        borderRadius: 6.0,
        backgroundColor: Colors.primaryColor
    },
    inActiveDotStyle: {
        marginHorizontal: Sizes.fixPadding - 7.0,
        width: 8.0,
        height: 8.0,
        borderRadius: 4.0,
        backgroundColor: Colors.grayColor
    },
    sliderPaginationWrapStyle: {
        position: 'absolute',
        bottom: -60.0,
        left: 0.0,
        right: 0.0,
    },
    bannerWrapStyle: {
        padding: Sizes.fixPadding,
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: width - 40.0,
        height: 120.0,
        justifyContent: 'flex-end',
        borderRadius: Sizes.fixPadding - 5.0
    },
    categoryImageWrapStyle: {
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        borderWidth: 1.5,
        borderColor: '#ececec',
    },
    categoryWrapStyle: {
        maxWidth: width / 4.0 - 10.0,
        marginBottom: Sizes.fixPadding,
        flex: 1,
        alignItems: 'center'
    },
    freshRecommendationWrapStyle: {
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
        bottom: 40.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    }
});

export default withNavigation(HomeScreen);