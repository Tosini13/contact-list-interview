type ErrorMessagePropsType = {
  error?: string | null;
};

const ErrorMessage: React.FC<ErrorMessagePropsType> = ({ error }) => {
  return (
    <div
      data-test-id="error_message"
      className="error-container"
      style={{
        height: error ? "40px" : "0px",
        opacity: error ? "1" : "0",
      }}
    >
      <p className="error">{error}</p>
    </div>
  );
};

export default ErrorMessage;
