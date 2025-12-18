import { useParams, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ComponentDetail from '../ComponentDetail';
import ComponentSidebar from '../../components/ComponentSidebar';

const buttonsData = {
    'button-1': {
        id: 'button-1',
        name: 'Glassmorphism Button',
        category: 'Buttons',
        description: 'A beautiful glassmorphism button with layered shadows and inset highlights.',
        preview: (
            <a className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-200" href="#" style={{ backgroundColor: 'rgb(245, 245, 245)', borderRadius: '10px', boxShadow: `rgba(158, 158, 158, 0.69) 0px 0.706592px 0.706592px -0.583333px, rgba(158, 158, 158, 0.68) 0px 1.80656px 1.80656px -1.16667px, rgba(158, 158, 158, 0.65) 0px 3.62176px 3.62176px -1.75px, rgba(158, 158, 158, 0.61) 0px 6.8656px 6.8656px -2.33333px, rgba(158, 158, 158, 0.52) 0px 13.6468px 13.6468px -2.91667px, rgba(158, 158, 158, 0.3) 0px 30px 30px -3.5px, rgb(255, 255, 255) 0px 3px 1px 0px inset`, color: 'rgb(0, 0, 0)' }}>See Our Services</a>
        ),
        code: `<a 
  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-200" 
  href="#" 
  style={{ 
    backgroundColor: 'rgb(245, 245, 245)', 
    borderRadius: '10px', 
    boxShadow: \`rgba(158, 158, 158, 0.69) 0px 0.706592px 0.706592px -0.583333px, 
                rgba(158, 158, 158, 0.68) 0px 1.80656px 1.80656px -1.16667px, 
                rgba(158, 158, 158, 0.65) 0px 3.62176px 3.62176px -1.75px, 
                rgba(158, 158, 158, 0.61) 0px 6.8656px 6.8656px -2.33333px, 
                rgba(158, 158, 158, 0.52) 0px 13.6468px 13.6468px -2.91667px, 
                rgba(158, 158, 158, 0.3) 0px 30px 30px -3.5px, 
                rgb(255, 255, 255) 0px 3px 1px 0px inset\`, 
    color: 'rgb(0, 0, 0)' 
  }}
>
  See Our Services
</a>`,
        usage: `<a href="#" className="glassmorphism-button">See Our Services</a>`,
    },
    'button-2': {
        id: 'button-2',
        name: 'Neumorphism Join Button',
        category: 'Buttons',
        description: 'A soft neumorphism button with inset and outset shadows for a 3D effect.',
        preview: (
            <button type="submit" className="px-8 py-4 text-base font-medium transition-all duration-200" style={{ backgroundColor: 'rgb(236, 237, 241)', borderRadius: '100px', boxShadow: '-3px -3px 6px 0px rgb(250, 251, 255), 3px 3px 6px 0px rgba(0, 125, 252, 0.15)', border: 'none', cursor: 'pointer', color: 'rgb(0, 125, 252)' }}>Join</button>
        ),
        code: `<button 
  type="submit" 
  className="px-8 py-4 text-base font-medium transition-all duration-200" 
  style={{ 
    backgroundColor: 'rgb(236, 237, 241)', 
    borderRadius: '100px', 
    boxShadow: '-3px -3px 6px 0px rgb(250, 251, 255), 3px 3px 6px 0px rgba(0, 125, 252, 0.15)', 
    border: 'none', 
    cursor: 'pointer', 
    color: 'rgb(0, 125, 252)' 
  }}
>
  Join
</button>`,
        usage: `<button className="neumorphism-button">Join</button>`,
    },
    'button-3': {
        id: 'button-3',
        name: 'Neumorphism CTA Button',
        category: 'Buttons',
        description: 'A vibrant purple CTA button that turns black on hover.',
        preview: (
            <a
                href="#"
                className="pointer-events-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-300"
                style={{ borderRadius: '50px', boxShadow: 'rgb(250, 251, 255) -5px -5px 10px 0px, rgba(166, 171, 189, 0.5) 5px 5px 10px 0px', color: 'rgb(255, 255, 255)', textDecoration: 'none' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(0, 0, 0)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(109, 122, 255)'}
                ref={(el) => { if (el) el.style.backgroundColor = 'rgb(109, 122, 255)'; }}
            >
                See plans
            </a>
        ),
        code: `<a 
  href="#" 
  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-300" 
  style={{ 
    backgroundColor: 'rgb(109, 122, 255)', 
    borderRadius: '50px', 
    boxShadow: 'rgb(250, 251, 255) -5px -5px 10px 0px, rgba(166, 171, 189, 0.5) 5px 5px 10px 0px', 
    color: 'rgb(255, 255, 255)', 
    textDecoration: 'none' 
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(0, 0, 0)'}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(109, 122, 255)'}
>
  See plans
</a>`,
        usage: `<a href="#plans" className="neumorphism-cta-button">See plans</a>`,
    },
    'button-4': {
        id: 'button-4',
        name: 'White Request Access Button',
        category: 'Buttons',
        description: 'A clean white button with dark text and rounded corners.',
        preview: (
            <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-200" style={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: '12px', color: 'rgb(20, 20, 20)', textDecoration: 'none' }}>Request Access</a>
        ),
        code: `<a 
  href="#" 
  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-200" 
  style={{ 
    backgroundColor: 'rgb(255, 255, 255)', 
    borderRadius: '12px', 
    color: 'rgb(20, 20, 20)', 
    textDecoration: 'none' 
  }}
>
  Request Access
</a>`,
        usage: `<a href="/request-access" className="white-cta-button">Request Access</a>`,
        darkPreview: true,
    },
    'button-5': {
        id: 'button-5',
        name: 'Get Started Button with Icon',
        category: 'Buttons',
        description: 'An orange CTA button with arrow icon, hover animations, and layered shadows.',
        preview: (
            <a href="#" className="relative inline-flex items-center justify-center gap-3 px-6 py-3 text-base font-medium transition-all duration-300 overflow-hidden group" style={{ backgroundColor: 'rgb(254, 77, 12)', borderRadius: '50px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0.796192px 2.38858px -0.5px, rgba(0, 0, 0, 0.106) 0px 2.41451px 7.24352px -1px, rgba(0, 0, 0, 0.118) 0px 6.38265px 19.148px -1.5px, rgba(0, 0, 0, 0.15) 0px 20px 60px -2px', color: 'rgb(255, 255, 255)', textDecoration: 'none' }}>
                <span className="relative z-10">Get started</span>
                <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" style={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgb(0, 0, 0)">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                    </svg>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ borderRadius: '50px' }} />
            </a>
        ),
        code: `<a 
  href="#" 
  className="relative inline-flex items-center justify-center gap-3 px-6 py-3 text-base font-medium transition-all duration-300 overflow-hidden group" 
  style={{ 
    backgroundColor: 'rgb(254, 77, 12)', 
    borderRadius: '50px', 
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0.796192px 2.38858px -0.5px, rgba(0, 0, 0, 0.106) 0px 2.41451px 7.24352px -1px, rgba(0, 0, 0, 0.118) 0px 6.38265px 19.148px -1.5px, rgba(0, 0, 0, 0.15) 0px 20px 60px -2px', 
    color: 'rgb(255, 255, 255)', 
    textDecoration: 'none' 
  }}
>
  <span className="relative z-10">Get started</span>
  <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" style={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgb(0, 0, 0)">
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
  </div>
  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ borderRadius: '50px' }} />
</a>`,
        usage: `<a href="#pricing" className="get-started-button">Get started</a>`,
    },
    'button-6': {
        id: 'button-6',
        name: 'Gradient Contact Button',
        category: 'Buttons',
        description: 'A button with white to gray gradient background and dark text.',
        preview: (
            <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-200" style={{ background: 'linear-gradient(180deg, rgb(255, 255, 255) 0%, rgb(120, 120, 120) 140%)', borderRadius: '100px', color: 'rgb(10, 10, 10)', textDecoration: 'none' }}>Contact Now</a>
        ),
        code: `<a 
  href="#" 
  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-200" 
  style={{ 
    background: 'linear-gradient(180deg, rgb(255, 255, 255) 0%, rgb(120, 120, 120) 140%)', 
    borderRadius: '100px', 
    color: 'rgb(10, 10, 10)', 
    textDecoration: 'none' 
  }}
>
  Contact Now
</a>`,
        usage: `<a href="/contact" className="gradient-button">Contact Now</a>`,
        darkPreview: true,
    },
    'button-7': {
        id: 'button-7',
        name: 'Gradient Text Button',
        category: 'Buttons',
        description: 'A sophisticated button with layered gradients, complex shadows, and Hello text.',
        preview: (
            <button
                className="relative inline-flex items-center justify-center w-16 h-16 transition-all duration-200"
                style={{
                    background: 'linear-gradient(rgb(255, 255, 255) 0%, rgb(201, 201, 201) 8.99493%, rgb(161, 161, 161) 31.8804%, rgb(117, 117, 117) 73%, rgb(255, 255, 255) 100%)',
                    borderRadius: '40px',
                    boxShadow: 'rgba(0, 0, 0, 0) 0.0671842px 1.00776px 0.505px 0px, rgba(0, 0, 0, 0) 0.159238px 2.38858px 1.19694px 0px, rgba(0, 0, 0, 0.01) 0.290467px 4.35701px 2.18334px 0px, rgba(0, 0, 0, 0.01) 0.482901px 7.24352px 3.6298px 0px, rgba(0, 0, 0, 0.02) 0.779846px 11.6977px 5.86183px 0px, rgba(0, 0, 0, 0.03) 1.27653px 19.148px 9.59523px 0px, rgba(0, 0, 0, 0.05) 2.1981px 32.9715px 16.5223px 0px, rgba(0, 0, 0, 0.1) 4px 60px 30.0666px 0px',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                <div
                    className="absolute inset-1 flex items-center justify-center"
                    style={{
                        background: 'linear-gradient(150deg, rgb(208, 208, 208) 0%, rgb(204, 204, 204) 50.1724%, rgb(200, 200, 200) 100%)',
                        borderRadius: '37px',
                        boxShadow: 'rgba(0, 0, 0, 0) 2px 4px 5px 0px inset'
                    }}
                >
                    <span className="text-sm font-medium" style={{ color: 'rgb(0, 0, 0)' }}>Hello</span>
                </div>
            </button>
        ),
        code: `<button 
  className="relative inline-flex items-center justify-center w-16 h-16 transition-all duration-200" 
  style={{ 
    background: 'linear-gradient(rgb(255, 255, 255) 0%, rgb(201, 201, 201) 8.99493%, rgb(161, 161, 161) 31.8804%, rgb(117, 117, 117) 73%, rgb(255, 255, 255) 100%)', 
    borderRadius: '40px', 
    boxShadow: 'rgba(0, 0, 0, 0) 0.0671842px 1.00776px 0.505px 0px, rgba(0, 0, 0, 0) 0.159238px 2.38858px 1.19694px 0px, rgba(0, 0, 0, 0.01) 0.290467px 4.35701px 2.18334px 0px, rgba(0, 0, 0, 0.01) 0.482901px 7.24352px 3.6298px 0px, rgba(0, 0, 0, 0.02) 0.779846px 11.6977px 5.86183px 0px, rgba(0, 0, 0, 0.03) 1.27653px 19.148px 9.59523px 0px, rgba(0, 0, 0, 0.05) 2.1981px 32.9715px 16.5223px 0px, rgba(0, 0, 0, 0.1) 4px 60px 30.0666px 0px',
    border: 'none',
    cursor: 'pointer'
  }}
>
  <div 
    className="absolute inset-1 flex items-center justify-center" 
    style={{ 
      background: 'linear-gradient(150deg, rgb(208, 208, 208) 0%, rgb(204, 204, 204) 50.1724%, rgb(200, 200, 200) 100%)', 
      borderRadius: '37px', 
      boxShadow: 'rgba(0, 0, 0, 0) 2px 4px 5px 0px inset' 
    }}
  >
    <span className="text-sm font-medium" style={{ color: 'rgb(0, 0, 0)' }}>Hello</span>
  </div>
</button>`,
        usage: `<button className="gradient-text-button">Hello</button>`,
        darkPreview: true,
    },
    'button-8': {
        id: 'button-8',
        name: 'Book A Call Button',
        category: 'Buttons',
        description: 'A sophisticated button with radial gradient, border, inset shadow, icon, and decorative corner lines that appear on hover.',
        preview: (
            <a
                href="#"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium transition-all duration-200"
                style={{
                    background: 'radial-gradient(100% 150% at 50% 50%, rgb(1, 1, 13) 0%, rgb(24, 24, 37) 100%)',
                    borderRadius: '8px',
                    border: '1px solid rgba(184, 184, 255, 0.4)',
                    boxShadow: 'rgba(105, 105, 150, 0.4) 0px 0px 12px 0px inset',
                    color: 'rgb(240, 240, 255)',
                    textDecoration: 'none'
                }}
            >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="rgb(240, 240, 255)">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                </svg>
                <span>Book A Call</span>
                <div className="absolute top-0 left-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderTop: '2px solid rgb(240, 240, 255)', borderLeft: '2px solid rgb(240, 240, 255)' }} />
                <div className="absolute top-0 right-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderTop: '2px solid rgb(240, 240, 255)', borderRight: '2px solid rgb(240, 240, 255)' }} />
                <div className="absolute bottom-0 left-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderBottom: '2px solid rgb(240, 240, 255)', borderLeft: '2px solid rgb(240, 240, 255)' }} />
                <div className="absolute bottom-0 right-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderBottom: '2px solid rgb(240, 240, 255)', borderRight: '2px solid rgb(240, 240, 255)' }} />
            </a>
        ),
        code: `<a 
  href="#" 
  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium transition-all duration-200" 
  style={{ 
    background: 'radial-gradient(100% 150% at 50% 50%, rgb(1, 1, 13) 0%, rgb(24, 24, 37) 100%)', 
    borderRadius: '8px', 
    border: '1px solid rgba(184, 184, 255, 0.4)', 
    boxShadow: 'rgba(105, 105, 150, 0.4) 0px 0px 12px 0px inset', 
    color: 'rgb(240, 240, 255)', 
    textDecoration: 'none' 
  }}
>
  <svg viewBox="0 0 24 24" width="20" height="20" fill="rgb(240, 240, 255)">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
  </svg>
  <span>Book A Call</span>
  <div className="absolute top-0 left-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderTop: '2px solid rgb(240, 240, 255)', borderLeft: '2px solid rgb(240, 240, 255)' }} />
  <div className="absolute top-0 right-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderTop: '2px solid rgb(240, 240, 255)', borderRight: '2px solid rgb(240, 240, 255)' }} />
  <div className="absolute bottom-0 left-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderBottom: '2px solid rgb(240, 240, 255)', borderLeft: '2px solid rgb(240, 240, 255)' }} />
  <div className="absolute bottom-0 right-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderBottom: '2px solid rgb(240, 240, 255)', borderRight: '2px solid rgb(240, 240, 255)' }} />
</a>`,
        usage: `<a href="/contact" className="book-call-button">Book A Call</a>`,
        darkPreview: true,
    },
    'button-9': {
        id: 'button-9',
        name: 'Google Play Button',
        category: 'Buttons',
        description: 'A button with gray rotated background, dark foreground, green text, rounded right corners, and text scramble effect on hover.',
        preview: (
            <a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium transition-all duration-200 overflow-visible pointer-events-auto"
                style={{
                    backgroundColor: 'rgb(18, 18, 18)',
                    borderTopRightRadius: '50px',
                    borderBottomRightRadius: '50px',
                    color: 'rgb(89, 255, 0)',
                    textDecoration: 'none',
                    border: 'none'
                }}
                onMouseEnter={(e) => {
                    const target = e.currentTarget.querySelector('.scramble-text') as HTMLElement;
                    if (target) {
                        const originalText = 'GOOGLE PLAY';
                        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                        let iteration = 0;
                        const interval = setInterval(() => {
                            target.innerText = originalText.split('').map((char, index) => {
                                if (char === ' ') return ' ';
                                if (index < iteration) return originalText[index];
                                return chars[Math.floor(Math.random() * chars.length)];
                            }).join('');
                            if (iteration >= originalText.length) clearInterval(interval);
                            iteration += 1 / 3;
                        }, 30);
                    }
                }}
            >
                <div className="absolute inset-0 -z-10" style={{ backgroundColor: 'rgb(217, 217, 217)', transform: 'rotate(7deg)', transformOrigin: 'center' }} />
                <span className="scramble-text relative z-10">GOOGLE PLAY</span>
            </a>
        ),
        code: `<a 
  href="https://play.google.com/store/apps" 
  target="_blank" 
  rel="noopener" 
  className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium transition-all duration-200 overflow-visible" 
  style={{ 
    backgroundColor: 'rgb(18, 18, 18)', 
    borderTopRightRadius: '50px', 
    borderBottomRightRadius: '50px', 
    color: 'rgb(89, 255, 0)', 
    textDecoration: 'none', 
    border: 'none' 
  }}
  onMouseEnter={(e) => {
    const target = e.currentTarget.querySelector('.scramble-text');
    if (target) {
      const originalText = 'GOOGLE PLAY';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let iteration = 0;
      const interval = setInterval(() => {
        target.innerText = originalText.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) return originalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        if (iteration >= originalText.length) clearInterval(interval);
        iteration += 1/3;
      }, 30);
    }
  }}
>
  <div className="absolute inset-0 -z-10" style={{ backgroundColor: 'rgb(217, 217, 217)', transform: 'rotate(7deg)', transformOrigin: 'center' }} />
  <span className="scramble-text relative z-10">GOOGLE PLAY</span>
</a>`,
        usage: `<a href="https://play.google.com/store/apps" className="google-play-button">GOOGLE PLAY</a>`,
        darkPreview: true,
    },
    'button-10': {
        id: 'button-10',
        name: 'VSCode Magnetic Button',
        category: 'Buttons',
        description: 'An interactive button with magnetic repel effect, VSCode icon, floating particles, and shimmer animations.',
        preview: <MagneticVSCodeButton />,
        code: `// Magnetic VSCode Button Component
function MagneticVSCodeButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState('translate(0px, 0px)');

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - buttonCenterX;
      const distanceY = e.clientY - buttonCenterY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      
      const maxDistance = 150;
      if (distance < maxDistance) {
        const strength = 1 - distance / maxDistance;
        const moveX = -distanceX * strength * 0.3;
        const moveY = -distanceY * strength * 0.3;
        setTransform(\`translate(\${moveX}px, \${moveY}px)\`);
      } else {
        setTransform('translate(0px, 0px)');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <button
      ref={buttonRef}
      className="group relative overflow-hidden rounded-2xl px-8 py-5 text-base font-semibold tracking-tight transition-all duration-500 transform hover:scale-105 active:scale-98 flex items-center gap-3 cursor-pointer min-w-[280px] justify-center shadow-xl hover:shadow-2xl bg-white border-2 border-orange-200 text-gray-900 pointer-events-auto"
      style={{ transform }}
    >
      <span className="relative z-10 flex items-center gap-3">
        <div className="flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          {/* VSCode Icon SVG */}
        </div>
        <div className="flex flex-col items-start">
          <span className="font-bold leading-tight group-hover:tracking-wide transition-all duration-300">Open in VSCode</span>
          <span className="text-sm font-medium opacity-70 group-hover:opacity-90 transition-opacity duration-300 text-orange-500">Install Extension</span>
        </div>
      </span>
    </button>
  );
}`,
        usage: `<MagneticVSCodeButton />`,
        darkPreview: true,
    },
    'button-11': {
        id: 'button-11',
        name: '3D Get Started Button',
        category: 'Buttons',
        description: 'A button with 3D layered effect using green shadow that pops up on hover.',
        preview: (
            <div className="relative w-full md:w-auto pointer-events-auto">
                <div className="absolute inset-0 bg-[rgb(143,228,87)] -translate-x-1 translate-y-1 rounded-md" />
                <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md relative w-full px-8 py-4 h-auto text-base font-medium bg-white text-black hover:bg-white transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5"
                    aria-label="Get Started"
                >
                    <span>Get Started</span>
                </button>
            </div>
        ),
        code: `<div className="relative w-full md:w-auto">
  <div className="absolute inset-0 bg-[rgb(143,228,87)] -translate-x-1 translate-y-1 rounded-md" />
  <button 
    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md relative w-full px-8 py-4 h-auto text-base font-medium bg-white text-black hover:bg-white transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5"
    aria-label="Get Started"
  >
    <span>Get Started</span>
  </button>
</div>`,
        usage: `<button className="3d-button">Get Started</button>`,
        darkPreview: true,
    },
};

// Magnetic VSCode Button Component
function MagneticVSCodeButton() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [transform, setTransform] = useState('translate(0px, 0px)');

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const buttonCenterX = rect.left + rect.width / 2;
            const buttonCenterY = rect.top + rect.height / 2;

            const distanceX = e.clientX - buttonCenterX;
            const distanceY = e.clientY - buttonCenterY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            const maxDistance = 150;
            if (distance < maxDistance) {
                const strength = 1 - distance / maxDistance;
                const moveX = -distanceX * strength * 0.3;
                const moveY = -distanceY * strength * 0.3;
                setTransform(`translate(${moveX}px, ${moveY}px)`);
            } else {
                setTransform('translate(0px, 0px)');
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <button
            ref={buttonRef}
            className="group relative overflow-hidden rounded-2xl px-8 py-5 text-base font-semibold tracking-tight transition-all duration-500 transform hover:scale-105 active:scale-98 flex items-center gap-3 cursor-pointer min-w-[280px] justify-center shadow-xl hover:shadow-2xl bg-white border-2 border-orange-200 text-gray-900 pointer-events-auto"
            style={{ transform }}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(251, 192, 101, 0.15) 0%, transparent 70%)' }} />
            </div>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(251, 192, 101, 0.2), transparent 70%)' }} />
            <span className="relative z-10 flex items-center gap-3">
                <div className="flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <svg className="w-10 h-10 drop-shadow-lg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                        <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
                            <path fillRule="evenodd" clipRule="evenodd" d="M70.9119 99.3171C72.4869 99.9307 74.2828 99.8914 75.8725 99.1264L96.4608 89.2197C98.6242 88.1787 100 85.9892 100 83.5872V16.4133C100 14.0113 98.6243 11.8218 96.4609 10.7808L75.8725 0.873756C73.7862 -0.130129 71.3446 0.11576 69.5135 1.44695C69.252 1.63711 69.0028 1.84943 68.769 2.08341L29.3551 38.0415L12.1872 25.0096C10.589 23.7965 8.35363 23.8959 6.86933 25.2461L1.36303 30.2549C-0.452552 31.9064 -0.454633 34.7627 1.35853 36.417L16.2471 50.0001L1.35853 63.5832C-0.454633 65.2374 -0.452552 68.0938 1.36303 69.7453L6.86933 74.7541C8.35363 76.1043 10.589 76.2037 12.1872 74.9905L29.3551 61.9587L68.769 97.9167C69.3925 98.5406 70.0638 99.0104 70.8511 99.3171ZM75.0152 27.2989L45.1091 50.0001L75.0152 72.7012V27.2989Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0)">
                            <path d="M96.4614 10.7962L75.8569 0.875542C73.4719 -0.272773 70.6217 0.211611 68.75 2.08333L1.29858 63.5832C-0.515693 65.2373 -0.513607 68.0937 1.30308 69.7452L6.81272 74.754C8.29793 76.1043 10.5347 76.2037 12.1338 74.9905L93.3609 13.3699C96.086 11.3026 100 13.2462 100 16.6667V16.4275C100 14.0265 98.6246 11.8378 96.4614 10.7962Z" fill="#0065A9" />
                            <path d="M96.4614 89.2038L75.8569 99.1245C73.4719 100.273 70.6217 99.7884 68.75 97.9167L1.29858 36.4169C-0.515693 34.7627 -0.513607 31.9063 1.30308 30.2548L6.81272 25.246C8.29793 23.8958 10.5347 23.7964 12.1338 25.0095L93.3609 86.6301C96.086 88.6974 100 86.7538 100 83.3334V83.5726C100 85.9735 98.6246 88.1622 96.4614 89.2038Z" fill="#007ACC" />
                            <path d="M75.8578 99.1263C73.4721 100.274 70.6219 99.7885 68.75 97.9166C71.0564 100.223 75 98.5895 75 95.3278V4.67213C75 1.41039 71.0564 -0.223106 68.75 2.08329C70.6219 0.211402 73.4721 -0.273666 75.8578 0.873633L96.4587 10.7807C98.6234 11.8217 100 14.0112 100 16.4132V83.5871C100 85.9891 98.6234 88.1786 96.4586 89.2196L75.8578 99.1263Z" fill="#1F9CF0" />
                        </g>
                    </svg>
                </div>
                <div className="flex flex-col items-start">
                    <span className="font-bold leading-tight group-hover:tracking-wide transition-all duration-300">Open in VSCode</span>
                    <span className="text-sm font-medium opacity-70 group-hover:opacity-90 transition-opacity duration-300 text-orange-500">Install Extension</span>
                </div>
                <div className="ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <path d="M7 4L13 10L7 16" stroke="#fbc065" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </span>
        </button>
    );
}

