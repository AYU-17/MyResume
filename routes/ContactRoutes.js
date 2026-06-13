import express from "express";
import { contactController } from "../controllers/contactController.js";

const contactRouter = express.Router()

contactRouter.post("/contact", contactController)

export default contactRouter