//react router dom imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Routes 
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import Main, {mainLoader} from "./layouts/Main";
import About from "./pages/About";

//actions
import { logoutAction } from "./actions/logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: mainLoader,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Dashboard/>,
        loader: dashboardLoader,
        errorElement: <Error/>
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path: "logout", 
        action: logoutAction
      }
    ],
  },
  
]);

function App() {
  return <div className="App">
    <RouterProvider router={router} />
    <ToastContainer/>
  </div>;
}

export default App;
