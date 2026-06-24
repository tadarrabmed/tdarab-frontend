import React from "react";
import "./AboutSection.css";
import FeatureCard from "../FeatureCard/FeatureCard";
import Title from "../Title/Title";
export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-text flex-column">
          <Title
            title=" من نحن"
            text="  منصة تدرب هي وجهتك الأولى للحصول على نماذج أسئلة دورات الطب البشري
            لجميع السنوات، مصممة لتساعدك على التحضير الذكي وتحقيق أفضل النتائج."
            textcolor="text-content"
          />
          <div className="about-features flex-center">
            <FeatureCard img="📚" text=" شامل لجميع السنوات  " />
            <FeatureCard img="⚡" text="تجربة تعلم سريعة وسهلة" />
            <FeatureCard img="🎯" text="تحضير مركز للامتحانات " />
          </div>
        </div>
      </div>
    </section>
  );
}
