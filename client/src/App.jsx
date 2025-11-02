// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { PrivyProvider } from "@privy-io/react-auth";
// import Home from "./components/home";
// import About from "./components/about";
// import Editor from "./components/editor";
// import Navbar from "./components/navbar";
// import LoginPage from "./components/login";

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/write" element={<Editor />} />
//         <Route path="/login" element={<LoginPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import Editor from "./components/editor";
import LoginPage from "./components/login";
import PrivateRoutes from "./components/PrivateRoutes";
import { usePrivy } from "@privy-io/react-auth";

const App = () => {
  const { authenticated } = usePrivy();

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Default route — send authenticated users to /home, else to /login */}
        <Route
          path="/"
          element={<Navigate to={authenticated ? "/home" : "/login"} replace />}
        />

        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Private routes (only for authenticated users) */}
        <Route
          path="/home"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route
          path="/write"
          element={
            <PrivateRoutes>
              <Editor />
            </PrivateRoutes>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoutes>
              <About />
            </PrivateRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
