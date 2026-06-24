import "./PieChart.css";

export default function PieChart({ correct, total }) {
  const wrong = total - correct;
  const W = 320;
  const H = 180;
  const R = 130;
  const cx = W / 2;
  const cy = H;
  const INNER = R * 0.58;

  const toRad = (deg) => (deg * Math.PI) / 180;

  function semiArc(startDeg, endDeg, color) {
    const s = toRad(startDeg);
    const e = toRad(endDeg);
    const x1o = cx + R * Math.cos(s);
    const y1o = cy + R * Math.sin(s);
    const x2o = cx + R * Math.cos(e);
    const y2o = cy + R * Math.sin(e);
    const x1i = cx + INNER * Math.cos(e);
    const y1i = cy + INNER * Math.sin(e);
    const x2i = cx + INNER * Math.cos(s);
    const y2i = cy + INNER * Math.sin(s);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return (
      <path
        d={`M ${x1o} ${y1o} A ${R} ${R} 0 ${large} 1 ${x2o} ${y2o} L ${x1i} ${y1i} A ${INNER} ${INNER} 0 ${large} 0 ${x2i} ${y2i} Z`}
        fill={color}
      />
    );
  }

  const correctDeg = total === 0 ? 0 : (correct / total) * 180;
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);

  return (
    <div className="pie-wrapper">
      <svg width={W} height={H + 10} viewBox={`0 0 ${W} ${H + 10}`}>
        {total === 0 ? (
          semiArc(180, 360, "#e5e7eb")
        ) : (
          <>
            {correctDeg > 0 && semiArc(180, 180 + correctDeg, "#34d399")}
            {correctDeg < 180 && semiArc(180 + correctDeg, 360, "#f87171")}
          </>
        )}
        <text x={cx} y={cy - INNER * 0.35} textAnchor="middle" fontSize="28" fontWeight="800" fill="#1f2937">
          {pct}%
        </text>
        <text x={cx} y={cy - INNER * 0.35 + 22} textAnchor="middle" fontSize="13" fill="#6b7280">
          نسبة الدقة
        </text>
      </svg>
      <div className="pie-legend">
        <div className="pie-legend-item">
          <span className="pie-dot pie-dot--correct"></span>
          <span>صحيح: {correct}</span>
        </div>
        <div className="pie-legend-item">
          <span className="pie-dot pie-dot--wrong"></span>
          <span>خطأ: {wrong}</span>
        </div>
        <div className="pie-legend-item">
          <span className="pie-dot pie-dot--total"></span>
          <span>المجموع: {total}</span>
        </div>
      </div>
    </div>
  );
}
