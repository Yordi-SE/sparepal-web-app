
function FormPage() {
  return (
    <div className="flex p-7 gap-10 sm:gap-20 flex-col items-center justify-center sm:flex-row sm:items-start w-full h-screen">
      <div className="">
        <img
          src={"/logo_sparepal_1.svg"}
          alt="Logo"
          className="w-36 md:w-48 ml-10 lg:w-[400px] md:ml-10"
        />
      </div>
      <div className=" w-full h-full xl:w-[939px]  relative  bg-gradient-to-b from-color-1 to-color-2 flex items-center justify-center">
        <div>
          <h1 className="md:text-4xl text-xl lg:text-6xl sm:mb-5 md:mb-7 sm:text-2xl  sm:font-semibold  font-Krona">
            Welcome to
          </h1>
          <h1 className="md:text-4xl text-xl sm:text-2xl lg:text-6xl  sm:font-semibold  font-Krona">
            Sparepal !
          </h1>
        </div>
        <p className="absolute bottom-0 left-0 ml-2 mb-2 text-white text-xs font-extralight font-Krona">
          Please fill the FormPage to be part of our supplier.
        </p>
      </div>
    </div>
  );
}

export default FormPage;
