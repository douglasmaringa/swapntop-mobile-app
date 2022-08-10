import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, TouchableOpacity, StyleSheet, Text, FlatList } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, } from '@expo/vector-icons';

const recentSearchesList = ['Sofa', 'Three seater sofa', 'House for rent', 'IPhone X'];

class SearchScreen extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.recentSearchesInfo()}
                </View>
            </SafeAreaView>
        )
    }

    recentSearchesInfo() {
        const renderItem = ({ item }) => (
            <View style={{ marginBottom: Sizes.fixPadding - 7.0, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="history" size={17} color={Colors.primaryColor} />
                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                    {item}
                </Text>
            </View>
        )
        return (
            <FlatList
                ListHeaderComponent={
                    <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                        Recent Searches
                    </Text>
                }
                data={recentSearchesList}
                keyExtractor={(index) => `${index}`}
                renderItem={renderItem}
                contentContainerStyle={{ padding: Sizes.fixPadding * 2.0, }}
            />
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                    Search
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.push('SearchResults')}
                    style={styles.searchInfoWrapStyle}
                >
                    <MaterialIcons
                        name="search"
                        color={Colors.grayColor}
                        size={20}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor12Medium }}>
                        Search here...
                    </Text>
                </TouchableOpacity>
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
    searchInfoWrapStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding,
    }
});

export default withNavigation(SearchScreen);