# Modern Todo List Application

A full-stack todo list application with a Flask backend and a modern, responsive frontend.

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Filter todos (All, Active, Completed)
- Clear completed todos
- Persistent storage with database
- Modern and responsive UI

## Tech Stack

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Font Awesome icons
- Backend:
  - Python
  - Flask
  - SQLAlchemy
  - PostgreSQL (production) / SQLite (development)

## Deployment Instructions

### Backend Deployment (Railway.app)

1. Create a Railway account at https://railway.app
2. Install Railway CLI and login:
   ```bash
   npm i -g @railway/cli
   railway login
   ```
3. Create a new project:
   ```bash
   railway init
   ```
4. Add PostgreSQL:
   ```bash
   railway add postgresql
   ```
5. Deploy the application:
   ```bash
   railway up
   ```

### Frontend Deployment (Netlify)

1. Create a Netlify account at https://www.netlify.com
2. Install Netlify CLI:
   ```bash
   npm install netlify-cli -g
   ```
3. Login to Netlify:
   ```bash
   netlify login
   ```
4. Deploy the frontend:
   ```bash
   netlify deploy
   ```

## Environment Variables

Make sure to set these environment variables in your deployment platform:

- `DATABASE_URL`: Your PostgreSQL database URL
- `PORT`: Port number (optional, defaults to 5000)

## Local Development

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the application:
   ```bash
   python app.py
   ```

3. Visit http://localhost:5000 in your browser

## API Endpoints

- GET `/api/todos`: Get all todos
- POST `/api/todos`: Create a new todo
- PUT `/api/todos/<id>`: Update a todo
- DELETE `/api/todos/<id>`: Delete a todo
- DELETE `/api/todos/clear-completed`: Clear completed todos
