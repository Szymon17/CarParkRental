import "./custom-error.styles.sass";

const CustomError = ({ children }: { children: string }) => {
  return <span className="custom-error">{children}</span>;
};

export default CustomError;
