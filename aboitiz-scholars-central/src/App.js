import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/pages/Login";
import MainLayout from "./components/MainLayout";
import Dashboard from "./components/pages/Dashboard";
import Users from "./components/pages/Users";
import Admins from "./components/pages/Admins";
import Officers from "./components/pages/Officers";
import Scholars from "./components/pages/Scholars";
import UserForm from "./components/pages/UserForm";
import { UserProvider } from "./components/providers/UserProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/ASC",
      element: <MainLayout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "users", element: <Users /> },
        { path: "admins", element: <Admins /> },
        { path: "officers", element: <Officers /> },
        { path: "scholars", element: <Scholars /> },
        { path: "create-user", element: <UserForm /> },
      ],
    },
  ]);
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
