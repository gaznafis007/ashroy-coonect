# Ashroy Connect

Ashroy Connect is a non-profit organization platform designed to bring communities together through volunteering, donations, and awareness. The platform enables users to contribute through blogs, participate in events, and manage organizational tasks with an intuitive dashboard.

## 🌟 Features

- 🏡 **Dynamic Home Page** – Showcasing recent events, impact metrics, and calls to action.
- 📝 **Blog System** – Users can write, read, and comment on blogs.
- 🔐 **Authentication** – Secure login/signup with **NextAuth**.
- 🎭 **Animated UI** – Powered by **Framer Motion** for smooth interactions.
- 🎨 **Modern UI Design** – Built with **Tailwind CSS** and **ShadCN**.
- 🛠 **Role-Based Dashboard** – Separate panels for Admins, Volunteers, and Sponsors.
- 📊 **MongoDB Database** – Storing dynamic content efficiently.
- 📩 **Contact & Support** – Users can reach out for help or inquiries.

---

## 🏗 Tech Stack

- **Frontend:** Next.js, Tailwind CSS, Framer Motion, React Hook Form, ShadCN
- **Backend:** Next.js API Routes
- **Database:** MongoDB
- **Authentication:** NextAuth.js
- **Hosting:** Vercel

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** and **MongoDB** installed on your system.

```bash
# Clone the repository
git clone https://github.com/gaznafis007/ashroy-coonect.git
cd ashroy-coonect
```

### Installation

```bash
# Install dependencies
yarn install
```

### Environment Setup
Create a `.env.local` file in the root directory and configure the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Running the Development Server

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```bash
ashroy-coonect/
│-- components/   # Reusable React components
│-- src/app/        # Next.js Pages (Routes)
│-- components/ui/  # Shadcn components
│-- utils/        # Utility functions
│-- public/       # Static assets
│-- .env.local    # Environment variables
│-- next.config.js # Next.js config file
│-- tailwind.config.js # Tailwind CSS config
```

---

## 🎯 Roadmap

- [ ] Implement real-time chat for volunteers & admins
- [ ] Add donation tracking system
- [ ] Enhance accessibility & SEO improvements
- [ ] Introduce event RSVP feature

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

```bash
# Create a new branch
git checkout -b feature-branch

# Commit changes
git commit -m "Add new feature"

# Push to GitHub
git push origin feature-branch
```

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📞 Contact

Developed by **Gazi Nafis Md Abdullah**  
GitHub: [gaznafis007](https://github.com/gaznafis007)  
Website: [ashroy-coonect.vercel.app](https://ashroy-coonect.vercel.app/)
