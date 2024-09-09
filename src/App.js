import React, { useEffect, useState, Suspense } from 'react';
import './App.css';
import { dragElement } from './scripts/drag';
import { addResizeListeners } from './scripts/resize';
import Navbar from './components/Navbar';

const componentMapping = {
  'Home': React.lazy(() => import('./components/HomeBox')),
  'Projects': React.lazy(() => import('./components/AboutBox')),
  'Contact': React.lazy(() => import('./components/ContactBox')),
};

function App() {
  const [visibleBoxes, setVisibleBoxes] = useState([]);
  const [activeBox, setActiveBox] = useState(null);
  const [newBoxId, setNewBoxId] = useState(null);  // Track the newly added box ID

  const setInitialPosition = (boxId) => {
    const moveableElement = document.getElementById(boxId);
    if (moveableElement) {
      const screenWidth = window.innerWidth;
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const initialTop = navbarHeight + 20;
      const initialLeft = (screenWidth / 2) - (moveableElement.offsetWidth / 2);
      moveableElement.style.top = `${initialTop}px`;
      moveableElement.style.left = `${initialLeft}px`;
    }
  };

  const expandBox = (boxId) => {
    const moveableElement = document.getElementById(boxId);
    if (moveableElement) {
      moveableElement.style.transition = 'width 1s ease, height 1s ease, left 1s ease, top 1s ease';
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const newWidth = Math.max(screenWidth - 100, 500);
      const newHeight = Math.max(screenHeight - 100, 500);
      const newLeft = (screenWidth / 2) - (newWidth / 2);
      moveableElement.style.width = `${newWidth}px`;
      moveableElement.style.height = `${newHeight}px`;
      moveableElement.style.left = `${newLeft}px`;
      setTimeout(() => {
        moveableElement.style.transition = '';
      }, 1000);
    }
  };

  useEffect(() => {
    if (newBoxId) {
      setInitialPosition(newBoxId);
      dragElement(document.getElementById(newBoxId));
      addResizeListeners(document.getElementById(newBoxId));
      setTimeout(() => expandBox(newBoxId), 100);
    }
  }, [newBoxId]);

  // Add "Home" box on initial load
  useEffect(() => {
    const initialBox = { id: `moveable-Home-${Date.now()}`, component: 'Home' };
    setVisibleBoxes([initialBox]);
    setActiveBox(initialBox.id);
    setNewBoxId(initialBox.id);
  }, []);

  const handleBoxClose = (boxId) => {
    setVisibleBoxes((prevVisibleBoxes) => {
      const updatedBoxes = prevVisibleBoxes.filter(box => box.id !== boxId);
      if (activeBox === boxId) {
        setActiveBox(updatedBoxes.length > 0 ? updatedBoxes[updatedBoxes.length - 1].id : null);
      }
      return updatedBoxes;
    });
  };

  const handleNavbarItemClick = (item) => {
    const existingBox = visibleBoxes.find(box => box.component === item);
    if (existingBox) {
      setInitialPosition(existingBox.id);
      const moveableElement = document.getElementById(existingBox.id);
      if (moveableElement) {
        moveableElement.style.width = 'initial';
        moveableElement.style.height = 'initial';
      }
      setActiveBox(existingBox.id);
      expandBox(existingBox.id);  // Expand the box after resetting its size
    } else {
      const newBox = { id: `moveable-${item}-${Date.now()}`, component: item };
      setVisibleBoxes([...visibleBoxes, newBox]);
      setActiveBox(newBox.id);
      setNewBoxId(newBox.id);  // Track the newly added box ID
    }
  };

  const handleBoxClick = (boxId) => {
    setActiveBox(boxId);
  };

  return (
    <div className="App">
      <Navbar onNavbarItemClick={handleNavbarItemClick} />
      {visibleBoxes.map((box) => {
        const BoxComponent = componentMapping[box.component];
        const isActive = box.id === activeBox;
        return (
          <div
            key={box.id}
            id={box.id}
            className={`moveable Main ${isActive ? 'active' : 'inactive'}`}
            style={{ zIndex: isActive ? 999 : 1 }}
            onClick={() => handleBoxClick(box.id)}
          >
            <div className="moveableheader" onClick={(e) => { e.stopPropagation(); handleBoxClick(box.id); }}>
              {box.component}
              <span className="close-button" onClick={() => handleBoxClose(box.id)}>X</span>
            </div>
            {isActive && <>
              <div className="resize-handle top"></div>
              <div className="resize-handle right"></div>
              <div className="resize-handle bottom"></div>
              <div className="resize-handle left"></div>
              <div className="resize-handle top-left"></div>
              <div className="resize-handle top-right"></div>
              <div className="resize-handle bottom-left"></div>
              <div className="resize-handle bottom-right"></div>
            </>}
            <div className="Main-content">
              <Suspense fallback={<div>Loading...</div>}>
                {BoxComponent && <BoxComponent />}
              </Suspense>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;