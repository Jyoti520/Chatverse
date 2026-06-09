

function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button type={type} className={` rounded-2xl font-medium  hover:shadow-md transition-all duration-300 ${className}`} {...props}>
      {children}
    </button>
  );
}
export default Button;

