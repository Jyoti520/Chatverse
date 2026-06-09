import { useState, useEffect } from "react";
import SideBar from "../components/layout/sidebar/SideBar";
import ChatBox from "../components/layout/chatroom/ChatBox";
import Header from "../components/layout/navigation/Header";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useAuth } from "../hooks/useAuth";

function ChatPage() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("sidebar");
  const { loggeduser } = useAuth();
  useEffect(() => {
    if (!loggeduser) {
      navigate("/");``
      //navigate to login page
    }
  }, [loggeduser]);


  return loggeduser ? (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <Header />
      <main className="flex h-[calc(100vh-70px)]">
      <SideBar activePage={activePage} setActivePage={ setActivePage} />

      <ChatBox
        activePage={activePage}
        goToBack={() => setActivePage("sidebar")}
      />
      </main>
    </div>
  ) : (
    <Loader textColor="text-indigo-500" />
  );
}

export default ChatPage;
