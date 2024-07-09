const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h2 className="contact-us-title">Contact Us</h2>
      <form className="contact-us-form">
        <input 
          type="email" 
          className="contact-us-input" 
          placeholder="Enter your email here" 
          required 
        />
        <button type="submit" className="contact-us-button">Subscribe</button>
      </form>
    </div>
  );
};

// Just button for email subscription for now

export default ContactUs;
