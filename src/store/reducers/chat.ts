import { IAction, IChatState, IMessage } from "../../typings";
import { CLEAR_MESSAGES_SUCCESS, FETCH_MESSAGES_SUCCESS, POST_MESSAGE_SUCCESS } from "../actions/actionTypes";

const initialState = {
  messages: new Array<IMessage>(),
  sellerImage: 'https://avatars.dicebear.com/api/avataaars/4fcvfd.svg?b=%23395e84&topChance=100&hatColor[]=white&facialHairChance=32&clothes[]=hoodie&eyes[]=dizzy'
}

export const chatReducer = (state: IChatState = initialState, action: IAction) => {
  switch (action.type) {
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload
      }
    case POST_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    case CLEAR_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: []
      }
    default:
      return state
  }
}
