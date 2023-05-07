import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivenessItems from "../components/activeness/ActivenessItems";
import ActivenessEditForm from "../components/activeness/ActivenessEditForm";
import ActivenessDetails from "../components/details/ActivenessDetails";
import BugTest from "../components/errors/BugTest";
import NotFound from "../components/errors/NotFound";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'activenessItems', element: <ActivenessItems /> },
      { path: 'activenessItems/:id', element: <ActivenessDetails /> },
      { path: 'createActiveness', element: <ActivenessEditForm key='create' /> },
      { path: 'updateActiveness/:id', element: <ActivenessEditForm key='update' /> },
      { path: 'bugs', element: <BugTest /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate replace to='404' /> },
    ]
  }
];

export const router = createBrowserRouter(routes);