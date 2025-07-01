# SEA Catering 🍲

**SEA Catering** is a full-stack web application designed to provide a healthy meal catering subscription service. Users can choose from various diet plans, manage their delivery schedules, and customize their menu selections. The application also features an admin dashboard for managing users and subscriptions.

![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)

---

### Screenshot

<a href="https://ibb.co/nqhkbP7Z"><img src="https://i.ibb.co/mrQzGN91/image.png" alt="image" border="0"></a>

### Table of Contents

1.  [About the Project](#about-the-project)
2.  [Key Features](#key-features)
3.  [Tech Stack](#tech-stack)
4.  [Getting Started](#getting-started)
5.  [Environment Variables](#environment-variables)
6.  [Deployment](#deployment)

### About the Project

This project is built as an online catering service platform that allows users to subscribe to healthy meal plans. The application separates roles between regular users and an admin, where the admin has access to a dedicated dashboard to monitor business statistics and manage user data. Its architecture uses the Next.js App Router with a separation of Server and Client components for optimal performance.

### Key Features

- 🔐 **User Authentication**: Secure registration, login, and logout system using NextAuth.js (Credentials Provider).
- 🔑 **Password Reset**: A complete forgot password workflow, sending a secure reset link via email using Resend.
- 👤 **User Profile**: A profile page where users can view and manage their subscription details, as well as update their personal information.
- 👨‍💻 **Admin Dashboard**: A dedicated admin page to view key statistics (revenue, new users, etc.) and a list of all subscribers. The admin role can only be assigned directly in the database.
- 🥗 **Dynamic Menu**: An interactive food menu display with nutritional details, pricing, and a popup for item details.
- 📝 **Subscription Form**: A customization form where users can select plans, meal types, and delivery days to calculate the total monthly cost.
- 📞 **Contact Page**: A contact form integrated with an external service (Web3Forms) for message management.
- 💬 **Dynamic Testimonials**: Displays testimonials from random users fetched from the external `randomuser.me` API.
- 📱 **Responsive Design**: Designed to look great on both mobile and desktop devices using Tailwind CSS.

### Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 14.2.3
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Hashing Password:** [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- **Email Delivery:** [Resend](https://resend.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Charts:** [Recharts](https://recharts.org/)

### Getting Started

To run this project locally, follow these steps:

1.  **Clone this repository**

    ```bash
    git clone [https://github.com/ziehan/SEA_Catering.git](https://github.com/ziehan/SEA_Catering.git)
    ```

2.  **Navigate to the project directory**

    ```bash
    cd SEA_Catering/my-project
    ```

3.  **Install all dependencies**

    ```bash
    npm install
    ```

    ```bash
    npm install next react react-dom next-auth mongoose bcryptjs framer-motion lucide-react react-hot-toast recharts react-datepicker tailwind-merge @uploadcare/react-uploader
    ```

    ```bash
    npm install --save-dev typescript @types/node @types/react @types/react-dom eslint eslint-config-next tailwindcss postcss autoprefixer @types/react-datepicker
    ```

4.  **Set up Environment Variables**

    - Create a copy of the .env.example file (if it exists) or create a new file named .env.local in the my-project folder.
    - Fill this file with your secret keys. See the [Environment Variables](#environment-variables) section below for details.

5.  **Run the Development Server**

    ```bash
    npm run dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

You need to create a `.env.local` file inside the `my-project` folder and fill in the following variables:

```env
# Required for your MongoDB database connection (from MongoDB Atlas or local)
MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/database_name"

# Required for NextAuth & email links. For local development, use http://localhost:3000
NEXTAUTH_URL="http://localhost:3000"

# A secret key for NextAuth session encryption. Create a long, random string.
NEXTAUTH_SECRET="A_VERY_LONG_AND_RANDOM_SECRET_YOU_CREATE_YOURSELF"

# API key from the Resend email service for the password reset feature.
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
```

### Deployment

[SEA Catering Website Link](sea-catering-indonesia.vercel.app)

To log in as an admin, you can use the following credentials:

```bash
email: nabeehannn@gmail.com
password: admin123

```
