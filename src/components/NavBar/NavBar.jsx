import "./NavBar.css";
import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo2.png";
import { useAuth } from "../../context/AuthProvider";
import Button from "../Button/Button";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className={`z-navbar ${scrolled ? "z-nav2" : ""}`}>
      {/* Logo */}
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>

      {/* Burger */}
      <div className="btn-open" onClick={toggleMenu}>
        <div className="line-nav"></div>
        <div className="line-nav"></div>
        <div className="line-nav"></div>
      </div>

      {/* Links */}
      <ul className={`z-links ${menuOpen ? "z-link-open" : ""}`}>
        <li>
          <NavLink to="/" onClick={toggleMenu}>
            الصفحة الرئيسية
          </NavLink>
        </li>

        <li>
          <NavLink to="/whypage" onClick={toggleMenu}>
            لماذا نحن
          </NavLink>
        </li>
        <li>
          <NavLink to="/curriculapage" onClick={toggleMenu}>
            المناهج
          </NavLink>
        </li>
        <li>
          <NavLink to="/plans" onClick={toggleMenu}>
            الخطط
          </NavLink>
        </li>
        {!user ? (
          <>
            <li>
              <NavLink to="/login" onClick={toggleMenu}>
                تسجيل الدخول
              </NavLink>
            </li>

            <li>
              <NavLink to="/register" onClick={toggleMenu}>
                إنشاء حساب
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/userprofile" onClick={toggleMenu}>
                ملفي الشخصي
              </NavLink>
            </li>
            <li className="username">أهلاً، {user.name}</li>
            <li>
              <Button
                onClick={handleLogout}
                classn="logout-btn"
                text="تسجيل خروج"
              />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
