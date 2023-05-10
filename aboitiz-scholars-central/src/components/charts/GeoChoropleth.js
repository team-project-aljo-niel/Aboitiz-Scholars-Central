import { themeColors } from "../../theme";
import { useTheme } from "@emotion/react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { phGeoFeatures } from "../data/phGeoFeatures";
import phGeo from "../data/phGeo";

const GeoChoropleth = ({ scholarsData }) => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  phGeoFeatures.features.forEach((obj) => (obj.id = obj.properties.ADM2_EN));
  let data = [];
  for (let i = 0; i < scholarsData.length; i++) {
    let province = scholarsData[i].province;

    if (province === undefined) {
      province = "Not Set";
    }

    if (
      ["Mandaluyong", "Marikina", "Pasig", "Quezon City", "San Juan"].includes(
        province
      )
    ) {
      province = "NCR, Second District";
    }

    if (["Caloocan", "Malabon", "Navotas", "Valenzuela"].includes(province)) {
      province = "NCR, Third District";
    }

    if (
      [
        "Las Piñas",
        "Makati",
        "Muntinlupa",
        "Pasay",
        "Parañaque",
        "Paateros",
        "Taguig",
      ].includes(province)
    ) {
      province = "NCR, Fourth District";
    }

    // Check if there is already an object for the current remarks
    let provinceObj = data.find((obj) => obj.id === province);

    // If there is no object for the current remarks, create a new one
    if (!provinceObj) {
      provinceObj = {
        id: province,
        value: 0,
      };
      data.push(provinceObj);
    }
    // Increment the count for the corresponding status
    provinceObj.value++;
  }

  return (
    <ResponsiveChoropleth
      data={data}
      features={phGeoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      colors="spectral"
      domain={[1, 12]} // Can edit  if larger data is available (1-12 was chosen for this project because of small data size)
      unknownColor="#666666"
      label="properties.ADM2_EN"
      valueFormat="0.1f"
      projectionScale={2900}
      projectionTranslation={[0.35, 1.25]}
      projectionRotation={[-118, null, null]}
      enableGraticule={true}
      graticuleLineColor="#dddddd"
      borderWidth={0.5}
      borderColor="#152538"
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
      legends={[
        {
          anchor: "top-right",
          direction: "column",
          justify: true,
          translateX: -99,
          translateY: 20,
          itemsSpacing: 0,
          itemWidth: 94,
          itemHeight: 18,
          itemDirection: "left-to-right",
          itemTextColor: "#444444",
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
      ]}
    />
  );
};

export default GeoChoropleth;
