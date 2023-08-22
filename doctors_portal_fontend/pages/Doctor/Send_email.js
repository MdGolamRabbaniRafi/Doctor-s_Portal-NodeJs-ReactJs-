import React from 'react';

export default function Send_email() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Send Email</h1>
      <form style={{ maxWidth: '300px', width: '100%', padding: '10px', boxSizing: 'border-box' }}>
        <label htmlFor="Subject">Subject:</label>
        <input type="text" id="Subject" name="Subject" style={{ width: '100%', padding: '8px', marginBottom: '10px', color: 'black' }} />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" style={{ width: '100%', padding: '8px', marginBottom: '10px', color: 'black' }} />

      

        <input type="submit" value="Send" style={{ width: '100%', padding: '8px', color: 'white', background: 'blue' }} />
      </form>
    </div>
  );
}