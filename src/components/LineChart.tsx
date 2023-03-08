import React, { useEffect, useState } from "react";
import { mockLineData } from "../data/mockData";
import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ResponsiveLine } from "@nivo/line";
import UseHttpRequests from "../hooks/useHttpRequest";

const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [lineData, setLineData] = useState([]);
  const { error, isLoading, httpRequest: getLineData } = UseHttpRequests();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    const transformLineData = (dataObj: any) => {
      for (const item in dataObj) {
        setLineData(dataObj[item]);
      }
    };

    getLineData(
      {
        url: "https://admin-2f19b-default-rtdb.firebaseio.com/admin/line.json",
      },
      transformLineData
    );
  }, [getLineData]);

  let content = (
    <ResponsiveLine
      data={lineData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={
        isNonMobile
          ? { top: 50, right: 110, bottom: 50, left: 60 }
          : { top: 50, right: 30, bottom: 50, left: 60 }
      }
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: isNonMobile ? 0 : 70,
        legend: isDashboard ? undefined : "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickValues: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: isDashboard ? undefined : "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isNonMobile
          ? undefined
          : [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
      }
    />
  );

  if (error) {
    return (content = <h2>{error}</h2>);
  }

  if (isLoading) {
    return (content = <CircularProgress color="secondary" />);
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export default LineChart;
