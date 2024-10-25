"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetSuppliersOptionsQuery } from "@/lib/features/api/apiSlice";
import { setCompanyId } from "@/lib/features/companyIdSlice";
import { useAppDispatch } from "@/lib/hooks";
type FormData = {
  company_name: string;
  tin_number: string;
  license_number: string;
  code: string;
  sub_group_code: string;
  date_registered: Date;
  renewed_license_date: Date;
  legal_status: string;
  business_description: string;
  sub_group_description: string;
};
function Form() {
  const dispatch = useAppDispatch();
  const form = useForm<FormData>();
  const router = useRouter();
  const { register, handleSubmit, formState, reset, setError } = form;
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  const { isError, isLoading, isFetching, data, isSuccess } =
    useGetSuppliersOptionsQuery();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/suppliers/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("companyId", response.data.id);
      console.log("response data", response.data);
    } catch (e) {
      console.log(data);

      console.log(e);
      setError("root", {
        type: "400",
        message: "Something went wrong, Please try again!",
      });
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      router.push("/company_detail_form");
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <div className="bg-color-1 sm:p-7 flex flex-col gap-10">
      <div className="flex sm:flex-row flex-col justify-evenly items-center relative">
        <img
          src={"/logo_sparepal_2.png"}
          alt="Logo"
          className="md:w-48 sm:w-36 w-20 h-full sm:absolute left-0 "
        />
        <h1 className="md:text-4xl sm:text-2xl text-lg font-bold align-middle">
          Company Information
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-3xl sm:p-20 p-5 shadow-black shadow-lg bg-white"
      >
        <div className=" grid sm:grid-cols-2 grid-cols-1  gap-3">
          <div className="flex flex-col ">
            <label htmlFor="company_name" className="font-bold mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="company_name"
              placeholder="Enter Company Name"
              className="input border-2 pl-3"
              {...register("company_name", {
                required: "This field is required",
              })}
            />
            <p className="error">{errors.company_name?.message}</p>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="date_registered" className="font-bold mb-1">
              Date Registered
            </label>
            <input
              type="date"
              id="date_registered"
              placeholder=""
              className="input border-2 pl-3"
              {...register("date_registered", {
                required: "This field is required",
              })}
            />
            <p className="error">{errors.date_registered?.message}</p>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="tin_number" className="font-bold mb-1">
              TIN Number
            </label>
            <input
              className="input border-2 pl-3"
              type="text"
              id="tin_number"
              placeholder="Enter Tin Number"
              {...register("tin_number", {
                required: "This field is required",
              })}
            />
            <p className="error">{errors.tin_number?.message}</p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="renewed_license_date " className="font-bold mb-1">
              Renewed Licence Date
            </label>
            <input
              type="date"
              className="input border-2 pl-3"
              id="renewed_license_date"
              {...register("renewed_license_date", {
                required: "This field is required",
              })}
            />
            <p className="error">{errors.renewed_license_date?.message}</p>
          </div>
          <div className="flex flex-col  self-end">
            <label htmlFor="license_number " className="font-bold mb-1">
              License Number
            </label>
            <input
              className="input border-2 pl-3"
              type="text"
              id="license_number"
              placeholder="Enter License Number"
              {...register("license_number", {
                required: "This field is required",
              })}
            />
            <p className="error">{errors.license_number?.message}</p>
          </div>
          <div className=" self-end max-w-[491px]">
            <select
              id="legal_status"
              className="w-full h-[56px] border-2"
              {...register("legal_status", {
                required: "This field is required",
              })}
              defaultValue=""
            >
              {(isFetching || isLoading) && (
                <option value="" disabled>
                  Loading...
                </option>
              )}
              {isError && (
                <option value="" disabled>
                  Error Loading Options
                </option>
              )}
              {isSuccess && (
                <>
                  <option value="" disabled>
                    Legal Status
                  </option>
                  {data.legal_status.map((choice: string[], index: number) => (
                    <option key={index} value={choice[0]}>
                      {choice[0]}
                    </option>
                  ))}
                </>
              )}
            </select>
            <p className="error">{errors.legal_status?.message}</p>
          </div>
          <div className="flex flex-col self-end">
            <label htmlFor="code" className="font-bold">
              Code
            </label>
            <input
              type="text"
              className="input border-2 pl-3"
              placeholder="Enter Description Code"
              id="code"
              {...register("code", {
                required: "This field is required",
              })}
            />
            <p className="error">{errors.code?.message}</p>
          </div>
          <div className=" self-end max-w-[491px]">
            <label htmlFor="business_description"></label>

            <select
              className="w-full h-[56px] border-2"
              id=" business_description"
              {...register("business_description", {
                required: "This field is required",
              })}
              defaultValue=""
            >
              {(isFetching || isLoading) && (
                <option value="" disabled>
                  Loading...
                </option>
              )}
              {isError && (
                <option value="" disabled>
                  Error Loading Options
                </option>
              )}
              {isSuccess && (
                <>
                  <option value="" disabled>
                    Business Description
                  </option>
                  {data.business_description.map(
                    (choice: string[], index: number) => (
                      <option key={index} value={choice[0]}>
                        {choice[0]}
                      </option>
                    )
                  )}
                </>
              )}
            </select>
            <p className="error">{errors.business_description?.message}</p>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="sub_group_code" className="font-bold mb-1">
              Sub-Group Code
            </label>
            <input
              type="text"
              className="input border-2 pl-3"
              placeholder="Enter Subgroup Code"
              id="sub_group_code"
              {...register("sub_group_code", {
                required: "This field is required",
              })}
            />
            <p className="error">{errors.sub_group_code?.message}</p>
          </div>

          <div className=" max-w-[491px] self-end">
            <select
              className="w-full h-[56px] border-2"
              id=" sub_group_description"
              {...register("sub_group_description", {
                required: "This field is required",
              })}
              defaultValue=""
            >
              {(isFetching || isLoading) && (
                <option value="" disabled>
                  Loading...
                </option>
              )}
              {isError && (
                <option value="" disabled>
                  Error Loading Options
                </option>
              )}
              {isSuccess && (
                <>
                  <option value="" disabled>
                    Sub-Group Description:
                  </option>
                  {data.sub_group_description.map(
                    (choice: string[], index: number) => (
                      <option key={index} value={choice[0]}>
                        {choice[0]}
                      </option>
                    )
                  )}
                </>
              )}
            </select>
            <p className="error">{errors.sub_group_description?.message}</p>
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
            {isSubmitting ? "Submitting..." : "Next"}
          </button>
        </div>
        <p className="error text-center">{errors.root?.message}</p>
      </form>
    </div>
  );
}

export default Form;
