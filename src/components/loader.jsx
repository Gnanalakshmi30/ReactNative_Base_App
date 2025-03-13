import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import Colors from '../styles/palette';
import { ThemeContext } from '../contexts/ThemeContext';

const Loader = () => {
    const { theme } = useContext(ThemeContext);
    let activeColors = Colors[theme.mode];
    return (
        <View style={[styles.container, { backgroundColor: activeColors.loaderColor }]}>
            <ActivityIndicator size={"large"} color={Colors.lightSeaGreenColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 999,
    }
});

export default Loader;
