import React, { Component, createRef, useState, useCallback } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, FlatList, ScrollView, StyleSheet, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import { Snackbar } from 'react-native-paper';
import { BottomSheet } from 'react-native-elements';
import { TextInput as Input } from 'react-native-paper';
import RangeSlider from 'rn-range-slider';
import { Menu } from 'react-native-material-menu';

const searchResultsList = [
    {
        id: '1',
        productImage: require('../../assets/images/sofas/sofa1.png'),
        productAmount: '$99',
        inFavorite: false,
        productName: 'Three Seater Sofa with Table',
        productAge: '6 months',
        location: 'Mumbai, Maharashtra',
        published: '17 Oct,2020',
        distanceInKm: 15,
    },
    {
        id: '2',
        productImage: require('../../assets/images/sofas/sofa2.png'),
        productAmount: '$89',
        inFavorite: false,
        productName: 'Sofa Cub Bed for Giftine Perpose',
        productAge: '5 months',
        location: 'Mumbai, Maharashtra',
        published: '5 days ago',
        distanceInKm: 12,
    },
    {
        id: '3',
        productImage: require('../../assets/images/sofas/sofa3.png'),
        productAmount: '$59',
        inFavorite: false,
        productName: '5 Seater Sofa with Table',
        productAge: '10 months',
        location: 'Mumbai, Maharashtra',
        published: '2 days ago',
        distanceInKm: 15,
    },
    {
        id: '4',
        productImage: require('../../assets/images/sofas/sofa4.png'),
        productAmount: '$99',
        inFavorite: false,
        productName: 'Three Seater Sofa with Table',
        productAge: '6 months',
        location: 'Mumbai, Maharashtra',
        published: '17 Oct,2020',
        distanceInKm: 15,
    },
    {
        id: '5',
        productImage: require('../../assets/images/sofas/sofa5.png'),
        productAmount: '$150',
        inFavorite: false,
        productName: 'Wooden Sofa Set',
        productAge: '4 months',
        location: 'Mumbai, Maharashtra',
        published: '5 days ago',
        distanceInKm: 10,
    },
    {
        id: '6',
        productImage: require('../../assets/images/sofas/sofa6.png'),
        productAmount: '$299',
        inFavorite: false,
        productName: 'Feltro Wooden Sofa Set',
        productAge: '10 months',
        location: 'Mumbai, Maharashtra',
        published: '2 days ago',
        distanceInKm: 10,
    },
    {
        id: '7',
        productImage: require('../../assets/images/sofas/sofa7.png'),
        productAmount: '$149',
        inFavorite: false,
        productName: '5 Seater Sofa Set of Wooden',
        productAge: '4 months',
        location: 'Mumbai, Maharashtra',
        published: '5 days ago',
        distanceInKm: 10,
    },
    {
        id: '8',
        productImage: require('../../assets/images/sofas/sofa8.png'),
        productAmount: '$150',
        inFavorite: false,
        productName: 'Winster 3 Seater Wooden Sofa',
        productAge: '4 months',
        location: 'Mumbai, Maharashtra',
        published: '5 days ago',
        distanceInKm: 10,
    }
];

const sortByOptions = ['Date Published', 'Price:low to high', 'Price:high to low'];

const conditionsList = ['New', 'Used', 'Recondition'];

