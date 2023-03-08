import { Box, Theme, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import {
  GridColumns,
  GridLinkOperator,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { mockDataInvoices } from "../../data/mockData";
import UseHttpRequests from "../../hooks/useHttpRequest";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [invoicesData, setInvoicesData] = useState([]);
  const { error, isLoading, httpRequest: getInvoicesData } = UseHttpRequests();

  useEffect(() => {
    const transformInvoicesData = (dataObj: any) => {
      for (const item in dataObj) {
        setInvoicesData(dataObj[item]);
      }
    };

    getInvoicesData(
      {
        url: "https://admin-2f19b-default-rtdb.firebaseio.com/admin/invoices.json",
      },
      transformInvoicesData
    );
  }, [getInvoicesData]);

  const dateFormatter = (value: string) => {
    const d = new Date(value);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const columns: GridColumns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      cellClassName: "cost-column--cell",
      renderCell: (params) => <Typography>${params.row.cost}</Typography>,
    },

    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueFormatter: ({ value }) => dateFormatter(value),
    },
  ];

  const rows: GridRowsProp = invoicesData;

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="INVOICES" description="List of Invoice Balances" />
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
          "& .cost-column--cell": { color: colors.greenAccent[300] },
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: colors.grey[100],
          },
        }}
      >
        <DataGrid columns={columns} rows={rows} checkboxSelection />
      </Box>
    </Box>
  );
};

export default Invoices;
