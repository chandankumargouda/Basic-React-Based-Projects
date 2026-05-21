
import React from "react";
import PaymentPage from "@/components/PaymentPage";

const Username =async  ({ params }) => {
  const p=await params
 return (
    <>
      <PaymentPage username={p.username} />
    </>
  )
}

export default Username;
