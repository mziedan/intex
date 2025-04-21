
# Excellence Training Platform

Welcome! This monorepo contains the full-stack web application for the Excellence Training Platform. The platform uses a **React + Vite + Tailwind** frontend and a **custom Node.js/MySQL** backend (see details below).

---

## Table of Contents
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Database Setup](#database-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Support](#support)

---

## Project Structure

```
/
├── src/
│   ├── api/                # API documentation, backend sample files
│   ├── components/         # Frontend React components
│   ├── database/           # MySQL schema.sql
│   ├── pages/              # Frontend pages
│   ├── services/           # Axios-based API client
│   └── ...                 # Utilities, hooks, etc.
├── public/
├── README.md               # (You are here)
├── src/api/API_DOCUMENTATION.md  # API documentation
├── src/database/schema.sql       # MySQL schema
└── ...
```

---

## Backend Setup

You must run your backend API server as described in [this repo](https://github.com/mziedan/intex-firebase/tree/main/backend).

**Brief Steps:**
1. Clone the backend (Node.js/Express or PHP) from [here](https://github.com/mziedan/intex-firebase/tree/main/backend).
2. Install dependencies:  
   ```bash
   cd backend
   npm install
   ```
   (or follow PHP setup if the backend is PHP-based).
3. Configure your database credentials (typically in `.env` or config files).
4. Start the backend server:
   ```bash
   npm run dev
   ```
   or for production:
   ```bash
   npm run start
   ```
   By default, the API should be served from `http://localhost:5000/api` unless changed.

---

## Database Setup

1. **Install MySQL locally or use a managed service.**
2. **Import the schema:**
   - Run the SQL in [`src/database/schema.sql`](src/database/schema.sql) against your MySQL server.
     - e.g., with `mysql` CLI:
       ```bash
       mysql -u root -p < src/database/schema.sql
       ```
3. **Adjust your backend configuration** (`.env`, `config.js`, etc.) to use your DB credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=yourpassword
   DB_NAME=excellence_training
   DB_PORT=3306
   ```

---

## Frontend Setup

1. Clone or copy this repository (the frontend).
2. Install dependencies:
   ```
   npm install
   ```
3. Configure `VITE_API_BASE_URL` in `src/.env.example` (copy to `.env` or `.env.local`). It should point to your running backend, e.g.:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

---

## Environment Configuration

- **Frontend environment:** See `src/.env.example`.  
  Copy it to `.env.local` and modify as needed.

---

## Running the Application

1. **Start the backend API server** first (see [Backend Setup](#backend-setup)).
2. **Then, run the frontend:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (by default).

---

## API Reference

See [`src/api/API_DOCUMENTATION.md`](src/api/API_DOCUMENTATION.md) for complete and up-to-date details of all available API endpoints, usage examples, request/response bodies, and best practices.

---

## Deployment

- **Frontend:**  
  Build with `npm run build` and deploy the `dist/` directory to your hosting provider (e.g., Vercel, Netlify, or your own server).
- **Backend:**  
  See the backend repo’s README for deployment best practices (e.g., deploy to a VPS, Heroku, or shared hosting with Node.js/PHP support).
- **Configure environment variables** as required for production.

---

## Troubleshooting

- **Frontend fails to load data:**  
  - Check that your backend is running and accessible at `VITE_API_BASE_URL`.
  - Check the browser console and network tab for error details.
- **Database errors:**  
  - Ensure your MySQL server is running and accessible.
  - Double-check DB credentials/config.
  - Make sure you’ve run the schema import.

---

## Support

If you encounter any issues, please consult the API documentation first. For backend-specific issues, please refer to [the backend repo](https://github.com/mziedan/intex-firebase/tree/main/backend).
For frontend problems, you can use the project’s Issues tab or contact the maintainers.

---

