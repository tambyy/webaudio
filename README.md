# Webaudio Project

This is a full-stack web application built using **Next.js** and **Prisma** ORM.

## 🚀 Features

- **Next.js** with App Router
- **Prisma ORM** for database access
- **MySQL** as database
- **API Routes** with Next.js
- **TypeScript**

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Tanstack react-query, Zustand
- **Backend:** API Routes, Prisma (ORM), Multer (File upload)
- **Database:** MySQL

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git https://github.com/tambyy/webaudio.git
cd webaudio
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Setup Environment Variables

Copy the `.env.example` file from the root,
rename it to `.env`
And change the following variables to match your environment:

```env
# Change the database infos
DATABASE_URL="mysql://my_user:my_password@localhost:3307/my_database_name?schema=public"

# Create and get an API Key
# from https://imagepig.com/account/settings/
# used to generate playlists cover using AI
NEXT_PUBLIC_NEXT_IMAGEPIG_API_KEY=
```

> Modify the `DATABASE_URL` based on your database provider (MySQL).

---

## 📜 Prisma Setup

### 4️⃣ Initialize Prisma

```sh
npx prisma init
```

### 5️⃣ Migrate Database

```sh
npx prisma migrate dev --name init
```

### 6️⃣ Generate Prisma Client

```sh
npx prisma generate
```

---

## 🚀 Run the Project

### 7️⃣ Start the Development Server

```sh
npm run dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```
📦 your-repo
├── 📁 prisma         # Prisma schema & migrations
├── 📁 public         # Public files
    ├── 📁 covers     # Playlists covers files
    ├── 📁 songs      # Songs files
├── 📁 src            # Project source code
    ├── 📁 app        #
    ├── 📁 components # Common components
    ├── 📁 constants  # Constant variables for test
    ├── 📁 hooks      # React hooks
    ├── 📁 pages      # Next js routes
        ├── 📁 api    # Next js api routes
    ├── 📁 stores     # Zustand store
    ├── 📁 types      # Variable types
├── 📄 .env           # Environment variables
├── 📄 next.config.js # Next.js configuration
├── 📄 package.json   # Dependencies
└── 📄 README.md      # Documentation
```

---

## 🔧 Useful Commands

| Command                              | Description                  |
| ------------------------------------ | ---------------------------- |
| `npm run dev`                        | Run development server       |
| `npm run build`                      | Build the app for production |
| `npm start`                          | Start production server      |
| `npx prisma migrate dev --name init` | Run Prisma migrations        |

---

### ✨ **Thanks 🚀**
