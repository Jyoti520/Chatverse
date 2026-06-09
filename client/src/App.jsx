import { Route, Routes } from "react-router-dom";
import "./index.css";
import ChatPage from "./pages/ChatPage";
import ProtectedLayout from "./components/auth/ProtectedLayout";
import { ToastContainer } from "react-toastify";
import LoadScreen from "./components/auth/LoadScreen";
import { Navigate } from "react-router-dom";
import ErrorBoundary from "./components/error/ErrorBoundary";
import AuthPage from "./pages/AuthPage";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { loading, loggeduser } = useAuth();
  if (loading) return <LoadScreen />;

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose="3000"
        hideProgressBar="false"
        newestOnTop
        closeOnClick="true"
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* Signup | Login page */}
        <Route
          path="/"
          element={
            loggeduser ? <Navigate to="/chats" replace /> : <AuthPage />
          }
        />

        {/* ChatPage - for logged user  */}
        <Route
          path="/chats"
          element={
            <ProtectedLayout>
              <ChatPage />
            </ProtectedLayout>
          }
        />
        {/* fallback if any route fail */}
        <Route
          path="*"
          element={<Navigate to={loggeduser ? "/chats" : "/"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;

