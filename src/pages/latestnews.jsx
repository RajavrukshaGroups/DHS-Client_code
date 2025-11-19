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
          <div className="latest-news-layout">
            <div className="latest-news-left">
              <h2 className="ct">Latest News</h2>
              <div className="title-divider"></div>
              <div className="title-divider"></div>

              <h5 className="custom-bullet latest-news-line">
                Defence Habitat Marasandra - Rs.1,399/- sqft (Booking Closed)
              </h5>

              <h5 className="custom-bullet latest-news-line">
                Defence Habitat Tapasihalli - Rs.949/- sqft (Booking Closed)
              </h5>

              <h5 className="custom-bullet latest-news-line">
                Good News..!!! Applications for new membership are open now, Hurry
                up! Contact us for more information.
                <span className="latest-badge">New</span>
              </h5>

              <h5 className="custom-bullet latest-news-line">
                Defence Habitat Marasandra Phase-2 has launched - Rs.1,399/- sqft
                (Booking Opened)
                <span className="latest-badge">New</span>
              </h5>

              <h5 className="custom-bullet latest-news-line">
                Defence Habitat Tapasihalli Phase-2 has launched - Rs.1099/- sqft
                (Booking Opened)
                <span className="latest-badge">New</span>
              </h5>

              <h5 className="custom-bullet latest-news-line">
                DHS-Tapasihalli: DPA/BMRDA approval received{" "}
                <a
                  href={siteapproval}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-link"
                >
                  (View Site Approval)
                </a>
                .
              </h5>

              <h5 className="custom-bullet latest-news-line">
                With the launch of Phase 2, we are adding even more to our project,
                and new amenities await our cherished members!
              </h5>
            </div>

            <div className="latest-news-right">
              <div className="press-coverage">
                <div className="press-meta">
                  <span>Featured in</span>
                  <strong>Times Now</strong>
                  <span>—</span>
                  <em>Property Focus</em>
                </div>

                <div className="press-content">
                  <div className="press-stack">
                    <p className="press-stack-text">{timesExpoText}</p>
                    <div className="press-thumbnail" onClick={() => setLightboxOpen(true)}>
                      <img
                        src={timesexpo}
                        alt="Times Now - Property Focus"
                        className="img-fluid times-expo-thumb h-56 pl-6 pr-6 "
                      />
                      <p className="press-thumbnail-note">Click the image to view larger</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
