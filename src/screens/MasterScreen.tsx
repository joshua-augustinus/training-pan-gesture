import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, BackHandler, StyleSheet } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';
import Animated, { Easing, Value, cond, eq, set } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { usePanGestureHandler, translate, withOffset } from "react-native-redash/lib/module/v1";
/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}

const MasterScreen = (props: Props) => {
    const { gestureHandler, translation, veloicty, state } = usePanGestureHandler();
    const translateX = withOffset(translation.x, state);
    const translateY = withOffset(translation.y, state);

    useEffect(() => {

    }, []);




    const onMenuPress = () => {
        console.log(props.navigation.state);// { key: 'Home', routeName: 'Home' }
        console.log("Menu pressed");
        props.navigation.dispatch(DrawerActions.toggleDrawer());
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 50, backgroundColor: 'red', flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity style={{ backgroundColor: 'yellow' }}
                    onPress={() => onMenuPress()}>
                    <Text>Menu</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <PanGestureHandler {...gestureHandler}>
                    <Animated.View style={[styles.box, { transform: [{ translateX }, { translateY }] }]} />
                </PanGestureHandler>
            </View>
        </SafeAreaView>

    );

}

MasterScreen.navigationOptions = {}

export { MasterScreen }

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'red',
        width: 100,
        height: 100
    }
})