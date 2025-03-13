import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext';
import Colors from '../styles/palette';
import CustomAppbar from '../navigation/appbar';


const UserList = () => {
    const { theme } = useContext(ThemeContext);
    let activeColors = Colors[theme.mode];
    return (
        <View style={{ backgroundColor: activeColors.primaryColor, flex: 1 }}>
            <CustomAppbar title="User list" />
            <View style={styles.container}>
                <Text style={{ color: activeColors.secondaryColor }}>User List Screen</Text>
            </View>
        </View>

    )
}

export default UserList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})