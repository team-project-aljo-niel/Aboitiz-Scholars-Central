import { useTheme } from "@mui/material";
import { themeColors } from "../../theme";
import { ResponsivePie } from "@nivo/pie";

// Pie Chart for Gender
const GenderPie = ({ scholarsData }) => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  let data = [];

  for (let i = 0; i < scholarsData.length; i++) {
    let gender = scholarsData[i].gender;

    if (gender === undefined) {
      gender = "Not Set";
    }

    // Check if there is already an object for the current gender
    let genderObj = data.find((obj) => obj.id === gender);

    // If there is no object for the current gender, create a new one
    if (!genderObj) {
      genderObj = {
        id: gender,
        label: gender,
        value: 0,
      };
      data.push(genderObj);
    }
    // Increment the count for the corresponding gender
    genderObj.value++;
  }

  data.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
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
        tooltip: {
          container: {
            background: colors.grey[500],
            color: colors.black[500],
          },
        },
      }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabel={(e) =>
        `${e.id} (${Math.round((e.value / scholarsData.length) * 100)}%)`
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
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 30,
          itemWidth: 20,
          itemHeight: 18,
          itemTextColor: colors.grey[100],
          itemDirection: "top-to-bottom",
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

export default GenderPie;
