// src/pages/MarasandraPage/MarasandraPage.js

import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { Card, Container } from "react-bootstrap";
import siteapproval from "../images/site_approval_new.png";
import timesexpo from "../images/times_expo.png";
import "./styles/latestnews.css";

const LatestNews = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Short excerpt — replace with full transcription if you want
  const timesExpoText = `Premium Living Meets Affordability in North Bengaluru — Defence Habitat Housing Co-operative Society Ltd (Regd Under Karnataka Co-op Society Act) ...`;

  return (
    <Container fluid className="marasandra-page">
      <div className="banner-latest">
        <div className="banner-content3">
          <h1 style={{ color: "white", fontWeight: "bold" }}>Latest News</h1>
        </div>
      </div>

      <Marquee className="marquee" direction="left" speed={50}>
        <span className="text-capitalize">
          "DHS-Marasandra: Change of land use process is completed."
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          "DHS-Tapasihalli: DC conversion received."
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; "Bookings
          are now open for phase-2."
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        </span>
      </Marquee>

      <Card className="property-card-latest shadow-sm">
        <Card.Body>
          <h2 className="ct">Latest News</h2>
          <div className="title-divider"></div>
          <div className="title-divider"></div>

          <h5
            className="custom-bullet"
            style={{ marginTop: "15px", fontSize: "1rem" }}
          >
            Defence Habitat Marasandra - Rs.1,399/- sqft (Booking Closed)
          </h5>

          <h5
            className="custom-bullet"
            style={{ marginTop: "15px", fontSize: "1rem" }}
          >
            Defence Habitat Tapasihalli - Rs.949/- sqft (Booking Closed)
          </h5>

          <h5
            className="custom-bullet"
            style={{ marginTop: "15px", fontSize: "1rem" }}
          >
            Good News..!!! Applications for new membership are open now, Hurry
            up! Contact us for more information.
            <span className="latest-badge">New</span>
          </h5>

          <h5
            className="custom-bullet"
            style={{ marginTop: "15px", fontSize: "1rem" }}
          >
            Defence Habitat Marasandra Phase-2 has launched - Rs.1,399/- sqft
            (Booking Opened)
            <span className="latest-badge">New</span>
          </h5>

          <h5
            className="custom-bullet"
            style={{ marginTop: "15px", fontSize: "1rem" }}
          >
            Defence Habitat Tapasihalli Phase-2 has launched - Rs.1099/- sqft
            (Booking Opened)
            <span className="latest-badge">New</span>
          </h5>

          <h5
            className="custom-bullet"
            style={{ marginTop: "15px", fontSize: "1rem" }}
          >
            DHS-Tapasihalli: DPA/BMRDA approval received{" "}
            <a
              href={siteapproval}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-link"
              style={{color:"blue"}}
            >
              (View Site Approval)
            </a>
            .
          </h5>

          <h5
            className="custom-bullet"
            style={{ marginTop: "15px", fontSize: "1rem" }}
          >
            With the launch of Phase 2, we are adding even more to our project,
            and new amenities await our cherished members!
          </h5>

          {/* -------------------------
              Press Coverage (Times Now - Property Focus)
              ------------------------- */}
          <div className="press-coverage" style={{ marginTop: "28px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 12, color: "#888" }}>Featured in</span>
              <strong style={{ fontSize: 14 }}>Times Now</strong>
              <span style={{ fontSize: 12, color: "#888" }}>—</span>
              <em style={{ fontSize: 13, color: "#444" }}>Property Focus</em>
            </div>

            <div
              className="press-content"
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {/* Left: text excerpt */}
              <div style={{ flex: "1 1 360px", minWidth: 280 }}>
                <p
                  style={{
                    whiteSpace: "pre-line",
                    lineHeight: 1.6,
                    color: "#222",
                  }}
                >
                  {timesExpoText}
                </p>

                {/* <p style={{ fontSize: 13, color: "#555", marginTop: 8 }}>
                  <strong>Read more in:</strong> Times Now — Property Focus.
                </p> */}
              </div>

              {/* Right: thumbnail image */}
              <div style={{ width: 300, cursor: "pointer" }}>
                <img
                  src={timesexpo}
                  alt="Times Now - Property Focus"
                  className="img-fluid times-expo-thumb"
                  onClick={() => setLightboxOpen(true)}
                  style={{
                    width: "100%",
                    borderRadius: 6,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                  }}
                />
                <p style={{ fontSize: "12px", color: "#666", marginTop: 8 }}>
                  Click the image to view larger
                </p>
              </div>
            </div>
          </div>
          {/* end press coverage */}
        </Card.Body>
      </Card>

      {/* Lightbox / modal for viewing the timesexpo image */}
      {lightboxOpen && (
        <div
          className="image-lightbox"
          onClick={() => setLightboxOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "1rem",
          }}
        >
          <img
            src={timesexpo}
            alt="Times Now - enlarged"
            style={{
              maxWidth: "1100px",
              width: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: 6,
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}
    </Container>
  );
};

export default LatestNews;
