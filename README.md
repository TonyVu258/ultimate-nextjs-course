# DevFlow  
 <div>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />
    <img src="https://img.shields.io/badge/-ShadCN_UI-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=000000" alt="shadcnui" />
    <img src="https://img.shields.io/badge/-Open_AI-black?style=for-the-badge&logoColor=white&logo=openai&color=412991" alt="openai" />
  </div>

A full-stack Q&A platform inspired by StackOverflow, built with Next.js 15 and enhanced with real-time features and secure authentication.

---

## 📋 Table of Contents  
- [🤖 Introduction](#introduction)  
- [⚙️ Tech Stack](#tech-stack)  
- [🔋 Features](#features)  
- [🤸 Quick Start](#quick-start)  
- [📚 About](#about)  

---

## 🤖 <a name="introduction">Introduction</a>
*DevFlow* is a modern, community-driven Q&A platform built from scratch to showcase my skills in Next.js 15 and ReactJS. Inspired by StackOverflow, it lets users ask questions, post answers, and authenticate securely with OAuth. Leveraging Next.js Server Components for optimized server-side rendering and TailwindCSS for sleek styling, this project demonstrates my ability to deliver fast, responsive, and user-friendly web applications.  

Perfect for developers looking to explore a full-stack Next.js project—or for recruiters seeking a candidate with hands-on frontend expertise!

---

## <a name="tech-stack">⚙️ Tech Stack</a>
- **Frontend**: Next.js 15, ReactJS, TailwindCSS, ShadCN UI, TypeScript, React Hook Form 
- **Backend**: OAuth, Zod, MongoDB, OpenAI, NextAuth  
- **Tools**: Git, npm 

---

##  <a name="features">🔋 Features</a>
👉 **Authentication**: Secure sign-in with NextAuth, supporting Email/Password, Google, and GitHub.

👉 **Home Page**: Displays questions with filters, search, and pagination for easy navigation.

👉 **Recommendations**: Personalized suggestions on the home page.

👉 **Complex Layout**: Organized layout with popular questions and tags in view.

👉 **Question Details**: View questions with rich content, including images and code blocks.

👉 **Voting**: Upvote/downvote on questions to highlight helpful content.

👉 **View Counter**: Tracks the number of views for each question.

👉 **Bookmarking**: Save questions for quick access later.

👉 **Answer Posting**: MDX editor with light/dark modes for submitting answers.

👉 **AI Answer Generation**: Get AI-generated responses to questions.

👉 **Answer Filtering**: Sort answers by newest or most-voted, with pagination.

👉 **Answer Voting**: Upvote/downvote answers to rank quality responses.

👉 **Collections**: Organized saved questions with filters, search, and pagination.

👉 **Community**: Browse all users with search, filters, and pagination.

👉 **Profile**: View user info, badges, and engagement history with pagination.

👉 **Job Finder**: Discover jobs with filters and search, tailored to the user’s location.

👉 **Tags Page**: List of all tags with question counts, filters, and pagination.

👉 **Tag Details**: View questions by tag with search and pagination.

👉 **Ask a Question**: Simple interface for posting new questions.

👉 **Edit & Delete**: Update or remove questions and answers with validation and authorization.

👉 **Global Search**: Find content across questions, users, tags, and more.

👉 **Responsive Design**: Fully optimized for a seamless experience on desktops, tablets, and mobile devices.

👉 **High Performance**: Fast loading and smooth interactions for an efficient user experience.

and many more, including code architecture and reusability

---

##  <a name="quick-start">🤸 Quick Start</a>
Follow these steps to run *DevFlow* locally.

### Prerequisites  
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Cloning the Repository  
```bash  
git clone https://github.com/TonyVu258/ultimate-nextjs-course
cd devflow  
```

### Installation

Install the project dependencies using npm:

```bash
npm install
```

### Set Up Environment Variables

Create a new file named `.env` in the root of your project and add the following content:
```env
# Mongodb
MONGODB_URI=

# OpenAI
OPENAI_API_KEY=

# Auth
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_SECRET=
NEXTAUTH_URL=
```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up on the respective websites

### Running the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

##  <a name="about">📚 About Me</a>
This project was built as part of the Ultimate Next.js 15 Course by JavaScript Mastery, completed in March 2025. I’m Tony Vu, a Frontend Developer with 3+ years in PHP/JS and a passion for ReactJS/NextJS. Check my CV or connect with me at thienvu258.it@gmail.com for collaboration or opportunities!
