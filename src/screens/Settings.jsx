import React, { useState, useRef, useContext } from 'react';
import { View, Text, Switch, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Card, RadioButton, List } from 'react-native-paper';
import CustomAppbar from '../navigation/appbar';
import Colors from '../styles/palette';
import { horizontalScale, moderateScale, verticalScale } from '../styles/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../contexts/ThemeContext';
import { updateGlobalValue } from "../contexts/globalStore";
import { useDispatch, useSelector } from "react-redux";

const colorOptions = [
    Colors.blackColor,
    Colors.whiteColor,
    Colors.greyColor,
    Colors.blueColor,
    Colors.darkBlueColor,
    Colors.skyBlueColor,
    Colors.royalBlueColor,
    Colors.dodgerBlueColor,
    Colors.redColor,
    Colors.maroonColor,
    Colors.orangeColor,
    Colors.yellowColor,
    Colors.greenColor,
    Colors.lightSeaGreenColor,
    Colors.whitesmoke
];

const SettingsScreen = () => {
    const { theme, updateTheme } = useContext(ThemeContext);
    let activeColors = Colors[theme.mode];
    const [isDarkMode, setIsDarkMode] = useState(theme.mode === "dark");
    const [selectedColor, setSelectedColor] = useState(Colors.lightSeaGreenColor);
    const [colorList, setColorList] = useState(colorOptions);
    const colorListRef = useRef(null);
    const globalPrimaryVal = useSelector((state) => state.global.value);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const loadPrimaryColor = async () => {
    //         const savedColor = await RNSecureStorage.getItem('selectedPrimaryColor');
    //         if (savedColor) {
    //             setSelectedColor(savedColor);
    //         }
    //     };
    //     loadPrimaryColor();
    // }, []);



    const handleDarkModeSwitch = () => {
        updateTheme();
        setIsDarkMode((previousState) => !previousState);
    }

    const handleThemeChange = ({ mode }) => {
        setIsDarkMode(mode === "dark");
        updateTheme({ mode: mode });
    }

    const handlePrimaryColorChange = async (color) => {
        setSelectedColor(color);
        const newColorList = [color, ...colorOptions.filter(c => c !== color)];
        setColorList(newColorList);
        dispatch(updateGlobalValue(color))
        setTimeout(() => {
            colorListRef.current?.scrollToIndex({ index: 0, animated: true });
        }, 100);

    };



    return (
        <View style={{ backgroundColor: activeColors.primaryColor, flex: 1 }}>
            <CustomAppbar title="Settings" />
            <ScrollView contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>


                <View style={styles.mainContainer}>

                    <Text style={[styles.sectionTitle, { color: activeColors.secondaryColor }]}>User</Text>
                    <Card style={[styles.card]}>

                        <Card.Content>
                            <View style={styles.row}>
                                <Text style={[styles.label, { color: Colors.blackColor }]}>Name</Text>
                                <Text style={[styles.value, { color: Colors.blackColor }]}>Richard Barnes</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.label, { color: Colors.blackColor }]}>Joined On</Text>
                                <Text style={[styles.value, { color: Colors.blackColor }]}>07 / 10 / 22</Text>
                            </View>
                        </Card.Content>
                    </Card>
                    <Text style={[styles.sectionTitle, { color: activeColors.secondaryColor }]}>Theme Switch</Text>

                    <Card style={[styles.card,]}>
                        <Card.Content>
                            <View style={styles.row}>
                                <Text style={[styles.label, { color: Colors.blackColor }]}>Dark Mode</Text>
                                <Switch
                                    value={isDarkMode}
                                    onValueChange={handleDarkModeSwitch}
                                    thumbColor={isDarkMode ? globalPrimaryVal : Colors.greyColor}
                                    ios_backgroundColor={activeColors.primaryColor}
                                    trackColor={{
                                        false: activeColors.primaryColor,
                                        true: activeColors.tintColor
                                    }}
                                />
                            </View>
                        </Card.Content>
                    </Card>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: activeColors.secondaryColor }]}>Theme Settings</Text>
                        <Card style={styles.themeSelector}>

                            <List.Item titleStyle={styles.label}
                                title="Light"
                                left={() => <MaterialIcons name={"light-mode"} style={styles.themeIcons} />}
                                right={() => <RadioButton value="light" status={theme.mode === "light" && !theme.system ? "checked" : "unchecked"}
                                    onPress={() => handleThemeChange({ mode: "light" })}
                                />}
                            />
                            <List.Item titleStyle={styles.label}
                                title="Dark"
                                left={() => <MaterialIcons name={"nightlight-round"} style={styles.themeIcons} />}
                                right={() => <RadioButton value="dark" status={theme.mode === "dark" && !theme.system ? "checked" : "unchecked"} onPress={() => handleThemeChange({ mode: "dark" })} />}
                            />
                            <List.Item titleStyle={styles.label}
                                title="System"
                                left={() => <MaterialIcons name={"settings-suggest"} style={styles.themeIconsSetting} />}
                                right={() => <RadioButton value="system" status={theme.system ? "checked" : "unchecked"} onPress={() => updateTheme({ system: true })} />}
                            />

                        </Card>
                    </View>
                    <Text style={[styles.sectionTitle, { color: activeColors.secondaryColor }]}>Primary Colour</Text>
                    <Card style={styles.card}>
                        <Card.Content >
                            <View style={[styles.selectedColorContainer, { backgroundColor: selectedColor }]}>
                                <Text style={[styles.selectedColorText, { color: selectedColor === Colors.whiteColor ? Colors.blackColor : Colors.whiteColor, }]}>Selected Color</Text>
                            </View>
                            <FlatList
                                ref={colorListRef}
                                data={colorList}
                                horizontal
                                extraData={selectedColor}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[styles.colorCircle,
                                        { backgroundColor: item, borderColor: item === selectedColor ? selectedColor : 'transparent', }
                                        ]}
                                        onPress={() => handlePrimaryColorChange(item)}
                                    />
                                )}
                            />
                        </Card.Content>
                    </Card>
                </View>

            </ScrollView>


        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: verticalScale(200)
    },
    mainContainer: {
        marginVertical: verticalScale(10),
        marginHorizontal: horizontalScale(10)

    },
    card: {
        padding: moderateScale(16),
        borderRadius: moderateScale(10),
        marginBottom: verticalScale(16),
    },
    section: {

        marginBottom: verticalScale(16),

    },
    sectionTitle: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        marginBottom: verticalScale(8),

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(8),
    },
    label: {
        fontSize: moderateScale(14),
    },
    value: {
        fontSize: moderateScale(14),
        fontWeight: 'bold',
    },
    themeSelector: {
        borderRadius: moderateScale(10),
        overflow: 'hidden',
        paddingHorizontal: horizontalScale(10)
    },
    themeIcons: {
        paddingTop: verticalScale(5),
        fontSize: moderateScale(20),
        color: Colors.orangeColor
    },
    themeIconsSetting: {
        paddingTop: verticalScale(5),
        fontSize: moderateScale(20),
        color: Colors.lightSeaGreenColor
    },
    colorCircle: {
        width: horizontalScale(50),
        height: verticalScale(50),
        borderRadius: moderateScale(25),
        marginHorizontal: horizontalScale(5),
        borderWidth: moderateScale(3),
        justifyContent: "center",
        alignItems: "center",
    },
    selectedColorContainer: {
        height: verticalScale(50),
        borderRadius: moderateScale(10),
        marginBottom: verticalScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    selectedColorText: {
        fontSize: moderateScale(15),
        fontWeight: "bold",
    },

});

export default SettingsScreen;
