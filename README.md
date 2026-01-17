# Pro-Connect


A full-stack web application that replicates the core functionalities of LinkedIn. This project allows users to create professional profiles, connect with others, create posts, and engage with content in a shared feed.

✨ Features
👤 User Authentication & Profiles: Secure user registration and login. Users can create, view, and update their professional profiles, including uploading a profile picture and downloading their profile as a PDF.

🤝 Professional Networking: Users can search for others, send connection requests, and accept incoming requests to build their professional network.

📝 Content Feed & Engagement: Create and share posts with media (images). Engage with content from others by liking and commenting on posts.

☁️ Cloud Media Storage: Utilizes Cloudinary for efficient storage and delivery of user-uploaded media like profile pictures and post images.

🛠️ Tech Stack
This project is a monorepo containing a separate frontend and backend.

Frontend (my-next-app):

Framework: Next.js

UI Library: React

State Management: Redux Toolkit

Styling: CSS

HTTP Client: Axios

Backend:

Runtime: Node.js

Framework: Express.js

Database: MongoDB with Mongoose

Authentication: bcrypt for password hashing

File Uploads: Multer & Local Storage

📂 Project Structure
The repository is organized into two main directories:

ProConnect/
├── backend/               # Node.js & Express.js server
│   ├── Controllers/
│   ├── Models/
│   ├── routes/
│   ├── uploads/
│   ├── .env               # Environment variables for backend
│   └── server.js          # Server entry point
│
└── my-next-app/           # Next.js frontend application
    ├── public/
    ├── src/
    ├── .env.local         # Environment variables for frontend
    └── package.json

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v18 or later)

npm or yarn

MongoDB (local instance or a cloud service like MongoDB Atlas)

Installation & Setup
Clone the repository:

git clone [https://github.com/mohd-adil-2005/ProConnect]
cd linkedinclone

Setup the Backend:

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file in the backend directory and add the following variables. Replace the placeholder values with your actual credentials.

PORT=5000
MONGO_URI=your_mongodb_connection_string

Start the backend server:

npm run prod

The server will be running on http://localhost:5000.

Setup the Frontend:

Navigate to the frontend directory from the root folder:

cd my-next-app

Install dependencies:

npm install

Create a .env.local file in the my-next-app directory and add the API base URL:

NEXT_PUBLIC_API_URL=http://localhost:5000

Start the frontend development server:

npm run dev

Open http://localhost:3000 in your browser to see the application.

📋 API Endpoints
The backend provides the following RESTful API endpoints:

User & Authentication Routes
Method

Endpoint

Description

POST

/register

Register a new user.

POST

/login

Log in an existing user.

GET

/user/get_allusers

Get a list of all users.

POST

/update_profile

Upload a user's profile picture.

POST

/user_update

Update user profile text data.

GET

/user/user_profile_download

Download user profile as a PDF.

POST

/user/send_connection_request

Send a connection request to another user.

POST

/user/accept_connection_request

Accept an incoming connection request.

GET

/user/get_connection_request

Get pending connection requests for a user.

Posts & Engagement Routes
Method

Endpoint

Description

POST

/post

Create a new post (with media).

GET

/posts

Get all posts for the feed.

DELETE

/destroy_post

Delete a user's own post.

POST

/comment_post

Add a comment to a post.

GET

/get_comments

Get all comments for a specific post.

POST

/destroy_comment

Delete a comment.

POST

/increment_likes

Increment the like count for a post.

✒️ Author
Mohd Adil
