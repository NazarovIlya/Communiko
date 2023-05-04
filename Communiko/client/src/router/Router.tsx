import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivenessItems from "../components/activeness/ActivenessItems";
import ActivenessEditForm from "../components/activeness/ActivenessEditForm";
import ActivenessDetails from "../components/details/ActivenessDetails";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'activenessItems', element: <ActivenessItems /> },
      { path: 'activenessItems/:id', element: <ActivenessDetails /> },
      { path: 'createActiveness', element: <ActivenessEditForm key='create' /> },
      { path: 'updateActiveness/:id', element: <ActivenessEditForm key='update' /> },
    ]
  }
];

export const router = createBrowserRouter(routes);