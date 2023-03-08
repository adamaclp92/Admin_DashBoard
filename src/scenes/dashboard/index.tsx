import React from "react";
import Header from "../../components/Header";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import StatBox from "../../components/StatBox";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import { mockTransactions } from "../../data/mockData";
import BarChart from "../../components/BarChart";
import GeoChart from "../../components/GeoChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLargest = useMediaQuery("(min-width:1000px)");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={"DASHBOARD"} description={"Welcome to your dashboard"} />
        <Button
          sx={{
            backgroundColor: colors.blueAccent[600],
            color: colors.grey[100],
            padding: isNonMobile ? "10px" : "4px",
          }}
        >
          <FileDownloadIcon sx={{ margin: "0 10px 0 0" }} />
          <Typography>DOWNLOAD REPORTS</Typography>
        </Button>
      </Box>

      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        mr="10px"
        sx={{
          "& > div": {
            gridColumn: !isNonMobile
              ? "span 4"
              : isLargest
              ? undefined
              : "span 2",
          },
        }}
      >
        <StatBox
          icon={
            <EmailIcon
              sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
            />
          }
          title="12,361"
          stat={0.24}
          subtitle="Emails Sent"
        ></StatBox>
        <StatBox
          icon={
            <PointOfSaleIcon
              sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
            />
          }
          title="431,225"
          stat={0.21}
          subtitle="Sails Obtained"
        ></StatBox>
        <StatBox
          icon={
            <PersonAddIcon
              sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
            />
          }
          title="32,441"
          stat={0.05}
          subtitle="New Clients"
        ></StatBox>
        <StatBox
          icon={
            <TrafficIcon
              sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
            />
          }
          title="1,325,134"
          stat={0.43}
          subtitle="Traffic Received"
        ></StatBox>
      </Box>

      {/*MAIN */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="190px"
        gap="10px"
        mt={2}
      >
        {/* Second row */}
        <Box
          gridColumn={isLargest ? "span 8" : "span 12"}
          gridRow="span 2"
          mt="10px"
          ml="10px"
          sx={{ backgroundColor: colors.primary[400] }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <FileDownloadIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>

          <Box height="300px" m="-20px 0 0 0 ">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn={isLargest ? "span 4" : "span 12"}
          gridRow="span 2"
          overflow="auto"
          mt="10px"
          ml={1}
          sx={{ bakcgroundColor: colors.primary[400] }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            sx={{ backgroundColor: colors.primary[400] }}
          >
            <Typography variant="h5" fontWeight="bold" color={colors.grey[100]}>
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transactions, i) => (
            <Box
              display="flex"
              justifyContent="space-between"
              mt={1}
              p="10px"
              key={i}
              sx={{ backgroundColor: colors.primary[400] }}
            >
              <Box>
                <Typography fontWeight="bold" color={colors.greenAccent[400]}>
                  {transactions.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transactions.user}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography>{transactions.date}</Typography>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: colors.greenAccent[500] }}
                >
                  ${transactions.cost}
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Third row */}
        <Box
          gridColumn={isLargest ? "span 4" : "span 12"}
          gridRow="span 2"
          mt="10px"
          ml="10px"
          sx={{ backgroundColor: colors.primary[400] }}
        >
          <Box p={2}>
            <Typography variant="h4">Campaign</Typography>
          </Box>
          <Box height="350px" p={1}>
            <PieChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn={isLargest ? "span 4" : "span 12"}
          gridRow="span 2"
          mt="10px"
          ml="10px"
          sx={{ backgroundColor: colors.primary[400] }}
        >
          <Box p={2}>
            <Typography variant="h4">Sales Quantity</Typography>
          </Box>
          <Box height="320px" p={1}>
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn={isLargest ? "span 4" : "span 12"}
          gridRow="span 2"
          mt="10px"
          ml="10px"
          sx={{ backgroundColor: colors.primary[400] }}
        >
          <Box p={2}>
            <Typography variant="h4">Geography Based Traffic</Typography>
          </Box>
          <Box height="300px" p={1}>
            <GeoChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
