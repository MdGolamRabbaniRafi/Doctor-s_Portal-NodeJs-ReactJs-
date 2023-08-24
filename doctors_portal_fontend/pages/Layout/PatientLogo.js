import React from 'react';

export default function PatiLogo({ patientLogoPath }) {
  return (
    <div className="HomeLogo">
      <header>
        <div className="avatar indicator py-3">
          <div className="w-20 h-20 rounded-lg">
            <img src={patientLogoPath} width={70} height={70} alt="Patient Portal" style={{ borderRadius: '50%' }} />
          </div>
        </div>
      </header>
    </div>
  );
}
