import { Box, Typography, useTheme } from "@mui/material";
import React, { ReactNode } from "react";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

interface Props {
  icon: ReactNode;
  title: string;
  stat: number;
  subtitle: string;
}

const StatBox = (props: Props) => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);

  return (
    <Box
      m="0 10px"
      p="15px"
      sx={{ backgroundColor: color.primary[400] }}
      height="150px"
      width="100%"
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          {props.icon}
          <Typography variant="h4" fontWeight="bold">
            {props.title}
          </Typography>
        </Box>
        <ProgressCircle progress={props.stat} />
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        mt="30px"
        color={color.greenAccent[500]}
      >
        <Typography>{props.subtitle}</Typography>
        <Typography fontStyle="italic">+{props.stat * 100}%</Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
