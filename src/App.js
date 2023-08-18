import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./pages/Root";
import { action as logoutAction } from './pages/Logout';
import AuthenticationPage, {action as authAction} from "./pages/Authentication";
import { tokenLoader } from "./util/auth"

function App() {

  // const authCtx = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout></RootLayout>,
      id: "root",
      loader: tokenLoader,
      children: [
        {
          index: true,
          element: (
            // <ProtectedRoute user={authCtx.isLoggin}>
              <Home />
            // </ProtectedRoute>
          ),
        },
        {
          path: "auth",
          element: <AuthenticationPage></AuthenticationPage>,
          action: authAction
        },
        {
          path: "logout",
          action: logoutAction
        }
      ]
    }
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
