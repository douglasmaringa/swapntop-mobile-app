import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, Dimensions, ScrollView, FlatList, TouchableOpacity, StatusBar, Image, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import { db } from "../../firebase";
import firebase from "firebase";

const { width } = Dimensions.get('window');

const itemImagesList = [
    require('../../assets/images/mobiles/mobile14.png'),
    require('../../assets/images/mobiles/mobile11.png'),
    require('../../assets/images/mobiles/mobile12.png'),
];

const productDescriptionsList = [
    'Iphone 11Pro Max Black Color',
    'All access are there bill box and all',
    '1 week extended warranty left now',
    'Phone is in good new condition',
    'It is an Indian purchase phone with Gst bill'
];

class ReviewItemScreen extends Component {

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

    componentDidMount(){
        var user = firebase.auth().currentUser;
        this.setState({email:user.email})
    }

    state = {
        email: null,
        loading:false
    }

    post = async ()=>{
        this.setState({loading:true})
        db.collection('products').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            email:this.state.email,
            mainCategory: this.props.navigation.state.params.mainCategory,
            category: this.props.navigation.state.params.category,
            brand: this.props.navigation.state.params.brand,
            title: this.props.navigation.state.params.title,
            price: parseInt(this.props.navigation.state.params.price),
            purchasedOn:this.props.navigation.state.params.purchasedOn,
            condition:this.props.navigation.state.params.condition,
            location: this.props.navigation.state.params.location,
            description: this.props.navigation.state.params.description,
            images:this.props.navigation.state.params.images,
          }).then((res)=>{
              console.log("done",res.id)
              this.setState({loading:false})
              this.props.navigation.push('AdSuccessfullyPost')
          }).catch(error => {
            alert(error.message)
            this.setState({loading:false})
        })
          
    }

    render() {
        var params = this.props.navigation.state.params;

        console.log(params)
        
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.itemImages()}
                        {this.itemDetail()}
                        {this.divider()}
                        {this.descriptionInfo()}
                        {this.divider()}
                        {this.publishButton()}
                        {this.editButton()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    editButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.pop()}
                style={styles.editButtonStyle}
            >
                <Text style={{ ...Fonts.primaryColor16Bold }}>
                    EDIT
                </Text>
            </TouchableOpacity>
        )
    }

    publishButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.post()}
                style={styles.publishButtonStyle}
            >
                {
                    this.state.loading?(<>
                    <Image
                    source={{ uri: "https://i.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.webp" }}
                  style={{ width: 80.0, height: 40.0, borderRadius: Sizes.fixPadding - 5.0, }}
                                   />
                
                    </>):(<>
                    <Text style={{ ...Fonts.whiteColor16Bold }}>
                    PUBLISH
                </Text>
                    </>)
                }
                
            </TouchableOpacity>
        )
    }

    descriptionInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    Description
                </Text>
                {/*{
                    productDescriptionsList.map((item, index) => (
                        <Text
                            key={`${index}`}
                            style={{ ...Fonts.grayColor12Medium, marginBottom: Sizes.fixPadding - 5.0, }}
                        >
                            • {item}
                        </Text>
                    ))
                }*/}

                            <Text
                            
                            style={{ ...Fonts.grayColor12Medium, marginBottom: Sizes.fixPadding - 5.0, }}
                        >
                            • {this.props.navigation.state.params.description}
                        </Text>
                <Text style={{ textAlign: 'justify', ...Fonts.grayColor12Medium }}>
                   </Text>
            </View>
        )
    }

    divider() {
        return (
            <View style={{
                backgroundColor: Colors.lightGrayColor,
                height: 1.0,
                margin: Sizes.fixPadding * 2.0,
            }} />
        )
    }

    itemDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor20SemiBold }}>
                    ${this.props.navigation.state.params.price}
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding, ...Fonts.grayColor14Medium }}>
                   {this.props.navigation.state.params.title} </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons
                            name="map-marker"
                            size={18}
                            color={Colors.primaryColor}
                        />
                        <Text style={{ ...Fonts.grayColor12Medium }}>
                           {this.props.navigation.state.params.location}
                        </Text>
                    </View>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                        Posted on {this.props.navigation.state.params.purchasedOn}
                    </Text>
                </View>
            </View>
        )
    }

    itemImages() {
        const renderItem = ({ item }) => (
            <View style={styles.itemImagesWrapStyle}>
                <Image
                    source={{uri:item}}
                    style={{ width: '100%', height: '100%', borderRadius: Sizes.fixPadding - 5.0, }}
                />
            </View>
        )
        return (
            <View>
                <FlatList
                    data={this.props.navigation.state.params.images}
                    keyExtractor={(index) => `${index}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0, paddingLeft: Sizes.fixPadding * 2.0, paddingRight: Sizes.fixPadding, }}
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
                    Review Ad
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
    itemImagesWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginRight: Sizes.fixPadding,
        height: 150.0,
        width: width / 1.5
    },
    publishButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 5.0,
        shadowColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderColor: 'rgba(75, 44, 32, 0.5)',
        borderWidth: 1.0,
    },
    editButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 1.0,
        shadowColor: Colors.primaryColor,
        margin: Sizes.fixPadding * 2.0,
        borderColor: '#ececec',
        borderWidth: 1.0,
    }
});

ReviewItemScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(ReviewItemScreen);