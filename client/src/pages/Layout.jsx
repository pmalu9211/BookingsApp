import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Layout;
