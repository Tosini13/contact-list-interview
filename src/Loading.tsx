type LoadingPropsType = {};

const Loading: React.FC<LoadingPropsType> = () => {
  return (
    <div data-testid="loading" className="loading">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loading;
