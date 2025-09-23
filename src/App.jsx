import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import UserTable from "./pages/UserTable";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import HomeData from "./pages/HomeData";
import TaskData from "./pages/TaskData";
import QuizForm from "./pages/quiz_form";
import QuizTable from "./pages/quiz_table";

const AppLayout = () => {
  const location = useLocation();

  // Hide sidebar & header on login page
  const isLoginPage = location.pathname === "/login" || location.pathname === "/";

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}
      <div className="flex-1 bg-black min-h-screen">
        {!isLoginPage && <Header />}
        <div className={!isLoginPage ? "p-6 ml-60" : ""}>
          <Routes>
            {/* Login Page */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            {/* After login */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Other pages */}
            <Route path="/user-table" element={<UserTable />} />
            <Route path="/home-data" element={<HomeData />} />
            <Route path="/task-data" element={<TaskData />} />
            <Route path="/quiz_form" element={<QuizForm />} />
            <Route path="/quiz_table" element={<QuizTable />} />
            <Route path="/settings" element={<Settings />} />

            {/* Default fallback */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
