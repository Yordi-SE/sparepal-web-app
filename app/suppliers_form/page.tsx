import dynamic from "next/dynamic";
import React from "react";

const FormPage = dynamic(() => import("../components/Formpage"), {
  ssr: false,
});
const Form = dynamic(() => import("../components/Form1"), {
  ssr: false,
});

function Supplier() {
  return (
    <div>
      <FormPage />
      <Form />
    </div>
  );
}

export default Supplier;
