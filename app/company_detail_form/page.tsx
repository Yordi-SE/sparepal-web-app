import dynamic from "next/dynamic";
import React from "react";
const AddressForm = dynamic(() => import("../components/Form2"), {
  ssr: false,
});

function CompanyDetail() {
  return (
    <div>
      <AddressForm />
    </div>
  );
}

export default CompanyDetail;
