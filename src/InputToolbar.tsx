import PropTypes from 'prop-types'
import React from 'react'
import {
  StyleSheet,
  View,
  Keyboard,
  ViewPropTypes,
  EmitterSubscription,
  StyleProp,
  ViewStyle,
} from 'react-native'

import Composer, { ComposerProps } from './Composer'
import Send, { SendProps } from './Send'
import Actions, { ActionsProps } from './Actions'
import Color from './Color'

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Color.defaultColor,
    backgroundColor: Color.white,
    bottom: 0,
    left: 0,
    right: 0,
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  accessory: {
    height: 44,
  },
})

export interface InputToolbarProps {
  actionsProps?: Partial<ActionsProps>,
  composerProps?: Partial<ComposerProps>,
  sendProps?: Partial<SendProps>,
  containerStyle?: StyleProp<ViewStyle>
  primaryStyle?: StyleProp<ViewStyle>
  accessoryStyle?: StyleProp<ViewStyle>
  renderAccessory?(props: InputToolbarProps): React.ReactNode
  renderActions?(props: Actions['props']): React.ReactNode
  renderSend?(props: Send['props']): React.ReactNode
  renderComposer?(props: Composer['props']): React.ReactNode
}

export default class InputToolbar extends React.Component<
  InputToolbarProps,
  { position: string }
> {
  static defaultProps = {
    renderAccessory: null,
    renderActions: null,
    renderSend: null,
    renderComposer: null,
    containerStyle: {},
    primaryStyle: {},
    accessoryStyle: {},
  }

  static propTypes = {
    actionsProps: PropTypes.shape(Actions.propTypes),
    composerProps: PropTypes.shape(Composer.propTypes),
    sendProps: PropTypes.shape(Send.propTypes),
    renderAccessory: PropTypes.func,
    renderActions: PropTypes.func,
    renderSend: PropTypes.func,
    renderComposer: PropTypes.func,
    containerStyle: ViewPropTypes.style,
    primaryStyle: ViewPropTypes.style,
    accessoryStyle: ViewPropTypes.style,
  }

  state = {
    position: 'absolute',
  }

  keyboardWillShowListener?: EmitterSubscription = undefined
  keyboardWillHideListener?: EmitterSubscription = undefined

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    )
    this.keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    )
  }

  componentWillUnmount() {
    if (this.keyboardWillShowListener) {
      this.keyboardWillShowListener.remove()
    }
    if (this.keyboardWillHideListener) {
      this.keyboardWillHideListener.remove()
    }
  }

  keyboardWillShow = () => {
    if (this.state.position !== 'relative') {
      this.setState({
        position: 'relative',
      })
    }
  }

  keyboardWillHide = () => {
    if (this.state.position !== 'absolute') {
      this.setState({
        position: 'absolute',
      })
    }
  }

  renderActions() {
    const { actionsProps } = this.props
    if (this.props.renderActions && actionsProps) {
      return this.props.renderActions(actionsProps)
    } else if (actionsProps && actionsProps.onPressActionButton) {
      return <Actions {...actionsProps} />
    }
    return null
  }

  renderSend() {
    const { sendProps } = this.props
    if (this.props.renderSend && sendProps) {
      return this.props.renderSend(sendProps)
    }
    return <Send {...sendProps} />
  }

  renderComposer() {
    const { composerProps } = this.props
    if (this.props.renderComposer && composerProps) {
      return this.props.renderComposer(composerProps)
    }

    return <Composer {...composerProps} />
  }

  renderAccessory() {
    if (this.props.renderAccessory) {
      return (
        <View style={[styles.accessory, this.props.accessoryStyle]}>
          {this.props.renderAccessory(this.props)}
        </View>
      )
    }
    return null
  }

  render() {
    return (
      <View
        style={
          [
            styles.container,
            this.props.containerStyle,
            { position: this.state.position },
          ] as ViewStyle
        }
      >
        <View style={[styles.primary, this.props.primaryStyle]}>
          {this.renderActions()}
          {this.renderComposer()}
          {this.renderSend()}
        </View>
        {this.renderAccessory()}
      </View>
    )
  }
}
