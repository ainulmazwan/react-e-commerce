import { useEffect } from "react";
import { verifyPayment } from "../utils/api_payment";
import { useSearchParams, useNavigate } from "react-router";

const PaymentVerify = () => {
  // 1. call the search params hook
  const [searchParams] = useSearchParams(); // extract the value from the url string
  const billplz_id = searchParams.get("billplz[id]");
  const billplz_paid = searchParams.get("billplz[paid]");
  const billplz_paid_at = searchParams.get("billplz[paid_at]");
  const billplz_x_signature = searchParams.get("billplz[x_signature]");

  const navigate = useNavigate();

  useEffect(() => {
    // call verify payment API
    verifyPayment(
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature
    )
      .then((updatedOrder) => {
        // clear the cart
        localStorage.removeItem("cart");
        // redirect the user to orders page
        navigate("/orders");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      Please wait while we verify your transaction. Please don't click the back
      button or close the browser
    </>
  );
};

export default PaymentVerify;
