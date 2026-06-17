# MyResume - Personal Portfolio Website

A dynamic, professional personal portfolio and resume website built using Node.js, Express, and EJS (Embedded JavaScript) templating, backed by a MongoDB database to persist contact inquiries.

---

## 🚀 Features

- **Dynamic Page Rendering**: Utilizes EJS to dynamically render views (`Home`, `About`, `Skills`, `Projects`, `Contact`).
- **Contact Form Integration**: A fully functional contact form on the portfolio page that validates and saves messages directly to a MongoDB database.
- **Modular Architecture**: Uses Express Router for route segregation, Mongoose for database schema management, and Controllers for request/response logic.
- **EJS Partials**: Modularized headers, navbar, and footers for clean and maintainable UI layout.
- **Robust Error Handling**: Standardized 404 page routing and global express error-handling middlewares.

---

## 🛠️ Tech Stack

- **Backend**: Node.js & Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **View Engine**: EJS (Embedded JavaScript templates)
- **Styling & Assets**: Vanilla CSS & static assets served through Express

---

## 📂 Project Structure

```text
MyResume/
├── config/                 # Database connection configs
│   └── DB.js
├── controllers/            # Request handlers & logic
│   └── contactController.js
├── model/                  # Mongoose DB Schemas
│   └── ContactModel.js
├── public/                 # Static files (CSS, JS, Images)
├── routes/                 # Express API/Page routes
│   └── ContactRoutes.js
├── views/                  # EJS template views
│   ├── partials/           # Reusable view components (navbar, footer, etc.)
│   ├── about.ejs
│   ├── contact.ejs
│   ├── home.ejs
│   ├── projects.ejs
│   └── skills.ejs
├── .env                    # Environment variables (ignored by Git)
├── package.json            # Project metadata & dependencies
├── server.js               # Main entry point of the server
├── .gitignore              # Root git ignore file
└── README.md               # Project documentation
```

---

## ⚙️ Setup & Installation

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 16+) and a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB server running.

### 2. Clone the Repository
```bash
git clone <your-repository-url>
cd MyResume
```

### 3. Install Dependencies
Install the required packages from the project root:
```bash
npm install
```

### 4. Configure Environment Variables
Create a file named `.env` in the project root and configure the environment variables as follows:
```env
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@<cluster-url>/<db-name>
```
> **Note:** Keep your `.env` secure. It is added to `.gitignore` and will not be uploaded to GitHub.

### 5. Run the Server
To start the server, run:
```bash
npm start
```
By default, the server will run on: [http://localhost:5000](http://localhost:5000)

---

## 🌐 Routes & Endpoints

### Page View Routes (GET)
- `GET /` - Renders the Home page.
- `GET /about` - Renders the About Me page.
- `GET /skills` - Renders the Skills page.
- `GET /projects` - Renders the Projects page.
- `GET /contact` - Renders the Contact page.

### API Routes (POST)
- `POST /contact` - Processes contact form submissions.
  - **Request Body Format**:
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "subject": "Inquiry",
      "message": "Hello, I would like to collaborate."
    }
    ```
  - **Success Response (201 Created)**:
    ```json
    {
      "success": true,
      "message": "Thank you! Your message has been saved successfully. I will reply by email or WhatsApp soon."
    }
  ```

---

## ✉️ Contact Form Notifications

The contact form now saves messages to MongoDB and can send an email notification if SMTP settings are configured.

### Required environment variables
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-email-app-password
```

### Optional environment variables
```env
EMAIL_SECURE=true
EMAIL_TO=ayushmittal844@gmail.com
```

> Use a Gmail app password or another SMTP account for `EMAIL_PASS`.

## 📦 Should `public/assets` be uploaded?

Yes. `public/assets/` contains the website's static images, icons, and other required files. These should be committed to the repository so the site renders correctly.

Only ignore files that are generated or sensitive, such as `node_modules/`, `.env`, and local editor or OS files.
