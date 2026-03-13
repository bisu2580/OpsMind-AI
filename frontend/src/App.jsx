import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./components/Login";
import Uploader from "./components/Uploader";
import Register from "./components/Register";
import Details from "./components/Details";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Chat from "./pages/Chat";
import AdminLayout from "./admin/AdminLayout";
import Documents from "./admin/pages/Documents";
import Analytics from "./admin/pages/Analytics";
import AuditLogs from "./admin/pages/AuditLogs";
import Settings from "./admin/pages/Settinngs";
function App() {
  return (
    <div className="h-screen w-screen relative overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/upload"
            element={
              <RoleProtectedRoute role="admin">
                <Uploader />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/details"
            element={
              <ProtectedRoute>
                <Details />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <RoleProtectedRoute role="admin">
                <AdminLayout />
              </RoleProtectedRoute>
            }
          >
            <Route path="documents" element={<Documents />} index />
            <Route path="analytics" element={<Analytics />} />
            <Route path="audit" element={<AuditLogs />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
