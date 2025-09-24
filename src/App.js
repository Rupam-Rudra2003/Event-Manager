import './App.css';
import Login from "./Components/Login";
import Register from "./Components/Register";
import EventPage from "./Components/EventPage";
import EventForm from "./Components/EventForm";
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return ( 
    <Router  basename="/Event-Manager>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/events/new" element={<EventForm />} />
        <Route path="/events/:id" element={<EventForm />} />
      </Routes>
    </Router>
  );
}

export default App;
