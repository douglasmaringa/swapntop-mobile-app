import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, Dimensions, Image, StatusBar, FlatList, StyleSheet, Text, ImageBackground } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import CollapsingToolbar from "../../components/sliverAppBarScreen";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Snackbar } from "react-native-paper";
import { db } from "../../firebase";

const { width } = Dimensions.get('window');

const productImagesList = [
    require('../../assets/images/mobiles/mobile6.png'),
    require('../../assets/images/mobiles/mobile6.png'),
    require('../../assets/images/mobiles/mobile6.png'),
];

const productDescriptionsList = [
    'Iphone 11Pro Max Black Color',
    'All access are there bill box and all',
    '1 week extended warranty left now',
    'Phone is in good new condition',
    'It is an Indian purchase phone with Gst bill'
];

const similarItemsList = [
    {
        id: '1',
        productImage: require('../../assets/images/mobiles/mobile8.png'),
        productAmount: '$599',
        productName: 'iPhone 6S',
    },
    {
        id: '2',
        productImage: require('../../assets/images/mobiles/mobile11.png'),
        productAmount: '$550',
        productName: 'iPhone 6',
    },
    {
        id: '3',
        productImage: require('../../assets/images/mobiles/mobile10.png'),
        productAmount: '$699',
        productName: 'iPhone 11 pro max',
    },
    {
        id: '4',
        productImage: require('../../assets/images/mobiles/mobile3.png'),
        productAmount: '$499',
        productName: 'iPhone 7',
    },
    {
        id: '5',
        productImage: require('../../assets/images/mobiles/mobile1.png'),
        productAmount: '$555',
        productName: 'iPhone 6',
    },
    {
        id: '6',
        productImage: require('../../assets/images/mobiles/mobile4.png'),
        productAmount: '$799',
        productName: 'iPhone 10',
    },
    {
        id: '7',
        productImage: require('../../assets/images/mobiles/mobile8.png'),
        productAmount: '$599',
        productName: 'iPhone 6S',
    },
    {
        id: '8',
        productImage: require('../../assets/images/mobiles/mobile10.png'),
        productAmount: '$699',
        productName: 'iPhone 11 pro max',
    },
    {
        id: '9',
        productImage: require('../../assets/images/mobiles/mobile1.png'),
        productAmount: '$555',
        productName: 'iPhone 6',
    },
];

