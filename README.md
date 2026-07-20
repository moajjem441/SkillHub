# 🎓 SkillHub – Production-Grade EdTech Platform

> **Built with ❤️ by [Moajjem Hossain](https://github.com/moajjem)**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.0-6C63FF?style=flat)](https://better-auth.com/)
[![Stripe](https://img.shields.io/badge/Stripe-API-635BFF?style=flat&logo=stripe)](https://stripe.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=flat&logo=render)](https://render.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **A full-stack learning platform with AI-powered content generation, personalized recommendations, and secure payment processing.**

---

## 🚀 Live Demo

## 🚀 Live Demo

- **Frontend:** [https://skillhub-ivory.vercel.app](https://skillhub-ivory.vercel.app)
- **Backend API:** [https://skillhub-server-beryl.vercel.app](https://skillhub-server-beryl.vercel.app)

> **Test Credentials:**
> - Email: `test@example.com`
> - Password: `password123`
> - **Or** – Sign in with Google

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 Overview

**SkillHub** is a modern, production-ready EdTech platform designed and developed by **Moajjem Hossain** to help developers and engineers master technical skills through structured, AI-enhanced courses. Built with Next.js 16, TypeScript, and MongoDB, it offers a seamless learning experience with personalized recommendations, AI-generated course content, and secure payment processing.

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- **Better Auth** integration with email/password login
- **Google OAuth** – Sign in / Sign up with Google account
- **Role-based Access Control** (User / Admin)
- **JWT Session Management** with secure cookie handling
- **Protected Routes** – only authenticated users can access restricted pages

### 🧠 AI-Powered Features
- **AI Content Generator** – Create course descriptions, duration, lessons, and pricing automatically using Groq AI
- **AI Smart Recommendation Engine** – Personalized course recommendations based on user viewing history and preferences

### 📚 Course Management
- **Course Catalog** – Filter, search, and sort courses by category, price, and rating
- **Course Details** – Rich overview with gallery, curriculum, instructor info, and features
- **Course Enrollment** – Secure enrollment via Stripe Checkout
- **My Courses** – View all enrolled courses with progress status

### 💳 Payment Integration
- **Stripe Checkout** – Seamless payment processing
- **Webhook Support** – Automatic enrollment upon successful payment
- **Test Mode** – Use Stripe test cards for development

  ### 📧 Contact & Communication
- **Contact Form** – Users can send messages directly to the admin via the `/contact` page
- **Nodemailer Integration** – Sends emails using Gmail SMTP (or any SMTP provider)
- **HTML Email Templates** – Beautifully formatted emails with user details (name, email, message)
- **Toast Notifications** – Real-time feedback on form submission (success/error)

### 🎨 Premium UI/UX
- **Dark Glassmorphic Design** – Modern, premium dark theme with glass effects
- **Fully Responsive** – Optimized for mobile, tablet, and desktop
- **Interactive Animations** – Smooth transitions, hover effects, and micro-interactions
- **Toast Notifications** – User-friendly feedback using `react-hot-toast`

### 🛡️ Security
- **Better Auth** with admin role
- **JWT Token Verification** with `verifyToken` middleware
- **CORS Configuration** for secure cross-origin requests
- **Environment Variables** – All sensitive data stored securely

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
| :--- | :--- |
| **Next.js 16** (App Router) | React framework with server components |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **HeroUI** | UI component library |
| **Framer Motion** | Smooth animations |
| **React Hook Form + Zod** | Form handling & validation |
| **Better Auth** (Client) | Authentication & session management |
| **Stripe JS** | Payment processing |
| **React Hot Toast** | User notifications |

### Backend
| Technology | Purpose |
| :--- | :--- |
| **Express.js** | REST API framework |
| **MongoDB** (Atlas) | NoSQL database |
| **Mongoose / Native Driver** | Database connectivity |
| **Better Auth** (Server) | Authentication & session handling |
| **JWT** | Token-based authentication |
| **Nodemailer** | Email sending (Contact Form) |
| **Groq AI SDK** | AI content generation & recommendations |
| **Stripe SDK** | Payment processing |
| **Better Auth** (Client) | Authentication & session management (Email + Google OAuth) |

---

## 📁 Project Structure
skillhub/
├── app/ # Next.js App Router
│ ├── (auth)/ # Auth pages (login, register)
│ ├── (dashboard)/ # Protected pages (my-courses, dashboard)
│ ├── admin/ # Admin pages (add-course, manage-courses)
│ ├── api/ # API routes
│ │ ├── ai/ # AI endpoints
│ │ ├── auth/ # Better Auth endpoints
│ │ ├── checkout_sessions/ # Stripe checkout
│ │ 
│ ├── courses/ # Course listing
│ ├── courseDetails/ # Course details page
│ └── ...
├── components/ # Reusable React components
│ ├── AddCourseForm.tsx
│ ├── Navbar.tsx
│ ├── Footer.tsx
│ ├── CourseCard.tsx
│ ├── ViewCourse.tsx
│ └── ...
├── lib/ # Utility functions & configurations
│ ├── auth.ts # Better Auth config
│ ├── auth-client.ts # Better Auth client
│ ├── stripe.ts # Stripe config
│ └── mongodb.ts # MongoDB connection
├── public/ # Static assets
├── styles/
├── .env.local # Frontend environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vercel.json # Vercel deployment config
└── README.md



---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Stripe account (for payments)
- Groq API key (for AI features)

---

### 🔧 Frontend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/skillhub.git
   cd skillhub

2.Install dependencies:
npm install

3.Create .env.local file:
# Better Auth
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Backend API
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

# Email (Contact Form)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# AI (Groq)
GROQ_API_KEY=your_groq_api_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

4.Run development server:
npm run dev
   

## 👨‍💻 Author

**Moajjem Hossain**
- GitHub: [@moajjem](https://github.com/moajjem)
- Email: moajjem441@gmail.com
- LinkedIn: [Moajjem Hossain](https://linkedin.com/in/moajjem)

---

## 🙏 Acknowledgments

- [Better Auth](https://better-auth.com/) – Authentication system
- [Groq](https://groq.com/) – AI API for content generation & recommendations
- [Stripe](https://stripe.com/) – Payment processing
- [Nodemailer](https://nodemailer.com/) – Email sending
- [HeroUI](https://heroui.com/) – UI components
- [Unsplash](https://unsplash.com/) – Course images

---

## 📬 Contact

For any questions, feedback, or collaboration opportunities, feel free to reach out:

- **Email:** moajjem441@gmail.com
- **GitHub:** [@moajjem](https://github.com/moajjem)

---

**Built with ❤️ by Moajjem Hossain | © 2026 SkillHub Inc. All rights reserved.**


