import React, { useRef, useEffect, useState } from 'react';
import 'aframe';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import mountain from './models/mountain.glb';

function App() {
  const loader = new GLTFLoader();
  const mountainRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [randomInfo, setRandomInfo] = useState('');

  useEffect(() => {
    loader.load(mountain, (d) => {
      const mountainEntity = mountainRef.current.object3D;
      mountainEntity.add(d.scene);
    });
  }, [loader]);

  const images = [
    { id: 1, src: 'https://miro.medium.com/v2/resize:fit:1200/0*j7sVnq-dE0XWdS12.jpeg', info: 'Information 1' },
    { id: 2, src: 'https://www.pinkvilla.com/pics/480x270/128469247_one-piece-episode-1071-release-date_202308.jpg', info: 'Information 2' },
    { id: 3, src: 'https://wallpapers-clan.com/wp-content/uploads/2023/11/one-piece-angry-monkey-d-luffy-desktop-wallpaper-preview.jpg', info: 'Information 3' },
    // Add more images as needed
  ];

  const handleMouseEnterImage = (imageId) => {
    setSelectedImage(imageId);
  };

  const handleMouseLeaveImage = () => {
    setSelectedImage(null);
  };

  const handleButtonClick = () => {
    // Generate random information about the selected image
    const randomIndex = Math.floor(Math.random() * 3); // Adjust as needed based on the number of random information items
    const randomInformation = ['Information 1', 'Information 2', 'Information 3']; // Sample information
    setRandomInfo(randomInformation[randomIndex]);
    setShowPopup(true);
  };

  return (
    <a-scene cursor="rayOrigin: mouse">
      <a-assets>
        <img id="sky" src="https://images.pond5.com/360-vr-space-video-flying-088396598_prevstill.jpeg" />
      </a-assets>
      <a-sky color="#FFFFFF" material="src: #sky" rotation="0 0 0" />
      <a-entity
        color="#FFFFFF"
        id="mountain"
        position="0 0 0"
        scale="15 15 15"
        ref={mountainRef}
      />
      {images.map((image) => (
        <a-entity
          key={image.id}
          position={`${image.id * 5 - 7} 2 -5`}
          events={{
            mouseenter: () => handleMouseEnterImage(image.id),
            mouseleave: handleMouseLeaveImage
          }}
        >
          <a-image
            src={image.src}
            width="3"
            height="2"
            style={{ cursor: 'pointer' }}
            events={{
              click: () => handleButtonClick(image.id)
            }}
          />
          {/* UI elements within the image */}
          {selectedImage === image.id && (
            <a-entity
              geometry="primitive: plane; width: 2; height: 1"
              material={`color: ${showPopup ? 'yellow' : 'white'}; opacity: 0.8`}
              position="0 0 -0.01"
              events={{
                click: handleButtonClick
              }}
            >
              <a-text
                value="Show Information"
                align="center"
                color="#000000"
                position="0 0 0.05"
              />
            </a-entity>
          )}
        </a-entity>
      ))}
      {showPopup && (
        <a-entity
          id="infoPanel"
          position="0 0 0.5"
          visible="true"
          scale="0.001 0.001 0.001"
          geometry="primitive: plane; width: 1.5; height: 1.8"
          material="color: #333333; shader: flat; transparent: false"
          class="raycastable"
        >
          {/* Display popup content here */}
        </a-entity>
      )}
    </a-scene>
  );
}

export default App;
