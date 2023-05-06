import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivenessItems from "../components/activeness/ActivenessItems";
import ActivenessEditForm from "../components/activeness/ActivenessEditForm";
import ActivenessDetails from "../components/details/ActivenessDetails";
import BugTest from "../components/errors/BugTest";

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
    ]
  }
];

export const router = createBrowserRouter(routes);