import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { FolderCacheProvider } from './contexts/FolderCacheContext';
import LoginPage from './pages/LoginPage';
import FavoriteTestPage from './pages/FavoriteTestPage';
import FavoritesListPage from './pages/FavoritesListPage';
import FoldersPage from './pages/FoldersPage';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <FolderCacheProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoriteTestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites/list"
              element={
                <ProtectedRoute>
                  <FavoritesListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/folders"
              element={
                <ProtectedRoute>
                  <FoldersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </FolderCacheProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

