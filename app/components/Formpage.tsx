
function FormPage() {
  return (
    <div className="flex p-7  flex-col items-center justify-center   w-full min-h-[500px] max-h-[700px] h-screen">
      <div className=" md:w-[800px] sm:w-[600px] xs:w-[400px] w-[275px]">
        <img src={"/company-logo.png"} alt="Logo" className="" />
      </div>
      <div className=" w-full    relative  flex flex-col items-center justify-center">
        <h1 className="md:text-4xl text-xl lg:text-6xl  sm:text-2xl  font-extrabold  font-Krona">
          Welcome to
        </h1>
        <h1 className="md:text-4xl text-xl sm:text-2xl lg:text-6xl font-extrabold font-Krona">
          Sparepal !
        </h1>
        <p className=" ml-2 mb-2 mt-5 sm:mt-10 text-gray-900 text-xs bg-gray-100 p-1 font-bold sm:text-lg text-center sm:p-3 rounded-full  font-Krona" style={{boxShadow:"4px 4px 10px rgba(0, 0, 0, 1)"}}>
          Please fill the following form to be part of our supplier.
        </p>
      </div>
    </div>
  );
}

export default FormPage;
