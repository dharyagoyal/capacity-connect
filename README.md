# Capacity Connect — Digital Capacity Building & LMS Portal

A comprehensive, frontend-only Digital Capacity Building and Learning Management Portal for civil servants and government training institutes (Full-Stack Development submission).

---

## 🚀 Quick Start for Teammates (Running Locally)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (comes with Node.js)

### 1. Installation
Clone the repository or extract the ZIP file, then install dependencies:

```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173/
```

### 3. Build for Production (Optional)
To verify or create an optimized production build:
```bash
npm run build
npm run preview
```

---

## 👥 Portals & Demo Accounts

This application operates with client-side mock state (no backend database required). You can explore both roles:

### 1. Trainee Portal (`/trainee`)
- **Login Email:** `trainee@capacityconnect.gov.in`
- **Features:**
  - **Dashboard:** Progress stats, Continue Learning course cards, upcoming deadlines, notices.
  - **My Profile:** Civil service qualifications, work experience, skill chips, download certificates.
  - **Courses:** Module overview, resources (PDFs, PPTs, recorded sessions), assessments, and feedback modal.
  - **Assessments:** Subject-wise exam list and full timed interactive MCQ test engine with real-time score computation.
  - **Feedback:** Star-rating rubric and multi-dimensional course evaluation.

### 2. Trainer / Faculty Workspace (`/trainer`)
- **Login Email:** `trainer@capacityconnect.gov.in`
- **Features:**
  - **Dashboard:** Active course stats, Recharts score bar chart, 6-week participation area chart, live submission feed.
  - **My Profile:** Faculty credentials, research experience, and structured competency mapping tags.
  - **My Courses:** Enrolled officer counts, cohort completion rates, and curriculum management modal.
  - **Assessments:** Master assessment registry with search and action triggers.
  - **Assessment Creator (`/trainer/assessments/new`):** Parameterized test builder with dynamic MCQ question & option cards.
  - **Participation (`/trainer/participation`):** Course filter, trainee search, score distribution benchmark bar chart, and officer dossiers.
  - **Resource Library (`/trainer/resources`):** Filter chips (Videos, PPTs, Study Material), asset cards with download/delete, and drag-and-drop upload modal.

> 💡 **Role Switcher:** Use the quick switch button in the bottom left of the sidebar to toggle between Trainee and Trainer roles instantly.
