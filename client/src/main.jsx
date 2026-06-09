import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ChatProvider from "./context/ChatProvider.jsx";
import UserProvider from "./context/UserProvider.jsx";
import SocketProvider from "./context/SocketProvider.jsx";
import MsgProvider  from "./context/MsgProvider.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
import AuthProvider from "./context/AuthProvider.jsx";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <UserProvider>
            <ChatProvider>
              <MsgProvider>
                <App />
              </MsgProvider>
            </ChatProvider>
          </UserProvider>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
