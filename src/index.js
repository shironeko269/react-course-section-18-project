import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import AuthenProvider from "./store/auth/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthenProvider>
    <App />
  </AuthenProvider>
);
