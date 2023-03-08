import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColumns, GridRowsProp } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import { tokens } from "../../theme";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import UseHttpRequests from "../../hooks/useHttpRequest";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [teamData, setTeamData] = useState<GridColumns[]>([]);
  const { error, isLoading, httpRequest: getTeamData } = UseHttpRequests();

  useEffect(() => {
    const transformteamData = (dataObj: GridColumns) => {
      for (const item in dataObj) {
        setTeamData((prevItem: any[]) => [...prevItem, dataObj[item]]);
      }
    };

    getTeamData(
      {
        url: "https://admin-2f19b-default-rtdb.firebaseio.com/admin/team.json",
      },
      transformteamData
    );
  }, [getTeamData]);

  const columns: GridColumns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
            sx={{
              backgroundColor:
                access === "admin"
                  ? colors.greenAccent[500]
                  : access === "manager"
                  ? colors.greenAccent[600]
                  : colors.greenAccent[700],
            }}
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const rows: GridRowsProp = teamData;

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TEAM" description="Managing the Team Members" />
      </Box>

      <Box
        m="40px 0 0 0"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="75vh"
        width={"auto"}
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          columns={columns}
          rows={rows}
          experimentalFeatures={{ newEditingApi: true }}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Team;
