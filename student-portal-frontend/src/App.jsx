import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AdmitCard from "./pages/AdmitCard";
import Results from "./pages/Results";
import StudyMaterials from "./pages/StudyMaterials";
import Certificates from "./pages/Certificates";
import AnswerKeys from "./pages/AnswerKeys";
import Feedback from "./pages/Feedback";
import PracticeOMR from "./pages/PracticeOMR";
import Sidebar from "./pages/Sidebar";

function App() {
  const isLoggedIn = localStorage.getItem("student_mobile");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />
          }
        />
        <Route element={<Sidebar />}>
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/admit-card"
            element={
              isLoggedIn ? <AdmitCard /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/results"
            element={
              isLoggedIn ? <Results /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/study-materials"
            element={
              isLoggedIn ? <StudyMaterials /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/certificates"
            element={
              isLoggedIn ? <Certificates /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/answer-key"
            element={
              isLoggedIn ? <AnswerKeys /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/feedback"
            element={
              isLoggedIn ? <Feedback /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/practice-omr"
            element={
              isLoggedIn ? <PracticeOMR /> : <Navigate to="/" replace />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
