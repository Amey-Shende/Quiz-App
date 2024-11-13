import { lazy } from "react";
import QuizList from "../user/QuizList";
import Home from "../admin/Home";
import AdminDashboard from "../admin/layout/AdminDashboard";

//**** User pages */
const UserDashboard = lazy(() => import("../user/UserDashboard"));
const ResultComponent = lazy(() => import("../user/ResultComponent"));

//**** Admin CRUD */
const ShowQuiz = lazy(() => import("../admin/ShowQuiz"));
const AddQuestion = lazy(() => import("../admin/AddQuestion"));
const EditQuestion = lazy(() => import("../admin/EditQuestion"));

const Routers = [
    {
        path: "/",
        element: <QuizList />,
        index: true
    },
    {
        path: "/user",
        element: <UserDashboard />,
    },
    {
        path: "/admin",
        element: <AdminDashboard />,
        children: [
            {
                path: "/admin",
                element: <Home />,
                index: true
            },
            {
                path: ":quiz/showQuiz",
                element: <ShowQuiz />,
            },
            {
                path: "addQuestion",
                element: <AddQuestion />,
            },
            {
                path: "editQuestion",
                element: <EditQuestion />,
            },
            {
                path: "*",
                element: <Home />
            }
        ]
    },
    {
        path: "/user-result",
        element: <ResultComponent />
    },
    {
        path: "*",
        element: <QuizList />
    }
];

export default Routers;