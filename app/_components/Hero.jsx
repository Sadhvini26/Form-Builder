import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Hero = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Text Column */}
          <div className="col-md-6">
           
              {/* and <span className="text-primary">collect data</span> effortlessly */}
           <h1 className="fw-bold display-4">
  Build Beautiful Forms <br />
  with <span className="text-primary">Zero Code</span>
</h1>
            <p className="text-muted mt-3 fs-5">
  Easily design, edit, and preview forms in real-time. 
  Perfect for creators, teams, and developers who want quick and customizable form solutions.
</p>
          </div>

          {/* Right Image Column */}
    
        </div>
      </div>
    </div>
  );
};

export default Hero;
