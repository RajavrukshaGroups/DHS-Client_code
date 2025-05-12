import React, { useState } from "react";
import "../Gallery/gallery.css";
import Video from "../../videos/galleryjcb.mp4";
import One from "../Project_Images/two.jpg";
import Two from "../Project_Images/three.jpg";
import Three from "../Project_Images/four.jpg";
import Four from "../Project_Images/five.jpg";
import Five from "../Project_Images/DSC04739.jpg";
import Six from "../Project_Images/six.jpg";
import Seven from "../Project_Images/seven.JPG";
import Eight from "../Project_Images/eight.JPG";
import Nine from "../Project_Images/nine.JPG";
import thirteen from "../Project_Images/thirteen.JPG";
import ten from '../Project_Images/ten.JPG';
import twelve from "../Project_Images/twelve.JPG";
import RecentImgfirst from "../../images/galleryImages/first_image.jpg"
import RecentImgSecond from "../../images/galleryImages/second_image.jpg"
import RecentImgThird from "../../images/galleryImages/thirdImage.jpg"
import RecentImgFourth from "../../images/galleryImages/forthImage.jpg"
import RecentImgFifth from "../../images/galleryImages/fifthImage.jpg"
import RecentImgSixth from "../../images/galleryImages/imageSix.jpg"


function Gallery() {
  const allImages = [RecentImgfirst,RecentImgSecond,RecentImgThird,RecentImgFourth,RecentImgFifth,RecentImgSixth,One, Five, Three, Six, Two, thirteen, Seven, ten, twelve];
  const [visibleImages, setVisibleImages] = useState(6);

  const loadMore = () => {
    if (visibleImages === 6) {
      setVisibleImages(allImages.length); // Show all images
    } else {
      setVisibleImages(6);
    }
  };

  return (
    <div>
      <section className="video-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-md-6">
              <div className="sec-title">
                <p className="sec-titles">
                  Join us at Defence Habitat, where your vision for the perfect
                  property is our mission. Let us help you navigate the real
                  estate market with confidence and ease.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="video-box">
                <video
                  controls
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="mostvideo"
                >
                  <source src={Video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="containers">
        {allImages.slice(0, visibleImages).map((image, index) => (
          <div className="img-container" key={index}>
            <img src={image} alt={`img-${index + 1}`} />
          </div>
        ))}
      </div>

      <button className="loadMore-btn" onClick={loadMore}>
  {visibleImages === 6 ? "Load More" : "Show Less"}
  <span>
    {visibleImages === 6 ? (
      <p>
        <i className="arrow down"></i>
      </p>
    ) : (
      <p>
        <i className="arrow up"></i>
      </p>
    )}
  </span>
</button>
    </div>
  );
}

export default Gallery;


