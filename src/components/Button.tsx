const Button = ({
  children,
  onClick,
  type,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="text-white flex gap-2 items-center justify-center bg-gradient-to-r from-red-500 to-yellow-500 hover:from-yellow-500 hover:to-red-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-4 py-2 transition-colors duration-300 ease-in-out whitespace-nowrap"
    >
      {children}
    </button>
  );
};

export default Button;
