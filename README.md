# Flash Chat

A real-time chat application where users can join rooms using unique room codes and chat with others. Built with React for the frontend and WebSocket for real-time communication.

## Features

- Real-time messaging: Users can send and receive messages instantly.
- Room-based chat: Users can join a room with a unique room code.
- Light/Dark mode: Toggle between light and dark themes.
- Copy room code: Users can copy the room code to share with others.
- Responsive UI: The app is designed to be responsive and work seamlessly across different devices.

## Tech Stack

- Frontend: React, Tailwind CSS
- Backend: WebSocket server for real-time communication
- WebSocket: For communication between frontend and backend

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/flash-chat.git
   cd flash-chat
   ```

2. Install frontend dependencies

   Navigate to the frontend directory and install the necessary packages:

   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies

   Navigate to the backend directory and install the necessary packages:

   ```bash
   cd ../backend
   npm install
   ```

4. Start the Backend server

   In the backend directory, start the WebSocket server:

   ```bash
   npm run dev
   ```

5. Start the Frontend server

   In the frontend directory, start the React development server:

   ```bash
   npm run dev
   ```

   The application should now be running at http://localhost:3000.

## Usage

1. On the homepage, create a new room by clicking Create New Room. A unique room code will be generated.
2. Share the room code with others to invite them.
3. You can toggle between light mode and dark mode by clicking the theme button at the top.
4. Join a room by entering the room code and your username.
5. Chat in real time with other users in the same room.
6. The room code can be copied to the clipboard by clicking on the copy icon next to the room code.

## Folder Structure

```
flash-chat/
│
├── frontend/        # React frontend
│   ├── public/      # Static files
│   ├── src/         # React components and logic
│   └── package.json # Frontend dependencies
│
├── backend/         # WebSocket server
│   ├── src/    # WebSocket server code
│   └── package.json # Backend dependencies
│
└── README.md        # Project documentation
```

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, create a new branch, and submit a pull request. Contributions are welcome!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
