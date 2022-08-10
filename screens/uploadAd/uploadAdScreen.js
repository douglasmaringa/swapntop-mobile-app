import React, { Component } from "react";
import { BackHandler, SafeAreaView, Dimensions, View, TouchableOpacity, FlatList, Image, StatusBar, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import { BottomSheet } from 'react-native-elements';

const { width } = Dimensions.get('window');

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

const phonesList = [
    {
        id: '1',
        categoryIcon: require('../../assets/images/categories/mobileBlack.png'),
        categoryOption: 'Mobile Phones',
        parent:'mobile',
    },
    {
        id: '2',
        categoryIcon: require('../../assets/images/categories/tablet.png'),
        categoryOption: 'Tablets',
        parent:'mobile',
    },
    {
        id: '3',
        categoryIcon: require('../../assets/images/categories/accessories.png'),
        categoryOption: 'Accessories',
        parent:'mobile',
    },
];

const propertyList = [
    {
        id: '1',
        categoryIcon: require('../../assets/images/categories/properties.png'),
        categoryOption: 'House For Sale',
        parent:'property',
    },
    {
        id: '2',
        categoryIcon: require('../../assets/images/categories/properties.png'),
        categoryOption: 'House For Rent',
        parent:'property',
    },
    {
        id: '3',
        categoryIcon: require('../../assets/images/categories/properties.png'),
        categoryOption: 'Land For Sale',
        parent:'property',
    },
    
];

const electronicsList = [
    {
        id: '1',
        categoryIcon: require('../../assets/images/categories/electronics.png'),
        categoryOption: 'Computer',
        parent:'electronics',
    },
    {
        id: '2',
        categoryIcon: require('../../assets/images/categories/electronics.png'),
        categoryOption: 'Laptop',
        parent:'electronics',
    },
    {
        id: '3',
        categoryIcon: require('../../assets/images/categories/electronics.png'),
        categoryOption: 'Printer',
        parent:'electronics',
    },
    {
        id: '4',
        categoryIcon: require('../../assets/images/categories/accessories.png'),
        categoryOption: 'Accessories',
        parent:'electronics',
    },
];

const carList = [
    {
        id: '1',
        categoryIcon: require('../../assets/images/categories/car.png'),
        categoryOption: 'Cars',
        parent:'cars',
    },
    {
        id: '2',
        categoryIcon: require('../../assets/images/categories/car.png'),
        categoryOption: 'Car Parts',
        parent:'cars',
    },
    {
        id: '3',
        categoryIcon: require('../../assets/images/categories/car.png'),
        categoryOption: 'Motobike',
        parent:'cars',
    },
    
    
];
class UploadAdScreen extends Component {

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
        selectedCategoryIndex: 0,
        showCategorySheet: false,
        mainCategory:"other",
        category:"other",
    }

    render() {
console.log(this.state.category)

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.categories()}
                    {this.nextButton()}
                </View>
                {this.selectCategorySheet()}
            </SafeAreaView>
        )
    }

    selectCategorySheet() {
        return (
            <BottomSheet
                isVisible={this.state.showCategorySheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { this.setState({ showCategorySheet: false }) } }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    
                    style={styles.categorySheetWrapStyle}
                >

{(() => {
        switch (this.state.selectedCategoryIndex) {
          case 0:   return (<>
          <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor16SemiBold, textAlign: 'center' }}>
                        Mobile Phones
                    </Text>
                    {
                       phonesList.map((item) => (
                            <TouchableOpacity onPress={()=>{this.setState({category:item.categoryOption})
                            this.setState({mainCategory:item.parent})
                             this.setState({ showCategorySheet: false })
                            }} key={`${item.id}`} style={{ marginBottom: Sizes.fixPadding + 5.0, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={item.categoryIcon}
                                    style={{ width: 20.0, height: 20.0, resizeMode: 'contain', }}
                                />
                                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14SemiBold }}>
                                    {item.categoryOption}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
          </>);
          case 1: return (<>
           <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor16SemiBold, textAlign: 'center' }}>
                        Property
                    </Text>
                    {
                       propertyList.map((item) => (
                            <TouchableOpacity onPress={()=>{this.setState({category:item.categoryOption})
                            this.setState({mainCategory:item.parent})
                             this.setState({ showCategorySheet: false })
                            }} key={`${item.id}`} style={{ marginBottom: Sizes.fixPadding + 5.0, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={item.categoryIcon}
                                    style={{ width: 20.0, height: 20.0, resizeMode: 'contain', }}
                                />
                                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14SemiBold }}>
                                    {item.categoryOption}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
          
            </>);
          case 2:  return (<>
          <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor16SemiBold, textAlign: 'center' }}>
                        Electronics
                    </Text>
                    {
                       electronicsList.map((item) => (
                            <TouchableOpacity onPress={()=>{this.setState({category:item.categoryOption})
                            this.setState({mainCategory:item.parent})
                             this.setState({ showCategorySheet: false })
                            }} key={`${item.id}`} style={{ marginBottom: Sizes.fixPadding + 5.0, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={item.categoryIcon}
                                    style={{ width: 20.0, height: 20.0, resizeMode: 'contain', }}
                                />
                                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14SemiBold }}>
                                    {item.categoryOption}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
          
            </>);
            case 3:  return (<>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor16SemiBold, textAlign: 'center' }}>
                      Cars
                    </Text>
                    {
                       carList.map((item) => (
                            <TouchableOpacity onPress={()=>{this.setState({category:item.categoryOption})
                            this.setState({mainCategory:item.parent})
                             this.setState({ showCategorySheet: false })
                            }} key={`${item.id}`} style={{ marginBottom: Sizes.fixPadding + 5.0, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={item.categoryIcon}
                                    style={{ width: 20.0, height: 20.0, resizeMode: 'contain', }}
                                />
                                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14SemiBold }}>
                                    {item.categoryOption}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                  </>);
          default:      return (<>
           <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor16SemiBold, textAlign: 'center' }}>
                        Comming Soon
                    </Text>
                    
          
            </>);
        }
      })()}

                </TouchableOpacity>
            </BottomSheet>
        )
    }

    nextButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('AdDetail', {
                    category: this.state.category,
                    mainCategory:this.state.mainCategory,
                })}
                style={styles.nextButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    NEXT
                </Text>
            </TouchableOpacity>
        )
    }

    categories() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => { this.setState({ selectedCategoryIndex: index, showCategorySheet: true }) }}
                style={styles.categoryWrapStyle}
            >
                <View style={styles.categoryImageWrapStyle}>
                    <Image
                        source={item.categoryImage}
                        style={{
                            width: 30.0, height: 30.0, resizeMode: 'contain',
                            tintColor: this.state.selectedCategoryIndex == index ? Colors.primaryColor : Colors.grayColor
                        }}
                    />
                </View>
                <Text
                    numberOfLines={1}
                    style={{ ...this.state.selectedCategoryIndex == index ? { ...Fonts.primaryColor14Medium } : { ...Fonts.grayColor14Medium } }}
                >
                    {item.categoryName}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View>
                <FlatList
                    data={categoriesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={4}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, paddingHorizontal: Sizes.fixPadding * 2.0, }}
                />
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="close"
                    color={Colors.whiteColor}
                    size={22}
                    onPress={() => this.props.navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.whiteColor18SemiBold }}>
                    What are you offering?
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
    categoryWrapStyle: {
        maxWidth: width / 4.0 - 10.0,
        marginBottom: Sizes.fixPadding,
        flex: 1,
        alignItems: 'center'
    },
    nextButtonStyle: {
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
    categorySheetWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding - 5.0,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    categoryImageWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        borderColor: '#ececec',
        borderWidth: 1.5,
        elevation: 5.0,
        backgroundColor: Colors.whiteColor,
    }
});

UploadAdScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.ModalSlideFromBottomIOS,
    }
}

export default withNavigation(UploadAdScreen);