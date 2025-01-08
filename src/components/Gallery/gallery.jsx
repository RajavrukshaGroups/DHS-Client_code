import React from 'react'
import '../Gallery/gallery.css';
import Video from "../../videos/galleryjcb.mp4";
import One from '../Project_Images/two.jpg';
import two from '../Project_Images/three.jpg';
import three from '../Project_Images/four.jpg'
import four from '../Project_Images/five.jpg';
import five from '../Project_Images/DSC04739.jpg';
import six from '../Project_Images/six.jpg';
import seven from "../Project_Images/seven.JPG";
import eight from '../Project_Images/eight.JPG';
import nine from '../Project_Images/nine.JPG';
import ten from '../Project_Images/ten.JPG';
import eleven from '../Project_Images/eleven.JPG';
import twelve from "../Project_Images/twelve.JPG";
import thirteen from "../Project_Images/thirteen.JPG";

function Gallery() {
  //new galleryy
  return (
    <div>
        <section className="video-section">
              <div className="auto-container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="sec-title">
                      <p className="sec-titles">Join us at Defence Habitat, where your vision for the perfect property is our mission. Let us help you navigate the real estate market with confidence and ease.</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="video-box">
                      <video controls autoPlay muted playsInline loop  className="mostvideo">
                        <source src={Video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </section>
      <div className='containers'>
        <div className='img-container'>
          <img src={One} alt="img-one" />
        </div>
        <div className='img-container'>
          <img src={five} alt="img-two" />
        </div>
        <div className='img-container'>
          <img src={three} alt="img-three" />
        </div>
      </div>
      <div className='containers'>
        <div className='img-container'>
          <img src={six} alt="img-one" />
        </div>
        <div className='img-container'>
          <img src={two} alt="img-two" />
        </div>
        <div className='img-container'>
          <img src={thirteen} alt="img-three" />
        </div>
      </div>
      <div className='containers'>
        <div className='img-container'>
          <img src={seven} alt="img-one" />
        </div>
        <div className='img-container'>
          <img src={ten} alt="img-two" />
        </div>
        <div className='img-container'>
          <img src={twelve} alt="img-three" />
        </div>
      </div>
    </div>
  )
}

export default Gallery
