import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { resolveImageUrl } from "../../utils/imageUrl";
import "./SubSection.css";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/AuthProvider";
import img from "../../assets/image/bg-hero.png";
import Loading from "../Loading/Loading";

const SubSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/chapters/${id}/questions`);

      setQuestions(res.data.data || []);
    } catch (err) {
      console.error("Error loading questions:", err);

      if (err.response?.status === 403) {
        navigate("/");
      }

      if (err.response?.status === 401) {
        navigate("/login");
      }

      setQuestions([]);
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

    fetchQuestions();
  }, [user, authLoading, id]);

  if (loading || authLoading) {
    return <Loading />;
  }

  if (!questions.length) {
    return (
      <div className="subsection-page container flex-column">
     

        <div className="question-card flex-column">
          <p className="locked-msg">لا توجد أسئلة حالياً</p>
        </div>
      </div>
    );
  }

  const question = questions[currentIndex];
  const isLocked = question.locked === true;

  if (isLocked) {
    return (
      <div className="subsection-page container flex-column">
     

        <div className="question-card flex-column">
          <p className="locked-msg">🔒 هذا السؤال يتطلب ترقية</p>

          <button className="back-btn" onClick={() => navigate(-1)}>
            العودة للقسم
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!selected) return;

    try {
      const res = await api.post("/attempts", {
        questionId: question.id,
        selectedChoiceId: selected,
      });

      setResult(res.data.data);
    } catch (err) {
      console.error("Error submitting answer:", err);

      if (err.response?.status === 403) {
        toast.error("لا تملك صلاحية لهذا السؤال");
      }
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setResult(null);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="subsection-page container flex-column">
   

      <h2 id="question-number">
        السؤال {currentIndex + 1} / {questions.length}
      </h2>

      <div className="question-card flex-column">
        <p className="question-text">{question.text}</p>

        { question.imageUrl && <img id="q-img" src={resolveImageUrl(question.imageUrl)} alt="question img" />

        
        }

        <div className="choices flex-center">
          {question.choices.map((choice) => {
        
            const isCorrect = result && choice.id === result.correctChoice.id;

            const isWrong =
              result && selected === choice.id && !result.isCorrect;

            return (
              <button
                key={choice.id}
                onClick={() => setSelected(choice.id)}
                disabled={!!result}
                className={`choice
                  ${
                    isCorrect
                      ? "correct-choice"
                      : isWrong
                        ? "wrong-choice"
                        : selected === choice.id
                          ? "active"
                          : ""
                  }
                `}
              >
                {choice.text}
              </button>
            );
          })}
        </div>

        {!result ? (
          <Button
            onClick={handleSubmit}
            disabled={!selected}
            text="تأكيد الإجابة"
            classn="q-btn"
          />
        ) : (
          <div className="result-box flex-column">
            <p className={result.isCorrect ? "correct" : "wrong"}>
              {result.isCorrect ? "✅ إجابة صحيحة" : "❌ إجابة خاطئة"}
            </p>

            <p className="explanation">{result.explanation}</p>

            {currentIndex < questions.length - 1 ? (
              <Button
                onClick={nextQuestion}
                text="السؤال التالي"
                classn="q-btn"
              />
            ) : (
              <div className="finish-box flex-column">
                <p className="finish">🎉 انتهيت من هذا القسم</p>

                <Button
                  onClick={() => navigate(-1)}
                  text="العودة للقسم"
                  classn="q-btn"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubSection;
