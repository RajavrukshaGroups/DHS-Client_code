import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyForgotPasswordOTP = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const seniority_id = sessionStorage.getItem("seniority_id");

  // handle change in OTP input
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text").slice(0, 6).split("");
    const newOtp = [...otp];
    pastedData.forEach((char, i) => {
      if (i < 6 && /^[0-9]$/.test(char)) newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[pastedData.length - 1]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://adminpanel.defencehousingsociety.com/defenceWebsiteRoutes/verify-otp",
        // "http://localhost:4000/defenceWebsiteRoutes/verify-otp",
        {
          seniority_id,
          otp: fullOtp,
        }
      );

      if (res.data.success) {
        toast.success("OTP verified successfully!");
        navigate("/reset-password"); // redirect to password reset page
      } else {
        setError(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResendLoading(true);
      const res = await axios.post(
        "https://adminpanel.defencehousingsociety.com/defenceWebsiteRoutes/forgot-password",
        // "http://localhost:4000/defenceWebsiteRoutes/forgot-password",
        {
          seniority_id,
        }
      );

      if (res.data.success) {
        toast.success("OTP resent to your email.");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        toast.error(res.data.message || "Failed to resend OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="relative flex min-h flex-col justify-center overflow-hidden bg-gray-50 py-9">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold">Email Verification</h2>
            <p className="text-sm text-gray-400">
              We sent a code to the email linked to your Seniority ID
            </p>
          </div>

          <form onSubmit={handleVerify}>
            <div className="flex justify-between mx-auto w-full max-w-xs space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="w-10 h-10 text-center text-lg border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}

            <div className="mt-6 flex flex-col space-y-4">
              <button
                type="submit"
                className="py-3 bg-blue-700 text-white rounded-xl shadow-sm hover:bg-blue-800 transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Account"}
              </button>

              <div className="text-center text-sm text-gray-500">
                <p>
                  Didn't receive code?{" "}
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
  );
};

export default VerifyForgotPasswordOTP;
