import React, { useState } from "react";
import "../css/SponsorsList.css";

function SponsorsList(props) {
  // State to keep track of the selected sponsor
  const [selectedSponsor, setSelectedSponsor] = useState(null);

  const handleSelect = (sponsor) => {
    setSelectedSponsor(sponsor);
    props.onSelect(sponsor);
  };

  return (
    <div className="sponsorsList">
      {props.sponsors.map((sponsor) => {
        const imageName = `${sponsor.name.replace(/\s+/g, '').replace(/\./g, '')}.jpeg`;
        const jpegImagePath = `./images/companies/${imageName}`;

        return (
          <div
            key={sponsor.id}
            onClick={() => handleSelect(sponsor)}
            className={`sponsorItem ${
              selectedSponsor === sponsor ? "selected" : ""
            }`}
          >
            <div className="sponsorContent">
              <div className="sponsorText">
                <h3>{sponsor.role}</h3>
                <h4>{sponsor.name}</h4>
              </div>
              <img src={jpegImagePath}
                alt={sponsor.name}
                className="sponsorImage" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SponsorsList;
