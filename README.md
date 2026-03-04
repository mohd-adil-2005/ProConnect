<p align="center">
  <img src="https://img.shields.io/badge/Pro%20Connect-Professional%20Network-1d9bf0?style=for-the-badge&logo=linkedin&logoColor=white" alt="Pro Connect" />
</p>

<h1 align="center">Pro Connect</h1>
<p align="center">
  <strong>A modern professional networking platform — connect, share, and grow.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-1.9-764abc?style=flat-square&logo=redux" alt="Redux" />
  <img src="https://img.shields.io/badge/Node.js-18-339933?style=flat-square&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-6-47a248?style=flat-square&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-8-880000?style=flat-square" alt="Mongoose" />
  <img src="https://img.shields.io/badge/Axios-1.6-5a29e4?style=flat-square&logo=axios" alt="Axios" />
  <img src="https://img.shields.io/badge/CSS_Modules-Styling-1572b6?style=flat-square&logo=css3" alt="CSS" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/✅_Verified_Badges-Blue%20Tick-1d9bf0?style=flat-square" alt="Verified" />
  <img src="https://img.shields.io/badge/📱_Responsive-Web%20%26%20Mobile-34a853?style=flat-square" alt="Responsive" />
  <img src="https://img.shields.io/badge/🔐_Auth-JWT%20%2B%20bcrypt-ea4335?style=flat-square" alt="Auth" />
  <img src="https://img.shields.io/badge/📄_Feed-Posts%20%26%20Comments-4285f4?style=flat-square" alt="Feed" />
  <img src="https://img.shields.io/badge/🤝_Connections-Requests%20%26%20Network-fbbc04?style=flat-square" alt="Connections" />
</p>

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| **👤 Profiles & verification** | Create and edit your profile with experience and education. **Verified users** get a blue tick badge (Instagram/X style) next to their name across the feed, comments, discover, and Top profiles. |
| **📝 Feed & engagement** | Create posts, like, and comment. New comments appear at the **top**. Format large numbers (e.g. 3.2M likes). |
| **🔍 Discover** | Search and browse all profiles. Click avatars to open profiles. |
| **🤝 Connections** | Send and accept connection requests; manage your network. |
| **🖼️ Avatars** | Profile pictures with first+last initial fallback when no image is set. |
| **📱 Responsive** | Desktop and mobile layouts with a bottom nav on small screens. |

---

## 🖼️ Screenshots

Place your app screenshots in the `screenshots/` folder, then reference them below. Suggested names: `dashboard.png`, `discover.png`, `profile.png`, `view-profile.png`.

### Home / Dashboard
Main feed with posts, likes, comments, and the **Top profiles** sidebar (verified users only, with blue tick).

![Dashboard](screenshots/dashboard.png)

### Discover
Browse and search profiles. Verified users show the blue badge.

![Discover](screenshots/discover.png)

### Profile (own)
Your profile with experience, education, and verified badge if applicable.

![Profile](screenshots/profile.png)

### View profile (other user)
Another user’s profile with banner, avatar, bio, and verified badge.

![View profile](screenshots/view-profile.png)

---

## 🛠️ Tech stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | Next.js, React, Redux Toolkit, Axios, CSS Modules |
| **Backend** | Node.js, Express, MongoDB, Mongoose |
| **Auth** | JWT-style token, bcrypt for passwords |
| **Media** | Local `uploads/` or Cloudinary (configurable) |

---

## 📂 Project structure

```
ProConnect/
├── frontend/                 # Next.js app
│   ├── src/
│   │   ├── Component/        # Avatar, VerifiedBadge, Navbar
│   │   ├── config/           # API base URL, Redux
│   │   ├── layout/           # UserLayout, DashboardLayout (Top profiles)
│   │   └── pages/            # dashboard, discover, profile, view_profile, my_connections
│   └── package.json
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── routes/
│   ├── scripts/
│   │   └── seedData.js       # Seed users (incl. verified), posts, comments
│   ├── uploads/              # Static profile/post images (e.g. kimjongun.png)
│   ├── .env
│   └── server.js
├── screenshots/              # Add dashboard, discover, profile screenshots here
└── README.md
```

---

## 🚀 Getting started

### Prerequisites

- **Node.js** (v18+)
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **npm** or yarn

### 1. Clone and install

```bash
git clone https://github.com/mohd-adil-2005/Pro-Connect.git
cd Pro-Connect/ProConnect
```

### 2. Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=8080
MONGO_URL=your_mongodb_connection_string
```

Optional: add Kim Jong Un’s profile image as `backend/uploads/kimjongun.png`. The seed uses this filename for his profile picture.

Start server:

```bash
npm run prod
# or: node server.js
```

Server runs at **http://localhost:8080**.

### 3. Seed data (optional)

Creates users (including verified: Trump, Putin, Kim Jong Un, Modi), profiles, posts, and comments.

```bash
npm run seed
```

Login with any seed user (password: `SeedPass123!`), e.g.:

- `seed.donaldtrump@example.com`
- `seed.kimjongun@example.com`
- `seed.narendramodi@example.com`

### 4. Frontend

From the `ProConnect` root:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**. In development, the app uses the local backend when the hostname is `localhost`.

---

## 📋 API overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register |
| POST | `/login` | Login |
| GET | `/user/get_allusers` | All users (for discover) |
| POST | `/update_profile` | Upload profile picture |
| POST | `/user_update` | Update profile text |
| POST | `/user/send_connection_request` | Send connection request |
| POST | `/user/accept_connection_request` | Accept request |
| GET | `/user/get_connection_request` | Pending requests |
| POST | `/post` | Create post |
| GET | `/posts` | Feed (all posts) |
| DELETE | `/destroy_post` | Delete own post |
| POST | `/comment_post` | Add comment |
| GET | `/get_comments` | Comments for a post (newest first) |
| POST | `/destroy_comment` | Delete comment |
| POST | `/increment_likes` | Like a post |

---

## 👤 Author

**Mohd Adil**

<p align="center">
  <img src="https://img.shields.io/badge/Made_with_❤️-Pro_Connect-1d9bf0?style=for-the-badge" alt="Pro Connect" />
</p>
