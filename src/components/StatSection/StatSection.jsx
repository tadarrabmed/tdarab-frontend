import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./StatSection.css";
import UserAccount from "../UserAccount/UserAccount";
import Loading from "../../pages/Loading/Loading";
import Error from "../../pages/Error/Error";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import PieChart from "../PieChart/PieChart";
export default function StatSection() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/me/stats");
        setData(res.data.data);
      } catch (err) {
        console.error("Error loading stats", err);
        setError("تعذّر تحميل الإحصائيات");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!data) return <Error error="لا توجد بيانات" />;
  return (
    <div className="section-profile flex-column">
      <UserAccount />
      <div className="stats-container">
        <div className="stats-card">
          <h2>📊 الأداء العام</h2>
          <PieChart correct={data.overall?.correct ?? 0} total={data.overall?.total ?? 0} />
        </div>
        <div className="stats-sections-grid">
          <h2 className="stats-sections-title">📚 التقدم حسب المادة</h2>

          {data.bySections?.length > 0 ? (
            data.bySections.map((section) => (
              <div key={section.id} className="stats-section-card">
                <div className="stats-section-card-top">
                  <h3 className="stats-section-card-name">{section.name}</h3>
                  <PieChart correct={section.correct} total={section.total} />
                </div>
                <div className="stats-section-card-subs">
                  {section.subSections.map((sub) => (
                    <div key={sub.id} className="stats-sub-row">
                      <span className="stats-sub-name">{sub.name}</span>
                      <div className="stats-sub-bar-row">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${sub.percentage}%` }}>
                            <span className="progress-label">{sub.percentage}%</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => navigate(`/stats/${sub.id}?name=${encodeURIComponent(sub.name)}`)}
                          text="عرض التفاصيل"
                          classn="btn-curricula stats-detail-btn"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="stats-empty">لا توجد بيانات بعد</p>
          )}
        </div>
      </div>
    </div>
  );
}

