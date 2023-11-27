import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./home";
import Login from "./Login.jsx";
import ErrorPage from "./error-page";
import Product from './Product.jsx'
import Search from './Search.jsx';
import Add from './Add.jsx';
import RootLayout from './layout/RootLayout.jsx';
import { UserContextProvider } from "./UserContext.jsx";
import {CartProvider} from "./CartContext.jsx"
import Cart from "./Cart.jsx";
import Statistics from "./Statistics.jsx";
import Daily from "./Daily.jsx";
import Monthly from "./Monthly.jsx";
import Week from "./Week.jsx";
import Year from "./Year.jsx";
import Update from "./Update.jsx";
import Test from "./Test.jsx";
import EditInvoice from "./EditInvoice.jsx";

function App() {
const routes = [{
    index: true,
    element: <Home />,
  },
  {
    path: "/products/:category",
    element: <Product />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/statistics",
    element: <Statistics />,
  },
  {
    path: "/daily",
    element: <Daily />,
  },
  {
    path: "/monthly",
    element: <Monthly />,
  },
  {
    path: "/weekly",
    element: <Week />,
  },
  {
    path: "/yearly",
    element: <Year />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/update/:id",
    element: <Update />,
  },
  {
    path: "/edit-invoice/:id",
    element: <EditInvoice />,
  },
]


const router = createBrowserRouter([
 {
    path: "/",
    element: 
    <UserContextProvider>
      <CartProvider>
        <RootLayout />
      </CartProvider>
    </UserContextProvider>,
    children: routes,
    errorElement: <ErrorPage />,
  },
]);


  return(

    <RouterProvider router={router} />
  )
}

export default App
