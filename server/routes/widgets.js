const express = require("express");
const router = express.Router();
const authChecker = require("../auth/authChecker");
const Widget = require("../models/widgets");
const httpError = require("../models/httpError");

router.get("/", authChecker, async (req, res, next) => {
  try {
    const widgets = await Widget.find();
    res.json(widgets[0]);
  } catch (error) {
    return next(new httpError("Error getting widgets", 500));
  }
});

router.put("/", authChecker, async (req, res, next) => {
  try {
    const widgets = await Widget.findByIdAndUpdate("646ca4ac0d9dea88132b8e50", {
      bu: req.body.bu,
      city: req.body.city,
      province: req.body.province,
      island: req.body.island,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      totalScholars: req.body.totalScholars,
      activeScholars: req.body.activeScholars,
      graduatedScholars: req.body.graduatedScholars,
      terminatedScholars: req.body.terminatedScholars,
      latinHonorScholars: req.body.latinHonorScholars,
      employedGraduates: req.body.employedGraduates,
      aboitizGraduates: req.body.aboitizGraduates,
      scholarsBar: req.body.scholarsBar,
      agePie: req.body.agePie,
      genderPie: req.body.genderPie,
      terminatedPie: req.body.terminatedPie,
      scholarsGeo: req.body.scholarsGeo,
    });
    res.status(200).send("Widgets visibility changed succesfully");
  } catch (error) {
    return next(new httpError("Error updating widgets", 500));
  }
});

module.exports = router;
