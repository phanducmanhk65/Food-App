import React from 'react';

const Toggle = ({ isToggled, onToggle }) => {
  return (
    <div>
      <button onClick={onToggle}>
        {isToggled ? 'Turn off' : 'Turn on'}
      </button>
      {/* {isToggled && <p>The toggle is on!</p>} */}
    </div>
  );
};

export default Toggle;
