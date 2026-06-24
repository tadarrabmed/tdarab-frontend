import React from "react";
import "./CurriculaCard.css";
import Button from "../Button/Button";
import { FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export default function CurriculaCard({
  locked,
  order,
  name,
  requiredPlanLevel,
  subSections,
  id,
  onActivate,
}) {
  const navigate = useNavigate();
  return (
    <motion.div
      className={`section-card flex-column  ${locked ? "is-locked" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="card-content">
        <h3 id="year-name">{name}</h3>
        {locked ? (
          <div className="lock-overlay flex-center">
            <span>🔒</span>
            <p>يتطلب خطة مستوى {requiredPlanLevel}</p>

            <Button
              text="تفعيل الآن"
              classn="btn-curricula"
              onClick={onActivate}
            />
          </div>
        ) : (
          <div className="section-info flex-center">
            <FaRegClock />
            <p>{subSections?.length || 0} فصول</p>

            <Button
              text="دخول للقسم"
              classn="btn-curricula"
              onClick={() => navigate(`/section/${id}`)}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
