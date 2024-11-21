import React from "react";
import MessageComponent from "../_component/module/messageComponent";
import MessageLayoutChatbar from "../_component/module/messageComponent/messageSideChatbar";

const Message = () => {
  return (
    <div>
      <div className="md:block hidden">
        <MessageComponent />
      </div>
      <div className="block md:hidden">
        <MessageLayoutChatbar />
      </div>
    </div>
  );
};

export default Message;
