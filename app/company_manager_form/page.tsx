import dynamic from "next/dynamic";
import React from "react";
const ManagerForm = dynamic(() => import("../components/Form3"), {
  ssr: false,
});

function CompanyManager() {
  return (
    <div>
      <ManagerForm />
    </div>
  );
}

export default CompanyManager;
