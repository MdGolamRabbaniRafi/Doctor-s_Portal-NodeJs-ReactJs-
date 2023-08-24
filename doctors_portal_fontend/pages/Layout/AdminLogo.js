export default function AdminLogo({ AdminlogoPath }) {
    return (
      <div className="HomeLogo">
        <header>
          <div className="avatar indicator py-3">
            <div className="w-20 h-20 rounded-lg">
              {/* Use the AdminlogoPath prop here */}
              <img src={AdminlogoPath} width={70} height={70} alt="Doctor Portal" style={{ borderRadius: '50%' }} />
            </div>
          </div>
        </header>
      </div>
    );
  }
  