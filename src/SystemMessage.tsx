import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native'
import PropTypes from 'prop-types'
import Color from './Color'
import { IMessage } from './types'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.defaultColor,
    fontSize: 12,
    fontWeight: '300',
  },
})

export interface SystemMessageProps<TMessage extends IMessage> {
  currentMessage?: TMessage
  containerStyle?: StyleProp<ViewStyle>
  wrapperStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export default class SystemMessage<
  TMessage extends IMessage = IMessage
> extends React.PureComponent<SystemMessageProps<TMessage>> {
  static defaultProps = {
    currentMessage: {
      system: false,
    },
    containerStyle: {},
    wrapperStyle: {},
    textStyle: {},
  }

  static propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    textStyle: PropTypes.any,
  }

  render() {
    const {
      currentMessage,
      containerStyle,
      wrapperStyle,
      textStyle,
    } = this.props
    if (currentMessage) {
      return (
        <View style={[styles.container, containerStyle]}>
          <View style={wrapperStyle}>
            <Text style={[styles.text, textStyle]}>{currentMessage.text}</Text>
          </View>
        </View>
      )
    }
    return null
  }
}
