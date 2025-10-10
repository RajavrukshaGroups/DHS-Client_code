import React from "react";
import Marquee from "react-fast-marquee";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import "./styles/termscond.css";

const TermsAndConditions = () => {
  return (
    <Container fluid className="contactus">
      <div className="banner-privacy">
        <div className="banner-content-contact">
          <h1 style={{ color: "white" }}>Terms and Conditions</h1>
        </div>
      </div>

      <section className="privacy-policy-section sec-pad-2">
        <div className="auto-container autoc centered">
          <div className="sec-titless centered" />
          <div className="privacy-policy-content">
            <h3 className="privacy-policy-header">1. Introduction</h3>
            <p>
              These are the Terms and Conditions that appear on or are
              referenced by the Defence Habitat Housing Co-Operative Society
              Ltd. website. They specifically relate to site booking, payments,
              and property allocation, and may vary for each project. Users are
              advised to consult the Society for the most recent or official
              documentation before making any commitments.
            </p>

            <h3 className="privacy-policy-header">2. Corner Sites</h3>
            <p>
              {/* Corner sites are subject to an additional charge, typically in the
              range of 10–15% above the basic site price. Allotment of corner
              sites is made on a first-come, first-served basis. */}
              Corner sites will be charged extra, usually around 10–15% more,
              and allotment is based on first-come, first-served basis.
            </p>

            <h3 className="privacy-policy-header">
              3. Registration & Government Charges
            </h3>
            <p>
              Registration charges are additional, as per prevailing government
              norms, and are not included in the basic site cost.
            </p>

            <h3 className="privacy-policy-header">4. Bank Loans</h3>
            <p>
              Bank loans will be provided during the registration or as per
              development stages, depending on the government approval and land
              conversion status.
            </p>

            <h3 className="privacy-policy-header">5. Membership Rules</h3>
            <p>
              Membership eligibility, payments, and required documentation are
              governed by the Society’s rules and the Karnataka Co-operative
              Societies Act, 1960. Prospective members must comply with all
              Society regulations.
            </p>

            <h3 className="privacy-policy-header">
              6. Booking & Payment Schedule
            </h3>
            <p>
              Bookings require a down payment (approximately 30% of the total
              amount) together with the applicable membership fee. The remaining
              balance is payable in three equal instalments or as may be
              demanded by the Society depending on the stage of project
              development.
            </p>

            <h3 className="privacy-policy-header">
              7. Receipts & Confirmation
            </h3>
            <p>
              Receipts and confirmation letters will be provided for all
              payments. Upon booking, the member will be issued a seniority ID
              and access to an online account (where applicable).
            </p>

            <h3 className="privacy-policy-header">8. Price Variations</h3>
            <p>
              Prices, fees, and other terms are subject to change from time to
              time at the discretion of the Society.
            </p>

            <h3 className="privacy-policy-header">9. Cancellation & Refunds</h3>
            <p>
              Memberships and bookings may be cancelled in accordance with the
              Society’s cancellation policy. Refunds (if applicable) will be
              processed after receipt of a written cancellation request and
              after a minimum processing period of 90 days. Refunds will be
              calculated without interest, and any applicable deductions will be
              applied as per Society rules.
            </p>

            <h3 className="privacy-policy-header">
              10. Development & Allotment Phases
            </h3>
            <p>
              Development and allotment are executed in phases. The Society is
              responsible for development for up to 12 months following
              allocation; thereafter, responsibility for common-area upkeep and
              related matters may transfer to the owners’ society as applicable.
            </p>

            <h3 className="privacy-policy-header">
              11. Legal Documents & Land Verification
            </h3>
            <p>
              Legal documents are available for review by prospective members.
              Certain portions of land may remain under legal verification or
              negotiation during project progress.
            </p>

            <h3 className="privacy-policy-header">
              12. Single Plot per Membership
            </h3>
            <p>
              Generally, only one plot may be purchased under a single
              membership. Transfer or assignment of memberships is permitted
              only in accordance with Society policy.
            </p>

            <h3 className="privacy-policy-header">
              13. Resale & Transfer by Member
            </h3>
            <p>
              After legal allotment and completion of necessary transfers, the
              member may resell or transfer the property in accordance with
              Society rules and applicable laws.
            </p>

            <h3 className="privacy-policy-header">14. Commercial Sites</h3>
            <p>
              Commercial site rates are higher than residential rates. If a
              member intends to use a site for commercial purposes, conversion
              from residential to commercial usage is generally recommended
              after allotment and legal transfer for cost efficiency.
            </p>

            <h3 className="privacy-policy-header">
              15. Accepted Payment Methods
            </h3>
            <p>
              All payments to the Society should be made by cheque, demand draft
              (DD), NEFT, or RTGS in favour of Defence Habitat Housing
              Co-Operative Society Ltd., unless otherwise specified by the
              Society.
            </p>

            <h3 className="privacy-policy-header">
              16. Transfer of Membership
            </h3>
            <p>
              Membership transfers are allowed only as per the Society’s rules
              and procedures. Any transfer will be subject to approval and
              applicable transfer charges.
            </p>

            <h3 className="privacy-policy-header">
              17. Responsibility & Limitations
            </h3>
            <p>
              The Society will use reasonable efforts to deliver development and
              services as described, but timelines and outcomes may vary due to
              regulatory approvals, market conditions, or other unforeseeable
              factors. The Society’s liability, if any, will be governed by the
              terms set out in the relevant agreement and applicable law.
            </p>

            <h3 className="privacy-policy-header">
              18. Contact & Clarifications
            </h3>
            <p>
              For any clarifications or to review official/legal documents,
              please contact the Society office.
            </p>
            <h3 className="privacy-policy-header">
              19. Usage and Legal Disclaimer
            </h3>
            <p>
              These terms do not replace official agreements. Users should seek
              direct confirmation from Defence Habitat Housing Co-Operative
              Society for any binding commitments, policy changes, and complete
              legal terms.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default TermsAndConditions;
