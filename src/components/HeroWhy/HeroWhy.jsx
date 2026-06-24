import "./HeroWhy.css";
import Button from "../Button/Button";
import { Navigate, useNavigate } from "react-router-dom";
import Title from "../Title/Title";
export default function HeroWhy() {
  const navigate = useNavigate();
  return (
    <section className="why-hero fade-in flex-center">
      <div className="container">
        <Title
          herotitle="كم سؤال حلّيت… ونسيت؟ "
          text="طريقة مختلفة لتثبيت المعلومات للأبد  "
          textcolor="text-hero"
        />
        <Button
          onClick={() => navigate("/curriculapage")}
          classn="logout-btn"
          text=" جرّب الآن"
        />
      </div>
    </section>
  );
}
