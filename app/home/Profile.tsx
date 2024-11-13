"use client";
import { useSession } from "next-auth/react";
import React from "react";

function Profile() {
  const { data: session, status } = useSession();
  return (
    <>
      {status == "loading" && (
        <div className="w-full bg-indigo-950 h-full flex flex-col items-center animate-pulse  pt-[75px]">
          <header>
            <h1 className="text-gray-300">Account</h1>
          </header>
          <div className="w-[100px] h-[100px] overflow-hidden rounded-full border-2 border-gray-300 shadow-lg bg-gray-700" />
          <h3 className="w-32 h-6 bg-gray-700 rounded mt-4"></h3>
          <p className="w-48 h-4 bg-gray-700 rounded mt-2"></p>
        </div>
      )}
      {status == "authenticated" && (
        <div className=" w-full bg-indigo-950 h-full flex flex-col items-center  pt-[75px]">
          <header>
            <h1 className="text-white">Account</h1>
          </header>
          {
            // Profile details
          }
          <div className="w-[100px] h-[100px]  overflow-hidden rounded-full border-2 border-gray-300 shadow-lg">
            <img src="" alt="" className="w-full h-full object-cover" />
            <p>
              <span>{session.user.user.profile.bio}</span>
            </p>
          </div>
          <h3 className="text-white">
            {session?.user.user.first_name + " " + session?.user.user.last_name}
          </h3>
          <p className="text-white">
            Email:{" "}
            <a
              href={`mailto:${session?.user.user.email}`}
              className="text-gray-300"
            >
              {session?.user.user.email}
            </a>
          </p>
          <>
            {session?.user.user.is_supplier ? (
              <>
                <p className="text-white">Supplier</p>
                <p className="text-white">Company Name: Company</p>
              </>
            ) : (
              <p className="text-white">Regular User</p>
            )}
          </>
        </div>
      )}
    </>
  );
}

export default Profile;
