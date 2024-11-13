"use client";

import { useGetSuppliersOptionsQuery } from "@/lib/features/api/apiSlice";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  region: string;
  woreda: string;
  house_number: string;
  capital: string;
  company: string;
  zone: string;
  business_phone_number: string;
  site_id: string;
};
function AddressForm() {
  const axiosAuth = useAxiosAuth();

  const id = localStorage.getItem("companyId");
  const { isError, isLoading, isFetching, data, isSuccess } =
    useGetSuppliersOptionsQuery();
  const [formdisable, setFormDisable] = useState(false);

  const router = useRouter();

  const form = useForm<FormData>();
  const { register, handleSubmit, formState, reset, setError } = form;
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const onSubmit = async (data: FormData) => {
    try {
      const newData = {
        ...data,
        company_id: id,
      };
      await axiosAuth.post("/api/company-detail-address/", newData);
    } catch (e) {
      setError("root", {
        type: "400",
        message: "Something went wrong, Please try again!",
      });
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      setFormDisable(true);
      reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps

      router.push("/company_manager_form");
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className=" sm:p-7 flex flex-col gap-10">
      <div className="flex sm:flex-row flex-col justify-evenly items-center relative">
        <h1 className="md:text-4xl sm:text-2xl text-lg font-bold align-middle">
          Company Detail Address
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-3xl sm:p-20 p-5 shadow-black shadow-lg bg-white"
      >
        <div className=" grid sm:grid-cols-2 grid-cols- grid-cols-1  gap-3">
          <div className=" max-w-[491px] self-end">
            <select
              disabled={formdisable}
              className="w-full h-[56px] border-2"
              id="region"
              {...register("region", { required: true })}
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
                    Region
                  </option>
                  {data.region.map((choice: string[], index: number) => (
                    <option key={index} value={choice[0]}>
                      {choice[0]}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          <div className=" max-w-[491px] self-end">
            <select
              disabled={formdisable}
              className="w-full h-[56px] border-2"
              id="zone"
              {...register("zone", { required: true })}
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
                    zone
                  </option>
                  {data.zone.map((choice: string[], index: number) => (
                    <option key={index} value={choice[0]}>
                      {choice[0]}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          <div className=" max-w-[491px] self-end">
            <select
              disabled={formdisable}
              className="w-full h-[56px] border-2"
              id="woreda"
              {...register("woreda", { required: true })}
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
                    woreda
                  </option>
                  {data.woreda.map((choice: string[], index: number) => (
                    <option key={index} value={choice[0]}>
                      {choice[0]}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          <div className="flex flex-col  self-end">
            <label htmlFor="house_number " className="font-bold mb-1">
              House Number
            </label>
            <input
              disabled={formdisable}
              className="input border-2 pl-3"
              type="text"
              id="house_number"
              placeholder="Enter House Number"
              {...register("house_number", {
                required: "This field is required",
              })}
            />
            <p className="error">{errors.house_number?.message}</p>
          </div>
          <div className="flex flex-col  self-end">
            <label htmlFor="business_phone_number " className="font-bold mb-1">
              Business Phone Number
            </label>
            <input
              disabled={formdisable}
              className="input border-2 pl-3"
              type="tel"
              id="business_phone_number"
              placeholder="0945678900"
              {...register("business_phone_number", {
                required: "This field is required",
                pattern: {
                  value:
                    /^\+?(\d{1,3})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})$/,
                  message: "Invalid phone number",
                },
              })}
            />
            <p className="error">{errors.house_number?.message}</p>
          </div>
          <div className="flex flex-col self-end">
            <label htmlFor="capital" className="font-bold">
              capital
            </label>
            <input
              disabled={formdisable}
              type="text"
              className="input border-2 pl-3"
              placeholder="Enter Description Code"
              id="capital"
              {...register("capital", {
                required: "This field is required",
              })}
            />
            <p className="error">{errors.capital?.message}</p>
          </div>
          <div className=" self-end max-w-[491px]">
            <label htmlFor="Business_description"></label>

            <select
              disabled={formdisable}
              className="w-full h-[56px] border-2"
              id="site_id"
              {...register("site_id", { required: true })}
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
                    Site ID
                  </option>
                  {data.site_id.map((choice: string[], index: number) => (
                    <option key={index} value={choice[0]}>
                      {choice[0]}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
        </div>
        <div className="w-full mt-10 flex items-end justify-end">
          <button
            type="submit"
            className={
              "bg-color-1 p-1 text-white font-bold rounded-lg " +
              (isSubmitting ? " w-fit" : " w-20")
            }
            disabled={isSubmitting || formdisable}
          >
            {isSubmitting ? "Submitting..." : "Next"}
          </button>
        </div>
        <p className="error text-center">{errors.root?.message}</p>
      </form>
    </div>
  );
}

export default AddressForm;
