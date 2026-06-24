import "./LegalLayout.css";

const LegalLayout = ({ title, sections }) => {
  return (
    <div className="legal-container container">
      <div className="legal-layer"></div>

      <div className="legal-content">
        <h1 className="legal-title">{title}</h1>

        <div className="legal-grid">
          {/* Sidebar */}
          <div className="legal-sidebar">
            {sections.map((sec, index) => (
              <a key={index} href={`#section-${index}`}>
                {sec.title}
              </a>
            ))}
          </div>

          {/* Content */}
          <div className="legal-sections">
            {sections.map((sec, index) => (
              <div key={index} id={`section-${index}`} className="legal-card">
                <h2>{sec.title}</h2>
                <p>{sec.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalLayout;
