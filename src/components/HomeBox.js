import React from 'react';
import Typical from 'react-typical';
import Fade from 'react-reveal/Fade';
import './HomeBox.css';

const HomeBox = () => (
  <div>
    <Typical
      steps={['', 1000, 'Andreas Boscariol', 2000]}
      loop={1}
      wrapper="h1"
    />
    <Fade delay={2000}>
      <div className='content'>
        <h2>Chemical Engineering @ UBC</h2>
      </div>
    </Fade>
  </div>
);

export default HomeBox;