function ButtonsGridView() {
    const navigate = useNavigate();
    const buttonsList = Object.values(buttonsData);

    return (
        <div className="min-h-screen bg-[#0a0118] flex overflow-hidden">
            <ComponentSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="border-b border-white/10 bg-[#0a0118]/80 backdrop-blur-sm sticky top-0 z-40 flex-shrink-0">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-4 flex-1 max-w-2xl">
                            <div className="relative flex-1">
                                <input type="text" placeholder="Search Components..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-colors" />
                            </div>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="px-6 py-12">
                        <div className="max-w-7xl mx-auto mb-12">
                            <h1 className="text-5xl font-bold mb-4">Buttons</h1>
                            <p className="text-xl text-gray-400">Click on any button to view its code and documentation</p>
                        </div>
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {buttonsList.map((button) => (
                                <div key={button.id} onClick={() => navigate(`/others/buttons/${button.id}`)} className="group text-left cursor-pointer">
                                    <div className="relative bg-[#0d0520] rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300 h-full">
                                        <div className="p-6 pb-4">
                                            <h3 className="text-xl font-semibold mb-1 text-white">{button.name}</h3>
                                            <p className="text-sm text-gray-400">{button.category}</p>
                                        </div>
                                        <div className="px-6 pb-6">
                                            <div className={`rounded-xl p-12 flex items-center justify-center min-h-[250px] pointer-events-none ${button.darkPreview ? 'bg-black' : 'bg-white'}`}>
                                                {button.preview}
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function ButtonDetailView({ buttonId }: { buttonId: string }) {
    const navigate = useNavigate();
    const button = buttonsData[buttonId as keyof typeof buttonsData];

    if (!button) {
        return (
            <div className="min-h-screen bg-[#0a0118] flex overflow-hidden">
                <ComponentSidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Button Not Found</h1>
                        <button onClick={() => navigate('/others/buttons')} className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mx-auto">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Buttons
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ComponentDetail
            title={button.name}
            description={button.description}
            preview={
                <div>
                    <button onClick={() => navigate('/others/buttons')} className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back to all buttons
                    </button>
                    <div className={`rounded-xl p-12 flex items-center justify-center min-h-[300px] ${button.darkPreview ? 'bg-black' : 'bg-white'}`}>
                        {button.preview}
                    </div>
                </div>
            }
            code={button.code}
            usage={button.usage}
            props={[]}
            dependencies={[]}
        />
    );
}

export default function Buttons() {
    const { buttonId } = useParams();

    if (buttonId) {
        return <ButtonDetailView buttonId={buttonId} />;
    }

    return <ButtonsGridView />;
}
