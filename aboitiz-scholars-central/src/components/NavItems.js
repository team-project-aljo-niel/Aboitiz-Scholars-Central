import { Typography, useTheme } from "@mui/material";
import { themeColors } from "../theme";
import { Link } from "react-router-dom";
import { MenuItem } from "react-pro-sidebar";

const NavItems = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      style={{color: colors.primary[500]}}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

export default NavItems;