const categoriesList = [
    {
        id: '1',
        categoryImage: require('../../assets/images/categories/mobile.png'),
        categoryName: 'Mobile',
    },
    {
        id: '2',
        categoryImage: require('../../assets/images/categories/sport.png'),
        categoryName: 'Sports',
    },
    {
        id: '3',
        categoryImage: require('../../assets/images/categories/furniture.png'),
        categoryName: 'Furniture',
    },
    {
        id: '4',
        categoryImage: require('../../assets/images/categories/gym.png'),
        categoryName: 'GYM',
    },
    {
        id: '5',
        categoryImage: require('../../assets/images/categories/electronics.png'),
        categoryName: 'Electronices',
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
    {
        id: '11',
        categoryImage: require('../../assets/images/categories/properties.png'),
        categoryName: 'Properties',
    },
];

const subCategoriesList = [
    'Mobile Phones',
    'Accessories',
    'Tablets'
];

class SearchResultsScreen extends Component {

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
        search: null,
        searchResults: searchResultsList,
        snackBarMsg: null,
        showSnackBar: false,
        showFilterSheet: false,
        selectedSortOption: sortByOptions[0],
        selectedCondition: conditionsList[0],
        minPrice: null,
        maxPrice: null,
        selectedCategoryIndex: 0,
        selectedSubCategory: subCategoriesList[0],
        showSubCategoriesOptions: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.searchResultsCountAndFilterIcon()}
                    {this.searchResultsInfo()}
                    {this.filterDataSheet()}
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

    filterDataSheet() {
        return (
            <BottomSheet
                isVisible={this.state.showFilterSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => this.setState({ showFilterSheet: false }) }}
            >
                <View style={styles.bottomSheetWrapStyle}>
                    <Text style={{ marginBottom: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.blackColor16SemiBold }}>
                        Filter
                    </Text>
                    {this.sortByInfo()}
                    {this.conditionsInfo()}
                    {this.priceInfo()}
                    {this.distanceInfo()}
                    {this.categoryInfo()}
                    {this.subCategoryInfo()}
                    {this.applyFilterButton()}
                </View>
            </BottomSheet>
        )
    }

    applyFilterButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => { this.setState({ showFilterSheet: false }) }}
                style={styles.applyFilterButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    APPLY FILTER
                </Text>
            </TouchableOpacity>
        )
    }

    subCategoryInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    Select Sub Category
                </Text>
                <Menu
                    visible={this.state.showSubCategoriesOptions}
                    style={{ paddingVertical: Sizes.fixPadding - 5.0, paddingRight: Sizes.fixPadding * 2.0 }}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ showSubCategoriesOptions: true })}
                            style={styles.subCategoryWrapStyle}
                        >
                            <Text style={{ marginRight: Sizes.fixPadding * 3.0, ...Fonts.primaryColor12SemiBold }}>
                                {this.state.selectedSubCategory}
                            </Text>
                            <MaterialCommunityIcons name="chevron-down" size={15} color={Colors.grayColor} />
                        </TouchableOpacity>
                    }
                    onRequestClose={() => this.setState({ showSubCategoriesOptions: false })}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            subCategoriesList.map((item, index) => (
                                <Text
                                    key={index}
                                    style={{ marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding, ...Fonts.blackColor12SemiBold }}
                                    onPress={() => this.setState({ selectedSubCategory: item, showSubCategoriesOptions: false })}
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
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ selectedCategoryIndex: index })}
                style={{ alignItems: 'center', marginRight: Sizes.fixPadding * 3.0, }}
            >
                <Image
                    source={item.categoryImage}
                    style={{
                        width: 26.0, height: 26.0, resizeMode: 'contain',
                        tintColor: this.state.selectedCategoryIndex == index ? Colors.primaryColor : Colors.grayColor,
                    }}
                />
                <Text style={this.state.selectedCategoryIndex == index ? { ...Fonts.primaryColor12SemiBold } : { ...Fonts.grayColor12SemiBold }}>
                    {item.categoryName}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor14SemiBold }}>
                    Select Category
                </Text>
                <FlatList
                    data={categoriesList}
                    keyExtractor={(item) => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, }}
                />
            </View>
        )
    }

    distanceInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        Distance
                    </Text>
                    <Text>{` `}</Text>
                    <Text style={{ ...Fonts.blackColor12Medium }}>
                        (in kms)
                    </Text>
                </Text>
                <DistanceSlider />
            </View>
        )
    }

    priceInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor14SemiBold }}>
                    Price
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 0.3 }}>
                        <Input
                            placeholder="Min"
                            placeholderTextColor={Colors.grayColor}
                            left={<Input.Affix text="$" textStyle={{ ...Fonts.blackColor12Medium, }} />}
                            style={styles.minAndMaxPriceTextFieldStyle}
                            selectionColor={Colors.primaryColor}
                            underlineColor={'transparent'}
                            value={this.state.minPrice}
                            onChangeText={(value) => this.setState({ minPrice: value })}
                            theme={{ colors: { primary: 'transparent', underlineColor: 'transparent', } }}
                            keyboardType="numeric"
                        />
                    </View>
                    <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.grayColor12Medium }}>
                        to
                    </Text>
                    <View style={{ flex: 0.3 }}>
                        <Input
                            placeholder="Max"
                            placeholderTextColor={Colors.grayColor}
                            left={<Input.Affix text="$" textStyle={{ ...Fonts.blackColor12Medium, }} />}
                            style={styles.minAndMaxPriceTextFieldStyle}
                            selectionColor={Colors.primaryColor}
                            underlineColor={'transparent'}
                            value={this.state.maxPrice}
                            onChangeText={(value) => this.setState({ maxPrice: value })}
                            theme={{ colors: { primary: 'transparent', underlineColor: 'transparent', } }}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </View>
        )
    }

    conditionsInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding - 5.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor14SemiBold }}>
                    Condition
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        conditionsList.map((item, index) => (
                            <TouchableOpacity
                                key={`${index}`}
                                activeOpacity={0.9}
                                onPress={() => this.setState({ selectedCondition: item })}
                                style={{
                                    ...styles.conditionOptionWrapStyle,
                                    borderColor: this.state.selectedCondition == item ? Colors.primaryColor : Colors.grayColor,
                                }}
                            >
                                <Text style={this.state.selectedCondition == item ? { ...Fonts.primaryColor12SemiBold } : { ...Fonts.grayColor12SemiBold }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    sortByInfo() {
        return (
            <View >
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor14SemiBold }}>
                    Sort By
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, flexDirection: 'row', }}>
                    {
                        sortByOptions.map((item, index) => (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => this.setState({ selectedSortOption: item })}
                                key={`${index}`}
                                style={{
                                    ...styles.sortByOptionWrapStyle,
                                    borderColor: this.state.selectedSortOption == item ? Colors.primaryColor : Colors.grayColor,
                                }}
                            >
                                <Text style={this.state.selectedSortOption == item ? { ...Fonts.primaryColor12SemiBold } : { ...Fonts.grayColor12SemiBold }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    updateSearchResults({ id }) {
        const newList = this.state.searchResults.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, inFavorite: !item.inFavorite };
                this.setState({
                    snackBarMsg: updatedItem.inFavorite ? `${updatedItem.productName} Added To Favorite` : `${updatedItem.productName} Removed From Favorite`
                })
                return updatedItem;
            }
            return item;
        });
        this.setState({ searchResults: newList })
    }

    searchResultsInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('ProductDetail')}
                style={styles.searchResultsWrapStyle}
            >
                <Image
                    source={item.productImage}
                    style={styles.productImageStyle}
                />
                <View style={{ padding: Sizes.fixPadding, flex: 1, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            {item.productAmount}
                        </Text>
                        <AntDesign
                            name={item.inFavorite ? "heart" : "hearto"}
                            size={17}
                            color="black"
                            onPress={() => {
                                this.updateSearchResults({ id: item.id })
                                this.setState({ showSnackBar: true })
                            }}
                        />
                    </View>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                        {item.productName}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
                        Age: {item.productAge}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
                        Location: {item.location}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
                        Published: {item.published}
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons
                            name="map-marker"
                            size={18}
                            color={Colors.primaryColor}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.blackColor12Medium }}>
                            {item.distanceInKm} kms away
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={this.state.searchResults}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding - 8.0, paddingBottom: Sizes.fixPadding * 2.0, paddingHorizontal: Sizes.fixPadding * 2.0, }}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    searchResultsCountAndFilterIcon() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: Sizes.fixPadding * 2.0,
            }}>
                <Text style={{ ...Fonts.grayColor12SemiBold }}>
                    {this.state.searchResults.length} Search Results...
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showFilterSheet: true })}
                    style={styles.filterIconWrapStyle}
                >
                    <MaterialCommunityIcons name="filter-variant" size={20} color={Colors.primaryColor} />
                </TouchableOpacity>
            </View>
        )
    }

    header() {
        const input = createRef();
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.whiteColor}
                    size={22}
                    onPress={() => this.props.navigation.pop()}
                    style={{ marginRight: Sizes.fixPadding, }}
                />
                <View style={styles.searchFieldWrapStyle}>
                    <TextInput
                        ref={input}
                        placeholder='Three seater sofa in mumbai maharashtra kal...'
                        placeholderTextColor={Colors.grayColor}
                        value={this.state.search}
                        onChangeText={(text) => this.setState({ search: text })}
                        style={{ flex: 1, ...Fonts.blackColor12Medium }}
                    />
                    <MaterialCommunityIcons
                        name="close-circle-outline"
                        size={18}
                        color={Colors.grayColor}
                        onPress={() => input.current.clear()}
                        style={{ marginLeft: Sizes.fixPadding, }}
                    />
                </View>
            </View>
        )
    }
}

