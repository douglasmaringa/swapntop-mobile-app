import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, ScrollView, TouchableOpacity, TextInput, FlatList, Image, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase";

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

class AdDetailScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentDidMount(){
        (async () => {
            if (Platform.OS !== "web") {
              const libraryResponse =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              const photoResponse = await ImagePicker.requestCameraPermissionsAsync();
            
              if (
                libraryResponse.status !== "granted" ||
                photoResponse.status !== "granted"
              ) {
                alert("Sorry, we need camera roll permissions to make this work!");
              }
            }
          })();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    state = {
        brand: null,
        title: null,
        price: null,
        purchasedOn: null,
        condition: null,
        location: null,
        description: null,
        image:null,
        images:[],
        loading:false,
    }

    // Image picker
   pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      this.setState({image:result.uri});
      this.sendImage()
    }
  };

   sendImage = async () => {
    this.setState({loading:true});
    if (!this.state.image) {
      return;
    }
    const blob = await this.getBlob(this.state.image);
   

    const uploadTask = storage.ref(`/images/${this.state.image}`).put(blob)
    uploadTask.on('state_changed',(snapShot)=>{
        console.log(snapShot)
    },(err)=>{
      console.log(JSON.stringify(err));
      this.setState({loading:false});
    },()=>{
        storage.ref('images').child(this.state.image).getDownloadURL().then(firebaseUrl=>{
            
          console.log("uploaded",firebaseUrl)
          this.setState(prevState => ({images: [...prevState.images, firebaseUrl]
          }))
          this.setState({loading:false});
        })
    })

    
  };

   getBlob = async (uri) => {
    const respone = await fetch(uri);
    const blob = await respone.blob();
    return blob;
  };


 

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
                    {this.nextButton()}
                </View>
            </SafeAreaView>
        )
    }

    nextButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('ReviewItem', {
                    mainCategory: this.props.navigation.state.params.mainCategory,
                    category: this.props.navigation.state.params.category,
                    brand: this.state.brand,
                    title: this.state.title,
                    price: this.state.price,
                    purchasedOn:this.state.purchasedOn,
                    condition:this.state.condition,
                    location: this.state.location.toLowerCase(),
                    description: this.state.description,
                    images:this.state.images,
                })}
                style={styles.nextButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    NEXT
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
                    placeholder="Harare"
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
                    placeholder="$900"
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
                    source={{ uri: item }}
                    style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding - 5.0, }}
                />
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor10SemiBold }}>
                   {/* {item.itemDescription}*/}
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
                    data={this.state.images}
                    keyExtractor={(index) => `${index}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0, }}
                    ListFooterComponent={
                        <View style={{ alignItems: 'center', }}>
                           
                            <View style={styles.addPhotoIconWrapStyle}>
                                {
                                    this.state.loading?(<>
                                    <Image
                                    source={{ uri: "https://i.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.webp" }}
                                    style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding - 5.0, }}
                                        />
                                    </>):(<>
                                <TouchableOpacity onPress={()=>this.pickImage()}>
                                     <MaterialIcons
                                    name="photo-camera"
                                    color={Colors.whiteColor}
                                    size={24}
                                />
                                </TouchableOpacity> 
                                    </>)
                                }
                           
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
                    Create Your Own Ad
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
    nextButtonStyle: {
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

AdDetailScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(AdDetailScreen);