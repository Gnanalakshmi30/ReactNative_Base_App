import React, { useContext } from "react";
import { View, Text, FlatList, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ShoppingCart, Search } from "lucide-react-native";
import Colors from '../styles/palette';
import { horizontalScale, moderateScale, verticalScale } from '../styles/style';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext } from '../contexts/ThemeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNSecureStorage from 'rn-secure-storage';
import { useSelector } from "react-redux";


const categories = [
    { id: "1", name: "Fashion", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBQsL9z1k2MEYA2wYxHNkkuuwOPmw84HJzwQ&s" },
    { id: "2", name: "Beauty", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC5CWp192O1uwU4qHMkcRadZF4j8UNc4tMw&s" },
    { id: "3", name: "Men's", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBDdyMruT93LWLu5erpIjP5-2YuDylLVdrDw&s" },
    { id: "4", name: "Women's", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzuwXHqpxF3JCwP30uhAuULSOT7WEaKMJubw&ss" },
    { id: "5", name: "Kids", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzuwXHqpxF3JCwP30uhAuULSOT7WEaKMJubw&ss" },
];

const products = [
    { id: "1", name: "White Jumpsuit", price: "₹1,100", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzuwXHqpxF3JCwP30uhAuULSOT7WEaKMJubw&ss" },
    { id: "2", name: "Vitamin C Serum", price: "₹2,453", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBQsL9z1k2MEYA2wYxHNkkuuwOPmw84HJzwQ&s" },
    { id: "3", name: "Strip T-shirt", price: "₹1,700", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBQsL9z1k2MEYA2wYxHNkkuuwOPmw84HJzwQ&s" },
];

const Home = () => {
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    let activeColors = Colors[theme.mode];
    const globalValue = useSelector((state) => state.global.value);

    const handleLogout = async () => {

        Alert.alert(
            "Logout Confirmation",
            "Do you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: async () => {

                        await RNSecureStorage.clear();
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    },
                },
            ]
        );
    };
    return (
        <ScrollView style={[styles.container, { backgroundColor: activeColors.primaryColor, }]}>
            <View style={styles.header}>
                <Text style={[styles.headerText, { color: activeColors.secondaryColor, }]}>Hello, Welcome</Text>
                <View style={styles.actionIconContainer}>
                    <TouchableOpacity>
                        <ShoppingCart size={moderateScale(24)} color={activeColors.secondaryColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout}>
                        <FontAwesome name="sign-out" size={moderateScale(24)} color={activeColors.secondaryColor} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.searchBarContainer}>
                <TextInput style={styles.searchBar} placeholder="Search" placeholderTextColor={Colors.greyColor} />
                <Search size={moderateScale(20)} color={Colors.greyColor} style={styles.searchIcon} />
            </View>
            <Text style={styles.sectionTitle}>Categories</Text>
            <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.categoryItem}>
                        <Image source={{ uri: item.image }} style={styles.categoryImage} />
                        <Text style={styles.categoryText}>{item.name}</Text>
                    </View>
                )}
                showsHorizontalScrollIndicator={false}
            />
            <LinearGradient colors={[globalValue, Colors.dodgerBlueColor,]} style={styles.banner}>
                <Text style={styles.bannerText}>Big Sale Up to 50% Discount</Text>
            </LinearGradient>

            <Text style={styles.sectionTitle}>Featured</Text>
            <FlatList
                horizontal
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Details", { product: item })}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.price}>{item.price}</Text>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: moderateScale(15) },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: verticalScale(10) },
    headerText: { fontSize: moderateScale(22), fontWeight: "bold" },
    searchBarContainer: { flexDirection: "row", backgroundColor: Colors.whitesmoke, borderRadius: moderateScale(10), paddingHorizontal: horizontalScale(15), alignItems: "center", marginVertical: verticalScale(10) },
    searchBar: { flex: 1, height: verticalScale(45), fontSize: moderateScale(16) },
    searchIcon: { marginLeft: horizontalScale(10) },
    sectionTitle: { fontSize: moderateScale(18), fontWeight: "bold", marginVertical: verticalScale(10) },
    categoryItem: { alignItems: "center", marginRight: horizontalScale(15) },
    categoryImage: { width: horizontalScale(50), height: verticalScale(50), borderRadius: moderateScale(25) },
    categoryText: { marginTop: verticalScale(5), fontSize: moderateScale(14), color: Colors.blackColor },
    banner: { borderRadius: moderateScale(12), padding: moderateScale(20), alignItems: "center", justifyContent: "center", marginVertical: verticalScale(10) },
    bannerText: { fontSize: moderateScale(20), fontWeight: "bold", color: Colors.whiteColor, textAlign: "center" },
    card: { backgroundColor: Colors.whiteColor, padding: moderateScale(15), borderRadius: moderateScale(12), alignItems: "center", shadowColor: Colors.blackColor, shadowOffset: { width: horizontalScale(0), height: verticalScale(2) }, shadowOpacity: moderateScale(0.2), shadowRadius: moderateScale(4), elevation: moderateScale(3), marginRight: horizontalScale(15), marginBottom: verticalScale(10) },
    image: { width: horizontalScale(120), height: verticalScale(120), borderRadius: moderateScale(12) },
    title: { fontSize: moderateScale(16), fontWeight: "bold", marginTop: verticalScale(8), color: Colors.blackColor },
    price: { fontSize: moderateScale(16), color: Colors.redColor, marginTop: verticalScale(4) },
    actionIconContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: horizontalScale(10)
    },
});

export default Home;
