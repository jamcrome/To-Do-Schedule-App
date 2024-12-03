import {createBrowserRouter} from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        index:true,
        element:<HomePage/>
      },
      {
        path: "/signup/",
        element:<SignUp/>
      }
    ]
  }
])

export default router;