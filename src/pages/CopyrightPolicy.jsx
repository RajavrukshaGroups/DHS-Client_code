import React from "react";
import { Container } from "react-bootstrap";
import "./styles/privacypolicy.css"; // Reuse the same CSS as Privacy Policy

const CopyrightPolicy = () => {
  return (
    <Container fluid className="contactus">
      <div className="banner-privacy">
        <div className="banner-content-contact">
          <h1 style={{ color: "white" }}>Copyright Policy</h1>
        </div>
      </div>

      <section className="privacy-policy-section sec-pad-2">
        <div className="auto-container autoc centered">
          <div className="sec-titless centered">
            {/* <h2>Copyright Policy</h2> */}
          </div>
          <div className="privacy-policy-content">
            <h3 className="privacy-policy-header">1. Introduction</h3>
            <p>
              Welcome to the official website of Defence Habitat Housing Co-Operative Society Ltd. 
              By accessing or using this website (https://defencehousingsociety.com), you agree to 
              comply with and be bound by the following terms and conditions, as well as all 
              applicable laws and regulations. If you do not agree with any of these terms, please 
              do not use this website.
            </p>

            <h3 className="privacy-policy-header">2. Legal Status</h3>
            <p>
              Defence Habitat Housing Co-Operative Society Ltd. is a legally registered and 
              recognized housing co-operative society under the Karnataka State Co-Operative 
              Societies Act. All operations are conducted in compliance with applicable statutory, 
              regulatory, and cooperative norms.
            </p>

            <h3 className="privacy-policy-header">3. Intellectual Property Rights</h3>
            <p>
              All materials, content, and intellectual property displayed on this website — 
              including but not limited to logos, trademarks, text, images, designs, graphics, 
              icons, and layout — are the exclusive property of Defence Habitat Housing Co-Operative 
              Society Ltd.
            </p>
            <p>
              <strong>Unauthorized use, reproduction, modification, distribution, or display of any 
              part of this website or our brand identity (including logo, brochure design, website 
              layout, or promotional content) constitutes a serious violation of intellectual 
              property and trademark laws and will attract strict legal action.</strong>
            </p>

            <h3 className="privacy-policy-header">4. Authorized Communication</h3>
            <p>
              All official communication, representations, and transactions related to Defence 
              Habitat Housing Co-Operative Society Ltd. shall be made only through our registered 
              office and verified contact channels as mentioned on this website.
            </p>
            <p>
              We do not authorize any third parties, agents, or individuals to collect funds, 
              represent, or make commitments on behalf of our Society without written authorization.
            </p>
            <p>
              <strong>Any communication or website using similar names (e.g., with the word 
              "Defence"), design, or content attempting to impersonate us is fraudulent and not 
              connected to our Society in any manner.</strong>
            </p>

            <h3 className="privacy-policy-header">6. Use of Website</h3>
            <p>
              This website is intended solely for <strong>informational purposes</strong> regarding 
              housing projects, membership, and services. Defence Habitat Housing Co-Operative Society 
              Ltd. does not <strong>guarantee</strong> that all information provided is free from 
              typographical errors, inaccuracies, or omissions. We reserve the right to update, 
              modify, or correct information at any time without prior notice.
            </p>

            <h3 className="privacy-policy-header">7. Limitation of Liability</h3>
            <p>
              The Society shall not be held liable for any <strong>losses, damages, or claims</strong> 
              (direct or indirect) arising out of:
            </p>
            <ul className="privacy-policy-list">
              <li>Unauthorized use or access to this website;</li>
              <li>Reliance on any information contained herein;</li>
              <li>Transactions made with unauthorized individuals or entities;</li>
              <li>Misrepresentation or misuse of our Society's name, logo, or materials by third parties.</li>
            </ul>

            <h3 className="privacy-policy-header">8. Data Protection and Privacy</h3>
            <p>
              We are committed to maintaining the <strong>privacy and confidentiality</strong> of 
              personal information shared through this website. Data is protected using 
              <strong> secure encryption (SSL)</strong> and other technical safeguards. However, 
              complete security cannot be guaranteed for information transmitted over the internet. 
              Users are advised to exercise discretion while sharing personal data online.
            </p>

            <h3 className="privacy-policy-header">9. External Links</h3>
            <p>
              This website may contain links to external websites for informational purposes. 
              Defence Habitat Housing Co-Operative Society Ltd. does not control or endorse the 
              content, products, or services offered on external sites and is not responsible for 
              their accuracy, security, or practices.
            </p>

            <h3 className="privacy-policy-header">10. Monitoring and Enforcement</h3>
            <p>
              We actively monitor online and offline activities for unauthorized use of our name, 
              logo, website content, or promotional materials. Any infringement, impersonation, or 
              misuse will be reported to cybercrime authorities and will result in immediate legal 
              action under applicable Intellectual Property and Trademark laws.
            </p>

            <h3 className="privacy-policy-header">11. Governing Law & Jurisdiction</h3>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India. 
              Any disputes arising from or in connection with this website shall be subject exclusively 
              to the jurisdiction of the courts of Bengaluru, Karnataka.
            </p>

            <h3 className="privacy-policy-header">12. Contact Information</h3>
            <p>
              For official communications, verifications, and inquiries, please contact us at:
            </p>
            <ul className="privacy-policy-list">
              <li><strong>Landline:</strong> <a className="text-blue-700" href="tel:08029903931">080-29903931</a></li>
              <li><strong>Mobile:</strong> <a className="text-blue-700" href="tel:+918884735735">+91 8884 735 735</a></li>
              <li><strong>Email:</strong> <a className="text-blue-700" href="mailto:mail@defencehousingsociety.com">mail@defencehousingsociety.com</a> / <a className="text-blue-700" href="mailto:info@defencehousingsociety.com">info@defencehousingsociety.com</a></li>
              <li><strong>Website:</strong> <a className="text-blue-700" href="https://defencehousingsociety.com" target="_blank" rel="noopener noreferrer">https://defencehousingsociety.com</a></li>
              <li><strong>Registered Office:</strong> 
               Bangalore - 560092, Karnataka, India</li>
            </ul>

            <h3 className="privacy-policy-header">13. Legal Disclaimer</h3>
            <p>
              © 2025 Defence Habitat Housing Co-Operative Society Ltd. All Rights Reserved.
            </p>
            <p>
              Any unauthorized use, reproduction, or misrepresentation of our content, logo, or brand 
              identity will be treated as a criminal offense and prosecuted under applicable cybercrime, 
              intellectual property, and cooperative laws.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default CopyrightPolicy;