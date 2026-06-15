import express from 'express';
import { getAllProjects, getProjectBySlug } from '../controllers/projectController.js';

const projectRouter = express.Router();

projectRouter.get('/projects', getAllProjects);
projectRouter.get('/projects/:slug', getProjectBySlug);

export default projectRouter;
