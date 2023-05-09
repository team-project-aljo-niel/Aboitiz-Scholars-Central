import { useTheme } from "@mui/material";
import { themeColors } from "../../theme";
import { ResponsivePie } from "@nivo/pie";

const TerminationPie = ({ scholarsData, terminatedScholars }) => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  if (!scholarsData) {
    return <div>...Loading</div>;
  }
  let data = [];

  for (let i = 0; i < scholarsData.length; i++) {
    let remarks = scholarsData[i].terminationRemarks;
    if (remarks === "N/A") {
      continue;
    }
    // Check if there is already an object for the current remarks
    let yearObj = data.find((obj) => obj.id === remarks);

    // If there is no object for the current remarks, create a new one
    if (!yearObj) {
      yearObj = {
        id: remarks,
        label: remarks,
        value: 0,
      };
      data.push(yearObj);
    }
    // Increment the count for the corresponding status
    yearObj.value++;
  }

  data.sort((a, b) => a.label.length - b.label.length);

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "reds" }}
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
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabel={(e) =>
        `${e.id} (${Math.round((e.value / terminatedScholars.length) * 100)}%)`
      }
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      legends={[
        {
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: -40,
          translateY: 0,
          itemsSpacing: 15,
          itemWidth: 104,
          itemHeight: 20,
          itemTextColor: colors.grey[100],
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default TerminationPie;
