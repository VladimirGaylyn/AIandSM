import { create } from 'zustand';

export const MessagesStore = create((set) => ({
  chatBotMessages: [],
  addChatBotMessages: (message) =>
    set((state) => {
      return {
        chatBotMessages: [
          ...state.chatBotMessages,
          {
            id: state.chatBotMessages.length + 1,
            type: message.type,
            message: message.message,
          },
        ],
      };
    }),
  updateChatMessage: (newMessage) =>
    set((state) => {
      let updatedMessages = state.chatBotMessages;

      if (
        state.chatBotMessages.filter(
          (msg) =>
            msg.type === 'Agent' && msg.id === state.chatBotMessages.length
        ).length > 0
      ) {
        updatedMessages = state.chatBotMessages.map((msg) => {
          if (msg.id === state.chatBotMessages.length) {
            return { ...msg, message: newMessage };
          }
          return msg;
        });
      } else {
        updatedMessages = [
          ...state.chatBotMessages,
          {
            id: state.chatBotMessages.length + 1,
            type: 'Agent',
            message: newMessage,
          },
        ];
      }
      return { chatBotMessages: updatedMessages };
    }),
}));
