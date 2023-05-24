const mongoose = require("mongoose");

const widgetsSchema = new mongoose.Schema(
  {
    bu: Boolean,
    city: Boolean,
    province: Boolean,
    island: Boolean,
    fromDate: Boolean,
    toDate: Boolean,
    totalScholars: Boolean,
    activeScholars: Boolean,
    graduatedScholars: Boolean,
    terminatedScholars: Boolean,
    latinHonorScholars: Boolean,
    employedGraduates: Boolean,
    aboitizGraduates: Boolean,
    scholarsBar: Boolean,
    agePie: Boolean,
    genderPie: Boolean,
    terminatedPie: Boolean,
    scholarsGeo: Boolean,
  },
  { strict: false }
);

module.exports = mongoose.model("Widget", widgetsSchema);
