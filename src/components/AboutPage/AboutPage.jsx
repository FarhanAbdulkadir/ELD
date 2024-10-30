import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>
        <div>ELD, or  electronic logging device, is mandated by the FMCSA
           for trucking companies to track commercial vehicles.  It  monitors hours, 
           locations, and  inspections. The application allows the dispatch to see the current location of the truck,
            and the driver’s available hours, allowing them to assign loads more efficiently. 
            This application not only ensures compliance but also enhances operational effectiveness. </div>
       
      </div>
    </div>
  );
}

export default AboutPage;
