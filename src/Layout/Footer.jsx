import React from 'react'

function Footer() {
  return (
    <div>
      <footer>
        <div className="container">

          <div className="footer-grid">


            <div>
              <div className="footer-logo">THE BEACH HOTEL</div>
              <p>Your perfect beachfront escape on Bali's golden coast.</p>

              <div className="social-icons">
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </div>


            <div>
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Rooms & Suites</a></li>
                <li><a href="#">Offers & Packages</a></li>
                <li><a href="#">Dining</a></li>
                <li><a href="#">Spa & Wellness</a></li>
                <li><a href="#">Weddings & Events</a></li>
                <li><a href="#">Gallery</a></li>
              </ul>
            </div>


            <div>
              <h4>Contact Info</h4>
              <p><i className="fas fa-map-marker-alt"></i> Jalan Pantai Indah, Seminyak, Bali</p>
              <p><i className="fas fa-phone-alt"></i> +62 812 3456 7890</p>
              <p><i className="fas fa-envelope"></i> stay@thebeachhotel.com</p>
              <p><i className="fas fa-clock"></i> 24/7 Guest Support</p>
            </div>

            {/* LEGAL */}
            <div>
              <h4>Legal & Policies</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cancellation Policy</a></li>
                <li><a href="#">Accessibility</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>

          </div>


          <div className="copyright">
            <p>
              © 2025 The Beach Hotel — Perfect Beachfront Destination. All rights reserved. |
              Designed with <span style={{ color: "#c89d66" }}>♥</span> for unforgettable stays
            </p>
          </div>

        </div>
      </footer>
    </div>
  )
}

export default Footer
