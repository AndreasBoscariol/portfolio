import React from 'react';

const HomeBox = () => (
  <div>
    <Typical
      steps={['', 1000, 'CONTACT ME', 2000]}
      loop={1}
      wrapper="h1"
    />
    <Fade delay={2000}>
      <div className='content'>
        <h2>Get in Touch</h2>
        <p> Feel free to email me if you have any projects, ideas, or opportunities you'd like to chat about.</p>
        <p>
          📧 <a href="mailto:andreasboscariol@gmail.com">andreasboscariol@gmail.com</a>
        </p>
        <div className='spacer'></div>
        <h2>Download My Resume</h2>
        <p> Interested in learning more about my background, skills, and experience? Please click the link below to download a copy of my resume.</p>
        <p>
            📄 <a href="/ab_resume.pdf">Download Resume</a>
        </p>
      </div>
    </Fade>
  </div>
);

export default HomeBox;