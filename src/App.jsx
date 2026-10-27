import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";

// Trainee Pages
import TraineeDashboard from "./pages/trainee/TraineeDashboard";
import TraineeProfile from "./pages/trainee/TraineeProfile";
import TraineeCourses from "./pages/trainee/TraineeCourses";
import TraineeCourseDetail from "./pages/trainee/TraineeCourseDetail";
import TraineeResources from "./pages/trainee/TraineeResources";
import TraineeAssessments from "./pages/trainee/TraineeAssessments";
import TraineeAssessmentAttempt from "./pages/trainee/TraineeAssessmentAttempt";
import TraineeFeedback from "./pages/trainee/TraineeFeedback";
import TraineeNotices from "./pages/trainee/TraineeNotices";

// Trainer Pages
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import TrainerCourses from "./pages/trainer/TrainerCourses";
import TrainerTrainees from "./pages/trainer/TrainerTrainees";
import TrainerAssessments from "./pages/trainer/TrainerAssessments";
import TrainerResources from "./pages/trainer/TrainerResources";
import TrainerNotices from "./pages/trainer/TrainerNotices";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Root redirect to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Authentication Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Trainee Portal Nested Routes */}
          <Route path="/trainee" element={<DashboardLayout role="trainee" />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<TraineeDashboard />} />
            <Route path="profile" element={<TraineeProfile />} />
            <Route path="courses" element={<TraineeCourses />} />
            <Route path="courses/:id" element={<TraineeCourseDetail />} />
            <Route path="resources" element={<TraineeResources />} />
            <Route path="assessments" element={<TraineeAssessments />} />
            <Route path="assessments/:id" element={<TraineeAssessmentAttempt />} />
            <Route path="feedback" element={<TraineeFeedback />} />
            <Route path="notices" element={<TraineeNotices />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Trainer / Faculty Portal Nested Routes */}
          <Route path="/trainer" element={<DashboardLayout role="trainer" />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<TrainerDashboard />} />
            <Route path="courses" element={<TrainerCourses />} />
            <Route path="trainees" element={<TrainerTrainees />} />
            <Route path="assessments" element={<TrainerAssessments />} />
            <Route path="resources" element={<TrainerResources />} />
            <Route path="notices" element={<TrainerNotices />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
