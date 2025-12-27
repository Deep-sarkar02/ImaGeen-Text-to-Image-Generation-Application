# 🎨 ImaGeen - AI Text-to-Image Generation Application

ImaGeen is a powerful, full-stack AI image generation platform that allows users to transform their imagination into stunning visual art in seconds. Simply type a prompt, and watch the magic happen!

---

## 🌟 Key Features

*   **AI Image Generation**: Powered by advanced AI (ClipDrop API) to create high-quality, unique images from text descriptions.
*   **User Authentication**: Secure Login and Account Creation system using JWT.
*   **Credit System**: Users have a credit balance that is deducted for each image generated.
*   **Secure Payments**: Integrated with **Razorpay** for seamless credit purchase.
*   **Responsive UI**: Optimized for all devices (Mobile, Tablet, Desktop) using Tailwind CSS.
*   **Smooth Animations**: Enhanced user experience with Framer Motion animations.
*   **Download & Share**: Instantly download your creations or share them.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**: Library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for modern styling.
- **Framer Motion**: For fluid and interactive animations.
- **Axios**: For making API requests to the backend.
- **React Toastify**: For beautiful notification alerts.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Backend web framework.
- **MongoDB**: NoSQL database for storing user and transaction data.
- **Mongoose**: ODM for MongoDB.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Bcrypt**: For hashing passwords.

### APIs
- **ClipDrop API**: For high-quality AI image generation.
- **Razorpay API**: For handling financial transactions.

---

## 🚀 Getting Started

Follow these steps to get a local copy of the project up and running.

### Prerequisites

*   **Node.js** (v16.0.0 or higher)
*   **npm** or **yarn**
*   **MongoDB Atlas** account (or local MongoDB)

### Installation Guide

#### 1. Clone the Repository
```bash
git clone https://github.com/Deep-sarkar02/ImaGeen-Text-to-Image-Generation-Application.git
cd ImaGeen-Text-to-Image-Generation-Application
```

#### 2. Set up the Server (Backend)
```bash
cd Server
npm install
```

#### 3. Set up the Client (Frontend)
```bash
cd ../client
npm install
```

---

## ⚙️ Environment Configuration

You need to create `.env` files in both the `Server` and `client` directories.

### Backend (.env in /Server)
Create a file named `.env` in the `Server` folder and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
CLIPDROP_API=your_clipdrop_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
```

### Frontend (.env in /client)
Create a file named `.env` in the `client` folder and add:
```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## 🏃 How to Run

### Start the Server
```bash
# In the /Server directory
npm run server
```

### Start the Client
```bash
# In the /client directory
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```text
ImaGeen/
├── client/              # React Frontend
│   ├── src/
│   │   ├── assets/      # Images and SVG icons
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # AppContext for global state
│   │   ├── pages/       # Main pages (Home, BuyCredit, Results)
│   │   └── main.jsx     # Entry point
├── Server/              # Node.js Backend
│   ├── Controllers/     # API logic
│   ├── models/          # Mongoose schemas (User, Transaction)
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth and Error handling
│   └── server.js        # Server entry point
└── .gitignore           # Root git ignore
```

---

## 📜 License
Distributed under the ISC License.

## 🙌 Acknowledgements
*   [ClipDrop](https://clipdrop.co/) for the amazing AI Image API.
*   [Razorpay](https://razorpay.com/) for the payment gateway.
*   [Tailwind CSS](https://tailwindcss.com/) for the styling.

---

Developed with ❤️ by **Deep Sarkar**
