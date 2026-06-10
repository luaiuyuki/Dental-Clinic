<div align="center">
  <h1>🏥 Dental Clinic Management System</h1>
  <p><b>歯科医院管理システム</b></p>
  
  <!-- Tech Stack Badges -->
  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
    <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  </p>

  <p>A comprehensive, modern, and highly scalable web application for managing dental clinics efficiently.</p>
</div>

---

## 📖 Project Outline (プロジェクト概要)

This Dental Clinic Management System is designed to streamline day-to-day clinic operations. It provides a robust architecture combining a modern React/Next.js frontend with a fast, secure Node.js backend. 

### Core Objectives (目的):
- **Efficiency (効率化):** Automate patient scheduling, doctor assignments, and billing.
- **Security (セキュリティ):** Ensure data privacy with secure authentication and database management.
- **Usability (操作性):** Provide a clean, intuitive, and responsive user interface for staff and administrators.

## ✨ Features (主な機能)

- 🩺 **Doctor Management (医師管理):** Manage doctor profiles, schedules, and specializations.
- 👥 **Account Management (アカウント管理):** Role-based access control for administrators, doctors, and staff.
- 💰 **Payroll & Finance (給与・財務管理):** Automated payroll calculation, billing, and tracking.
- 📅 **Appointment Scheduling (予約管理):** Real-time booking and scheduling system.
- 📊 **Dashboard & Analytics (分析ダッシュボード):** Comprehensive insights into clinic operations.

## 💻 Technology Stack Details (技術スタック詳細)

### Frontend (フロントエンド)
- **Framework:** Next.js (App Router API) / React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.0

### Backend (バックエンド)
- **Environment:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (better-sqlite3)
- **Security:** bcryptjs, jsonwebtoken

## 🚀 Getting Started (環境構築と実行)

### Prerequisites (前提条件)
- Node.js (v20.0 or later recommended)
- npm or yarn

### Installation (インストール手順)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/luaiuyuki/Dental-Clinic.git
   cd Dental-Clinic
   ```

2. **Backend Setup:**
   ```bash
   cd server
   npm install
   # Create a .env file based on environment requirements
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the application:**
   Open `http://localhost:3000` in your browser.

## 🔒 Security & Privacy (セキュリティとプライバシー)
To adhere to enterprise security standards, sensitive files including `.env`, SQLite database files (`.db`, `.db-shm`, `.db-wal`), and application logs are explicitly excluded from version control.

---
*Designed for professional clinic management.*
