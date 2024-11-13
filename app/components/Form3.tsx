"use client";

import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  manager_first_name: string;
  manager_phone_number: string;
  last_name: string;
};
function ManagerForm() {
  const axiosAuth = useAxiosAuth();

  const id = localStorage.getItem("companyId");
  const [formSuccess, setFormSuccess] = useState("");
  const form = useForm<FormData>();
  const { register, handleSubmit, formState, reset, setError } = form;
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const onSubmit = async (data: FormData) => {
    try {
      await axiosAuth.post("/api/company-manager-detail/", {
        ...data,
        company_id: id,
      });
    } catch (e) {
      setError("root", {
        type: "400",
        message: "Something went wrong, Please try again!",
      });
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setFormSuccess("Successfully Submitted the form!");
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <div className=" sm:p-7 flex flex-col gap-10 sm:h-screen sm:justify-center ">
      <div className="flex sm:flex-row flex-col justify-evenly items-center relative">
        <h1 className="md:text-4xl sm:text-2xl text-lg font-bold align-middle">
          Company’s Manager Detail
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-3xl sm:p-20 p-5 shadow-black shadow-lg bg-white"
      >
        <div
          className={
            formSuccess
              ? "text-green-900  flex items-center justify-center text-sm sm:text-lg h-[30px] sm:h-[50px] mb-5 shadow-lg bg-gray-300"
              : "error text-center"
          }
        >
          <p>{errors.root?.message || formSuccess}</p>
        </div>
        <div className=" grid sm:grid-cols-2 grid-cols- grid-cols-1  gap-3">
          <div className="flex flex-col  self-end">
            <label htmlFor="manager_first_name " className="font-bold mb-1">
              Manager First Name
            </label>
            <input
              className="input border-2 pl-3"
              type="text"
              id="manager_first_name"
              placeholder="Enter Manager Full Name"
              {...register("manager_first_name", {
                required: "This field is required",
              })}
            />
            <p className="error">{errors.manager_first_name?.message}</p>
          </div>
          <div className="flex flex-col  self-end">
            <label htmlFor="last_name " className="font-bold mb-1">
              Last Name
            </label>
            <input
              className="input border-2 pl-3"
              type="text"
              id="last_name"
              placeholder="Enter Last Name"
              {...register("last_name", {
                required: "This field is required",
              })}
            />
            <p className="error">{errors.last_name?.message}</p>
          </div>
          <div className="flex flex-col  self-end">
            <label htmlFor="manager_phone_number " className="font-bold mb-1">
              Manager Phone Number
            </label>
            <input
              className="input border-2 pl-3"
              type="tel"
              id="manager_phone_number"
              placeholder="0945678900"
              {...register("manager_phone_number", {
                required: "This field is required",
                // pattern for phone number
                pattern: {
                  value:
                    /^\+?(\d{1,3})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})$/,
                  message: "Invalid phone number",
                },
              })}
            />
            <p className="error">{errors.manager_phone_number?.message}</p>
          </div>
        </div>
        <div className="w-full mt-10 flex items-end justify-end">
          <button
            type="submit"
            className={
              "bg-color-1 p-1 text-white font-bold rounded-lg " +
              (isSubmitting ? " w-fit" : " w-20")
            }
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Done"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManagerForm;
