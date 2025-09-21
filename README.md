
# AI Chatbot Using MERN Stack

A full-stack AI chatbot application built with the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript. Features user authentication, real-time chat functionality, and a custom AI response system.

## Features

- 🔐 **User Authentication**: Secure signup/login with JWT tokens
- 💬 **Real-time Chat**: Interactive chat interface with message history
- 🤖 **Custom AI Responses**: Intelligent contextual responses without external API dependencies
- 🎨 **Modern UI**: Clean, responsive interface built with Material-UI
- 🔒 **Secure**: Cookie-based authentication with bcrypt password hashing
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- React 18 with TypeScript
- Material-UI for components and theming
- React Router for navigation
- Axios for API communication
- React Hot Toast for notifications
- Vite for fast development and building

### Backend
- Node.js with Express.js
- TypeScript for type safety
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- Custom chat response system

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd AI-Chatbot-Using-MERN-Stack--main
   ```

2. **Setup Server**
   ```bash
   cd server
   npm install
   ```

3. **Setup Client**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Server Environment Variables**
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   MONGODB_URL=mongodb://localhost:27017/ai-chatbot
   JWT_SECRET=your-super-secret-jwt-key-here
   COOKIE_SECRET=your-cookie-secret-key-here
   PORT=5000
   CHAT_SERVICE_NAME=Custom AI Assistant
   ```

2. **Client Environment Variables (Optional)**
   ```bash
   cd ../client
   cp .env.example .env
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start the Server**
   ```bash
   cd server
   npm run dev
   ```

3. **Start the Client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Project Structure

```
AI-Chatbot-Using-MERN-Stack/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context for state management
│   │   ├── helpers/        # API communication utilities
│   │   ├── pages/          # Main application pages
│   │   └── assets/         # Static assets
│   └── public/            # Public assets
├── server/                # Express backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── db/           # Database connection
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   └── utils/        # Utility functions
│   └── dist/             # Compiled JavaScript (generated)
README.md
```

## API Endpoints

### Authentication
- `POST /api/v1/user/signup` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/auth-status` - Check authentication status
- `GET /api/v1/user/logout` - User logout

### Chat
- `POST /api/v1/chat/new` - Send new chat message
- `GET /api/v1/chat/all-chats` - Get user's chat history
- `DELETE /api/v1/chat/delete` - Delete all user chats

## Custom AI Response System

This chatbot uses a custom AI response system instead of external APIs like OpenAI. The system provides:

- **Contextual Responses**: Analyzes user input for keywords and context
- **Conversation Memory**: Maintains chat history for better responses
- **No External Dependencies**: Works completely offline without API keys
- **Extensible**: Easy to enhance with more sophisticated NLP libraries

## Deployment

### Using Docker (Coming Soon)
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment
1. Build the client: `cd client && npm run build`
2. Build the server: `cd server && npm run build`
3. Deploy the built files to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the beautiful component library
- MongoDB for the flexible database solution
- The React and Node.js communities for excellent documentation

---

**Note**: This project uses a custom AI response system. For production use with more sophisticated AI capabilities, consider integrating with services like OpenAI, Google Gemini, or other AI providers.

---
