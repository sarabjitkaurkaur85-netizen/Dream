import React, { useState, useRef } from "react";
import "../css/Navbar.css";
import roomhotel3jpeg from "../img/room-hotel-3.jpeg"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  const roomsRef = useRef(null);
  const servicesRef = useRef(null);

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
    alert("✨ Room added to cart! Continue browsing.");
  };

  const scroll = (ref, value) => {
    ref.current.scrollBy({ left: value, behavior: "smooth" });
  };
  const roomImages = [
    "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
    "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
     "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg"

  ];
  const serviceImages = [
    // Fitness (Gym)
    "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg",
     "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",


    // Restaurant
    "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",

    // Swimming Pool
    "https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg",

    // Spa
    "https://images.pexels.com/photos/374148/pexels-photo-374148.jpeg"
  ];
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);


  return (
    <>

      
      

      <section className="hero">
        <div className="container">
          <h1>The Perfect Beachfront Destination</h1>
          <p className="hero-tagline">
            Experience a refreshing approach to your stay
          </p>

          <div className="booking-widget">

            {/* ✅ Check-in */}
            <div className="widget-field">
              <label>Check-in</label>
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                dateFormat="dd/MM/yyyy"
              />
            </div>

            {/* ✅ Check-out */}
            <div className="widget-field">
              <label>Check-out</label>
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                dateFormat="dd/MM/yyyy"
              />
            </div>

            {/* ✅ Adults */}
            <div className="widget-field">
              <label>Adults</label>
              <div className="counter">
                <button onClick={() => adults > 1 && setAdults(adults - 1)}>-</button>
                <span>{adults}</span>
                <button onClick={() => setAdults(adults + 1)}>+</button>
              </div>
            </div>

            {/* ✅ Children */}
            <div className="widget-field">
              <label>Children</label>
              <div className="counter">
                <button onClick={() => children > 0 && setChildren(children - 1)}>-</button>
                <span>{children}</span>
                <button onClick={() => setChildren(children + 1)}>+</button>
              </div>
            </div>

            <button className="check-btn" onClick={() =>
              alert(`Check-in: ${checkIn.toDateString()}
Check-out: ${checkOut.toDateString()}
Adults: ${adults}
Children: ${children}`)
            }>
              Check Availability →
            </button>

          </div>
        </div>
      </section>

      <main className="container">


        <h2 className="section-title">Offers to inspire you</h2>
        <div className="offers-grid">


          <div className="offer-card">
            <div
              className="card-img"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg)`
              }}
            ></div>

            <div className="card-content">
              <span className="offer-badge">Early Booking</span>

              <h3>-10% for advance booking</h3>

              <div className="code-block">Use code: BEHOTEL</div>

              <p>
                Plan ahead and unlock exclusive savings on beachfront stays.
              </p>
            </div>
          </div>


          <div className="offer-card">
            <div
              className="card-img"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg)`
              }}
            ></div>

            <div className="card-content">
              <span className="offer-badge">Culinary Escape</span>

              <h3>Journey will be more interesting</h3>

              <p>
                <strong>Food and earn points</strong> — Travel hassle-free within Bali,
                visit popular attractions, or do water activities!
              </p>
            </div>
          </div>


          <div className="offer-card">
            <div
              className="card-img"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg)`
              }}
            ></div>

            <div className="card-content">
              <span className="offer-badge">Celebration</span>

              <h3>The year-end party</h3>

              <p>
                Travel hassle-free within Bali, visit popular attractions, or do water
                activities! Live music and gourmet dinner.
              </p>
            </div>
          </div>

        </div></main>


        <div className="scroll-section">
          <div className="scroll-nav">
            <button className="scroll-btn" onClick={() => scroll(roomsRef, -350)}>‹</button>
            <button className="scroll-btn" onClick={() => scroll(roomsRef, 350)}>›</button>
          </div>

          <h2 className="section-title">Our rooms & suites</h2>

          <div className="scroll-container" ref={roomsRef}>
            <div className="scroll-wrapper">


              {roomImages.map((img, i) => (
                <div className="room-card-scroll" key={i}>

                  <div
                    className="card-img"
                    style={{ backgroundImage: `url(${img})` }}
                  ></div>

                  <div className="card-content">
                    <h3>Room {i + 1}</h3>
                    <p>Luxury stay experience</p>
                    <div className="room-price">$200 / night</div>
                    <button className="btn-outline" onClick={addToCart}>
                      View Details
                    </button>
                  </div>

                </div>
              ))}

            </div>
          </div>
        </div>


        <div className="scroll-section">
          <div className="scroll-nav">
            <button className="scroll-btn" onClick={() => scroll(servicesRef, -320)}>‹</button>
            <button className="scroll-btn" onClick={() => scroll(servicesRef, 320)}>›</button>
          </div>

          <h2 className="section-title">Our services</h2>

          <div className="scroll-container" ref={servicesRef}>
            <div className="scroll-wrapper">

              {serviceImages.map((img, i) => (
                <div className="service-card-scroll" key={i}>

                  <div
                    className="service-img"
                    style={{ backgroundImage: `url(${img})` }}
                  ></div>

                  <div className="card-content">
                    <h3>Service {i + 1}</h3>
                    <p>Premium service</p>
                  </div>

                </div>
              ))}

            </div>
          </div>
        </div>


        <div className="weekend-banner">
          <h3>Make the most of your long weekend</h3>
          <button onClick={() => alert("Offer Applied!")}>Claim Offer →</button>
        </div>

        <h2 className="section-title">Every stay has a story</h2>
        <div className="stories-grid">

          <div className="story-card">
            <div className="card-content">
              <i className="fas fa-quote-left quote-icon"></i>

              <p className="story-text">
                "Incredible experience at the new Stanly Ranch. Auberge Resorts never
                disappoint but Stanly Ranch takes the level of hospitality to another
                level... The restaurant Bear is beautifully appointed and the pool
                cabanas, poolside beverages and food were a 10. The service was
                impeccable."
              </p>

              <div className="story-author">— John Doe, New York</div>
            </div>
          </div>

          <div className="story-card">
            <div className="card-content">
              <i className="fas fa-quote-left quote-icon"></i>

              <p className="story-text">
                "Incredible experience at the new Stanly Ranch. Auberge Resorts never
                disappoint but Stanly Ranch takes the level of hospitality to another
                level... The restaurant Bear is beautifully appointed and the pool
                cabanas, poolside beverages and food were a 10. The service was
                impeccable."
              </p>

              <div className="story-author">
                — Tony Chester, Front-end Developer
              </div>
            </div>
          </div>


          <div className="story-card">
            <div className="card-content">
              <i className="fas fa-quote-left quote-icon"></i>

              <p className="story-text">
                "Incredible experience at the new Stanly Ranch. Auberge Resorts never
                disappoint but Stanly Ranch takes the level of hospitality to another
                level... The restaurant Bear is beautifully appointed and the pool
                cabanas, poolside beverages and food were a 10. The service was
                impeccable."
              </p>

              <div className="story-author">
                — Sophia Loren, Travel Curator
              </div>
            </div>
          </div>

        </div>


        <h2 className="section-title">Inspiration, guides, stories</h2>
        <div className="blog-grid">


          <div className="blog-card">
            <div
              className="card-img"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg)`
              }}
            ></div>

            <div className="card-content">
              <p className="blog-date">6 September, 2025</p>

              <h4>
                If you're a student who is planning on attending school abroad as part
                of your studies or you're being relocated...
              </h4>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("📖 Full travel guide on our blog.");
                }}
              >
                Read more →
              </a>
            </div>
          </div>


          <div className="blog-card">
            <div
              className="card-img"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg)`
              }}
            ></div>

            <div className="card-content">
              <p className="blog-date">6 September, 2025</p>

              <h4>
                If you're a student who is planning on attending school abroad as part
                of your studies or you're being relocated...
              </h4>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("📖 Full travel guide on our blog.");
                }}
              >
                Read more →
              </a>
            </div>
          </div>


          <div className="blog-card">
            <div
              className="card-img"
              style={{
                backgroundImage: `url(https://imagesexels-photo-189296.jpeg)`
              }}
            ></div>

            <div className="card-content">
              <p className="blog-date">6 September, 2025</p>

              <h4>
                If you're a student who is planning on attending school abroad as part
                of your studies or you're being relocated...
              </h4>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("📖 Full travel guide on our blog.");
                }}
              >
                Read more →
              </a>
            </div>
          </div>

        </div>

        <div className="booking-hotel-section">
          <h3>Booking hotel room</h3>
          <button className="check-btn" onClick={() => alert("Booking...")}>
            Reserve Your Stay
          </button>
        </div>
      


      
    </>
  );
};

export default Navbar;