# ChatGPT Clone

A modern, full-stack ChatGPT clone built with React and Node.js that provides an interactive chat interface powered by OpenAI's GPT-4o-mini model. Features include real-time conversations, chat history management, and a responsive design that mimics the original ChatGPT experience.

## ✨ Features

- 🤖 **AI-Powered Conversations**: Real-time chat with OpenAI's GPT-4o-mini model
- 💬 **Chat History Management**: Create, view, and manage multiple conversation threads
- 🎨 **Modern UI/UX**: Clean, responsive interface inspired by ChatGPT's design
- ⚡ **Real-time Typing Effect**: Animated response display for enhanced user experience
- 📝 **Markdown Support**: Rich text formatting with syntax highlighting for code blocks
- 🗑️ **Thread Management**: Create new chats and delete existing conversations
- 🔄 **Context Preservation**: Maintain conversation context across sessions
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚙️ **User Settings**: Dropdown menu for future feature implementations

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with latest features
- **Vite 6.3.5** - Fast build tool and development server
- **React Markdown 10.1.0** - Markdown rendering with syntax highlighting
- **React Spinners 0.17.0** - Loading animations
- **UUID 11.1.0** - Unique identifier generation
- **Font Awesome 7.0.0** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **OpenAI API 5.11.0** - AI model integration
- **CORS 2.8.5** - Cross-origin resource sharing
- **Dotenv 17.2.1** - Environment variable management

### Database
- **MongoDB** - Document-based database
- **Mongoose 8.17.1** - MongoDB object modeling

### Other
- **ESLint** - Code linting and formatting
- **Git** - Version control

## 📦 Installation & Local Development

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- OpenAI API key

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd ChatGpt
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create Environment Variables**
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start Development Servers**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm start
   ```
   Server will run on `http://localhost:8080`

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

6. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

## 🚀 Deployment Steps

### Frontend Deployment

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend directory: `cd frontend`
3. Build the project: `npm run build`
4. Deploy: `vercel --prod`

#### Netlify
1. Navigate to frontend directory: `cd frontend`
2. Build the project: `npm run build`
3. Drag the `dist` folder to Netlify dashboard
4. Configure build settings if needed

#### Render
1. Connect your GitHub repository to Render
2. Set build command: `cd frontend && npm install && npm run build`
3. Set publish directory: `frontend/dist`
4. Configure environment variables

### Backend Deployment

#### Render
1. Connect your GitHub repository to Render
2. Set build command: `cd backend && npm install`
3. Set start command: `cd backend && npm start`
4. Add environment variables:
   - `MONGODB_URI`
   - `OPENAI_API_KEY`

#### Railway
1. Connect your GitHub repository to Railway
2. Set the root directory to `backend`
3. Add environment variables
4. Deploy automatically

#### Heroku
1. Install Heroku CLI
2. Navigate to backend: `cd backend`
3. Initialize git: `git init`
4. Create Heroku app: `heroku create`
5. Add environment variables in Heroku dashboard
6. Deploy: `git push heroku main`

## 📡 API Endpoints Documentation

### Base URL: `https://chatgpt-backend-xn1t.onrender.com/api`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/chat` | Send a message and get AI response | `{threadId, message}` | `{reply: string}` |
| `GET` | `/thread` | Get all conversation threads | - | `Array<Thread>` |
| `GET` | `/thread/:threadId` | Get messages for specific thread | - | `Array<Message>` |
| `DELETE` | `/thread/:threadId` | Delete a conversation thread | - | `{success: string}` |
| `POST` | `/test` | Test endpoint for database operations | - | `Thread object` |

### Request/Response Examples

**Send Message:**
```bash
POST /api/chat
Content-Type: application/json

{
  "threadId": "uuid-string",
  "message": "Hello, how are you?"
}
```

**Response:**
```json
{
  "reply": "Hello! I'm doing well, thank you for asking. How can I help you today?"
}
```

**Get All Threads:**
```bash
GET /api/thread
```

**Response:**
```json
[
  {
    "threadId": "uuid-string",
    "title": "Hello, how are you?",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## 📸 Screenshots / Demo

## 🚀 Live Demo

**Frontend:** [https://chatgpt-frontend-qxx2.onrender.com](https://chatgpt-frontend-qxx2.onrender.com)

**Backend API:** [https://chatgpt-backend-xn1t.onrender.com](https://chatgpt-backend-xn1t.onrender.com)

> **⚠️ TODO: Add screenshots before publishing**

- [ ] Add screenshot of the main chat interface
- [ ] Add screenshot of the sidebar with conversation history
- [ ] Add screenshot of the responsive mobile design

## 📁 Folder Structure

```
ChatGpt/
├── backend/
│   ├── models/
│   │   └── Thread.js              # MongoDB schema for chat threads
│   ├── routes/
│   │   └── chat.js                # API route handlers
│   ├── utils/
│   │   └── openai.js              # OpenAI API integration
│   ├── package.json               # Backend dependencies
│   └── server.js                  # Express server setup
├── frontend/
│   ├── public/
│   │   └── vite.svg               # Vite logo
│   ├── src/
│   │   ├── assets/
│   │   │   ├── blacklogo.png      # App logo
│   │   │   └── chatgpt.png        # Favicon
│   │   ├── App.jsx                # Main app component
│   │   ├── Chat.jsx               # Chat display component
│   │   ├── ChatWindow.jsx         # Chat window container
│   │   ├── MyContext.jsx          # React context provider
│   │   ├── Sidebar.jsx            # Sidebar navigation
│   │   ├── main.jsx               # App entry point
│   │   └── *.css                  # Component stylesheets
│   ├── index.html                 # HTML template
│   ├── package.json               # Frontend dependencies
│   └── vite.config.js             # Vite configuration
├── LICENSE                         # Project license
└── README.md                       # Project documentation
```

## 🏃‍♂️ Build & Run Commands

### Development

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Production

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run build
npm run preview
```

### Additional Commands

**Linting:**
```bash
cd frontend
npm run lint
```

**Preview Build:**
```bash
cd frontend
npm run preview
```

## 🔧 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/chatgpt-clone
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatgpt-clone

OPENAI_API_KEY=your_openai_api_key_here
```

### Frontend
No environment variables required for frontend (API calls use hardcoded localhost URL).

> **⚠️ TODO: Update API URL in production**


## 👨‍💻 Author

**Shahmeer Faisal**

- GitHub: [bsce24032](https://github.com/bsce24032)
- LinkedIn: [@your-linkedin](https://www.linkedin.com/in/muhammad-shahmeer-faisal-348519355/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note**: This is a personal project created for educational purposes. It's not affiliated with OpenAI or ChatGPT. 
