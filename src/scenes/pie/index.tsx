import { Box, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { ResponsivePie } from "@nivo/pie";
import Header from "../../components/Header";
import { mockPieData } from "../../data/mockData";
import PieChart from "../../components/PieChart";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" description="Simple Pie Chart" />

      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
