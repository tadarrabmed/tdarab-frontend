import { useState } from "react";
import "./Login.css";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import { NavLink, useNavigate } from "react-router-dom";
import { translateError } from "../../utils/translateError/translateError";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      toast.success("تم تسجيل الدخول بنجاح!", {
        duration: 4000,
        position: "top-center",
        className: "toaster",
      });

      navigate("/");
    } catch (err) {
      const message = err.response?.data?.error || "حدث خطأ ما";
      setError(message);
      toast.error(translateError(err), {
        duration: 6000,
        position: "top-center",
        className: "toaster",
      });
    }
  };

  return (
    <section className="login flex-center container">
      <div className="layer"></div>
      <form onSubmit={handleLogin} className="login-form flex-column">
        <h2>تسجيل الدخول</h2>
        <FormInput
          type="email"
          placeholder="البريد الإلكتروني"
          onChange={(e) => setEmail(e.target.value)}
          required
          label="البريد الإلكتروني"
          padding="padding-login"
        />
        <FormInput
          type="password"
          placeholder="كلمة المرور"
          onChange={(e) => setPassword(e.target.value)}
          required
          label="كلمة المرور"
          padding="padding-login"
        />
        <Button text="تأكيد" type="submit" classn="login-btn" />
        <div className="flex-center create-account-div">
          <NavLink to="/register" id="create-account-link">
            إنشاء حساب
          </NavLink>
          <h5>ليس لديك حساب ؟</h5>
        </div>
      </form>
    </section>
  );
}
export default Login;
