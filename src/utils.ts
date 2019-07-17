import moment from 'moment'
// @ts-ignore
import memoize from 'memize'
import { IMessage } from './types'

export function isSameDay(
  currentMessage: IMessage,
  diffMessage: IMessage | null | undefined,
) {
  if (!diffMessage || !diffMessage.createdAt) {
    return false
  }

  const currentCreatedAt = moment(currentMessage.createdAt)
  const diffCreatedAt = moment(diffMessage.createdAt)

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false
  }

  return currentCreatedAt.isSame(diffCreatedAt, 'day')
}

export function isSameUser(
  currentMessage: IMessage,
  diffMessage: IMessage | null | undefined,
) {
  return !!(
    diffMessage &&
    diffMessage.user &&
    currentMessage.user &&
    diffMessage.user._id === currentMessage.user._id
  )
}

export interface AnyProps {
  [prop: string]: any
}

export function memoizeProps(props: any): any {
  const keys = Object.keys(props)
  const values = Object.values(props)
  return buildProps(...keys, ...values)
}

const buildProps = memoize(function buildProps(...args: any[]) {
  const values = args.splice(args.length / 2)

  return args.reduce((result, key, index) => {
    result[key] = values[index]
    return result
  }, {})
})