const DistanceSlider = () => {

    const [lowValue, setLowValue] = useState(0);
    const [highValue, setHighValue] = useState(25);
    const renderThumb = useCallback(() => <View style={styles.sliderThumbStyle} />, []);
    const renderRail = useCallback(() => <View style={styles.inactiveSliderStyle} />, []);
    const renderRailSelected = useCallback(() => <View style={styles.selectedSliderStyle} />, []);
    const renderLabel = useCallback(value =>
        <View style={styles.distanceSliderLabelWrapStyle} >
            <Text style={{ ...Fonts.whiteColor14SemiBold }}>{value}</Text>
        </View>
        , []);
    const renderNotch = useCallback(() => <View style={styles.sliderNotchStyle} />, []);

    const handleValueChange = useCallback((low, high) => {
        setHighValue(high);
        setLowValue(low);
    }, []);

    return (
        <View style={{}}>
            <RangeSlider
                style={{ marginTop: Sizes.fixPadding - 5.0 }}
                min={0}
                max={100}
                step={1}
                floatingLabel={true}
                low={lowValue}
                high={highValue}
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
                onValueChanged={handleValueChange}
                renderNotch={renderNotch}
            />
            <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ ...Fonts.grayColor12Bold, }}>
                    {lowValue}
                </Text>
                <Text style={{ ...Fonts.grayColor12Bold, }}>
                    {highValue}
                </Text>
            </View>
        </View>
    )
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
    searchFieldWrapStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    },
    productImageStyle: {
        width: 100.0,
        height: '100%',
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
    },
    searchResultsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
    },
    filterIconWrapStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3.0,
        backgroundColor: Colors.whiteColor,
    },
    bottomSheetWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        paddingTop: Sizes.fixPadding + 5.0,
    },
    sortByOptionWrapStyle: {
        borderWidth: 1.0,
        flex: 1,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
    },
    conditionOptionWrapStyle: {
        borderWidth: 1.0,
        minWidth: 90.0,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center'
    },
    minAndMaxPriceTextFieldStyle: {
        height: 35.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        ...Fonts.blackColor12Medium,
        flex: 1,
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
    distanceSliderLabelWrapStyle: {
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
    subCategoryWrapStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    applyFilterButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 5.0,
        shadowColor: Colors.primaryColor,
        margin: Sizes.fixPadding * 2.0,
        borderColor: 'rgba(75, 44, 32, 0.5)',
        borderWidth: 1.0,
    }
});

SearchResultsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(SearchResultsScreen);