import About from "../components/frontend/About";
import Home from "../components/frontend/Home";
import Contactus from "../components/frontend/Contactus";
import Page404 from "../components/errors/Page404";
import Page403 from "../components/errors/Page403";
import Login from "../components/frontend/auth/Login";
import Regtr from "../components/frontend/auth/Regtr";
import ViewCategory from "../components/frontend/collection/ViewCategory";
import ViewProduct from "../components/frontend/collection/ViewProduct";
import ProductDetail from "../components/frontend/collection/ProductDetail";
import Cart from "../components/frontend/Cart";

const publicRouteList = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/about", exact: true, name: "Home", component: About },
  { path: "/Contact", exact: true, name: "Home", component: Contactus },
  { path: "/404", exact: true, name: "Page404", component: Page404 },
  { path: "/403", exact: true, name: "Page403", component: Page403 },
  { path: "/login", exact: true, name: "Login", component: Login },
  { path: "/register", exact: true, name: "Register", component: Regtr },
  {
    path: "/collection",
    exact: true,
    name: "ViewCategory",
    component: ViewCategory,
  },
  {
    path: "/collection/:slug",
    exact: true,
    name: "ViewProduct",
    component: ViewProduct,
  },
  {
    path: "/collection/:category/:product",
    exact: true,
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    path: "/cart",
    exact: true,
    name: "Cart",
    component: Cart,
  },
];

export default publicRouteList;
