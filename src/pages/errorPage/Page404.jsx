const Page404 = () => {
  return (
    // <div
    //   style={{
    //     backgroundImage: `url(${loginBg})`,
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover",
    //   }}
    //   className=" min-h-screen px-4 sm:px-8"
    // >
    //   {/* Left Section */}
    //   <div className="w-full  mx-auto">
    //     <Lottie
    //       className="h-screen w-full"
    //       animationData={animationData}
    //       //   loop={true}
    //     />
    //   </div>
    //   {/* right section  */}
    //   <div className="absolute top-20 right-10">
    //     <Link>
    //       <button className="btn btn-primary">Back To Home</button>
    //     </Link>
    //   </div>
    // </div>
    <div
      className="boxShadow px-10 w-full h-screen py-16 flex flex-col justify-center rounded-xl"
      style={{
        background: `url("https://i.ibb.co/02DvRcV/404.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-[2rem] sm:text-[3rem] font-[600] text-white w-full lg:w-[50%]">
        Go Home , You’re Drunk!
      </h1>

      <button className="py-3 px-8 w-max rounded-full bg-[#92E3A9] hover:bg-[#4ec46f] text-white mt-5">
        BACK TO HOME
      </button>
    </div>
  );
};

export default Page404;
