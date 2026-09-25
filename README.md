# HobbyHub

HobbyHub is a full-stack social discovery web app for finding people nearby who share your hobbies. It combines location-aware user matching, friend requests, event discovery, reminders, real-time chat, and video calls into one Express and MongoDB application.

## Highlights

- Location-based people discovery with adjustable distance filtering
- Hobby-specific matching pages for finding users with shared interests
- Secure local authentication with Passport and `passport-local-mongoose`
- Friend request workflow with pending, accepted, rejected, and cancelled states
- Friend list with direct chat and video call entry points
- Event listing, event creation, registration, unregistration, and deletion
- Personal reminders sorted by date and time
- Optional Gmail reminder emails through Nodemailer
- Agora-powered real-time chat and video integrations
- EJS-rendered pages with Bootstrap, Materialize, and custom CSS assets

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js |
| Server | Express |
| Views | EJS |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | Passport, Passport Local, Passport Local Mongoose |
| Sessions | Express Session |
| Realtime Media | Agora Web SDK / RTM SDK |
| Email | Nodemailer |
| Styling | Bootstrap, Materialize, custom CSS |

## Project Structure

```text
HobbyHub/
|-- app.js                  # Main Express app, route wiring, reminders, events, chat/video
|-- config.env              # Local environment variables
|-- dbs/
|   `-- connect.js          # MongoDB connection
|-- models/
|   |-- event.js            # Event schema
|   |-- reminder.js         # Reminder schema
|   `-- user.js             # User schema and auth plugin
|-- routes/
|   `-- users.js            # Register, login, logout routes
|-- public/
|   |-- assets/             # App CSS, images, location, chat, video, Agora scripts
|   |-- bootstrap/          # Bootstrap assets
|   `-- vendor/             # Materialize and jQuery assets
`-- views/                  # EJS pages and partials
```

## Core Features

### User Accounts

Users can register with profile and location details, then sign in with local credentials. Authentication is handled with Passport sessions and Mongoose-backed user records.

### Nearby Discovery

HobbyHub calculates distance between users using latitude and longitude, then surfaces nearby people within the selected range. Users can browse all nearby users or narrow discovery by hobby.

### Friends

Users can send, cancel, accept, and reject friend requests. Accepted connections appear in the friends page, where users can start chat or video sessions.

### Events

Authenticated users can browse upcoming events, create new events, register for events, unregister, and delete events. Events are sorted chronologically by date and time.

### Reminders

Users can create personal reminders with title, description, date, and time. The server periodically checks due reminders and can send email notifications when Gmail credentials are configured.

### Chat and Video

The app includes Agora SDK assets for realtime communication. Chat and video routes generate user-based channel context for one-to-one communication between connected users.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB running locally or a hosted MongoDB connection string
- Optional: Agora App ID for video features
- Optional: Gmail app credentials for email reminders

### Installation

```bash
npm install
```

### Environment Setup

Create or update `config.env` in the project root:

```env
PORT=3000
DATABASE=mongodb://127.0.0.1:27017/hobbyhub
APPID=your_agora_app_id
gmailid=your_email@gmail.com
gmailpassword=your_gmail_app_password
```

`DATABASE` is optional because the app falls back to `mongodb://127.0.0.1:27017/hobbyhub`.

`APPID`, `gmailid`, and `gmailpassword` are optional for basic local browsing, but video calls and reminder emails need them to work fully.

### Run the App

For normal startup:

```bash
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/register` | Create an account |
| `/login` | Sign in |
| `/logout` | Sign out |
| `/mainpage` | Authenticated home page |
| `/users` | Discover nearby users |
| `/hobbie/:type` | Discover users by hobby |
| `/friends` | View friends and pending requests |
| `/chat/:id` | Open chat with a user |
| `/video/:id` | Start a video session with a user |
| `/events` | Browse and manage events |
| `/events/new` | Create an event |
| `/addreminder` | Manage reminders |

## Data Models

### User

Stores account details, contact info, location, hobbies, friends, friend requests, and registered events.

### Event

Stores title, image, description, capacity, address, date, time, registrations, and author metadata.

### Reminder

Stores a user's reminder title, description, date, and time.

## Development Notes

- The app uses `config.env` through `dotenv`; keep real credentials out of commits.
- `node_modules/` should not be committed.
- Several routes depend on an authenticated user, so register and log in before testing discovery, friends, events, reminders, chat, or video flows.
- The reminder worker runs inside `app.js` and checks due reminders while the server is running.
- Email reminders are skipped automatically when Gmail credentials are not configured.

## Scripts

```bash
npm start      # Run app.js with Node
npm run dev    # Run app.js with Nodemon
npm test       # Placeholder test script
```

## Future Improvements

- Add automated tests for auth, friend requests, event registration, and reminders
- Move route groups out of `app.js` into dedicated routers
- Add stronger validation and user-facing error messages
- Replace hard-coded session secret with an environment variable
- Add duplicate-registration and duplicate-friend-request safeguards
- Store uploaded event images through a dedicated file or cloud storage flow
