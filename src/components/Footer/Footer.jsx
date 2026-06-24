import "./Footer.css";
import logo from "../../assets/image/logo2.png";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <footer className="footer flex-column container ">
        <div className="content-footer  ">
          <div className="footer-logo">
            <Link to="/" className="logo-footer-link">
              <img src={logo} />
            </Link>
            <p className="logo-footer-text ">
              طريقك الأقصر للنجاح نضع بين يديك أرشيفاً شاملاً لأسئلة الدورات مع
              حلول نموذجية حل تدرّب وتفوق شريكك الذكي في التحضير للامتحانات
            </p>
          </div>
          <div className="social-media">
            <h5 id="connect-title">تواصل معنا</h5>
            <div className="icons-social flex-center">
              <a
                href="https://www.facebook.com/profile.php?id=61589622055428&mibextid=ZbWKwL  "
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://wa.me/qr/GXZSGBS5LUQMN1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoWhatsapp />
              </a>
              <a
                href="https://t.me/TADARABmed"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram />
              </a>
            </div>
          </div>
          <ul className="footer-link">
            <li className="head-link-text">روابط مفيدة</li>
            <li>
              <NavLink to="/">الصفحة الرئيسيّة</NavLink>
            </li>
            <li className="">
              <NavLink to={"/whypage"}>لماذا نحن</NavLink>
            </li>
            <li>
              {""}
              <NavLink to="/curriculapage">المناهج</NavLink>
            </li>
            <li>
              {""}
              <NavLink to="/plans">الخطط</NavLink>
            </li>
          </ul>
        </div>
      </footer>

      <div className="copy flex-center">
        {" "}
        <p>
          {" "}
          تدرَّب - TDARAB جميع الحقوق محفوظة &copy;
          {new Date().getFullYear()}{" "}
        </p>{" "}
        <div className="flex-center legal-info">
          <NavLink to="/terms">شروط الاستخدام</NavLink>
          <span>|</span>
          <NavLink to="/privacy">سياسة الخصوصية</NavLink>
        </div>
      </div>
    </>
  );
}
