import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/pages/Login";
import MainLayout from "./components/MainLayout";
import Dashboard from "./components/pages/Dashboard";
import Users from "./components/pages/Users";
import Scholars from "./components/pages/Scholars";
import UserForm from "./components/pages/UserForm";
import { UserProvider } from "./components/providers/UserProvider";
import { CurrentUserProvider } from "./components/providers/CurrentUserProvider";
import Account from "./components/pages/Account";
import RouteGuard from "./components/pages/HOC/RouteGuard";
import AdminGuard from "./components/pages/HOC/AdminGuard";
import Profile from "./components/pages/Profile";
import ScholarGuard from "./components/pages/HOC/ScholarGuard";

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
        {
          path: "dashboard",
          element: (
            <RouteGuard>
              <Dashboard />{" "}
            </RouteGuard>
          ),
        },
        {
          path: "users",
          element: (
            <AdminGuard>
              <Users />{" "}
            </AdminGuard>
          ),
        },
        // { path: "admins", element: <Admins /> },
        // { path: "officers", element: <Officers /> },
        {
          path: "scholars",
          element: (
            <RouteGuard>
              <Scholars />{" "}
            </RouteGuard>
          ),
        },
        {
          path: "create-user",
          element: (
            <RouteGuard>
              <UserForm />
            </RouteGuard>
          ),
        },
        { path: "account", element: <Account /> },
        {
          path: "profile",
          element: (
            <ScholarGuard>
              <Profile />
            </ScholarGuard>
          ),
        },
      ],
    },
  ]);
  return (
    <CurrentUserProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </CurrentUserProvider>
  );
}

export default App;
