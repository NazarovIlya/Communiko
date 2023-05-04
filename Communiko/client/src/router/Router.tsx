import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../components/home/HomePage";
import ActivenessItems from "../components/activeness/ActivenessItems";
import ActivenessEditForm from "../components/activeness/ActivenessEditForm";
import ActivenessDetails from "../components/details/ActivenessDetails";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'activenessItems', element: <ActivenessItems /> },
      { path: 'activenessItems/:id', element: <ActivenessDetails /> },
      { path: 'createActiveness', element: <ActivenessEditForm /> },
      { path: 'updateActiveness/:id', element: <ActivenessEditForm /> },
    ]
  }
];

export const router = createBrowserRouter(routes);