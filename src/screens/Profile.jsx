import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import CustomAppbar from '../navigation/appbar';
import { ThemeContext } from '../contexts/ThemeContext';
import Colors from '../styles/palette';

const Profile = () => {
    const { theme } = useContext(ThemeContext);
    let activeColors = Colors[theme.mode];
    return (
        <View style={{ backgroundColor: activeColors.primaryColor, flex: 1 }} >
            <CustomAppbar title="Profile" />
            <View style={styles.container}>
                <Text style={{ color: activeColors.secondaryColor }}>Profile</Text>
            </View>
        </View>

    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})