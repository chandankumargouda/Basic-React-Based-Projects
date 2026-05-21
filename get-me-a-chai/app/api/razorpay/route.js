import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const POST = async (req) => {
  try{
  await connectDb();
  const body = await req.json();

  // Check if razorpayOrderId is present on the server
  let p = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json({ success: false, message: "Order Id not found" });
  }

  // fetch the secret of the user who is getting the payment
  let user=await User.findOne({username:p.to_user})
  const secret = user.razorpaysecret
  // Verify the payment
  let xx = validatePaymentVerification(
    { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
    body.razorpay_signature,
    secret,
  );
console.log("BODY:", body)
console.log("VERIFICATION:", xx)
  if (xx) {
    // Update the payment status
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: true },
      { new: true },
    );
    return NextResponse.json({
  success: true
});
  } else {
    return NextResponse.json({
      success: false,
      message: "Payment Verification Failed",
    });
  }} catch (error) {

    console.log("API ERROR:", error);

    return NextResponse.json({
      success: false,
      message: error.message
    });
  }
};
