import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Diet from "../views/Diet/Diet.js";
import MyPage from "../views/MyPage/index.js";
import Exercise from "../views/Exercise/Exercise.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));


/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    loader: () => {
      console.log("test");
      debugger
      // let formData = await request.formData();
      // return fakeUpdateSong(params.songId, formData);
    },
    children: [
      { path: "/", element: <Navigate to="/Dashboard" /> },
      { path: "/Dashboard", exact: true, element: <Dashboard /> },
      { path: "/MyPage", exact: true, element: <MyPage /> },
      { path: "/Diet", exact: true, element: <Diet /> },
      { path: "/Exercise", exact: true, element: <Exercise /> },

    ],
  },
];

export default ThemeRoutes;
