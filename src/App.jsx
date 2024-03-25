import React, { useRef, useEffect, useState } from 'react';
import 'aframe';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import mountain from './models/mountain.glb';
import sky from "./assets/sky.jpg"

function App() {
  const loader = new GLTFLoader();
  const mountainRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0, z: 0 });
  const [popupInfo, setPopupInfo] = useState('');
  const [lookingAtObject, setLookingAtObject] = useState(null); // Flag for gaze-based interaction

  useEffect(() => {
    loader.load(mountain, (d) => {
      const mountainEntity = mountainRef.current.object3D;
      mountainEntity.add(d.scene);
    });
  }, [loader]);

  const images = [
    { id: 1, src: 'https://miro.medium.com/v2/resize:fit:1200/0*j7sVnq-dE0XWdS12.jpeg', info: 'Information 1' },
    { id: 2, src: 'https://static.wikia.nocookie.net/onepiece/images/8/87/One_Piece_Anime_Logo.png', info: 'Information 2' },
    { id: 3, src: 'https://i0.wp.com/www.toonsmag.com/wp-content/uploads/2023/09/naruto-1249229.jpg', info: 'Information 3' },
    // Add more images as needed
  ];

  const handleImageClick = (position, info, id) => {
    const imagePosition = images.find(image => image.id === id);
    const popupX = imagePosition ? imagePosition.id * 5 - 7 : 0;
    const popupY = 2;
    const popupZ = -5;

    setShowPopup(true);
    setPopupPosition({ x: popupX, y: popupY, z: popupZ });
    setPopupInfo(info);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleButtonClick = () => {
    alert('Button clicked!');
  };

  const handleTouchMove = (evt) => {
    const touch = evt.touches[0];
    const lastTouchX = useRef(null);
    const lastTouchY = useRef(null);

    if (!lastTouchX.current || !lastTouchY.current) {
      lastTouchX.current = touch.clientX;
      lastTouchY.current = touch.clientY;
      return;
    }

    const deltaX = touch.clientX - lastTouchX.current;
    const deltaY = touch.clientY - lastTouchY.current;
    lastTouchX.current = touch.clientX;
    lastTouchY.current = touch.clientY;

    const camera = document.querySelector('a-entity[camera]').object3D;

    // Adjust the movement factor to control the sensitivity of movement
    const movementFactor = 0.01;

    // Update camera position based on swipe delta for horizontal and vertical movement
    camera.position.x += deltaX * movementFactor;
    camera.position.z += deltaY * movementFactor; // For forward and backward movement
  };

  const handleCursorIntersection = (evt) => {
    const intersectedEntity = evt.detail.intersected;
    setLookingAtObject(intersectedEntity); // Update flag if looking at something interactive
  };

  const handleTouchEnd = (evt) => {
    if (lookingAtObject) {
      handleImageClick(lookingAtObject.object3D.position, lookingAtObject.getAttribute('data-info'), lookingAtObject.id); // Trigger interaction based on intersected object
      setLookingAtObject(null); // Reset flag
    }
  };

  useEffect(() => {
    document.addEventListener('touchmove', handleTouchMove);
    document.querySelector('a-scene').addEventListener('raycaster-intersection', handleCursorIntersection);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.querySelector('a-scene').removeEventListener('raycaster-intersection', handleCursorIntersection);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div style={{paddingTop:"100px"}}>
      <a-scene cursor="rayOrigin: mouse" >
        <a-assets>
          <img id="sky" src={sky} />
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
          <a-image
            key={image.id}
            src={image.src}
            width="3"
            height="2"
            position={`${image.id * 5 - 7} 2 -5`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleImageClick({ x: 0, y: 2, z: -5 }, image.info, image.id)}
          />
        ))}
        {showPopup && (
          <a-entity
            id="infoPanel"
            position={`${popupPosition.x} ${popupPosition.y} ${popupPosition.z}`}
            geometry="primitive: plane; width: 4; height: 2; radius: 0.1"
            material="color: #ffffff; shader: flat; opacity: 0.7; transparent: true"
          >
            {/* Close button */}
            <a-entity
              id="closeButton"
              position="1.7 0.9 0.01"
              geometry="primitive: plane; width: 0.5; height: 0.5"
              material="color: #ff0000; shader: flat"
              onClick={handleClosePopup}
              events={{ click: handleClosePopup }}
            >
              <a-text value="X" align="center" color="#ffffff"></a-text>
            </a-entity>

            {/* Popup content */}
            <a-text value={popupInfo} align="center" color="black" wrap-count="20" position="0 0.5 0.3"></a-text>

            {/* Button */}
            <a-entity
              id="popupButton"
              position="0 -0.5 0.1"
              geometry="primitive: plane; width: 2; height: 0.5"
              material="color: #0088ff; shader: flat"
              onClick={handleButtonClick}
            >
              <a-text value="Click Me!" align="center" color="#ffffff"></a-text>
            </a-entity>
          </a-entity>
        )}
      </a-scene>
    </div>
  );
}

export default App;
