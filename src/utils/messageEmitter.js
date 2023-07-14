import { getClient } from "../index";

export const handleSendMessage = (destinataryId, senderId, data) => {
  try {
    console.table({ destinataryId, senderId });
    const clients = getClient();
    const sender = clients[senderId];
    const destinatary = clients[destinataryId];
    destinatary.emit("messageReceived", data);
    sender.emit("messageSentConfirmation", data);
  } catch (error) {
    console.log(error);
    sender.emit(
      "User not connected but a push notification will be sent to it",
      { error }
    );
  }
};
