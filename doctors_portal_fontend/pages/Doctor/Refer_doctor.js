import React from 'react';

export default function Refer_doctor() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Refer Doctor</h1>
      <form style={{ maxWidth: '300px', width: '100%', padding: '10px', boxSizing: 'border-box' }}>
        <label htmlFor="Doctor_name">Doctor Name:</label>
        <input type="text" id="Doctor_name" name="Doctor_name" style={{ width: '100%', padding: '8px', marginBottom: '10px', color: 'black' }} />
        <label htmlFor="Refer_id">Refer Id:</label>
        <input type="text" id="Refer_id" name="Refer_id" style={{ width: '100%', padding: '8px', marginBottom: '10px', color: 'black' }} />

      

        <input type="submit" value="Refer" style={{ width: '100%', padding: '8px', color: 'white', background: 'blue' }} />
      </form>
    </div>
  );
}