import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./UserAccount.css";
import Loading from "../../pages/Loading/Loading";
import Error from "../../pages/Error/Error";
import { useActivatePlan } from "../../context/UseActivatePlan";
import ActivateModal from "../ActivateModal/ActivateModal";

function getPlanColor(level) {
  if (level === 1) return "plan-badge--free";
  if (level === 2) return "plan-badge--basic";
  if (level === 3) return "plan-badge--advanced";
  return "plan-badge--full";
}

function getExpiryStatus(planExpiresAt) {
  if (!planExpiresAt) return { label: "غير محدودة", cls: "expiry--unlimited" };
  const diff = new Date(planExpiresAt) - new Date();
  if (diff < 0) return { label: "منتهية", cls: "expiry--expired" };
  if (diff < 7 * 24 * 60 * 60 * 1000) return { label: "تنتهي قريباً", cls: "expiry--soon" };
  return { label: new Date(planExpiresAt).toLocaleDateString("ar-SY"), cls: "expiry--active" };
}

function hashNumber(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function Identicon({ seed, size = 80 }) {
  const GRID = 8;
  const CELL = size / GRID;
  const hash = hashNumber(String(seed));

  const hue = hash % 360;
  const hue2 = (hue + 40) % 360;
  const colorA = `hsl(${hue}, 65%, 52%)`;
  const colorB = `hsl(${hue2}, 55%, 62%)`;
  const bg = `hsl(${hue}, 25%, 93%)`;

  const ZONES_A = [
    { rMin: 0, rMax: 3, cMin: 0, cMax: 3 },
    { rMin: 0, rMax: 3, cMin: 4, cMax: 7 },
    { rMin: 2, rMax: 5, cMin: 2, cMax: 5 },
    { rMin: 4, rMax: 7, cMin: 0, cMax: 3 },
    { rMin: 4, rMax: 7, cMin: 4, cMax: 7 },
    { rMin: 1, rMax: 6, cMin: 0, cMax: 7 },
  ];

  const ZONES_B = [
    { rMin: 0, rMax: 3, cMin: 2, cMax: 5 },
    { rMin: 1, rMax: 4, cMin: 0, cMax: 3 },
    { rMin: 1, rMax: 4, cMin: 4, cMax: 7 },
    { rMin: 4, rMax: 7, cMin: 2, cMax: 5 },
    { rMin: 3, rMax: 6, cMin: 0, cMax: 3 },
    { rMin: 3, rMax: 6, cMin: 4, cMax: 7 },
  ];

  const filledA = new Set();
  ZONES_A.forEach((zone, zi) => {
    const rows = zone.rMax - zone.rMin + 1;
    const cols = zone.cMax - zone.cMin + 1;
    const idx = hashNumber(String(hash + zi * 9973));
    const row = zone.rMin + (idx % rows);
    const col = zone.cMin + ((idx >> 4) % cols);
    filledA.add(`${row}-${col}`);
  });

  const filledB = new Set();
  ZONES_B.forEach((zone, zi) => {
    const rows = zone.rMax - zone.rMin + 1;
    const cols = zone.cMax - zone.cMin + 1;
    const totalCells = rows * cols;
    for (let attempt = 0; attempt < totalCells; attempt++) {
      const idx = hashNumber(String(hash + zi * 7919 + 1234 + attempt * 3571));
      const row = zone.rMin + (idx % rows);
      const col = zone.cMin + ((idx >> 4) % cols);
      const key = `${row}-${col}`;
      if (!filledA.has(key) && !filledB.has(key)) {
        filledB.add(key);
        break;
      }
    }
  });

  const allCells = [];
  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      allCells.push({ row, col });
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="profile-avatar-svg">
      <rect width={size} height={size} fill={bg} rx={size * 0.18} />
      {allCells.map(({ row, col }) => {
        const key = `${row}-${col}`;
        const fill = filledA.has(key) ? colorA : filledB.has(key) ? colorB : null;
        return fill ? (
          <rect
            key={key}
            x={col * CELL + CELL * 0.1}
            y={row * CELL + CELL * 0.1}
            width={CELL * 0.8}
            height={CELL * 0.8}
            fill={fill}
            rx={CELL * 0.2}
          />
        ) : null;
      })}
    </svg>
  );
}

export default function UserAccount() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showModal, code, setCode, loading: activateLoading, openModal, closeModal, activatePlan } = useActivatePlan();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data.data);
      } catch (err) {
        console.error("Error loading user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <Loading />;
  if (!user) return <Error error="You must login first" />;

  const expiry = getExpiryStatus(user.planExpiresAt);
  const showActivate =
    user.plan?.level === 1 ||
    expiry.cls === "expiry--soon" ||
    expiry.cls === "expiry--expired";

  return (
    <>
      <div className="profile-header">
        <Identicon seed={user.id} size={110} />

        <div className="profile-info">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>

          <div className="profile-badges">
            <span className={`plan-badge ${getPlanColor(user.plan?.level)}`}>
              {user.plan?.name ?? "بدون خطة"}
            </span>
            <span className={`expiry-badge ${expiry.cls}`}>
              {expiry.label}
            </span>
          </div>

          {showActivate && (
            <button className="profile-activate-btn" onClick={openModal}>
              🔑 لديك كود تفعيل؟ فعّل خطتك الآن
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <ActivateModal
          show={showModal}
          onClose={closeModal}
          code={code}
          setCode={setCode}
          loading={activateLoading}
          onActivate={activatePlan}
        />
      )}
    </>
  );
}
