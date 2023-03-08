import { Box, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import GeoChart from "../../components/GeoChart";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Geo Chart" description="Simple Geo Chart" />

      <Box
        height="75vh"
        width="150vh"
        border={`1px solid ${colors.grey[100]}`}
        m="30px 0 0 30px"
        borderRadius="4px"
      >
        <GeoChart />
      </Box>
    </Box>
  );
};

export default Geography;
