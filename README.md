<h1 align="center"> Ritika Joshi's Portfolio </h1>  
<p align="center"> A minimal, responsive portfolio built with <b>React</b>, <b>Tailwind CSS</b>, and <b>Framer Motion</b>, designed to reflect my work, design philosophy, and projects.</p>

<p align="center">
  <b>Web Demo</b><br/>
  <img src="./public/portfolio-web-demo.gif" width="700" alt="Portfolio web demo" />
  <br/><br/>
  <b>Mobile Demo</b><br/>
  <img src="./public/portfolio-mobile-demo.gif" width="250" alt="Portfolio mobile demo" />
</p>


 ## Tech Stack  

| Category | Tools |
|-----------|-------|
| Frontend | React, Vite, Tailwind CSS |
| Animations | Framer Motion |
| Deployment | GitHub Pages |
| Icons | React Icons |
| Theme | Light/Dark Mode toggle with localStorage |



## Setup  

1. **Clone the repository**
```bash
   git clone https://github.com/RJoshi141/portfolio-v2.git
   cd portfolio-v2
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start the development server**
```bash
   npm run dev
```

4. **Build for production**
```bash
   npm run build
```

5. **Deploy to GitHub Pages**
```bash
   npm run deploy
```

## AI Assistant Chat Widget

The portfolio includes an AI Assistant chat widget that allows visitors to ask questions about Ritika's skills, experience, and projects. The widget uses OpenAI's API to generate responses.

### Setup

1. **Install backend dependencies**
```bash
   cd server
   npm install
```

2. **Set up OpenAI API Key**
   - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a `.env` file in the `server` directory:
   ```bash
   cd server
   cp .env.example .env
   ```
   - Edit `.env` and add your API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   ```

3. **Start the backend server**
```bash
   cd server
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

4. **Configure frontend API URL (optional)**
   - By default, the frontend expects the backend at `http://localhost:3001`
   - To use a different URL, create a `.env` file in the root directory:
   ```
   VITE_API_URL=http://localhost:3001
   ```

5. **Start the frontend**
```bash
   # From the root directory
   npm run dev
   ```

### Customizing Your Profile Context

To update the information the AI assistant knows about you, edit the `RITIKA_PROFILE_CONTEXT` constant in `server/index.js`. This should include:
- Your current role and responsibilities
- Previous work experience
- Tech stack and skills
- Notable projects
- Education and interests

The assistant will use this context to answer questions about your background and work.