import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, BackHandler, StyleSheet } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const {
    event,
    Value,
    cond,
    add,
    multiply,
    eq,
    set,
} = Animated;
/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}

function interaction(gestureTranslation, gestureState) {
    const dragging = new Value(0);
    const start = new Value(0);
    const position = new Value(0);

    return cond(
        eq(gestureState, State.ACTIVE),
        [
            cond(dragging, 0, [set(dragging, 1), set(start, position)]),
            set(position, add(start, gestureTranslation)),
        ],
        [set(dragging, 0), position]
    );
}

const MasterScreen = (props: Props) => {
    const gestureX = useRef(new Value(0)).current;
    const gestureY = useRef(new Value(0)).current;

    const state = useRef(new Value(-1)).current;

    useEffect(() => {

    }, []);

    const onGestureEvent = event([
        {
            nativeEvent: {
                translationX: gestureX,
                translationY: gestureY,
                state: state,
            },
        },
    ]);

    const transX = interaction(gestureX, state);
    const transY = interaction(gestureY, state);



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
                <PanGestureHandler onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onGestureEvent}>
                    <Animated.View style={[styles.box, { transform: [{ translateX: transX }, { translateY: transY }] }]} />
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