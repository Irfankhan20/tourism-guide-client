const Button = ({ btnText, isExpired }) => {
  return (
    <button
      disabled={isExpired}
      className="btn shadow-lg shadow-[#6a9995] hover:shadow-[#eeab8f] mt-10 border border-[#07332F] relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-mono  tracking-tighter text-[#07332F] bg-[#fdc4ac] rounded-lg group"
    >
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#07332F] rounded-full group-hover:w-56 group-hover:h-56"></span>
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 "></span>
      <span className="relative text-text group-hover:text-white">
        {btnText}
      </span>
    </button>
  );
};

export default Button;
