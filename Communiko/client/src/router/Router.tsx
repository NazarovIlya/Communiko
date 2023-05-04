import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../components/home/HomePage";
import ActivenessItems from "../components/activeness/ActivenessItems";
import ActivenessEditForm from "../components/activeness/ActivenessEditForm";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'activenessItems', element: <ActivenessItems /> },
      { path: 'createActiveness', element: <ActivenessEditForm /> }
    ]
  }
];

export const router = createBrowserRouter(routes);