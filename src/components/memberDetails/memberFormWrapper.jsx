import React, { useState } from 'react';
import PersonalDetails from './personalDetails.jsx';
import ReferenceDetails from './referenceDetails.jsx';
import NomineePerticular from './nomineePerticular';
import SeniorityDetails from './seniorityDetails';
import MemberShipDetails from './memberShipDetails';
import PaymentDetails from './paymentDetails';
import ProppertyDetails from './proppertyDetails.jsx';
import axiosInstance from '../../api/interceptors';
import { FaSpinner } from 'react-icons/fa';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import { useEffect } from 'react';
import { FaRegEye } from 'react-icons/fa';
import axios from 'axios';
import { Card, Container, Form, Row, Col, Button, Modal } from 'react-bootstrap';
import Spinner from '../../components/common/Spinner'; // Adjust path as needed

// import axiosInstance from '../../api/interceptors';
const MemberFormWrapper = () => {
  const { id } = useParams(); // id comes from route like /edit-member/:id
  const [formErrors, setFormErrors] = useState({});
  console.log(id,"iddddddddddddddddddddd")
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    dob: '',
    fatherSpouse: '',
    correspondenceAddress: '',
    permanentAddress: '',
    workingAddress: '',
    refencName: '',
    rankDesignation: '',
    ServiceId: '',
    relationship: '',
    projectName: '',
    PropertySize: '',
    perSqftPropertyPrice: '',
    selectedPropertyCost: '',
    percentage: '',
    percentageCost: '',
    plotLength: '',
    plotBreadth: '',
     // Nominee Particulars
  nomineeName: '',
  nomineeAge: '',
  nomineeRelationship: '',
  nomineeAddress: '',
   // Add these for SeniorityDetails

  // Membership Details
   date: "",
   numberOfShares: "2",
   
   
   shareFee: "2000",
   memberShipFee: "100",
   applicationFee: "200",
   adminissionFee: "100",
   miscellaneousExpenses: "100",

   // Payment Details
    paymentType: "Membership Fee",
    paymentMode: "",
    bankName: "",
    branchName: "",
    amount: "2500",
    checqueNumber: "",
    transactionId: "",
    ddNumber: "",
  });
  
  const navigate = useNavigate();
  const [memberPhoto, setMemberPhoto] = useState(null);
  const [memberSign, setMemberSign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [memberPhotoPreview, setMemberPhotoPreview] = useState(null);
const [memberSignPreview, setMemberSignPreview] = useState(null);
  // Fetch existing member data for editing

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/member/get-member/${id}`)
        .then((res) => {
          const fetched = res;
  
          setFormData((prev) => ({
            ...prev,
            salutation: fetched.saluation || '', // typo in backend: "saluation"
            name: fetched.name || '',
            mobile: fetched.mobileNumber || '',
            altMobile: fetched.AlternativeNumber || '',
            email: fetched.email || '',
            dob: fetched.dateofbirth || '',
            fatherSpouse: fetched.fatherName || '',
            correspondenceAddress: fetched.contactAddress || '',
            permanentAddress: fetched.permanentAddress || '',
            workingAddress: fetched.workingAddress || '',
  
            // ✅ Reference Details mapping
            refencName: fetched.refname || '', // <-- FIXED
            rankDesignation: fetched.rankDesignation || '',
            ServiceId: fetched.serviceId || '',
            relationship: fetched.relationship || '',
  
            // ✅ Property Details mapping
            projectName: fetched.propertyDetails?.projectName || '',
            PropertySize: fetched.propertyDetails?.propertySize || '',
            perSqftPropertyPrice: fetched.propertyDetails?.pricePerSqft || '',
            // selectedPropertyCost: fetched.propertyDetails?.propertyCost || '',
            percentage: fetched.propertyDetails?.percentage || '',
            percentageCost: fetched.propertyDetails?.percentageCost || '',
            plotLength: fetched.propertyDetails?.length || '',
            plotBreadth: fetched.propertyDetails?.breadth || '',
  
            // ✅ Nominee Details
            nomineeName: fetched.nomineeName || '',
            nomineeAge: fetched.nomineeAge || '',
            nomineeRelationship: fetched.nomineeRelation || '',
            nomineeAddress: fetched.nomineeAddress || '',
  
            // ✅ Membership Details
            seniorityId: fetched.SeniorityID || '',
            membershipNo: fetched.MembershipNo || '',
            cunfirmationLetterNo: fetched.ConfirmationLetterNo || '',
            shareCertificateNo: fetched.ShareCertificateNumber || '',
  
            // ✅ Receipt Details — if you're integrating receipt separately, skip this
            date: fetched.date || '',
          }));
        })
        .catch((err) => {
          console.error("Failed to fetch member", err);
        });
    }
  }, [id]);
    useEffect(() => {
    const totalAmount =
      Number(formData.shareFee || 0) +
      Number(formData.memberShipFee || 0) +
      Number(formData.applicationFee || 0) +
      Number(formData.adminissionFee || 0) +
      Number(formData.miscellaneousExpenses || 0);

    setFormData((prevData) => ({
      ...prevData,
      amount: totalAmount.toString(),
    }));
  }, [
    formData.shareFee,
    formData.memberShipFee,
    formData.applicationFee,
    formData.adminissionFee,
    formData.miscellaneousExpenses,
  ]);
  

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Prevent negative numbers for numeric inputs
    if (type === "number" || ["noofShares", "shareFee", "memberShipFee", "applicationFee", "adminissionFee", "miscellaneousExpenses", "amount", "nomineeAge", "perSqftPropertyPrice", "PropertySize", "selectedPropertyCost", "percentage", "percentageCost"].includes(name)) {
      if (Number(value) < 0) return; // Ignore update if value is negative
    }
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   if (name === 'memberPhoto') setMemberPhoto(files[0]);
  //   if (name === 'memberSign') setMemberSign(files[0]);
  // };

          const handleFileChange = (e) => {
          const { name, files } = e.target;
          
          if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (name === 'memberPhoto') {
                setMemberPhotoPreview(event.target.result);
                setMemberPhoto(files[0]);
              } else if (name === 'memberSign') {
                setMemberSignPreview(event.target.result);
                setMemberSign(files[0]);
              }
            };
            reader.readAsDataURL(files[0]);
          }
        };
      // const handleSubmit = async (e) => {
      //   e.preventDefault();
      //   const data = new FormData();
      //   for (const key in formData) data.append(key, formData[key]);
      //   if (memberPhoto) data.append('memberPhoto', memberPhoto);
      //   if (memberSign) data.append('memberSign', memberSign);

      //   // ✅ Send OTP
      //   try {
      //     await axios.post("http://localhost:4000/defenceWebsiteRoutes/send-otp", {
      //       email: formData.email,
      //     });

      //     // ✅ Redirect to OTP verification
      //     navigate("/otpverification", {
      //       state: { formData, memberPhoto, memberSign },
      //     });
      //   } catch (err) {
      //     console.error("OTP send failed", err);
      //     toast.error("Failed to send OTP. Try again.");
      //   }
      // };

        const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true); // Activate spinner
          
          try {
            await axios.post("https://memberpanel.defencehousingsociety.com/defenceWebsiteRoutes/send-otp", {
              email: formData.email,
            });
            navigate("/otpverification", {
              state: { formData, memberPhoto, memberSign },
            });
          } catch (err) {
            toast.error("Failed to send OTP. Try again.");
          } finally {
            setLoading(false); // Deactivate spinner (even on error)
          }
        };

  return (
    
       <Container fluid className="online-application">
        return (
  <Container fluid className="online-application">
    {loading && <Spinner />} {/* Add this line */}
    {/* Rest of your JSX */}
  </Container>
);
          <div className="banner">
            <div className="banner-content">
              <h1 style={{ color: 'white' }}>ಡಿಫೆನ್ಸ್ ಹ್ಯಾಬಿಟಾಟ್ ಹೌಸಿಂಗ್ ಕೋ-ಆಪರೇಟಿವ್ ಸೊಸೈಟಿ ಲಿ.</h1>
              <h1 style={{ color: 'white' }}>DEFENCE HABITAT HOUSING CO-OPERATIVE SOCIETY LTD. </h1>
              <h3>Reg. No.:- HSG-3/64/HHS/53744.</h3>
            </div>
          </div>
          {/* {loading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )} */}
          
    
    <div className="min-h-screen w-full" style={{ backgroundColor: 'oklch(0.92 0.04 252.1)' }}>
      <div className="p-6 max-w-5xl w-full mx-auto">
        <form onSubmit={handleSubmit}>
          {/* Form Sections */}
          <ReferenceDetails formData={formData} handleChange={handleChange} formErrors={formErrors}/>
          <PersonalDetails formData={formData} handleChange={handleChange}   formErrors={formErrors}/>
          <ProppertyDetails formData={formData} handleChange={handleChange} formErrors={formErrors}/>
          <NomineePerticular formData={formData} handleChange={handleChange} formErrors={formErrors} />
          <SeniorityDetails formData={formData} handleChange={handleChange}  formErrors={formErrors}/>
          <MemberShipDetails formData={formData} handleChange={handleChange}  formErrors={formErrors}/>
          <PaymentDetails formData={formData} handleChange={handleChange}  formErrors={formErrors}/>

          {/* Image Uploads */}

        {/* Member Photo Upload with Preview */}

           {/* Image Uploads with Previews */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  {/* Member Photo */}
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Member Photo <span className="text-red-500">*</span>
    </label>
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <input
          type="file"
          name="memberPhoto"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          required
        />
      </div>
      {memberPhotoPreview && (
        <div className="relative">
          <img
            src={memberPhotoPreview}
            alt="Member Preview"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-200 preview-image"
          />
          <button
            type="button"
            onClick={() => {
              setMemberPhotoPreview(null);
              setMemberPhoto(null);
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
          >
            ✕
          </button>
        </div>
      )}
    </div>
    <p className="mt-1 text-xs text-gray-500">
      Upload a clear passport-size photo (Max 2MB)
    </p>
  </div>

  {/* Member Signature */}
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Signature <span className="text-red-500">*</span>
    </label>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="file"
                name="memberSign"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                required
              />
            </div>
            {memberSignPreview && (
              <div className="relative">
                <img
                  src={memberSignPreview}
                  alt="Signature Preview"
                  className="w-20 h-12 object-contain border border-gray-200 preview-image"
                />
                <button
                  type="button"
                  onClick={() => {
                    setMemberSignPreview(null);
                    setMemberSign(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Upload your signature (White background preferred)
          </p>
        </div>
      </div>
            <div className="flex justify-start mt-6">
             <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" /> Submitting...
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
        </form>
      </div>
    </div>
    </Container>
  );
};

export default MemberFormWrapper;