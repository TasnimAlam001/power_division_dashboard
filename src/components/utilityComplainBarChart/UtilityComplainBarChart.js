"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import theme from "@/app/theme";
import { axisClasses } from "@mui/x-charts";


const chartSetting = {
  yAxis: [
    {
      label: "Complain Count",
    },
  ],

  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

export default function UtilityComplainBarChart({companyWiseCategoryWiseComplain}) {
  //---------------------- Getting and setting the data
  let count = [];
  let xLabels = [];

  // Check if companyWiseCategoryWiseComplain is empty
  if (companyWiseCategoryWiseComplain.length === 0) {
    // Demo data with value zero
    count = [0];
    xLabels = ["No Data"];
  } else {
    // Getting and setting the data
    count = companyWiseCategoryWiseComplain.map((item) => item.count);
    xLabels = companyWiseCategoryWiseComplain.map((item) => item.name);
  }

  //-----------------------Responsive breakpoints

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const width = isSmallScreen
    ? 215
    : isMediumScreen
    ? 315
    : isLgScreen
    ? 580
    : 520;
  const height = isMediumScreen ? (isSmallScreen ? 290 : 330) : 400;
  const boxHeight = isMediumScreen ? (isSmallScreen ? 410 : 460) : 460;
  const fontS = isSmallScreen ? 9 : 12;

  return (
    <Box sx={{ position: "relative" }}>
      <Card
        sx={{ boxShadow: "0px 10px 40px 0px #00000008", borderRadius: 3 }}
      >
        <Stack
          sx={{ height: boxHeight }}
          direction="column"
          justifyContent="space-between"
        >
          <CardContent>
            <Typography variant="h6">Category Wise Complains</Typography>
            <Stack sx={{ mt: 3 }} direction="row" alignItems="center">
              <BarChart
                margin={{
                  top: 60,
                  bottom: 120,
                  right: 0,
                  left: 20,
                }}
                width={width}
                height={height}
                series={[
                  {
                    data: count,
                    label: "Complain",
                    id: "countId",
                  },
                ]}
                slotProps={{
                  legend: {
                    itemMarkHeight: 9,
                    itemMarkWidth: 9,
                    labelStyle: {
                      fontSize: 14,
                    },
                  },
                }}
                xAxis={[
                  {
                    data: xLabels,

                    scaleType: "band",
                    tickLabelStyle: {
                      angle: -45,
                      textAnchor: "end",
                      fontSize: 12,
                    },
                    categoryGapRatio:
                      companyWiseCategoryWiseComplain.length < 4
                        ? 0.9
                        : undefined,
                  },
                ]}
                {...chartSetting}
              />
            </Stack>
          </CardContent>
        </Stack>
      </Card>
    </Box>
  );
}
