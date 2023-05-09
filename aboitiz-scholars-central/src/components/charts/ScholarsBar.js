import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { themeColors } from "../../theme";

const ScholarsBar = ({ scholarsData }) => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  if (!scholarsData) {
    return <div>...Loading</div>;
  }
  let data = [];

  for (let i = 0; i < scholarsData.length; i++) {
    let year = scholarsData[i].yearAdmitted;
    let status = scholarsData[i].status;
    // Check if there is already an object for the current year
    let yearObj = data.find((obj) => obj.yearAdmitted === year);

    // If there is no object for the current year, create a new one
    if (!yearObj) {
      yearObj = {
        yearAdmitted: year,
        Active: 0,
        Graduated: 0,
        Terminated: 0,
        activeColor: "hsl(236, 70%, 50%)",
        graduatedColor: "hsl(144, 70%, 50%)",
        terminatedColor: "hsl(165, 70%, 50%)",
      };
      data.push(yearObj);
    }
    // Increment the count for the corresponding status
    if (status === "Active") {
      yearObj.Active++;
    } else if (status === "Graduated") {
      yearObj.Graduated++;
    } else if (status === "Terminated") {
      yearObj.Terminated++;
    }
  }

  // Sort the data array by yearAdmitted
  data.sort((a, b) => parseInt(a.yearAdmitted) - parseInt(b.yearAdmitted));

  return (
    <ResponsiveBar
      data={data}
      keys={["Active", "Graduated", "Terminated"]}
      indexBy="yearAdmitted"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "spectral" }}
      theme={{
        // added
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
      }}
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
        legend: "Year",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Scholar",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
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
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
};

export default ScholarsBar;
