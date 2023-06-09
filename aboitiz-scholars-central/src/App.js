import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/pages/Login';
import MainLayout from './components/MainLayout';
import Dashboard from './components/pages/Dashboard';
import Users from './components/pages/Users';
import UserForm from './components/pages/UserForm';
import Account from './components/pages/Account';
import RouteGuard from './components/pages/HOC/RouteGuard';
import AdminGuard from './components/pages/HOC/AdminGuard';
import Profile from './components/pages/Profile';
import ScholarGuard from './components/pages/HOC/ScholarGuard';
import ScholarsInfo from './components/pages/ScholarsInfo';
import ScholarsStatus from './components/pages/ScholarsStatus';
import ScholarsGrades from './components/pages/ScholarsGrades';
import { UserProvider } from './components/providers/UserProvider';
import { ScholarProvider } from './components/providers/ScholarProvider';
import { CurrentUserProvider } from './components/providers/CurrentUserProvider';
import { TriggerProvider } from './components/providers/TriggerProvider';
import { GradeProvider } from './components/providers/GradeProvider';
import Settings from './components/pages/Settings';
import { VisibilityProvider } from './components/providers/VisibilityProvider';
import { UpdatesProvider } from './components/providers/UpdatesProvider';
import ScholarsRequests from './components/pages/ScholarsRequests';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/ASC',
      element: <MainLayout />,
      children: [
        {
          path: 'dashboard',
          element: (
            <RouteGuard>
              <Dashboard />{' '}
            </RouteGuard>
          ),
        },
        {
          path: 'users',
          element: (
            <AdminGuard>
              <Users />{' '}
            </AdminGuard>
          ),
        },
        {
          path: 'scholars/information',
          element: (
            <RouteGuard>
              <ScholarsInfo />{' '}
            </RouteGuard>
          ),
        },
        {
          path: 'scholars/status',
          element: (
            <RouteGuard>
              <ScholarsStatus />{' '}
            </RouteGuard>
          ),
        },
        {
          path: 'scholars/grades',
          element: (
            <RouteGuard>
              <ScholarsGrades />{' '}
            </RouteGuard>
          ),
        },
        {
          path: 'scholars/requests',
          element: (
            <RouteGuard>
              <ScholarsRequests />{' '}
            </RouteGuard>
          ),
        },
        {
          path: 'create-user',
          element: (
            <RouteGuard>
              <UserForm />
            </RouteGuard>
          ),
        },
        { path: 'account', element: <Account /> },
        { path: 'settings', element: <Settings /> },
        {
          path: 'profile',
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
    <TriggerProvider>
      <CurrentUserProvider>
        <UserProvider>
          <ScholarProvider>
            <GradeProvider>
              <VisibilityProvider>
                <UpdatesProvider>
                  <RouterProvider router={router} />
                </UpdatesProvider>
              </VisibilityProvider>
            </GradeProvider>
          </ScholarProvider>
        </UserProvider>
      </CurrentUserProvider>
    </TriggerProvider>
  );
}

export default App;

// phGeoFeatures  from macoymejia  from github: https://github.com/macoymejia/geojsonph/blob/master/MuniCities/MuniCities.minimal.json
