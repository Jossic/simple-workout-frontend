import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

type PressableTextProps = PressableProps & {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
};

const PressableText: React.FC<PressableTextProps> = (props) => {
  return (
    <Pressable {...props}>
      <View
        style={
          props.buttonStyle ? props.buttonStyle : styles.defaultButtonStyle
        }
      >
        <Text
          style={props.textStyle ? props.textStyle : styles.defaultTextStyle}
        >
          {props.text}
        </Text>
      </View>
    </Pressable>
  );
};

export default PressableText;

const styles = StyleSheet.create({
  defaultButtonStyle: {
    marginVertical: 15,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: 'lightblue',
    width: '80%',
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 2,
  },
  defaultTextStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
