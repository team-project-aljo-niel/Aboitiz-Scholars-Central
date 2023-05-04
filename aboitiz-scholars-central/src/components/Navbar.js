import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { themeColors } from "../theme";
import {
  HomeOutlined,
  PeopleOutline,
  SchoolOutlined,
  MenuOutlined,
  AccountCircleOutlined,
  PersonAddOutlined,
  AccountBoxOutlined
} from "@mui/icons-material";
import "react-pro-sidebar/dist/css/styles.css";
import NavItems from "./NavItems";

const Navbar = () => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.redAccent[500]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "$ .pro-inner-item:hover": {
          color: "#ffffff !important",
        },
        "$ .pro-menu-item.active": {
          color: "#efefef !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} collapsedWidth="80px">
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined /> : undefined}
            style={{ margin: "10px 0 20px 0", color: "#fffffff" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5" color="#ffffff">
                  Aboitiz Scholars Central
                </Typography>
                <IconButton style={{ color: "#ffffff" }}>
                  <MenuOutlined></MenuOutlined>
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* REPLACE WITH USER IMAGE */}
                <AccountCircleOutlined
                  sx={{
                    alt: "profile picture of user",
                    width: "100px",
                    height: "100px",
                    color: "#ffffff",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                {/* REPLACE WITH USER INFO */}
                <Typography
                  variant="h2"
                  sx={{ mt: "10px", color: "#ffffff", fontWeight: "bold" }}
                >
                  Niel
                </Typography>
                <Typography variant="h4" color="#000000" fontWeight="bold">
                  Admin
                </Typography>
              </Box>
            </Box>
          )}
          <Box pl={isCollapsed ? undefined : 1}>
            <NavItems
              title="Dashboard"
              to="/ASC/dashboard"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed && (
              <Typography
                variant="h5"
                color="#000000"
                m="15px 0 5px 20px"
                fontWeight="bold"
              >
                Management
              </Typography>
            )}
            <NavItems
              title="Manage Users"
              to="/ASC/users"
              icon={<PeopleOutline />}
              selected={selected}
              setSelected={setSelected}
            />
            <NavItems
              title="Manage Scholars"
              to="/ASC/scholars"
              icon={<SchoolOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <NavItems
              title="Create User"
              to="/ASC/create-user"
              icon={<PersonAddOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed && (
              <Typography
                variant="h5"
                color="#000000"
                m="15px 0 5px 20px"
                fontWeight="bold"
              >
                Account
              </Typography>
            )}
            <NavItems
              title="Account Settings"
              to="/ASC/account"
              icon={<AccountBoxOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Navbar;
