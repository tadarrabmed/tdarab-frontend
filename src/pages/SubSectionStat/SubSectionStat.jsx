import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import "./SubSectionStat.css";
import Loading from "../Loading/Loading";
import PieChart from "../../components/PieChart/PieChart";

export default function SubSectionStats() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subName = searchParams.get("name") ?? "المادة";

  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get(`/me/stats/${id}`)
      .then((res) => setStats(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!stats) return <Loading />;

  return (
    <div className="substats-page">
      <div className="substats-container">

        <button className="substats-back" onClick={() => navigate(-1)}>
          ← رجوع
        </button>

        <div className="substats-header">
          <h2 className="substats-title">{subName}</h2>
          <PieChart correct={stats.correct} total={stats.total} />
        </div>

        <details className="attempts-section">
          <summary className="attempts-summary">
            <span>📚 المحاولات</span>
            <span className="attempts-count">{stats.attempts.length}</span>
          </summary>

          <div className="attempts-list">
            {stats.attempts.map((a, i) => (
              <details key={i} className={`attempt-card ${a.isCorrect ? "correct" : "wrong"}`}>
                <summary className="attempt-summary">
                  <span className="attempt-indicator">{a.isCorrect ? "✅" : "❌"}</span>
                  <span className="attempt-question-preview">{a.questionText}</span>
                </summary>
                <div className="attempt-details">
                  <p className="attempt-answer">📝 إجابتك: {a.selectedAnswer}</p>
                  <p className="attempt-explanation">💡 {a.explanation}</p>
                </div>
              </details>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
