import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import JobDetails from "../Pages/JobDetails";
import Login from "../Pages/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path: "/",
            element: <Home />
        },
        {
          path: "/post-job",
          element: <CreateJob />
        },
        {
          path: "/my-job",
          element: <PrivateRoute><MyJobs/></PrivateRoute>
        },
        {
          path: "/salary",
          element: <SalaryPage />
        },
        {
          path: "edit-job/:id",
          element: <UpdateJob />,
          loader: ({params}) => fetch(`https://backend-61ny.onrender.com/all-jobs/${params.id}`)
        },
        {
          path: "/job/:id",
          element:<JobDetails />
        }

      ]
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

export default router;
