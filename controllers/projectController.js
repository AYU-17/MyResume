import Project from '../model/ProjectModel.js';

/**
 * GET /projects
 * Fetch all projects from MongoDB (sorted by order), render the projects page.
 */
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({})
      .select('slug title tagline category status image tech github demo order')
      .sort({ order: 1 })
      .lean();

    res.render('projects', { title: 'Projects', projects });
  } catch (error) {
    console.error('Failed to fetch projects from DB:', error);
    res.status(500).render('home', { title: 'Home' });
  }
};

/**
 * GET /projects/:slug
 * Fetch a single project by slug from MongoDB, render the project detail page.
 */
export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug }).lean();

    if (!project) {
      return res.status(404).render('home', { title: 'Home' });
    }

    res.render('project-detail', { title: project.title, project });
  } catch (error) {
    console.error(`Failed to fetch project "${req.params.slug}" from DB:`, error);
    res.status(500).render('home', { title: 'Home' });
  }
};
