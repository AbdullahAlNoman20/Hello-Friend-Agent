
# Hello Friend - Intelligent AI Assistant

📌 **Project Description**

**Hello Friend AI Agent** is a full-stack intelligent assistant platform built to merge AI-powered interactions with dynamic product discovery. This web app combines smart UI/UX design with powerful backend features including MongoDB integration, user roles, and product recommendation engines.

> "Your Friendly AI-Powered Product Assistant."

---

## ✅ Features

### 🤖 Conversational AI Chatbot

- Interactive floating chat window.
- Currently under development ("System under maintenance" message placeholder).
- Future: Natural language understanding using LLMs (e.g., OpenAI, Gemini).

### 🔍 Magnetic Product Search Engine

- Hashtag-based live search suggestions.
- Auto-debounced search execution.
- Intelligent product display with image fallback and hashtags.
- Product details modal with all product metadata.

### 🛒 Product Recommendation Section

- Displays smart recommendations on homepage.
- Individual product cards with hover effect and modal view.

⚙️ Technology Stack (Current Implementation):
Frontend: React.js with Tailwind CSS and DaisyUI

Routing: React Router

State Management: Basic React state (optional enhancements pending)

Authentication & Backend: Under development or mock setup (based on implementation progress)

This version sets the foundation for a more intelligent, AI-assisted user platform. Future updates will include full conversational AI support, advanced recommendations, and user behavior analysis.

---

## 🚀 Features
- 🤖 Conversational AI Assistant
- 🛍️ Product Recommendation System
- 🧲 Magnetic Search Engine
- 🔐 Firebase Authentication
- 🌐 Real-time Chat Interface
- 📊 MongoDB-powered Data Management
- ⚙️ Admin & User Dashboard (optional)

---

## 🛠️ Tech Stack
**Frontend:**
- React
- React Router
- React Typewriter
- React Icons
- Tailwind CSS
- DaisyUI
- Vite

**Backend & Tools:**
- Node.js
- Express.js
- MongoDB
- Firebase Auth
- Next.js (optional routing & SSR/SEO support)
- Other tools: dotenv, axios, etc.

---

## 📁 Project Structure
```
Hello-Friend/
├── client/            # Frontend (React + Vite + Tailwind + DaisyUI)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
├── server/            # Backend (Node.js + Express + MongoDB)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
├── .env
├── README.md
└── package.json
```

---

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AbdullahAlNoman20/Hello-Friend-Agent
cd hello-friend-Agent
```

### 2. Setup Client (Frontend)
```bash
cd client
npm install
npm run dev
```

### 3. Setup Server (Backend)
```bash
cd server
npm install
node server.js
```

### 4. Firebase Setup
- Create Firebase Project.
- Enable Email/Password Authentication.
- Copy config into `client/src/firebase.config.js`

### 5. MongoDB Setup
- Use MongoDB Atlas or local MongoDB.
- Save URI in `.env` file:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hello-friend
```

### 6. Environment Variables (`.env`)
```
PORT=5000
MONGODB_URI=your-mongodb-uri
FIREBASE_API_KEY=your-firebase-api-key
```

---

## 🧠 How It Works

1. **User Authentication:**
   - Firebase handles registration/login.
2. **Chat Interaction:**
   - The AI agent uses pre-trained intent classification and keyword matching (or LLM APIs).
3. **Product Recommendation:**
   - Based on user queries, preferences, and chat history.
4. **Magnetic Search Engine:**
   - Indexes product metadata and recommends with fuzzy matching.
5. **Admin Controls (Optional):**
   - Product uploads, intent training, etc.

---

## 📸 Screenshots
> **Add your screenshots inside `/screenshots` folder and reference them below:**

### 🖥️ Homepage
![Homepage](src/assets/Home%20Page.jpg)

### 💬 Chat Interface
![Chat](src/assets/ChatBot.png)

### 🔍 Product Search
![Search](src/assets/Search.png)

---

## 📦 Deployment

You can deploy the frontend using **Vercel** or **Netlify** and backend on **Render**, **Railway**, or **Heroku**.

### Example Vercel (Frontend):
1. Connect GitHub repo to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`

### Example Render (Backend):
1. New Web Service
2. Select backend folder
3. Build command: `npm install`
4. Start command: `node server.js`

---

## 📚 Future Improvements
- Integrate OpenAI/Gemini/Claude API for better responses
- Add voice chat
- Integrate payment system
- Real-time socket-based chat (using Socket.io)

---

## 📄 License
This project is licensed under the MIT License.

---

## 🙌 Acknowledgments
Thanks to all the open-source packages and tools that made this project possible.

---

## 👤 Author / Developer Info

**Abdullah Al Noman**🎓 Data Scientist | Web Developer | AI Enthusiast📍 Khulna, Bangladesh

🔗 [LinkedIn](https://www.linkedin.com/in/abdullah-al-noman-khu/)💻 [GitHub](https://github.com/AbdullahAlNoman20)🌐 Portfolio (Coming Soon)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgments

- React & Tailwind Team
- Firebase & MongoDB for free tiers
- All open-source contributors
- ChatGPT for design and development guidance

---

> Happy Coding & Stay Friendly with "Hello Friend" 🤝
