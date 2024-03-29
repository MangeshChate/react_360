import React from 'react';

function ImagePositionControls({ image, onUpdatePosition }) {
  const { position } = image;

  const handlePositionChange = (axis, value) => {
    const newPosition = { ...position, [axis]: value };
    onUpdatePosition(newPosition);
  };

  return (
    <div className="image-position-controls">
      <label>
        X:
        <input
          type="number"
          value={position.x}
          onChange={(e) => handlePositionChange('x', e.target.value)}
        />
      </label>
      <label>
        Y:
        <input
          type="number"
          value={position.y}
          onChange={(e) => handlePositionChange('y', e.target.value)}
        />
      </label>
      <label>
        Z:
        <input
          type="number"
          value={position.z}
          onChange={(e) => handlePositionChange('z', e.target.value)}
        />
      </label>
    </div>
  );
}

export default ImagePositionControls;
