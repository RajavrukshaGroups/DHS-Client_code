import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Otpverification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6 digits
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);


  const location = useLocation();
  const navigate =useNavigate()

  const { formData, memberPhoto, memberSign } = location.state || {};

const handleResend = async () => {
  if (!formData?.email) {
    toast.error("Email not available.");
    return;
  }
  try {
    setResendLoading(true);
    setError("");
    // const res = await axios.post("http://localhost:4000/defenceWebsiteRoutes/resend-otp", {
    //   email: formData.email,
    // });
      const res= await axios.post("http://localhost:4000/defenceWebsiteRoutes/resend-otp", {
                email: formData.email,
              });
    if (res.data.success) {
      toast.success("OTP resent successfully!");
      navigate("/")
    } else {
      toast.error("Failed to resend OTP.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong while resending OTP.");
  } finally {
    setResendLoading(false);
  }
};
  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ✅ Verify OTP first
      const verifyRes = await axios.post("http://localhost:4000/defenceWebsiteRoutes/verify-otp", {
        email: formData.email,
        otp: finalOtp,
      });

      if (verifyRes.data.success !== true) {
        setError("Invalid OTP");
        return;
      }

      // ✅ Prepare and send full application data
      const submissionData = new FormData();
      for (let key in formData) {
        submissionData.append(key, formData[key]);
      }
      if (memberPhoto) submissionData.append("memberPhoto", memberPhoto);
      if (memberSign) submissionData.append("memberSign", memberSign);

      await axios.post("http://localhost:4000/defenceWebsiteRoutes/add-onlinemember", submissionData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Application submitted successfully!");
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h flex-col justify-center overflow-hidden bg-gray-50 py-9">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold">Email Verification</h2>
            <p className="text-sm text-gray-400">We sent a code to your email {formData?.email}</p>
          </div>

          <form onSubmit={handleVerify}>
            <div className="flex justify-between mx-auto w-full max-w-xs space-x-2">
               {otp.map((digit, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    className="w-10 h-10 text-center text-lg border rounded-md"
                />
                ))  }
            </div>

            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

            <div className="mt-6 flex flex-col space-y-4">
              <button
                type="submit"
                className="py-3 bg-blue-700 text-white rounded-xl shadow-sm"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Account"}
              </button>

              <div className="text-center text-sm text-gray-500">
                <p>
                  Didn’t receive code?{" "}
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendLoading}
                    className="text-blue-600 hover:underline disabled:opacity-50"
                  >
                    {resendLoading ? "Resending..." : "Resend"}
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Otpverification
