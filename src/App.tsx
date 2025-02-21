import { Routes, Route } from "react-router-dom";
import AppProviders from "src/providers/AppProviders";
import ProtectedRoute from "@components/auth/routes/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "@components/auth/login/Login";
import SingleVenue from "@pages/SingleVenues";
import Profile from "@pages/Profile";
import "react-calendar/dist/Calendar.css";
import SearchResults from "./components/globals/SearchResults";

function App() {
  return (
    <AppProviders>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/:id' element={<SingleVenue />} />
          <Route path='/search-results' element={<SearchResults />} />
          <Route
            path='/profile'
            element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AppProviders>
  );
}

export default App;
