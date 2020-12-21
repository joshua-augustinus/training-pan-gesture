import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, BackHandler, StyleSheet } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';
import Animated, { Easing } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}

const MasterScreen = (props: Props) => {
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {

    }, []);

    const onMenuPress = () => {
        console.log(props.navigation.state);// { key: 'Home', routeName: 'Home' }
        console.log("Menu pressed");
        props.navigation.dispatch(DrawerActions.toggleDrawer());
    }

    const onGestureEvent = useCallback(Animated.event([
        {
            nativeEvent: {
                translationX: translateX
            }
        }
    ], { useNativeDriver: true }), [])

    const onHandlerStateChange = (event) => {
        if (event.nativeEvent.oldState == State.ACTIVE) {
            Animated.timing(translateX, {
                toValue: 0,
                duration: 200,
                easing: Easing.inOut(Easing.quad)
            }).start();
        }
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
                <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
                    <Animated.View style={{ ...styles.box, transform: [{ translateX: translateX }] }} />
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