import React, { useEffect, useState } from "react";
import './MemberPannel_Styles/MemberHeader.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faPhone, faUser, faDesktop } from '@fortawesome/free-solid-svg-icons';
import toast from "react-hot-toast";

const MemberHeader = () => {
  // const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [memberData,setMembersdata]= useState([])
  const navigate = useNavigate(); // Initialize useNavigate
  
  useEffect(() => {
    const fetchData = async () => {
      const seniorityId = sessionStorage.getItem('seniority_id');
      if (!seniorityId) {
        setError('No seniority ID found in session');
        toast.error('Please login');
        navigate('/memberlogin');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `https://adminpanel.defencehousingsociety.com/defenceWebsiteRoutes/dashboard/${seniorityId}`
        );
        console.log('Member Data in header:', response.data.data);
        setMembersdata(response.data.data);
      } catch (err) {
        console.error('Error fetching member data:', err);
        setError('Failed to fetch member data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
     }, [navigate]);


  const handleLogout = async () => {
    try {
      sessionStorage.removeItem('seniority_id');
      window.location.href = '/memberlogin'; // Redirect to login page or any other page
      console.log("logout succesfull")
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <div className="header-top sticky">
        <div className="top-inner clearfix">
          <div className="left-column pull-left">
            <ul className="info clearfix">
              <li><FontAwesomeIcon icon={faMapMarkerAlt} /> Bangalore, Karnataka, India</li>
              <li><FontAwesomeIcon icon={faClock} /> Wed - Mon | 9.30AM - 6.30PM</li>
              <li><FontAwesomeIcon icon={faPhone} /> 080 - 29903931</li>
            </ul>
          </div>
          <div className="right-column pull-rights-login">
            <div className="sign-box1" >
              <a href="/memberlogin"><FontAwesomeIcon icon={faUser} /> {memberData.email}</a>
            </div>
            <div className="sign-box2" style={{ paddingLeft: '15px' }}>
              <a onClick={handleLogout}><FontAwesomeIcon icon={faDesktop} /> Logout</a>
            </div>
          </div>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}

export default MemberHeader;
