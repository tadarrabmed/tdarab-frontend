import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./Section.css";
import { useAuth } from "../../context/AuthProvider";
import Title from "../../components/Title/Title";
import Loading from "../Loading/Loading";
import { motion } from "framer-motion";
const Section = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [subSections, setSubSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchSubSections = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/sections/${id}/subsections`);
      setSubSections(res.data.data || []);
    } catch (err) {
      console.error("Error loading subsections:", err);

      if (err.response?.status === 403) {
        navigate("/");
      }

      setSubSections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    fetchSubSections();
  }, [user, authLoading, id]);

  if (loading || authLoading) {
    return <Loading />;
  }
  return (
    <div className="section-page container flex-column">
      <Title
        title="المواد الدراسية"
        text="اكتشف المواد الدراسية المتوفرة"
        textcolor="text-content"
      />
      <div className="subsections-grid flex-center">
        {subSections.map((sub) => {
          const locked = sub.locked === true;
          return (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              key={sub.id}
              className={`sub-card ${locked ? "locked" : ""}`}
              onClick={() => {
                if (!locked) {
                  navigate(`/chapter/${sub.id}`);
                }
              }}
            >
              <h3>{sub.name}</h3>
              <p>عدد الفصول: {sub.totalChapters}</p>
              {locked ? (
                <span className="lock">🔒 يتطلب ترقية</span>
              ) : (
                <span className="open">دخول</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Section;
