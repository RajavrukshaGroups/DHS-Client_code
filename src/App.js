import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberFormWrapper from "./components/memberDetails/memberFormWrapper.jsx";
import NewOnlineApplication from "./pages/newOnlineApplication.jsx";
import TapasihalliPage from "./pages/Tapasihalli/TapasihalliPage";
import MarasandraPage from "./pages/Marasandra/MarasandraPage";
import CustomNavbar from "./components/Header/header";
import MainHeader from "./components/MainHeader/mainheader";
import DownloadBrochure from "./pages/DownloadBrochure";
import DownloadApplication from "./pages/DownloadApplication";
import LatestNews from "./pages/latestnews";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer/footer";
import OnlineApplication from "./pages/OnlineApplication";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollToTopButton from "./pages/ScrollToTopButton";
import PrivacyPolicy from "./pages/Privacypolicy";
// MemberPanel Imports
import MemberLogin from "./pages/MemberPannel/MemberLogin";
import Dashboard from "./pages/MemberPannel/Dashboard";
import Myproject from "./pages/MemberPannel/Myproject";
import TransferProject from "./pages/MemberPannel/TransferProject";
import MemberNavbar from "./pages/MemberPannel/MemberNavbar";
import ReceiptList from "./pages/MemberPannel/ReceiptList ";
import MemberHeader from "./pages/MemberPannel/MemberHeader";
import ViewSiteConfirmation from "./pages/MemberPannel/SiteConfirmation";
import ExtraCharges from "./pages/MemberPannel/ExtraCharges";
import ProjectStatus from "./pages/MemberPannel/ProjectStatus";
import ResetPassword from "./pages/MemberPannel/ResetPassword";
import ContactAdmin from "./pages/MemberPannel/ContactAdmin";
import PopupAdmin from "./pages/PopupButton";
import Toast from "./utils/toastify";
import Error from "./components/404";
import Gallery from "./components/Gallery/gallery.jsx";
import Otpverification from "./components/OtpVerification/otpverification.jsx";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import VerifyForgotPassword from "./components/OtpVerification/VerifyForgotPasswordOTP.jsx";
import SlidingPopupContact from "./components/SlidingPopupContact/slidingPopupContact.jsx";
import ContactForm from "./pages/Tapasihalli/TapasihalliContact.jsx";
import TermsAndConditions from "./pages/TermsAndCondtions.jsx";
 import CopyrightPolicy from "./pages/CopyrightPolicy.jsx";


