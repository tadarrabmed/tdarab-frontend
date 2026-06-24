import Login from "./pages/Login/Login";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Section from "./pages/Section/Section";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import SubSection from "./pages/SubSection/SubSection";
import Loading from "./pages/Loading/Loading";
import { Toaster } from "react-hot-toast";
import Terms from "./pages/Terms/Terms";
import Privacy from "./pages/Privacy/Privacy";
import ProtectedSectionRoute from "./components/ProtectedSectionRoute/ProtectedSectionRoute";
import { useState, useEffect } from "react";
import WhyPage from "./pages/WhyPage/WhyPage";
import Chapter from "./pages/Chapter/Chapter";
import UserProfile from "./pages/UserProfile/UserProfile";
import Error from "./pages/Error/Error";
import { Helmet } from "react-helmet-async";
import CurriculaPage from "./pages/CurriculaPage/CurriculaPage";
import SubSectionStats from "./pages/SubSectionStat/SubSectionStat";
import Plans from "./pages/Plans/Plans";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"
function App() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register"];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title> تدرَّب منصّة تعليمية طبية - تعلم وطور مهاراتك </title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="منصة طبية - تعلم وطور مهاراتك" />
        <meta
          property="og:description"
          content="اختبر نفسك وطور مستواك في الطب بسهولة عبر منصتنا التعليمية"
        />
        <meta property="og:image" content="https://tadarrabmed.com/og.png" />
        <meta property="og:url" content="https://tadarrabmed.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <ScrollToTop/>
      {!hideNavbarPaths.includes(location.pathname) && <NavBar />}
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/userprofile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/whypage" element={<WhyPage />} />
          <Route path="/stats/:id" element={<SubSectionStats />} />
          <Route path="/curriculapage" element={<CurriculaPage />} />
           <Route path="/plans" element={<Plans />} />
          <Route
            path="/chapter/:id"
            element={
              <ProtectedSectionRoute>
                <Chapter />
              </ProtectedSectionRoute>
            }
          />
          <Route
            path="/section/:id"
            element={
              <ProtectedSectionRoute>
                <Section />
              </ProtectedSectionRoute>
            }
          />
          <Route
            path="/subsection/:id"
            element={
              <ProtectedSectionRoute>
                <SubSection />
              </ProtectedSectionRoute>
            }
          />

          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      )}

      {!hideNavbarPaths.includes(location.pathname) && <Footer />}

      <Toaster />
    </>
  );
}

export default App;
