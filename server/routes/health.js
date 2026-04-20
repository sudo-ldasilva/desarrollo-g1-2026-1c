import express from "express"

const healthRouter = express.Router()

healthRouter.route("/").get((req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
} )

export default healthRouter
