import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const Navbar = ({ onNavbarItemClick }) => {
  const [showTerminalPopup, setShowTerminalPopup] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const terminalInputRef = useRef(null);

  const items = [
    { abbreviation: 'HM', text: 'Home' },
    { abbreviation: 'CNTCT', text: 'Contact Us' },
    { abbreviation: 'PRJCT', text: 'Projects' },
  ];

  const handleTerminalClick = () => {
    setShowTerminalPopup(!showTerminalPopup);
    setFilterText('');
    setHighlightedIndex(-1);
    if (!showTerminalPopup) {
      setTimeout(() => terminalInputRef.current.focus(), 0);
    }
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
    setHighlightedIndex(0);
  };

  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredItems.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredItems.length - 1
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      const selectedItem = filteredItems[highlightedIndex];
      if (selectedItem) {
        onNavbarItemClick(selectedItem.text);
      }
      setFilterText('');
      setHighlightedIndex(-1);
      setShowTerminalPopup(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-item" onClick={handleTerminalClick}>{'>'}</div>
        {showTerminalPopup ? (
          <input
            ref={terminalInputRef}
            type="text"
            value={filterText}
            onChange={handleFilterChange}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            placeholder="Type to filter..."
          />
        ) : (
          <div className="navbar-item" onClick={handleTerminalClick}>Terminal</div>
        )}
        {showTerminalPopup && (
          <div className="terminal-popup">
            {filteredItems.map((item, index) => (
              <div
                key={item.abbreviation}
                className={`terminal-popup-item ${index === highlightedIndex ? 'highlighted' : ''}`}
                onClick={() => onNavbarItemClick(item.text)}
              >
                <div className="abbreviation">{item.abbreviation}</div>
                <div className="text">{item.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="navbar-center">
        {items.map(item => (
          <div key={item.abbreviation} className="navbar-item-container">
            <div className="navbar-item" onClick={() => onNavbarItemClick(item.text)}>{item.abbreviation}</div>
            <div className="navbar-popup">{item.text}</div>
          </div>
        ))}
      </div>
      <div className="navbar-right">
        <a className="navbar-item button no-underline" href="https://www.showpass.com/ubctgmembership/" target="_blank" rel="noopener noreferrer">
          Become a Member
        </a>
      </div>
    </nav>
  );
};

export default Navbar;