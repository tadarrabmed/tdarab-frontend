import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./Chapter.css";
import { useAuth } from "../../context/AuthProvider";
import Title from "../../components/Title/Title";
import Loading from "../Loading/Loading";
import { motion } from "framer-motion";
const Chapter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchChapters = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/chapters/subsection/${id}`);
      setChapters(res.data.data || []);
    } catch (err) {
      console.error("Error loading chapters:", err);

      if (err.response?.status === 403) {
        navigate("/");
      }

      setChapters([]);
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

    fetchChapters();
  }, [user, authLoading, id]);

  if (loading || authLoading) {
    return <Loading />;
  }
  return (
    <div className="chapter-page container flex-column">
      <Title
        title="الوحدات الدراسية"
        text="اكتشف الوحدات الدراسية المتوفرة لهذا المقرر"
        textcolor="text-content"
      />
      <div className="chapters-grid flex-center">
        {chapters.map((chapter) => {
          const locked = chapter.locked === true;
          return (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              key={chapter.id}
              className={`chapter-card ${locked ? "locked" : ""}`}
              onClick={() => {
                if (!locked) {
                  navigate(`/subsection/${chapter.id}`);
                }
              }}
            >
              <h3>{chapter.name}</h3>

              <p>عدد الأسئلة: {chapter.totalQuestions}</p>

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

export default Chapter;
