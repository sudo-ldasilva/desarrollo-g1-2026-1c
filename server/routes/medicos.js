import express from "express";
import { getMedicoById } from "../controllers/MedicoController.js";

const router = express.Router();

router.get("/:id", getMedicoById);

export default router;
