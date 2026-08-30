import {createBrowserRouter} from "react-router";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import TermsConditions from "./features/auth/components/TermsConditions.jsx";
import Protected from "./features/auth/components/Protected.jsx";
import Home from "./features/interview/pages/Home.jsx";
import Interview from "./features/interview/pages/Interview.jsx";
import Dashboard from "./features/interview/pages/Dashboard.jsx"

const router = createBrowserRouter([
   {
    path: "/",
    element: <Dashboard/>
   },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },{
    path: "/terms-conditions",
    element: <TermsConditions/>
  },{
        path: "/home",
        element: <Protected><Home /></Protected>
    },
    {
        path:"/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    }
]); 

export { router };