import React from 'react';

const ProgressBar = ({ step }) => {
  const steps = ['Login', 'Search', 'Book', 'Download'];
  const stepWidth = 100 / steps.length;
  const currentWidth = step * stepWidth;

  return (
    <div style={{ width: '100%', backgroundColor: 'red', borderRadius: '5px', height: '5px' }}>
      <div
        style={{
          width: `${currentWidth}%`,
          backgroundColor: 'black',
          height: '100%',
          borderRadius: '5px',
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;