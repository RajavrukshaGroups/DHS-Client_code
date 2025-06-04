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
  // const [loading, setLoading] = useState(false);
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
  

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'memberPhoto') setMemberPhoto(files[0]);
    if (name === 'memberSign') setMemberSign(files[0]);
  };

      const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) data.append(key, formData[key]);
        if (memberPhoto) data.append('memberPhoto', memberPhoto);
        if (memberSign) data.append('memberSign', memberSign);

        // ✅ Send OTP
        try {
          await axios.post("http://localhost:4000/defenceWebsiteRoutes/send-otp", {
            email: formData.email,
          });

          // ✅ Redirect to OTP verification
          navigate("/otpverification", {
            state: { formData, memberPhoto, memberSign },
          });
        } catch (err) {
          console.error("OTP send failed", err);
          toast.error("Failed to send OTP. Try again.");
        }
      };


  return (
       <Container fluid className="online-application">
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

          <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Member Photo
              </label>
              <input
                type="file"
                name="memberPhoto"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
              />
              {formErrors.memberPhoto && <p className="text-red-500 text-sm">{formErrors.memberPhoto}</p>}
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Member Signature
              </label>
              <input
                type="file"
                name="memberSign"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
              />
              {formErrors.memberSign && <p className="text-red-500 text-sm">{formErrors.memberSign}</p>}
            </div>

            <div className="flex justify-start mt-6">
              <button
              type="submit"
              
            >
             submit
            </button>
            </div>
        </form>
      </div>
    </div>
    </Container>
  );
};

export default MemberFormWrapper;