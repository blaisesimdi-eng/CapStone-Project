# My Express App

A Restful backend API built with **Node.js**, **Express** and **MongoDB** for managing institutions, organizational leaders, user locations and institution reviews.

## Features

- **Institution Management:** Create, read, update, and delete institution profiles.
- **Relational Data & Virtauals:** Uses Mongoose references and virtuals population to link institutions with their locations, leaders and reviews.
- **Authentication & Security:** Password hashing with `bcrypt`, token-based authentication using `jsonwebtoken`, and role-based acces control.
- **Validations & Middleware:** Schema request validations using `joi`.
- **Pagination:** Supports paginated queries on list endpoints via custom middleware.

## Tech Stack

- **RunTime & Framework:** `Node.js`, `Express` (`^5.3.0`)
- **Database:** MongoDB (Mongoose ODM)(`^9.11.2`)
- **Authentication & Security:** `JSON Web Token` (`^9.0.3`), `bcrypt` (`6.0.0`)
- **Validation:** `Joi` (`^18.3.0`)
- **Environment & Dev Tools:** `dotenv` (`^18.0.9`), `Nodemon` (`^3.1.14`)

## Project Structure

```text
my-express-app/
|__src/
|   |__config/       #Database and environment configurations
|   |__controller/   #Route logic (institutes, leaders, users, locations, reviews)
|   |__middleware/   #Custom Express middleware
|   |__models/       #Mongoose database schemas
|   |__routes/       #Api route definitions
|   |__server.js     #Application Entry point
|__.env              #Environment variables
|__.gitignore        #Git ignore rules
|__package.json      #Project metadata, scripts, and dependencies
|__README.md         #Project documentation
```

## Prerequisities

- `Node.js`(https://nodejs.org)(v18)
- `MongoDB`(https://mongodb.com) (local instance or MongoDB Atlas URI)

## Installation & Setup

1.  **Clone the repository:**

```bash
git clone https://github.com
cd institution-management
```

2.  **Install dependencies:**

```bash
npm install
```

3.  **Configure environment variables:**
    Create a `.env` file in the root directory and add your configuration:

```env
PORT=2000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
MONGODB_URL="mongodb://127.0.0.1:27017/Institutions"
```

**Start the server:**

- **Development mode** (auto-restarts on save via Nodemon):

```bash
npm run dev
```

- **Production mode:**

```bash
npm start
```

Once started, your terminal will display:

```text
Express server is up and running
Database is connected successfully
```

## API Endpoints Overview

| Resource         | Base Route          | Description                                                 |
| :--------------- | :------------------ | :---------------------------------------------------------- |
| **Institutions** | `/api/institutions` | Manage institution records and virtual relations            |
| **Leaders**      | `/api/leaders`      | Manage institution leaders and assignment                   |
| **Locations**    | `/api/locations`    | Manage physical or reagional locations tied to institutions |
| **Users**        | `/api/users`        | User registration, login, and profile management            |
| **Reviews**      | `/api/reviews`      | Submit and retrieve reviews linked to institutions          |

_(Note: Update the `/api/...` route prefixes above if your `server.js` mounts them under different paths.)_

## Author

- **Blaise**

## License

This project is licensed under the **ISC** License.
