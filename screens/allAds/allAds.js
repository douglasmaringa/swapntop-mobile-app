import React, { Component } from "react";
import { SafeAreaView, View, Image, StatusBar, FlatList, StyleSheet, Text, Dimensions } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Menu } from 'react-native-material-menu';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('window');

const adOptionsList = ['Edit', 'Deactivate', 'Delete', 'Mark as Sold'];

class AllAds extends Component {

    state = {
        allAds: this.props.ads,
        showAdOptions: true,
        currentAdId: null,
        showDeleteDialog: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {
                        this.state.allAds.length != 0
                            ?
                            this.adsDetail()
                            :
                            this.noAdsInfo()
                    }
                </View>
                {this.deletetDialog()}
            </SafeAreaView>
        )
    }

    noAdsInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ ...Fonts.grayColor16SemiBold }}>
                    {this.props.emptyMessage}
                </Text>
            </View>
        )
    }

    removeAd() {
        const newList = this.state.allAds.filter((item) => item.id != this.state.currentAdId)
        this.setState({ allAds: newList })
    }

    deletetDialog() {
        return (
            <Dialog.Container
                visible={this.state.showDeleteDialog}
                contentStyle={styles.deleteDialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
                onRequestClose={() => this.setState({ showDeleteDialog: false })}
            >
                <View style={{ backgroundColor: Colors.whiteColor, }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold, }}>
                        Sure you want to Delete this ad?
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding + 5.0, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text
                            onPress={() => {
                                this.setState({ showDeleteDialog: false })
                                this.removeAd()
                            }}
                            style={{ marginRight: Sizes.fixPadding * 2.0, ...Fonts.primaryColor14SemiBold }}
                        >
                            Yes
                        </Text>
                        <Text
                            onPress={() => { this.setState({ showDeleteDialog: false }) }}
                            style={{ ...Fonts.grayColor14SemiBold }}
                        >
                            No
                        </Text>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    adsDetail() {
        const renderItem = ({ item }) => (
            <View style={styles.adInfoWrapStyle}>
                <View style={{ flexDirection: 'row', }}>
                    <Image
                        source={item.productImage}
                        style={{ width: 100, height: 100, borderRadius: Sizes.fixPadding - 5.0, }}
                    />
                    <View style={{ marginLeft: Sizes.fixPadding - 2.0, flex: 1, }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                {item.productAmount}
                            </Text>
                            <Menu
                                visible={this.state.currentAdId == item.id ? this.state.showAdOptions : false}
                                style={{ paddingRight: Sizes.fixPadding * 2.0, paddingBottom: Sizes.fixPadding - 5.0, }}
                                anchor={
                                    <MaterialIcons
                                        name="more-vert"
                                        color={Colors.blackColor}
                                        size={20}
                                        style={{ marginRight: Sizes.fixPadding - 20.0, }}
                                        onPress={() => this.setState({ currentAdId: item.id, showAdOptions: true })}
                                    />
                                }
                                onRequestClose={() => this.setState({ showAdOptions: false })}
                            >
                                {
                                    adOptionsList.map((size, index) => (
                                        <Text
                                            key={`${index}`}
                                            style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor12SemiBold }}
                                            onPress={() => {
                                                index == 0
                                                    ?
                                                    this.props.props.navigation.push('EditAd')
                                                    :
                                                    index == 2 ?
                                                        this.setState({ showDeleteDialog: true })
                                                        :
                                                        null
                                                this.setState({ showAdOptions: false })
                                            }}
                                        >
                                            {size}
                                        </Text>
                                    ))
                                }
                            </Menu>
                        </View>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                            {item.productName}
                        </Text>
                        <Text style={{ ...Fonts.grayColor12Medium }}>
                            Age: {item.productAge}
                        </Text>
                        <Text style={{ ...Fonts.grayColor12Medium }}>
                            Published: {item.published}
                        </Text>
                        <View style={{ marginTop: Sizes.fixPadding - 4.0, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.adStatusWrapStyle}>
                                <Text style={{ ...Fonts.blackColor10SemiBold }}>
                                    {item.productStatus}
                                </Text>
                            </View>
                            <Text style={{ flex: 1, marginLeft: Sizes.fixPadding - 7.0, ...Fonts.grayColor10SemiBold }}>
                                ({item.productStatusDescription})
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="remove-red-eye" size={16} color={Colors.blackColor}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor12SemiBold }}>
                        Views: {item.views}
                    </Text>
                    <Text style={{ marginHorizontal: Sizes.fixPadding + 8.0, ...Fonts.blackColor12SemiBold }}>
                        |
                    </Text>
                    <MaterialIcons
                        name="favorite"
                        color={Colors.blackColor}
                        size={16}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor12SemiBold }}>
                        Likes: {item.likes}
                    </Text>
                </View>
            </View >
        )
        return (
            <FlatList
                data={this.state.allAds}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0, }}
            />
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
    adInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: '#ececec',
        borderWidth: 1.0,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    adStatusWrapStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center', justifyContent: 'center',
        minWidth: 70.0,
        paddingVertical: Sizes.fixPadding - 8.0,
    },
    deleteDialogWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: width - 400,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
});

export default AllAds;
