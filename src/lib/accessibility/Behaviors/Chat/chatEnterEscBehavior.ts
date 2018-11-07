import { Accessibility, FocusZoneMode } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { FocusZoneDirection } from '../../FocusZone'

const CHAT_FOCUSZONE_ATTRIBUTE = 'chat-focuszone'

/**
 * @description
 * Adds role 'presentation' until we come up with final roles for chat.
 * Adds a vertical focus zone navigation with a last message as a default tabbable element, pressing enter key focuses inside a message.
 * Adds an escape key action which focuses the chat, i.e., moves key handling from inside a message back to the chat list.
 */
const chatEnterEscBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      shouldEnterInnerZone: event => keyboardKey.getCode(event) === keyboardKey.Enter,
      direction: FocusZoneDirection.vertical,
      defaultTabbableElement: `[${CHAT_FOCUSZONE_ATTRIBUTE}] > * > *:last-child div`, // select last chat message by default
      // [chat-focuszone] .ui-chat__item:last-child [data-is-focusable="true"]
      [CHAT_FOCUSZONE_ATTRIBUTE]: '', // allows querying the default active element
    },
  },
  keyActions: {
    root: {
      focus: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  },
})

export default chatEnterEscBehavior
