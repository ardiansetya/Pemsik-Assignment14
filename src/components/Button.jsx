const Button = ({ children, onClick, variant = "primary" }) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring transition";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
    secondary:
      "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
};

export default Button;
