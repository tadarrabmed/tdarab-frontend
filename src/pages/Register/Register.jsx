import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import "./Register.css";
import toast from "react-hot-toast";
import { translateError } from "../../utils/translateError/translateError";
import { useAuth } from "../../context/AuthProvider";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { register, login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const rules = {
    length: formData.password.length >= 8,
    lower: /[a-z]/.test(formData.password),
    upper: /[A-Z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[@$!%*?&]/.test(formData.password),
  };

  const strength = Object.values(rules).filter(Boolean).length;

  const strengthLabel = () => {
    if (strength <= 2) return "ضعيفة";
    if (strength === 3 || strength === 4) return "متوسطة";
    return "قوية";
  };

  const isValidPassword = Object.values(rules).every(Boolean);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!isValidPassword) {
      toast.error("كلمة المرور غير قوية بما فيه الكفاية", {
        className: "toaster",
      });
      return;
    }

    try {
      setLoading(true);

      await register(formData.name, formData.email, formData.password);

      toast.success("تم إنشاء الحساب بنجاح 🎉", {
        className: "toaster",
      });

      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      toast.error(translateError(err), {
        className: "toaster",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register flex-center">
      <div className="layer"></div>

      <form onSubmit={handleRegister} className="register-form flex-column">
        <h2>إنشاء حساب جديد</h2>

        {/* NAME */}
        <FormInput
          type="text"
          name="name"
          placeholder="الاسم الكامل"
          value={formData.name}
          onChange={handleChange}
          required
          label="الاسم الكامل"
          padding="padding-register"
        />

        {/* EMAIL */}
        <FormInput
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChange={handleChange}
          required
          label="البريد الإلكتروني"
          padding="padding-register"
        />

        {/* PASSWORD */}
        <div className="password-wrapper">
          <FormInput
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="كلمة المرور"
            value={formData.password}
            onChange={handleChange}
            required
            label="كلمة المرور"
            padding="padding-register"
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {formData.password && (
          <div className="strength-bar">
            <div className={`bar strength-${strength}`}></div>
            <p>القوة: {strengthLabel()}</p>
          </div>
        )}

        {formData.password && (
          <div className="rules">
            <span className={rules.length ? "ok" : ""}>8+</span>
            <span className={rules.upper ? "ok" : ""}>A</span>
            <span className={rules.lower ? "ok" : ""}>a</span>
            <span className={rules.number ? "ok" : ""}>1</span>
            <span className={rules.special ? "ok" : ""}>@</span>
          </div>
        )}
        {/* BUTTON */}
        <Button
          type="submit"
          disabled={loading}
          classn="register-btn"
          text={loading ? "جاري المعالجة..." : "إنشاء حساب"}
        />

        {/* LOGIN LINK */}
        <div className="flex-center login-account-div">
          <NavLink to="/login" id="create-account-link">
            تسجيل دخول
          </NavLink>
          <h5>لديك حساب ؟</h5>
        </div>
      </form>
    </section>
  );
}

export default Register;
