import React, { useState } from "react";
import "./Contact.css";

const FAQS = [
  { q: 'What are the check-in and check-out times?', a: 'Check-in is at 2:00 PM and check-out is at 12:00 PM. Early check-in and late check-out are available upon request and availability.' },
  { q: 'Is airport transfer available?', a: 'Yes, we offer luxury sedan and limousine transfers from the airport. Please contact our concierge to arrange your pickup at least 24 hours in advance.' },
  { q: 'Do you have a cancellation policy?', a: 'Free cancellation is available up to 48 hours before check-in. Cancellations within 48 hours will be charged one night\'s stay.' },
  { q: 'Is breakfast included in the room rate?', a: 'Our Deluxe and Suite room categories include complimentary buffet breakfast. Standard rooms can add breakfast for $25 per person per day.' },
  { q: 'Do you have facilities for events and weddings?', a: 'Yes! We have a stunning beachfront wedding venue and state-of-the-art conference halls that can accommodate up to 500 guests.' },
  { q: 'Is there a swimming pool?', a: 'We have an infinity pool overlooking the ocean, a children\'s pool, and a heated indoor pool. Pool service includes complimentary towels and cabana rental.' },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="hero-overlay">
          <span className="hero-label">GET IN TOUCH</span>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out and let us make your stay perfect.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-content">
        {/* Contact Form */}
        <div className="contact-form-wrapper">
          <h2 className="form-title">Send Us a Message</h2>
          {submitted && (
            <div className="success-msg">✓ Thank you! We'll get back to you within 24 hours.</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">Full Name</label>
                <input type="text" id="contact-name" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input type="email" id="contact-email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-phone">Phone Number</label>
                <input type="tel" id="contact-phone" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 234 567 890" />
              </div>
              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input type="text" id="contact-subject" value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help?" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us more about your inquiry..." required rows="5" />
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>

        {/* Info Panel */}
        <div className="contact-info-panel">
          {/* Contact Cards */}
          <div className="info-card">
            <div className="info-icon">📍</div>
            <div>
              <h4>Location</h4>
              <p>Jl. Pantai Kuta, Bali<br />Indonesia 80361</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">📞</div>
            <div>
              <h4>Phone</h4>
              <p>+62 812 3456 7890<br />24/7 Guest Support</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">✉️</div>
            <div>
              <h4>Email</h4>
              <p>stay@thebeachhotel.com<br />reservations@thebeachhotel.com</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">🕐</div>
            <div>
              <h4>Opening Hours</h4>
              <p>Reception: 24/7<br />Restaurant: 7AM – 11PM<br />Spa: 9AM – 8PM<br />Pool: 7AM – 9PM</p>
            </div>
          </div>

          {/* Map */}
          <div className="map-box">
            <iframe
              title="hotel-map"
              src="https://www.google.com/maps?q=Bali,Indonesia&output=embed"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <span className="faq-label">FAQ</span>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div className={`faq-item ${openFaq === i ? 'faq-open' : ''}`} key={i}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-toggle">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Chat Button */}
      <button className={`chat-btn ${chatOpen ? 'chat-open' : ''}`} onClick={() => setChatOpen(!chatOpen)}
        aria-label="Live Chat">
        {chatOpen ? '✕' : '💬'}
      </button>

      {/* Chat Widget */}
      {chatOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <h4>💬 Live Chat</h4>
            <span>We typically reply instantly</span>
          </div>
          <div className="chat-body">
            <div className="chat-message bot">
              <p>Hello! 👋 Welcome to The Beach Hotel. How can we help you today?</p>
            </div>
          </div>
          <div className="chat-input-wrapper">
            <input type="text" placeholder="Type your message..." className="chat-input" />
            <button className="chat-send">→</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;