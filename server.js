import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRouter from './routes/ContactRoutes.js';
import connectionDB from './config/DB.js';

dotenv.config();

connectionDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Request logger
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(contactRouter);

// GET Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me' });
});

app.get('/skills', (req, res) => {
  res.render('skills', { title: 'Skills' });
});

app.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects' });
});

// ── Project detail data ─────────────────────────────────────────────────────
const projectsData = {
  'chat': {
    slug: 'chat',
    title: 'Socket.ly Chat App',
    tagline: 'Realtime messaging platform with live presence, typing indicators and JWT authentication.',
    category: 'Full Stack Application',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1600&q=80',
    tech: ['React', 'Node.js', 'Express.js', 'Socket.IO', 'MySQL', 'JWT'],
    github: 'https://github.com/AYU-17/Socket.ly',
    demo: '#',
    overview: {
      description: 'Socket.ly is a production-grade realtime chat application that enables users to communicate instantly in private or group rooms. It features live online status, typing indicators, and a modern glassmorphism UI built with React.',
      objective: 'To build a scalable, realtime messaging platform that demonstrates expertise in WebSocket communication, JWT-based authentication, and full-stack JavaScript development.',
      problemSolved: 'Traditional HTTP-based chat systems suffer from polling delays. Socket.ly eliminates this by using persistent WebSocket connections via Socket.IO, giving users a truly realtime experience with zero-latency message delivery.',
      type: 'Full Stack Web App',
      duration: '3 Weeks',
      teamSize: 'Solo Project',
      role: 'Full Stack Developer',
      status: 'Production Ready'
    },
    features: [
      { icon: '💬', name: 'Realtime Messaging', description: 'Instant bidirectional message delivery via Socket.IO WebSockets with zero perceptible delay.' },
      { icon: '🟢', name: 'Online Presence', description: 'Live online/offline status indicators showing who is active in each chat room.' },
      { icon: '✍️', name: 'Typing Indicator', description: 'Real-time "User is typing..." notification that fires on each keystroke event.' },
      { icon: '🔐', name: 'JWT Authentication', description: 'Secure user registration and login with JSON Web Tokens and bcrypt password hashing.' },
      { icon: '🏠', name: 'Chat Rooms', description: 'Create or join multiple chat rooms with separate message histories and members.' },
      { icon: '📱', name: 'Responsive UI', description: 'Fully mobile-optimized React interface with sidebar, chat window and adaptive layout.' }
    ],
    techStack: [
      { icon: '⚛️', name: 'React', type: 'Frontend Framework', gradient: 'from-cyan-400 to-blue-500' },
      { icon: '🟢', name: 'Node.js', type: 'Runtime Environment', gradient: 'from-green-400 to-emerald-600' },
      { icon: '🚂', name: 'Express.js', type: 'Backend Framework', gradient: 'from-gray-400 to-gray-600' },
      { icon: '⚡', name: 'Socket.IO', type: 'Realtime Engine', gradient: 'from-yellow-400 to-red-500' },
      { icon: '🐬', name: 'MySQL', type: 'Relational Database', gradient: 'from-blue-400 to-blue-700' },
      { icon: '🔑', name: 'JWT', type: 'Authentication', gradient: 'from-purple-400 to-pink-500' },
      { icon: '🎨', name: 'Tailwind', type: 'CSS Framework', gradient: 'from-teal-400 to-cyan-500' },
      { icon: '☁️', name: 'Render', type: 'Cloud Deployment', gradient: 'from-indigo-400 to-purple-600' }
    ],
    architecture: [
      { icon: '⚛️', name: 'React UI', detail: 'Client Interface', gradient: 'from-cyan-400 to-blue-500' },
      { icon: '⚡', name: 'Socket.IO', detail: 'Realtime Layer', gradient: 'from-yellow-400 to-orange-500' },
      { icon: '🚂', name: 'Express API', detail: 'REST Backend', gradient: 'from-gray-400 to-gray-600' },
      { icon: '🐬', name: 'MySQL', detail: 'Data Persistence', gradient: 'from-blue-400 to-blue-700' }
    ],
    challenges: [
      {
        challenge: 'Handling multiple users sending messages simultaneously to the same room caused event collisions and out-of-order message rendering in the UI.',
        solution: 'Implemented server-side room-based namespacing in Socket.IO and assigned unique event IDs to each message, ensuring ordered, conflict-free delivery even under concurrent load.'
      },
      {
        challenge: 'JWT tokens stored in localStorage were vulnerable to XSS attacks, posing a security risk for authenticated sessions.',
        solution: 'Migrated token storage to httpOnly cookies and added CORS configuration to restrict API access to the frontend origin only, significantly hardening the auth layer.'
      },
      {
        challenge: 'MySQL connection pooling was not configured initially, causing connection timeouts under higher load during testing.',
        solution: 'Introduced a connection pool with a max limit, and added graceful error handling with reconnection logic to keep the database layer stable.'
      }
    ],
    timeline: [
      { phase: '💡 Idea & Research', description: 'Researched WebSocket protocols, compared Socket.IO vs raw WS, and defined the feature scope for the MVP.' },
      { phase: '📐 Planning & Design', description: 'Wireframed the chat UI, designed the database schema for users, rooms, and messages, and set up the project scaffold.' },
      { phase: '🔐 Authentication', description: 'Built the register/login flow with bcrypt password hashing, JWT issuance, and protected route middleware.' },
      { phase: '⚡ Realtime Engine', description: 'Integrated Socket.IO on both client and server — implemented room join/leave, message broadcast, and typing events.' },
      { phase: '🎨 UI Development', description: 'Built the full React interface — sidebar, chat window, message bubbles, online users list and mobile layout.' },
      { phase: '🧪 Testing & Deploy', description: 'Tested all flows with Postman and manual testing. Deployed the Node.js backend to Render and connected the MySQL DB.' }
    ],
    stats: [
      { number: 3, label: 'Weeks to Build' },
      { number: 8, label: 'Core Features' },
      { number: 15, label: 'React Components' },
      { number: 4, label: 'Socket Events' }
    ],
    achievements: [
      'Realtime bidirectional messaging with < 50ms latency',
      'Secure JWT authentication with httpOnly cookies',
      'Live typing indicators and online presence',
      'Fully responsive mobile-first React UI',
      'MySQL schema with optimized JOIN queries',
      'Deployed to production on Render cloud'
    ]
  },

  'invoice': {
    slug: 'invoice',
    title: 'Mustard Invoice App',
    tagline: 'Smart business invoice platform with dynamic calculations, client management and payment tracking.',
    category: 'Business Web Application',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
    tech: ['EJS', 'Node.js', 'Express.js', 'MySQL'],
    github: 'https://github.com/AYU-17/Khata',
    demo: '#',
    overview: {
      description: 'Mustard Invoice is a full-featured business invoicing web application that streamlines the billing workflow for small businesses. It allows users to create, manage, and track invoices with automatic total calculations and client management.',
      objective: 'To build a practical, real-world business tool that solves everyday invoicing pain points — replacing manual spreadsheet billing with a clean, fast web interface.',
      problemSolved: 'Small businesses struggle with manual invoice tracking using Excel sheets, leading to errors and lost payments. Mustard Invoice centralizes all billing in one place with automatic calculation, status tracking and client history.',
      type: 'Business Web Application',
      duration: '2 Weeks',
      teamSize: 'Solo Project',
      role: 'Full Stack Developer',
      status: 'Production Ready'
    },
    features: [
      { icon: '🧾', name: 'Invoice Generation', description: 'Create professional invoices with line items, quantities, rates and automatic total calculation.' },
      { icon: '👤', name: 'Client Management', description: 'Manage a client database with contact details, billing address and invoice history per client.' },
      { icon: '📊', name: 'Payment Tracking', description: 'Mark invoices as paid, pending or overdue with visual status indicators and filters.' },
      { icon: '🔢', name: 'Auto Calculations', description: 'Dynamic subtotal, tax, and grand total computation that updates in real-time as items are added.' },
      { icon: '📋', name: 'Invoice History', description: 'Full searchable history of all invoices with date, client, amount and status at a glance.' },
      { icon: '📱', name: 'Responsive Design', description: 'Clean server-side rendered EJS interface that works across all device sizes.' }
    ],
    techStack: [
      { icon: '🖼️', name: 'EJS', type: 'Templating Engine', gradient: 'from-yellow-400 to-orange-500' },
      { icon: '🟢', name: 'Node.js', type: 'Runtime Environment', gradient: 'from-green-400 to-emerald-600' },
      { icon: '🚂', name: 'Express.js', type: 'Web Framework', gradient: 'from-gray-400 to-gray-600' },
      { icon: '🐬', name: 'MySQL', type: 'Database', gradient: 'from-blue-400 to-blue-700' },
      { icon: '🎨', name: 'Tailwind', type: 'CSS Framework', gradient: 'from-teal-400 to-cyan-500' },
      { icon: '🚉', name: 'Railway', type: 'Cloud Deployment', gradient: 'from-purple-400 to-indigo-600' }
    ],
    architecture: [
      { icon: '🖼️', name: 'EJS Views', detail: 'Server Rendered UI', gradient: 'from-yellow-400 to-orange-500' },
      { icon: '🚂', name: 'Express Routes', detail: 'CRUD Controllers', gradient: 'from-gray-400 to-gray-600' },
      { icon: '🐬', name: 'MySQL', detail: 'Data Storage', gradient: 'from-blue-400 to-blue-700' },
      { icon: '🚉', name: 'Railway', detail: 'Cloud Hosting', gradient: 'from-purple-400 to-indigo-600' }
    ],
    challenges: [
      {
        challenge: 'Dynamic line item rows required adding/removing items on-the-fly while keeping the total calculation in sync without a frontend framework.',
        solution: 'Used vanilla JavaScript DOM manipulation to dynamically add/remove table rows with input listeners that trigger a recalculation function on every change, keeping totals always accurate.'
      },
      {
        challenge: 'Managing relational data between clients and their invoices required careful MySQL schema design to avoid data duplication.',
        solution: 'Designed a normalized schema with a separate clients table and invoices table linked by a foreign key, allowing efficient queries for client invoice history without redundancy.'
      }
    ],
    timeline: [
      { phase: '💡 Idea & Scope', description: 'Defined core features — invoice CRUD, client management, payment status — and mapped out the database schema.' },
      { phase: '🗄️ Database Design', description: 'Created normalized MySQL tables for clients, invoices and line items with proper foreign key relationships.' },
      { phase: '🚂 Backend Routes', description: 'Built all Express CRUD routes for invoices and clients with input validation and error handling middleware.' },
      { phase: '🎨 EJS Templates', description: 'Designed all pages — dashboard, invoice list, create invoice form, client detail — using EJS and Tailwind CSS.' },
      { phase: '⚙️ Dynamic Logic', description: 'Added JavaScript for live line-item calculation, dynamic row add/remove, and invoice status toggle.' },
      { phase: '🚀 Deployment', description: 'Deployed to Railway cloud with environment variables for MySQL credentials and production configuration.' }
    ],
    stats: [
      { number: 2, label: 'Weeks to Build' },
      { number: 6, label: 'Core Features' },
      { number: 12, label: 'EJS Templates' },
      { number: 3, label: 'DB Tables' }
    ],
    achievements: [
      'Dynamic invoice generation with auto-totals',
      'Client database with full invoice history',
      'Payment status tracking (Paid / Pending / Overdue)',
      'Normalized MySQL schema with foreign keys',
      'Server-side rendered with EJS templating',
      'Deployed live on Railway cloud platform'
    ]
  },

  'sales-management': {
    slug: 'sales-management',
    title: 'Sales Management System',
    tagline: 'Comprehensive CRM for tracking leads, managing customer relationships and analysing sales performance.',
    category: 'Enterprise CRM Application',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    tech: ['React', 'Node.js', 'Express.js', 'MySQL', 'JWT'],
    github: 'https://github.com/AYU-17/sales-management-system',
    demo: '#',
    overview: {
      description: 'A full-featured Sales Management System (CRM) that gives sales teams a centralized hub to track leads through the pipeline, manage customer relationships, and analyse sales performance via an interactive analytics dashboard.',
      objective: 'To build a production-grade CRM that mirrors real-world enterprise tools — demonstrating React dashboard development, RESTful API design, relational database modeling, and JWT-secured multi-role authentication.',
      problemSolved: 'Sales teams relying on scattered spreadsheets lose track of leads and miss follow-ups. This system provides a unified pipeline view, customer history, and data-driven insights to boost conversion rates.',
      type: 'Enterprise CRM Web App',
      duration: '5 Weeks',
      teamSize: 'Team Project',
      role: 'Backend Developer',
      status: 'Production Ready'
    },
    features: [
      { icon: '📋', name: 'Lead Pipeline', description: 'Visual Kanban-style lead pipeline with drag-and-drop stage management and priority tagging.' },
      { icon: '👥', name: 'Customer Management', description: 'Full CRM contact profiles with interaction history, notes, deal value and follow-up scheduling.' },
      { icon: '📊', name: 'Analytics Dashboard', description: 'Real-time charts showing conversion rates, revenue trends, top performers and pipeline health.' },
      { icon: '🔐', name: 'Role-Based Auth', description: 'JWT-secured multi-role system — Admin, Manager and Sales Rep — each with scoped permissions.' },
      { icon: '🔍', name: 'Advanced Search', description: 'Full-text search and multi-filter across leads and customers by status, date, value and owner.' },
      { icon: '📱', name: 'Responsive Design', description: 'Fully adaptive React UI optimized for desktop dashboards and mobile field sales use.' }
    ],
    techStack: [
      { icon: '⚛️', name: 'React', type: 'Frontend Framework', gradient: 'from-cyan-400 to-blue-500' },
      { icon: '🟢', name: 'Node.js', type: 'Runtime Environment', gradient: 'from-green-400 to-emerald-600' },
      { icon: '🚂', name: 'Express.js', type: 'REST API Framework', gradient: 'from-gray-400 to-gray-600' },
      { icon: '🐬', name: 'MySQL', type: 'Relational Database', gradient: 'from-blue-400 to-blue-700' },
      { icon: '🔑', name: 'JWT', type: 'Auth & Security', gradient: 'from-purple-400 to-pink-500' },
      { icon: '🎨', name: 'Tailwind', type: 'CSS Framework', gradient: 'from-teal-400 to-cyan-500' },
      { icon: '📮', name: 'Postman', type: 'API Testing', gradient: 'from-orange-400 to-orange-600' },
      { icon: '☁️', name: 'Render', type: 'Cloud Deployment', gradient: 'from-indigo-400 to-purple-600' }
    ],
    architecture: [
      { icon: '⚛️', name: 'React SPA', detail: 'Client Dashboard', gradient: 'from-cyan-400 to-blue-500' },
      { icon: '🔑', name: 'JWT Auth', detail: 'Security Layer', gradient: 'from-purple-400 to-pink-500' },
      { icon: '🚂', name: 'Express API', detail: 'REST Controllers', gradient: 'from-gray-400 to-gray-600' },
      { icon: '🐬', name: 'MySQL', detail: 'CRM Data Store', gradient: 'from-blue-400 to-blue-700' }
    ],
    challenges: [
      {
        challenge: 'Implementing role-based access control where Admins, Managers and Sales Reps see different data and UI elements without duplicating components.',
        solution: 'Created a centralized auth context in React that stores decoded JWT role claims. Conditional rendering and protected route wrappers use this context to show or hide UI and block unauthorized API calls.'
      },
      {
        challenge: 'The analytics dashboard needed to aggregate complex sales data across multiple tables in real time without slowing down the UI.',
        solution: 'Wrote optimized MySQL aggregate queries (GROUP BY, SUM, COUNT with JOINs) in dedicated analytics endpoints. Added simple in-memory caching for heavy queries and lazy-loaded chart components on the frontend.'
      },
      {
        challenge: 'Managing cross-table relationships (leads → customers → deals → contacts) made CRUD operations complex and error-prone.',
        solution: 'Designed a normalized schema with clear FK constraints and cascading deletes. Used transaction-based queries for multi-table operations to ensure data integrity on every write.'
      }
    ],
    timeline: [
      { phase: '💡 Requirements Analysis', description: 'Mapped out the full CRM feature set — lead pipeline, customer profiles, analytics — and defined role-based permission rules.' },
      { phase: '🗄️ Database Schema', description: 'Designed normalized MySQL schema covering leads, customers, contacts, deals and audit logs with proper indexing.' },
      { phase: '🔐 Auth System', description: 'Implemented JWT-based multi-role authentication with refresh tokens and Express middleware for route protection.' },
      { phase: '🚂 REST API', description: 'Built all CRUD endpoints for leads, customers, contacts and analytics with Postman-tested request/response contracts.' },
      { phase: '⚛️ React Dashboard', description: 'Developed the full React UI — dashboard overview, lead Kanban, customer table, analytics charts and settings.' },
      { phase: '🧪 Testing', description: 'End-to-end testing of all role-based flows, API edge cases and UI responsiveness across mobile and desktop.' },
      { phase: '🚀 Deployment', description: 'Deployed Express API to Render and connected production MySQL. Configured CORS, env vars and domain linking.' }
    ],
    stats: [
      { number: 5, label: 'Weeks to Build' },
      { number: 6, label: 'Core Features' },
      { number: 20, label: 'React Components' },
      { number: 5, label: 'DB Tables' }
    ],
    achievements: [
      'Multi-role JWT authentication (Admin / Manager / Rep)',
      'Visual lead pipeline with stage management',
      'Real-time analytics charts and reporting',
      'Advanced search and multi-filter system',
      'Normalized MySQL schema with FK constraints',
      'REST API fully tested with Postman collections'
    ]
  },


  'cine-wallet': {
    slug: 'cine-wallet',
    title: 'Cine Wallet',
    tagline: 'Modern movie discovery and ticket booking platform powered by real-time movie data and personalized watchlists.',
    category: 'Movie Discovery & Entertainment Platform',
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80',
    tech: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'TMDB API'
    ],
    github: 'https://github.com/AYU-17/Cine-Wallet',
    demo: '#',
    overview: {
      description:
        'Cine Wallet is a modern movie platform that allows users to discover trending films, search movie details, watch trailers, manage watchlists and explore entertainment content through a sleek cinematic interface.',
      objective:
        'To build a production-style movie platform inspired by Netflix, IMDb and TMDB while demonstrating API integration, frontend architecture, responsive design and scalable backend development.',
      problemSolved:
        'Movie enthusiasts often jump between multiple websites for ratings, trailers, cast information and recommendations. Cine Wallet centralizes everything into a single modern experience.',
      type: 'Movie Discovery Platform',
      duration: '4 Weeks',
      teamSize: 'Solo Project',
      role: 'Full Stack Developer',
      status: 'Production Ready'
    },

    features: [
      {
        icon: '🎬',
        name: 'Movie Discovery',
        description:
          'Browse trending, popular, upcoming and top-rated movies with real-time TMDB integration.'
      },
      {
        icon: '🔍',
        name: 'Smart Search',
        description:
          'Instant search functionality with movie posters, ratings and detailed information.'
      },
      {
        icon: '❤️',
        name: 'Watchlist System',
        description:
          'Save favorite movies and maintain a personalized entertainment library.'
      },
      {
        icon: '▶️',
        name: 'Trailer Streaming',
        description:
          'Watch official trailers directly from the platform before choosing a movie.'
      },
      {
        icon: '⭐',
        name: 'Ratings & Reviews',
        description:
          'View ratings, reviews and audience scores for informed movie selection.'
      },
      {
        icon: '📱',
        name: 'Responsive Design',
        description:
          'Optimized experience across desktop, tablet and mobile devices.'
      }
    ],

    techStack: [
      { icon: '⚛️',name: 'React',type: 'Frontend Framework',gradient: 'from-cyan-400 to-blue-500'},
      { icon: '🟢',name: 'Node.js',type: 'Backend Runtime',gradient: 'from-green-400 to-emerald-600'},
      { icon: '🚂',name: 'Express.js',type: 'REST API Framework',gradient: 'from-gray-400 to-gray-600'},
      { icon: '🍃',name: 'MongoDB',type: 'Database',gradient: 'from-green-400 to-green-700'},
      { icon: '🎥',name: 'TMDB API',type: 'Movie Data Source',gradient: 'from-blue-400 to-indigo-600'},
      { icon: '🎨',name: 'Tailwind CSS',type: 'Styling Framework',gradient: 'from-cyan-400 to-teal-500'},
      { icon: '🔥',name: 'Firebase',type: 'Authentication',gradient: 'from-yellow-400 to-orange-500'},
      { icon: '☁️',name: 'Vercel',type: 'Deployment Platform',gradient: 'from-purple-400 to-indigo-600'}
    ],

    architecture: [
      { icon: '⚛️', name: 'React Frontend', detail: 'Movie UI Layer', gradient: 'from-cyan-400 to-blue-500' },
      { icon: '🎥', name: 'TMDB API', detail: 'Movie Data Source', gradient: 'from-blue-400 to-indigo-600' },
      { icon: '🚂',name: 'Express Backend',detail: 'Business Logic',gradient: 'from-gray-400 to-gray-600'},
      { icon: '🍃',name: 'MongoDB',detail: 'User Data Storage',gradient: 'from-green-400 to-green-700'}
    ],

    challenges: [
      {
        challenge:
          'Managing large movie datasets while maintaining fast search performance.',
        solution:
          'Implemented optimized search logic and efficient API request handling to reduce unnecessary calls.'
      },

      {
        challenge:
          'Displaying rich movie information without overwhelming the user interface.',
        solution:
          'Used progressive content layouts, collapsible sections and clean card-based design.'
      },

      {
        challenge:
          'Keeping movie data fresh while avoiding API limitations.',
        solution:
          'Added caching strategies and optimized request frequency for popular endpoints.'
      }
    ],

    timeline: [
      { phase: '💡 Planning', description:'Defined movie platform requirements, user flows and interface structure.'},
      { phase: '🎨 UI Design', description:'Created a cinematic dark-themed design inspired by Netflix and IMDb.'},
      { phase: '🎥 API Integration', description: 'Connected TMDB API for movies, trailers, ratings and search functionality.'},
      { phase: '⚛️ Frontend Development', description:'Built reusable React components and responsive layouts.'},
      { phase: '🔐 Authentication', description: 'Implemented secure user login and personalized watchlists.'},
      { phase: '🧪 Testing', description: 'Validated API integration, responsiveness and performance.'},
      { phase: '🚀 Deployment', description: 'Deployed production build and optimized loading performance.'}
    ],

    stats: [
      { number: 4, label: 'Weeks to Build' },
      { number: 6, label: 'Core Features' },
      { number: 25, label: 'React Components' },
      { number: 5, label: 'API Integrations' }
    ],
    achievements: ['TMDB API Integration','Personal Watchlist Management','Advanced Movie Search','Trailer Streaming Support','Fully Responsive UI','Modern Cinematic Design']
  },


  'student-management-system': {
  slug: 'student-management-system',

  title: 'Student Management System',

  tagline: 'Comprehensive student administration platform for managing records, admissions, alumni tracking and academic operations.',

  category: 'Education Management System',

  status: 'Completed',

  image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',

  tech: [
    'Node.js',
    'Express.js',
    'MongoDB',
    'EJS',
    'Nodemailer'
  ],

  github: 'https://github.com/AYU-17/student-management-system',

  demo: '#',

  overview: {
    description:
      'A complete Student Management System designed to streamline student registration, academic record management, alumni tracking and administrative operations through a centralized dashboard.',

    objective:
      'To develop a real-world educational management platform that demonstrates backend architecture, database management, email integration and admin dashboard development.',

    problemSolved:
      'Educational institutions often struggle with scattered student records and manual administration processes. This system centralizes student information, alumni tracking and communication into one platform.',

    type: 'Educational Administration System',

    duration: '6 Weeks',

    teamSize: 'Solo Project',

    role: 'Full Stack Developer',

    status: 'Production Ready'
  },

  features: [
    {
      icon: '🎓',
      name: 'Student Registration',
      description:
        'Manage student profiles, personal details, academic records and enrollment information.'
    },

    {
      icon: '👨‍💼',
      name: 'Admin Dashboard',
      description:
        'Centralized dashboard for managing students, viewing statistics and controlling system operations.'
    },

    {
      icon: '🏆',
      name: 'Alumni Management',
      description:
        'Move graduated students into the alumni database and maintain their professional information.'
    },

    {
      icon: '📧',
      name: 'Email Integration',
      description:
        'Automated email notifications using Nodemailer for communication and updates.'
    },

    {
      icon: '✏️',
      name: 'Student Record Updates',
      description:
        'Edit, update and maintain student information through secure admin controls.'
    },

    {
      icon: '📱',
      name: 'Responsive Interface',
      description:
        'User-friendly design optimized for desktop, tablet and mobile devices.'
    }
  ],

  techStack: [
    {
      icon: '🟢',
      name: 'Node.js',
      type: 'Backend Runtime',
      gradient: 'from-green-400 to-emerald-600'
    },

    {
      icon: '🚂',
      name: 'Express.js',
      type: 'Backend Framework',
      gradient: 'from-gray-400 to-gray-600'
    },

    {
      icon: '🍃',
      name: 'MongoDB',
      type: 'Database',
      gradient: 'from-green-400 to-green-700'
    },

    {
      icon: '📄',
      name: 'EJS',
      type: 'Template Engine',
      gradient: 'from-yellow-400 to-orange-500'
    },

    {
      icon: '📧',
      name: 'Nodemailer',
      type: 'Email Service',
      gradient: 'from-blue-400 to-indigo-600'
    },

    {
      icon: '🎨',
      name: 'Tailwind CSS',
      type: 'Frontend Styling',
      gradient: 'from-cyan-400 to-teal-500'
    },

    {
      icon: '🔐',
      name: 'JWT',
      type: 'Authentication',
      gradient: 'from-purple-400 to-pink-500'
    },

    {
      icon: '☁️',
      name: 'Render',
      type: 'Deployment Platform',
      gradient: 'from-indigo-400 to-purple-600'
    }
  ],

  architecture: [
    {
      icon: '🖥️',
      name: 'EJS Frontend',
      detail: 'Admin Interface',
      gradient: 'from-cyan-400 to-blue-500'
    },

    {
      icon: '🔐',
      name: 'Authentication',
      detail: 'Access Control',
      gradient: 'from-purple-400 to-pink-500'
    },

    {
      icon: '🚂',
      name: 'Express Server',
      detail: 'Business Logic',
      gradient: 'from-gray-400 to-gray-600'
    },

    {
      icon: '🍃',
      name: 'MongoDB',
      detail: 'Student Database',
      gradient: 'from-green-400 to-green-700'
    }
  ],

  challenges: [
    {
      challenge:
        'Managing student lifecycle transitions from active student records to alumni records while preserving data consistency.',

      solution:
        'Created dedicated alumni workflows and database structures that allow seamless migration of student data without duplication.'
    },

    {
      challenge:
        'Implementing reliable email communication for administrative notifications and updates.',

      solution:
        'Integrated Nodemailer with reusable email templates and centralized mailing functions.'
    },

    {
      challenge:
        'Maintaining clean CRUD operations across multiple student-related modules.',

      solution:
        'Developed modular controllers and reusable database functions to reduce code duplication and improve maintainability.'
    }
  ],

  timeline: [
    {
      phase: '💡 Requirement Analysis',
      description:
        'Identified core educational administration needs and planned the system architecture.'
    },

    {
      phase: '🗄️ Database Design',
      description:
        'Created MongoDB collections for students, alumni and administrative records.'
    },

    {
      phase: '🚂 Backend Development',
      description:
        'Built Express routes, controllers and CRUD functionality for all modules.'
    },

    {
      phase: '🎨 Dashboard UI',
      description:
        'Designed and implemented responsive EJS-based admin dashboard interfaces.'
    },

    {
      phase: '📧 Email Integration',
      description:
        'Integrated Nodemailer for automated communication and notifications.'
    },

    {
      phase: '🧪 Testing',
      description:
        'Tested all CRUD workflows, data validation and email functionality.'
    },

    {
      phase: '🚀 Deployment',
      description:
        'Configured production environment and deployed the application.'
    }
  ],

  stats: [
    {
      number: 6,
      label: 'Weeks to Build'
    },

    {
      number: 6,
      label: 'Core Features'
    },

    {
      number: 15,
      label: 'Admin Modules'
    },

    {
      number: 3,
      label: 'Database Collections'
    }
  ],

  achievements: [
    'Complete Student CRUD System',
    'Alumni Management Module',
    'Admin Dashboard',
    'Email Notification Integration',
    'Responsive Educational Portal',
    'Scalable MongoDB Architecture'
  ]
}
}


// Dynamic project detail route
app.get('/projects/:slug', (req, res) => {
  const project = projectsData[req.params.slug];
  if (!project) return res.status(404).render('home', { title: 'Home' });
  res.render('project-detail', { title: project.title, project });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

// 404 Route handling
app.use((req, res, next) => {
  res.status(404).render('home', { title: 'Home' }); // default back to home, or show alert
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    success: false,
    message: 'Server error: unable to process request.',
  });
});

// Start server listening
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});
