import React from "react";
import "./Hero.css";
import img from "../../assets/image/hero.png";
import Button from "../Button/Button";
import Title from "../Title/Title";
export default function Hero() {
  return (
    <section className="hero flex-column container">
      <div className="layer"></div>
      <div className="hero-content ">
        <Title
          herotitle="نماذج أسئلة دورات لجميع السنوات  "
          text="  نماذج أسئلة دورات خاصّة بطلاب كلية الطب البشري , نحن نقدّم لك جميع
          الأسئلة المتوفّرة مع الحل لا تتردّد في الاشتراك "
          textcolor=" "
        />
      </div>
    </section>
  );
}
