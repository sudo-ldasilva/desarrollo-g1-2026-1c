import './LoadingSplash.css';

const LoadingSplash = ({ message }) => {
  return (
    <div className="loading-splash">
      <div className="loading-splash__content">
        <div className="loading-splash__logo-panel" aria-hidden="true">
          <img
            src="/LogoCompleto.png"
            alt="Sweet Medical"
            className="loading-splash__logo"
          />
        </div>

        <p className="loading-splash__message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSplash;