import React from 'react';

// A very simple component for debugging purposes.
// It uses inline styles so it does not depend on Tailwind CSS working correctly.
function App() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#1e293b',
      color: '#e2e8f0',
      fontSize: '24px',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1>If you can see this message, your build process is working. The error is inside the original App.js logic.</h1>
    </div>
  );
}

export default App;
