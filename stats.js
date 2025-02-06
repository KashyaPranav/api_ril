const express = require("express");
const ApiHit = require("../models/apiHit");

const router = express.Router();

router.get("/api/hits", async (req, res) => {
  try {
    const today = moment().format("YYYY-MM-DD");
    const stats = await ApiHit.find();
    // const stats = await ApiHit.aggregate([
    //   {
    //     $match: { timestamp: { $gte: new Date(today) } },
    //   },
    //   {
    //     $group: {
    //       _id: "$apiName",
    //       totalHits: { $sum: 1 },
    //       avgResponseTime: { $avg: "$responseTime" },
    //       successRate: {
    //         $avg: { $cond: [{ $eq: ["$status", true] }, 1, 0] },
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       apiName: "$_id",
    //       totalHits: 1,
    //       avgResponseTime: 1,
    //       successRate: { $multiply: ["$successRate", 100] },
    //     },
    //   },
    // ]);

    // res.json({ stats });
  } catch (error) {
    console.error("Error fetching API statistics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  console.log(stats);
});

module.exports = router;