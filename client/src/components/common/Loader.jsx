function Loader({ textColor = "text-indigo-500" }) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className={`h-9 w-9 border-2 border-white/10 border-b-current border-spacing-2 ${textColor} rounded-full animate-spin`}
      ></div>
    </div>
  );
}

export default Loader;
