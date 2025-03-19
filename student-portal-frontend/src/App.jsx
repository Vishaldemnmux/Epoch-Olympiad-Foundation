import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AdmitCard from "./pages/AdmitCard";
import Results from "./pages/Results";
import StudyMaterials from "./pages/StudyMaterials";
import Certificates from "./pages/Certificates";
import AnswerKeys from "./pages/AnswerKeys";
import Feedback from "./pages/Feedback";
import PracticeOMR from "./pages/PracticeOMR";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />  
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admit-card" element={<AdmitCard />} />
        <Route path="/results" element={<Results />} />
        <Route path="/study-materials" element={<StudyMaterials />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/answer-key" element={<AnswerKeys />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/practice-omr" element={<PracticeOMR />} />
      </Routes>
    </Router>
  );
}

export default App;