import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/Dashboard';

const Drawer = createDrawerNavigator();

function SideBar() {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
    )
}

export default SideBar