function MainApp() {
  const location = useLocation();
  const isGoogleAdsRoute = location.pathname === "/digitalmarketing-googleAds";
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  return (
    <>
      <div className={isGoogleAdsRoute && !formSubmitted ? "app-blur" : ""}>
        <PopupAdminSelector />
        <HeaderSelector />
        <NavBarSelector />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
          reverseOrder={false}
        />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/digitalmarketing-googleAds"
            element={<TapasihalliPage onFormSubmit={handleFormSubmit} />}
          />
          <Route path="/memberformwrapper" element={<MemberFormWrapper />} />
          <Route
            path="/newonline_application"
            element={<NewOnlineApplication />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/projects/tapasihalli" element={<TapasihalliPage />} />
          <Route path="/projects/marasandra" element={<MarasandraPage />} />
          <Route path="/download/brochure" element={<DownloadBrochure />} />
          <Route
            path="/download/application"
            element={<DownloadApplication />}
          />
          <Route path="/latest-news" element={<LatestNews />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/online_application" element={<MemberFormWrapper />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          {/* <Route path="/copy-right-policy" element={<TermsAndConditions />} /> */}
          {/* Member Panel Routings */}
          <Route path="/memberlogin" element={<MemberLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-project" element={<Myproject />} />
          <Route path="/project-paid-amount" element={<ReceiptList />} />
          <Route path="/transferproject" element={<TransferProject />} />
          <Route
            path="/view-site-confirmation"
            element={<ViewSiteConfirmation />}
          />
          <Route path="/extra-charges-amount" element={<ExtraCharges />} />
          <Route path="/view-project-status" element={<ProjectStatus />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/ContactAdmin" element={<ContactAdmin />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/otpverification" element={<Otpverification />} />
          <Route path="/forgotPassword" element={<VerifyForgotPassword />} />
          <Route path="/copy-right-policy" element={<CopyrightPolicy />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
        <ScrollToTopButton />
      </div>
      {isGoogleAdsRoute && !formSubmitted && (
        <div className="global-contact-modal">
          <div className="contact-form-header" style={{ display: "block" }}>
            <h3
              className="text-center"
              style={{
                color: "#24457b",
                fontSize: "1.3rem",
                fontWeight: "600",
              }}
            >
              Contact Our Team
            </h3>
            <p
              className="text-center text-muted"
              style={{
                color: "#6c757d",
                fontSize: "0.95rem",
                fontStyle: "italic",
              }}
            >
              Fill out this form to view project specifications.
            </p>{" "}
          </div>
          {/* <div
            className="contact-form-header"
            style={{
              display: "block",
              background: "linear-gradient(to right, #f8f9fa, #ffffff)",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              borderLeft: "4px solid #24457b",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h3
              className="text-center"
              style={{
                color: "#24457b",
                fontSize: "1.4rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
                letterSpacing: "0.3px",
                position: "relative",
                paddingBottom: "0.75rem",
              }}
            >
              Contact Our Team
              <span
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "50px",
                  height: "3px",
                  background: "linear-gradient(to right, #24457b, #3a7bd5)",
                  borderRadius: "3px",
                }}
              ></span>
            </h3>
            <p
              className="text-center"
              style={{
                color: "#6c757d",
                fontSize: "0.95rem",
                lineHeight: "1.5",
                margin: "0.5rem 0 0",
                fontStyle: "italic",
              }}
            >
              Fill out this form to view complete project specifications and
              pricing details.
            </p>
          </div> */}
          <ContactForm onFormSubmit={handleFormSubmit} />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <>
        <MainApp />
      </>
    </Router>
  );
}

function PopupAdminSelector() {
  const location = useLocation();

  // Define routes where PopupAdmin should be shown
  const allowedRoutes = [
    "/",
    "/about-us",
    "/projects/tapasihalli",
    "/projects/marasandra",
    "/download/brochure",
    "/download/application",
    "/latest-news",
    "/contact-us",
    "/faq",
    "/online_application",
    "/privacy-policy",
    "/terms-conditions",
    "/copy-right-policy",
  ];

  // Check if current route is in the allowedRoutes list
  const shouldShowPopup = allowedRoutes.includes(location.pathname);
  const isGoogleAdsRoute = location.pathname === "/digitalmarketing-googleAds";

  return shouldShowPopup ? (
    <SlidingPopupContact isGoogleAds={isGoogleAdsRoute} />
  ) : null;
}

function NavBarSelector() {
  const location = useLocation();
  const memberRoutes = [
    "/dashboard",
    "/my-project",
    "/project-paid-amount",
    "/transferproject",
    "/view-site-confirmation",
    "/extra-charges-amount",
    "/reset-password",
    "/ContactAdmin",
  ];

  const isMemberRoute = memberRoutes.includes(location.pathname);

  return isMemberRoute ? <MemberNavbar /> : <CustomNavbar />;
}

function HeaderSelector() {
  const location = useLocation();
  const memberRoutes = [
    "/dashboard",
    "/my-project",
    "/project-paid-amount",
    "/transferproject",
    "/extra-charges-amount",
    "/view-project-status",
    "/reset-password",
    "/ContactAdmin",
  ];

  const isMemberRoute = memberRoutes.includes(location.pathname);

  return isMemberRoute ? <MemberHeader /> : <MainHeader />;
}

export default App;
