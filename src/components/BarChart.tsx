import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../theme";
import UseHttpRequests from "../hooks/useHttpRequest";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [barData, setBarData] = useState([]);
  const { error, isLoading, httpRequest: getBarData } = UseHttpRequests();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    const transformBarData = (dataObj: any) => {
      for (const item in dataObj) {
        setBarData(dataObj[item]);
      }
    };

    getBarData(
      { url: "https://admin-2f19b-default-rtdb.firebaseio.com/admin/bar.json" },
      transformBarData
    );
  }, [getBarData]);

  let content = (
    <ResponsiveBar
      data={barData}
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
            color: colors.primary[400],
          },
        },
      }}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={
        isNonMobile
          ? { top: 50, right: 130, bottom: 50, left: 60 }
          : { top: 50, right: 50, bottom: 50, left: 60 }
      }
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", isDashboard ? 0 : 1.6]],
      }}
      legends={
        !isNonMobile
          ? undefined
          : [
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
      }
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
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

export default BarChart;
