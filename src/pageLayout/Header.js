//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { GrDashboard } from "react-icons/gr";
import { MdOutlineSummarize } from "react-icons/md";
import { BsPersonCheck, BsPersonPlus } from "react-icons/bs";
import { SiBrandfolder } from "react-icons/si";
import { RiListSettingsFill } from "react-icons/ri";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";
import { Link } from "react-router-dom";

import CompanyLogo from "../assets/img/favicon.png";

import { activeNav } from "navhelper";
import { useSelector } from "react-redux";

import { permission } from "helper/permission";

const Header = (props) => {
  const { user } = useSelector((state) => state.auth);

  //create initial menuCollapse state using useState hook
  const { menuCollapse, setMenuCollapse } = props;

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  // React.useEffect(() => {
  //     console.log(user?.permissions && permission(user.permissions, 'banner_homepage', 'create'));
  // }, [user])

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="px-6 py-4 flex items-center">
              {menuCollapse === false ? (
                <div className="flex items-center">
                  <div onClick={menuIconClick} className="ml-4">
                    <p className="font-Poppins font-bold text-xl truncate">
                      Story App
                    </p>
                  </div>
                </div>
              ) : (
                <div onClick={menuIconClick} className="ml-4">
                    <p className="font-Poppins font-bold text-xl truncate">
                      S
                    </p>
                  </div>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem
                icon={<MdOutlineSummarize />}
                active={activeNav("/dashboard")}
              >
                <Link
                  to="/dashboard"
                  className={`${
                    activeNav("/dashboard")
                      ? "font-Poppins font-bold"
                      : "font-Poppins"
                  }`}
                >
                  Dashbord
                </Link>
              </MenuItem>
              <MenuItem icon={<FaList />} active={activeNav("/reports")}>
                <Link
                  to="/reports"
                  className={`${
                    activeNav("/dashboard")
                      ? "font-Poppins font-bold"
                      : "font-Poppins"
                  }`}
                >
                  Report
                </Link>
              </MenuItem>
              <MenuItem icon={<FaList />} active={activeNav("/categories")}>
                <Link
                  to="/categories"
                  className={`${
                    activeNav("/categories")
                      ? "font-Poppins font-bold"
                      : "font-Poppins"
                  }`}
                >
                  Categories
                </Link>
              </MenuItem>
              <MenuItem icon={<FaList />} active={activeNav("/stories")}>
                <Link
                  to="/stories"
                  className={`${
                    activeNav("/stories")
                      ? "font-Poppins font-bold"
                      : "font-Poppins"
                  }`}
                >
                  Stories
                </Link>
              </MenuItem>
            </Menu>
          </SidebarContent>
          
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
