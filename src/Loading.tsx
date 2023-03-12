type LoadingPropsType = {
  isLoading?: boolean;
};

const Loading: React.FC<LoadingPropsType> = ({ isLoading }) => {
  return (
    <div data-test-id="loading" className="loading">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loading;
