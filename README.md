# Real-Time Forum

A dynamic, single-page application forum built with Go, JavaScript, and SQLite, featuring real-time interactions through WebSockets.

## Features

- User Registration and Authentication
- Post Creation and Commenting
- Real-Time Private Messaging
- Single Page Application (SPA) Architecture

## Tech Stack

- Backend: Go
- Frontend: JavaScript, HTML, CSS
- Database: SQLite
- Real-Time Communication: WebSockets (Gorilla WebSocket)

## Getting Started

### Prerequisites

- Go (version 1.16 or later)
- SQLite

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Nixa001/real-time-forum.git
   cd real-time-forum
   ```

2. Install dependencies:
   ```
   go mod tidy
   ```

3. Set up the SQLite database:
   ```
   sqlite3 forum.db < schema.sql
   ```

4. Run the application:
   ```
   go run main.go
   ```

5. Open your browser and navigate to `http://localhost:8080`

## Project Structure

- `main.go`: Entry point of the application
- `handlers/`: HTTP and WebSocket handlers
- `models/`: Database models and operations
- `static/`: Frontend assets (JavaScript, CSS, HTML)
- `templates/`: HTML templates
- `utils/`: Utility functions

## Features in Detail

### User Management

- Registration with fields: Nickname, Age, Gender, First Name, Last Name, Email, Password
- Login using nickname or email
- Logout functionality

### Posts and Comments

- Create posts with categories
- Comment on posts
- Feed display for posts
- Expandable comments section

### Private Messaging

- Real-time chat functionality
- Online/Offline user status
- Chat history with lazy loading (10 messages at a time)
- Messages include timestamp and sender's name

## WebSocket Events

- New Post
- New Comment
- New Private Message
- User Status Change (Online/Offline)

## Security

- Password hashing using bcrypt
- UUID for session management

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Gorilla WebSocket library
- SQLite database
- bcrypt for password hashing
