import React, { useEffect, useState } from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { mockGeographyData } from "../data/mockData";
import { mockGeoFeatures } from "../data/mockGeoFeatures";
import { CircularProgress, useTheme } from "@mui/material";
import { tokens } from "../theme";
import UseHttpRequests from "../hooks/useHttpRequest";

const GeoChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [geoData, setGeoData] = useState([]);
  const { error, isLoading, httpRequest: getGeoData } = UseHttpRequests();

  useEffect(() => {
    const transformGeoData = (dataObj: any) => {
      for (const item in dataObj) {
        setGeoData(dataObj[item]);
      }
    };

    getGeoData(
      {
        url: "https://admin-2f19b-default-rtdb.firebaseio.com/admin/geography.json",
      },
      transformGeoData
    );
  }, [getGeoData]);

  let content = (
    <ResponsiveChoropleth
      data={mockGeographyData}
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
      features={mockGeoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 1000000]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isDashboard ? 40 : 150}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor={colors.primary[200]}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: colors.primary[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000000",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
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

export default GeoChart;
