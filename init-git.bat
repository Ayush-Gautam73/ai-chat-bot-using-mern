@echo off
REM Git Repository Setup Script for Windows
REM Run this script to initialize the git repository

echo Initializing git repository...
git init

echo Adding all files to staging...
git add .

echo Creating initial commit...
git commit -m "Initial commit: MERN Stack AI Chatbot with custom AI responses

Features:
- User authentication with JWT tokens
- Custom AI chat response system (no external API dependencies)
- Real-time chat interface with Material-UI
- MongoDB for data persistence
- TypeScript for type safety
- Secure cookie-based authentication
- Comprehensive documentation and setup instructions

Fixed issues:
- Replaced OpenAI dependency with custom chat service
- Removed unnecessary dependencies
- Added strict TypeScript configuration
- Fixed all type safety issues
- Added proper .gitignore files
- Created environment configuration examples
- Updated documentation with complete setup guide"

echo.
echo Git repository initialized successfully!
echo.
echo Next steps:
echo 1. Create a new repository on GitHub/GitLab
echo 2. Add remote origin: git remote add origin ^<your-repo-url^>
echo 3. Push to remote: git push -u origin main
echo.
echo To set up the project:
echo 1. Copy server\.env.example to server\.env and configure
echo 2. Install dependencies: npm install (in both client\ and server\)
echo 3. Start MongoDB
echo 4. Run: npm run dev (in server\ directory)
echo 5. Run: npm run dev (in client\ directory)

pause