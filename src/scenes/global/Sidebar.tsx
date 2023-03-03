import React, { ReactElement, useEffect } from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Box,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

//@ts-ignore
import IntroImage from "../../assets/photo.jpeg";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

interface PropsItem {
  icon: ReactElement<any, any>;
  to: string;
  title: string;
  selected: string;
  setSelected: (arg: string) => void;
}

const Item = (props: PropsItem) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={props.selected === props.title}
      style={{ listStyle: "none", color: colors.grey[100] }}
      onClick={() => props.setSelected(props.title)}
      icon={props.icon}
    >
      <Link to={props.to} />

      <Typography>{props.title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    if (!isNonMobile) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isNonMobile]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          backgroundColor: colors.primary[400],
          height: `${isNonMobile ? "97vh" : "2870px"}`,
        }}
      >
        <Menu iconShape="square">
          {/*ADMIN */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography variant="h3" color={colors.grey[100]}>
                ADMIN
              </Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          </MenuItem>

          {/*PROFILE */}
          {!isCollapsed && (
            <Box display="block" mb={"15px"}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={"25px"}
              >
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={IntroImage}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                ></img>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.primary[100]}
                  mb={"5px"}
                  fontWeight="bold"
                >
                  Adam
                </Typography>
              </Box>

              <Box textAlign="center">
                <Typography variant="h6" color={colors.greenAccent[500]}>
                  Creator of this page
                </Typography>
              </Box>
            </Box>
          )}

          {/*DASHBOARD */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              icon={<HomeOutlinedIcon />}
              to="/"
              title="DashBoard"
              selected={selected}
              setSelected={setSelected}
            />

            {/*DATA */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>

            <Item
              icon={<PeopleOutlineOutlinedIcon />}
              to="/team"
              title="Manage Team"
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              icon={<ContactsOutlinedIcon />}
              to="/contacts"
              title="Contacts Information"
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              icon={<ReceiptOutlinedIcon />}
              to="/invoices"
              title="Invoices Balances"
              selected={selected}
              setSelected={setSelected}
            />

            {/*PAGES */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>

            <Item
              icon={<PersonOutlineOutlinedIcon />}
              to="/form"
              title="Profile Form"
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              icon={<CalendarTodayOutlinedIcon />}
              to="/calendar"
              title="Calendar"
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              icon={<HelpOutlineOutlinedIcon />}
              to="/faq"
              title="FAQ Page"
              selected={selected}
              setSelected={setSelected}
            />

            {/*DATA */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>

            <Item
              icon={<BarChartOutlinedIcon />}
              to="/bar"
              title="Bar Chart"
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              icon={<PieChartOutlineOutlinedIcon />}
              to="/pie"
              title="Pie Chart"
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              icon={<TimelineOutlinedIcon />}
              to="/line"
              title="Line Chart"
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              icon={<MapOutlinedIcon />}
              to="/geography"
              title="Geography Chart"
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
