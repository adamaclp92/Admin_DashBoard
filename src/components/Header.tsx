import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../theme";

interface HeaderProps {
  title: string;
  description: string;
}

const Header = (props: HeaderProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.primary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {props.title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {props.description}
      </Typography>
    </Box>
  );
};

export default Header;
