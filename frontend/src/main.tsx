import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/hooks/AuthContext";
import App from "./App.tsx";
import "./index.css";

// TODO: Replace with your actual Google Client ID
const GOOGLE_CLIENT_ID = "201647176807-vjsoh0aileh046mfmm07uh0mi73ioloh.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>
);
