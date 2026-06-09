import Message from "./Message";
import ScrollView from "../../common/ScrollView";
import { useAuth } from "../../../hooks/useAuth";

function ChatMessage({ messages }) {
  const {loggeduser}= useAuth();

  return (
    <ScrollView dependency={messages}>
      {messages.length > 0 ? (
        messages?.map((msg, index) => {
          let prevMessage = messages[index - 1];
          const showName =
            !prevMessage || prevMessage.sender?._id !== msg.sender?._id;

          return <Message key={msg?._id} showName={showName} message={msg} />;
        })
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className=" text-slate-500 text-sm sm:text-base dark:text-slate-400">
            No messages yet!
          </p>
        </div>
      )}
    </ScrollView>
  );
}

export default ChatMessage;
