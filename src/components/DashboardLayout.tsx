import { Outlet } from "react-router-dom";
import Header from "./Header";

const DashboardLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default DashboardLayout;
