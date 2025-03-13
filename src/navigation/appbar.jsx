import React, { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import Colors from '../styles/palette';
import { ThemeContext } from '../contexts/ThemeContext';

const CustomAppbar = ({ title }) => {
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    let activeColors = Colors[theme.mode];

    return (
        <Appbar.Header style={{ backgroundColor: activeColors.primaryColor }}>
            <Appbar.BackAction onPress={() => navigation.goBack()} color={activeColors.secondaryColor} />
            <Appbar.Content title={title} titleStyle={{ color: activeColors.secondaryColor }} />
            <Appbar.Action icon="magnify" color={activeColors.secondaryColor} />
            <Appbar.Action icon="dots-vertical" color={activeColors.secondaryColor} />
        </Appbar.Header>
    );
};

export default CustomAppbar;