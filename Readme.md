📝 Blog Application

A full-stack MERN Blog Platform built with modern web technologies. This application enables users to create, upload, and explore blogs with images, providing a smooth content-sharing experience. Integrated with AI-driven enhancements for smarter content handling and optimized workflows, this project not only showcases strong software engineering but also reflects adaptability in prompt engineering and AI integration.

🚀 Features

✍️ Blog Creation: Add blogs with rich content, category, and cover images.

🖼 Image Upload & Storage: Secure image handling with Multer and Express.

📚 Blog Management: Blogs sorted by latest to oldest for better readability.

🔍 Smart Search & Filtering: Easily find relevant content.

🧠 AI-Powered Touch: AI-assisted design thinking and content structuring during development.

🔐 Authentication System: Secure signup & login with password hashing (bcrypt).

⚡ Scalable Architecture: Built on RESTful APIs and ready for deployment.

🛠️ Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ORM)

Authentication: Bcrypt.js

File Uploads: Multer (image storage & retrieval)

AI / Prompt Engineering: AI-assisted feature building, workflow optimization, and intelligent structuring

📂 Project Structure
Blog_App/
├── client/             # React frontend
├── server/             # Express backend
│   ├── auth-controller # Authentication & Blog controllers
│   ├── auth-middleware # Multer & Middleware
│   ├── models/         # MongoDB Schemas
│   └── routes/         # API Routes
└── README.md

⚙️ Installation & Setup

Clone the repository

git clone https://github.com/Rudraksh026/Blog_App.git
cd Blog_App


Install dependencies

npm install
cd client && npm install


Start the development server

# Run backend
npm run dev

# Run frontend (inside client folder)
npm start

🌐 Future Enhancements

AI-powered content suggestions for blogs

Rich text editor with Markdown support

JWT-based authentication

Cloud storage integration (AWS S3 / Cloudinary)

👨‍💻 Author

Developed by Rudraksh, with AI-assisted development in designing workflows, structuring code, and enhancing features — reflecting skills in MERN stack development and prompt engineering.