class ProductDetailScreen extends Component {

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
        inFavorite: false,
        showSnackBar: false,
        productImages: this.props.navigation.state.params.data.images,
        activeSlide: 0,
        data:[],
        user:[],
    }

    componentDidMount(){
        db.collection("products").where("mainCategory","==",this.props.navigation.state.params.data.mainCategory).limit(6).onSnapshot(querySnapshot=>{
          this.setState({data:querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))})
          })

          db.collection("users").where("email","==",this.props.navigation.state.params.data.email).onSnapshot(querySnapshot=>{
            this.setState({user:querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))})
            })
    }

    

   
    render() {
        //console.log(this.props.navigation.state.params.data.images)
        //console.log(this.state.user)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <CollapsingToolbar
                    leftItem={
                        <MaterialIcons
                            name="arrow-back-ios"
                            size={20}
                            color={Colors.whiteColor}
                            onPress={() => this.props.navigation.pop()}
                        />
                    }
                rightItem={
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                            <MaterialIcons
                                name={this.state.inFavorite ? "favorite" : "favorite-border"}
                                size={20}
                                color={Colors.whiteColor}
                                onPress={() => this.setState({ inFavorite: !this.state.inFavorite, showSnackBar: true, })}
                            />
                            <MaterialIcons
                                name="share"
                                size={20}
                                color={Colors.whiteColor}
                                style={{ marginLeft: Sizes.fixPadding }}
                            />
                        </View>
                    }
                    element={this.productImagesSlider()}
                    borderBottomRadius={15}
                    toolbarColor={Colors.primaryColor}
                    toolbarMinHeight={StatusBar.currentHeight + 40.0}
                    toolbarMaxHeight={250}
                    src={require('../../assets/images/mobiles/mobile6.png')}
                     >

                    <View style={{ paddingBottom: Sizes.fixPadding * 7.0 }}>
                        {this.productDetail()}
                        {this.divider()}
                        {this.productDescription()}
                        {this.divider()}
                        {this.postedByInfo()}
                        {this.divider()}
                        {this.similarItemsInfo()}
                    </View>
                </CollapsingToolbar>
                <Snackbar
                    visible={this.state.showSnackBar}
                    style={styles.snackBarStyle}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    {this.state.inFavorite ? 'Added To favorite' : 'Removed From Favorite'}
                </Snackbar>
            </SafeAreaView>
        )
    }

    similarItemsInfo() {

        const renderItem = ({ item }) => (
            <View style={styles.similarProductWrapStyle}>
                <ImageBackground
                    source={{uri:item?.images[0]}}
                    style={{ width: 100.0, height: 100.0, }}
                    borderRadius={Sizes.fixPadding - 5.0}
                >
                    <View style={styles.similarProductDetailWrapStyle}>
                        <Text style={{ ...Fonts.blackColor12SemiBold }}>
                            ${item?.price}
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.grayColor10Medium }}>
                            {item?.title}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        )
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    Similar Items
                </Text>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding, paddingLeft: Sizes.fixPadding * 2.0, paddingRight: Sizes.fixPadding, }}
                />
            </View>
        )
    }

    postedByInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        Posted By
                    </Text>
                    <Text
                        onPress={() => this.props.navigation.push('UserProfile', { item: { userImage: require('../../assets/images/users/user1.png'), userName: 'Samantha Smith' } })}
                        style={{ ...Fonts.primaryColor14Bold }}
                    >
                        View Profile
                    </Text>
                </View>
                <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={{uri:this.state.user[0]?.image}}
                        style={{ width: 40.0, height: 40.0, borderRadius: 20.0, }}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor14Medium }}>
                       {this.state.user[0]?.name}
                    </Text>
                </View>
            </ View>
        )
    }

    productDescription() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    Description
                </Text>
               
                        <Text
                           
                            style={{ ...Fonts.grayColor12Medium, marginBottom: Sizes.fixPadding - 5.0, }}
                        >
                            • {this.props.navigation.state.params.data.description}
                        </Text>
                    
               
            </View>
        )
    }

    divider() {
        return (
            <View style={{
                backgroundColor: Colors.lightGrayColor,
                height: 1.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
            }} />
        )
    }

    productDetail() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor20SemiBold }}>
                    ${this.props.navigation.state.params.data.price}
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 0.0, ...Fonts.grayColor14Medium }}>
                {this.props.navigation.state.params.data.title}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons
                            name="map-marker"
                            size={18}
                            color={Colors.primaryColor}
                        />
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.grayColor12Medium }}>
                        {this.props.navigation.state.params.data.location}
                        </Text>
                    </View>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                        Posted on {this.props.navigation.state.params.data.purchasedOn}
                    </Text>
                </View>
            </View>
        )
    }

    productImagesSlider() {

        const renderItem = ({ item }) => {
            return (
                <Image
                    source={{uri:item}}
                    style={{ width: '100%', height: 250.0, }}
                />
            )
        }
        return (
            <>
                <Carousel
                    data={this.state.productImages}
                    sliderWidth={width}
                    autoplay={true}
                    loop={true}
                    autoplayInterval={4000}
                    itemWidth={width}
                    renderItem={renderItem}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                />
                {this.pagination()}
            </>
        )
    }

    pagination() {
        const { productImages, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={productImages?.length}
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
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.whiteColor}
                    size={22}
                    onPress={() => this.props.navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, flex: 1, ...Fonts.whiteColor18SemiBold }}>
                    Mobile
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
    activeDotStyle: {
        marginHorizontal: Sizes.fixPadding - 7.0,
        width: 12.0,
        height: 12.0,
        borderRadius: 6.0,
        backgroundColor: Colors.whiteColor
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
        bottom: -10.0,
        left: 0.0,
        right: 0.0,
    },
    snackBarStyle: {
        backgroundColor: '#333333',
        elevation: 0.0,
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
    },
    similarProductDetailWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.whiteColor,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomRightRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 5.0,
    },
    similarProductWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        width: 100.0, height: 100.0,
        marginRight: Sizes.fixPadding,
    }
});

ProductDetailScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(ProductDetailScreen);