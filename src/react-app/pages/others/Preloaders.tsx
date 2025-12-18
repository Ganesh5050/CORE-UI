import { useParams, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import ComponentDetail from '../ComponentDetail';
import ComponentSidebar from '../../components/ComponentSidebar';

const preloadersData = {
  'preloader-1': {
    id: 'preloader-1',
    name: 'Ripple Logo Preloader',
    category: 'Preloaders',
    description: 'A preloader with ripple animation effect and centered logo.',
    preview: (
      <div className="relative w-full h-96 flex items-center justify-center bg-black rounded-xl">
        <style>{`
          @keyframes ripple {
            0% {
              transform: scale(1);
              box-shadow: rgba(0, 0, 0, 0.3) 0 10px 10px 0;
            }
            50% {
              transform: scale(1.3);
              box-shadow: rgba(0, 0, 0, 0.3) 0 30px 20px 0;
            }
            100% {
              transform: scale(1);
              box-shadow: rgba(0, 0, 0, 0.3) 0 10px 10px 0;
            }
          }
          @keyframes color-change {
            0% { opacity: 0.7; }
            50% { opacity: 1; }
            100% { opacity: 0.7; }
          }
          .ripple-box {
            position: absolute;
            background: linear-gradient(0deg, rgba(50, 50, 50, 0.2) 0%, rgba(100, 100, 100, 0.2) 100%);
            border-radius: 50%;
            border-top: 1px solid rgb(100, 100, 100);
            box-shadow: rgba(0, 0, 0, 0.3) 0 10px 10px 0;
            backdrop-filter: blur(5px);
            animation: ripple 2s infinite ease-in-out;
          }
        `}</style>
        <div className="relative h-64 w-64 flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center z-[999]" style={{ animation: 'color-change 2s infinite ease-in-out' }}>
            <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path fillRule="evenodd" clipRule="evenodd" d="M16.5 12L13 14.333V19L20 14.333V9.667L13 5V9.667L16.5 12Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.41598 9.04293C6.07132 8.81319 5.60568 8.90635 5.37593 9.25102C5.14619 9.59568 5.23935 10.0613 5.58402 10.2911L6.41598 9.04293ZM12.584 14.9571C12.9287 15.1868 13.3943 15.0936 13.6241 14.749C13.8538 14.4043 13.7606 13.9387 13.416 13.7089L12.584 14.9571ZM6.75 9.667C6.75 9.25279 6.41421 8.917 6 8.917C5.58579 8.917 5.25 9.25279 5.25 9.667H6.75ZM5.25 14.333C5.25 14.7472 5.58579 15.083 6 15.083C6.41421 15.083 6.75 14.7472 6.75 14.333H5.25ZM5.58395 9.04298C5.23932 9.27275 5.1462 9.73841 5.37598 10.083C5.60575 10.4277 6.07141 10.5208 6.41605 10.291L5.58395 9.04298ZM13.416 5.62402C13.7607 5.39425 13.8538 4.92859 13.624 4.58395C13.3942 4.23932 12.9286 4.1462 12.584 4.37598L13.416 5.62402ZM13.416 10.2911C13.7606 10.0613 13.8538 9.59568 13.6241 9.25102C13.3943 8.90635 12.9287 8.81319 12.584 9.04293L13.416 10.2911ZM5.58402 13.7089C5.23935 13.9387 5.14619 14.4043 5.37593 14.749C5.60568 15.0936 6.07132 15.1868 6.41598 14.9571L5.58402 13.7089ZM6.41605 13.709C6.07141 13.4792 5.60575 13.5723 5.37598 13.917C5.1462 14.2616 5.23932 14.7272 5.58395 14.957L6.41605 13.709ZM12.584 19.624C12.9286 19.8538 13.3942 19.7607 13.624 19.416C13.8538 19.0714 13.7607 18.6058 13.416 18.376L12.584 19.624ZM20.416 10.2911C20.7606 10.0613 20.8538 9.59568 20.6241 9.25102C20.3943 8.90635 19.9287 8.81319 19.584 9.04293L20.416 10.2911ZM16.5 12L16.084 11.3759C15.8753 11.515 15.75 11.7492 15.75 12C15.75 12.2508 15.8753 12.485 16.084 12.6241L16.5 12ZM19.584 14.9571C19.9287 15.1868 20.3943 15.0936 20.6241 14.749C20.8538 14.4043 20.7606 13.9387 20.416 13.7089L19.584 14.9571ZM5.58402 10.2911L12.584 14.9571L13.416 13.7089L6.41598 9.04293L5.58402 10.2911ZM5.25 9.667V14.333H6.75V9.667H5.25ZM6.41605 10.291L13.416 5.62402L12.584 4.37598L5.58395 9.04298L6.41605 10.291ZM12.584 9.04293L5.58402 13.7089L6.41598 14.9571L13.416 10.2911L12.584 9.04293ZM5.58395 14.957L12.584 19.624L13.416 18.376L6.41605 13.709L5.58395 14.957ZM19.584 9.04293L16.084 11.3759L16.916 12.6241L20.416 10.2911L19.584 9.04293ZM16.084 12.6241L19.584 14.9571L20.416 13.7089L16.916 11.3759L16.084 12.6241Z" fill="#ffffff" />
            </svg>
          </div>
          <div className="ripple-box w-1/4 aspect-square z-[99]" />
          <div className="ripple-box z-[98]" style={{ inset: '30%', borderColor: 'rgba(100, 100, 100, 0.8)', animationDelay: '0.2s' }} />
          <div className="ripple-box z-[97]" style={{ inset: '20%', borderColor: 'rgba(100, 100, 100, 0.6)', animationDelay: '0.4s' }} />
          <div className="ripple-box z-[96]" style={{ inset: '10%', borderColor: 'rgba(100, 100, 100, 0.4)', animationDelay: '0.6s' }} />
          <div className="ripple-box z-[95]" style={{ inset: '0', borderColor: 'rgba(100, 100, 100, 0.2)', animationDelay: '0.8s' }} />
        </div>
      </div>
    ),
    code: `// Ripple Logo Preloader
function RipplePreloader() {
  return (
    <div id="pre-load" className="loader">
      <div className="loader-inner">
        <div className="loader-logo">
          <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M16.5 12L13 14.333V19L20 14.333V9.667L13 5V9.667L16.5 12Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.41598 9.04293C6.07132 8.81319 5.60568 8.90635 5.37593 9.25102C5.14619 9.59568 5.23935 10.0613 5.58402 10.2911L6.41598 9.04293ZM12.584 14.9571C12.9287 15.1868 13.3943 15.0936 13.6241 14.749C13.8538 14.4043 13.7606 13.9387 13.416 13.7089L12.584 14.9571ZM6.75 9.667C6.75 9.25279 6.41421 8.917 6 8.917C5.58579 8.917 5.25 9.25279 5.25 9.667H6.75ZM5.25 14.333C5.25 14.7472 5.58579 15.083 6 15.083C6.41421 15.083 6.75 14.7472 6.75 14.333H5.25ZM5.58395 9.04298C5.23932 9.27275 5.1462 9.73841 5.37598 10.083C5.60575 10.4277 6.07141 10.5208 6.41605 10.291L5.58395 9.04298ZM13.416 5.62402C13.7607 5.39425 13.8538 4.92859 13.624 4.58395C13.3942 4.23932 12.9286 4.1462 12.584 4.37598L13.416 5.62402ZM13.416 10.2911C13.7606 10.0613 13.8538 9.59568 13.6241 9.25102C13.3943 8.90635 12.9287 8.81319 12.584 9.04293L13.416 10.2911ZM5.58402 13.7089C5.23935 13.9387 5.14619 14.4043 5.37593 14.749C5.60568 15.0936 6.07132 15.1868 6.41598 14.9571L5.58402 13.7089ZM6.41605 13.709C6.07141 13.4792 5.60575 13.5723 5.37598 13.917C5.1462 14.2616 5.23932 14.7272 5.58395 14.957L6.41605 13.709ZM12.584 19.624C12.9286 19.8538 13.3942 19.7607 13.624 19.416C13.8538 19.0714 13.7607 18.6058 13.416 18.376L12.584 19.624ZM20.416 10.2911C20.7606 10.0613 20.8538 9.59568 20.6241 9.25102C20.3943 8.90635 19.9287 8.81319 19.584 9.04293L20.416 10.2911ZM16.5 12L16.084 11.3759C15.8753 11.515 15.75 11.7492 15.75 12C15.75 12.2508 15.8753 12.485 16.084 12.6241L16.5 12ZM19.584 14.9571C19.9287 15.1868 20.3943 15.0936 20.6241 14.749C20.8538 14.4043 20.7606 13.9387 20.416 13.7089L19.584 14.9571ZM5.58402 10.2911L12.584 14.9571L13.416 13.7089L6.41598 9.04293L5.58402 10.2911ZM5.25 9.667V14.333H6.75V9.667H5.25ZM6.41605 10.291L13.416 5.62402L12.584 4.37598L5.58395 9.04298L6.41605 10.291ZM12.584 9.04293L5.58402 13.7089L6.41598 14.9571L13.416 10.2911L12.584 9.04293ZM5.58395 14.957L12.584 19.624L13.416 18.376L6.41605 13.709L5.58395 14.957ZM19.584 9.04293L16.084 11.3759L16.916 12.6241L20.416 10.2911L19.584 9.04293ZM16.084 12.6241L19.584 14.9571L20.416 13.7089L16.916 11.3759L16.084 12.6241Z" fill="#ffffff" />
          </svg>
        </div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
    </div>
  );
}

// Add this CSS to your stylesheet
/*
#pre-load {
  background: #000;
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
}
#pre-load .loader-inner {
  --loader-background: linear-gradient(0deg, rgba(50, 50, 50, 0.2) 0%, rgba(100, 100, 100, 0.2) 100%);
  position: relative;
  height: 250px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
#pre-load .loader-inner .loader-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: color-change 2s infinite ease-in-out;
  z-index: 999;
}
#pre-load .loader-inner .loader-logo svg {
  width: 100%;
  height: 100%;
}
#pre-load .loader-inner .box {
  position: absolute;
  background: var(--loader-background);
  border-radius: 50%;
  border-top: 1px solid rgb(100, 100, 100);
  box-shadow: rgba(0, 0, 0, 0.3) 0 10px 10px 0;
  backdrop-filter: blur(5px);
  animation: ripple 2s infinite ease-in-out;
}
#pre-load .loader-inner .box:nth-child(1) {
  width: 25%;
  aspect-ratio: 1/1;
  z-index: 99;
}
#pre-load .loader-inner .box:nth-child(2) {
  inset: 30%;
  z-index: 98;
  border-color: rgba(100, 100, 100, 0.8);
  animation-delay: 0.2s;
}
#pre-load .loader-inner .box:nth-child(3) {
  inset: 20%;
  z-index: 97;
  border-color: rgba(100, 100, 100, 0.6);
  animation-delay: 0.4s;
}
#pre-load .loader-inner .box:nth-child(4) {
  inset: 10%;
  z-index: 96;
  border-color: rgba(100, 100, 100, 0.4);
  animation-delay: 0.6s;
}
#pre-load .loader-inner .box:nth-child(5) {
  inset: 0;
  z-index: 95;
  border-color: rgba(100, 100, 100, 0.2);
  animation-delay: 0.8s;
}
@keyframes ripple {
  0% {
    transform: scale(1);
    box-shadow: rgba(0, 0, 0, 0.3) 0 10px 10px 0;
  }
  50% {
    transform: scale(1.3);
    box-shadow: rgba(0, 0, 0, 0.3) 0 30px 20px 0;
  }
  100% {
    transform: scale(1);
    box-shadow: rgba(0, 0, 0, 0.3) 0 10px 10px 0;
  }
}
@keyframes color-change {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
}
*/`,
    usage: `<RipplePreloader />`,
    darkPreview: true,
  },
  'preloader-2': {
    id: 'preloader-2',
    name: 'Neumorphic Squares',
    category: 'Preloaders',
    description: 'Four squares moving in a circular pattern with neumorphic design and loading dots.',
    preview: (
      <div className="relative w-full h-96 flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl">
        <div className="relative w-48 h-48 flex items-center justify-center mb-12">
          <div className="absolute w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-neumorphic" style={{ top: '2.5rem', left: '2.5rem' }}></div>
          <div className="absolute w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-neumorphic" style={{ top: '2.5rem', left: '6.5rem' }}></div>
          <div className="absolute w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-neumorphic" style={{ top: '6.5rem', left: '6.5rem' }}></div>
          <div className="absolute w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-neumorphic" style={{ top: '6.5rem', left: '2.5rem' }}></div>
        </div>
        <div className="text-gray-800 text-lg font-medium">
          Loading<span className="animate-pulse">.</span><span className="animate-pulse delay-100">.</span><span className="animate-pulse delay-200">.</span>
        </div>
        <style>{`
                    .shadow-neumorphic {
                        box-shadow: 
                            0.15em 0.15em 0.15em rgba(255,255,255,0.9) inset,
                            -0.15em -0.15em 0.15em rgba(114,114,116,0.5) inset,
                            0.25em 0.25em 0.5em rgba(114,114,116,0.5),
                            -0.25em -0.25em 0.5em rgba(255,255,255,0.9);
                    }
                `}</style>
      </div>
    ),
    code: `// Neumorphic Squares Preloader
function NeumorphicPreloader() {
  return (
    <main>
      <div className="preloader">
        <div className="preloader__square"></div>
        <div className="preloader__square"></div>
        <div className="preloader__square"></div>
        <div className="preloader__square"></div>
      </div>
      <div className="status">
        Loading
        <span className="status__dot">.</span>
        <span className="status__dot">.</span>
        <span className="status__dot">.</span>
      </div>
    </main>
  );
}

// Add this CSS to your stylesheet
/*
:root {
  --fg: #17181c;
  --shade1: #727274;
  --shade2: #cccdd1;
  --shade3: #f3f4f8;
  --shade4: #ffffff;
  --dur1: 1s;
  --dur2: 6s;
}

body {
  background-image: linear-gradient(145deg, var(--shade3), var(--shade2));
  color: var(--fg);
  display: flex;
  font: 1em/1.5 Hind, sans-serif;
  flex-direction: column;
  height: 100vh;
}

main {
  margin: auto;
}

.preloader {
  animation: largePopOut var(--dur1) linear;
  border-radius: 50%;
  box-shadow:
    0.15em 0.15em 0.15em var(--shade4) inset,
    -0.15em -0.15em 0.15em var(--shade1) inset,
    1em 1em 2em var(--shade1), 
    -1em -1em 2em var(--shade4);
  margin-bottom: 3em;
  position: relative;
  width: 12em;
  height: 12em;
}

.preloader__square {
  animation: smallPopOut1 var(--dur1) linear, popInOut var(--dur2) var(--dur1) linear infinite;
  border-radius: 0.5em;
  box-shadow:
    0.15em 0.15em 0.15em var(--shade4) inset,
    -0.15em -0.15em 0.15em var(--shade1) inset,
    0.25em 0.25em 0.5em var(--shade1),
    -0.25em -0.25em 0.5em var(--shade4);
  position: absolute;
  top: 2.5em;
  left: 2.5em;
  width: 3em;
  height: 3em;
}

.preloader__square:nth-child(n + 2):nth-child(-n + 3) {
  left: 6.5em;
}

.preloader__square:nth-child(n + 3) {
  top: 6.5em;
}

.preloader__square:nth-child(2) {
  animation: smallPopOut2 var(--dur1) linear, move2 var(--dur2) var(--dur1) linear infinite;
}

.preloader__square:nth-child(3) {
  animation: smallPopOut3 var(--dur1) linear, move3 var(--dur2) var(--dur1) linear infinite;
}

.preloader__square:nth-child(4) {
  animation: smallPopOut4 var(--dur1) linear, move4 var(--dur2) var(--dur1) linear infinite;
}

.status {
  animation: fadeIn var(--dur1) linear forwards;
  text-align: center;
}

.status__dot {
  animation: appear1 var(--dur1) var(--dur1) steps(1,start) infinite;
  display: inline-block;
}

.status__dot:nth-child(2) {
  animation: appear2 var(--dur1) var(--dur1) steps(1,start) infinite;
}

.status__dot:nth-child(3) {
  animation: appear3 var(--dur1) var(--dur1) steps(1,start) infinite;
}

@keyframes popInOut {
  from {
    box-shadow:
      0.15em 0.15em 0.15em var(--shade4) inset,
      -0.15em -0.15em 0.15em var(--shade1) inset,
      0.25em 0.25em 0.5em var(--shade1),
      -0.25em -0.25em 0.5em var(--shade4);
    transform: translate(0,0);
  }
  4% {
    box-shadow:
      0.15em 0.15em 0.15em var(--shade4) inset,
      -0.15em -0.15em 0.15em var(--shade1) inset,
      0.5em 0.5em 0.5em var(--shade1),
      -0.5em -0.5em 1em var(--shade4);
    transform: translate(0,0);
  }
  8% {
    box-shadow:
      0 0 0 var(--shade4) inset,
      0 0 0 var(--shade1) inset,
      0 0 0 var(--shade1),
      0 0 0 var(--shade4);
    transform: translate(0,0);
  }
  12%, 16% {
    box-shadow:
      0 0 0 var(--shade4) inset,
      0 0 0 var(--shade1) inset,
      0 0 0 var(--shade1),
      0 0 0 var(--shade4);
    transform: translate(4em,0);
  }
  20% {
    box-shadow:
      0.15em 0.15em 0.15em var(--shade4) inset,
      -0.15em -0.15em 0.15em var(--shade1) inset,
      0.5em 0.5em 0.5em var(--shade1),
      -0.5em -0.5em 1em var(--shade4);
    transform: translate(4em,0);
  }
  24%, 25% {
    box-shadow:
      0.15em 0.15em 0.15em var(--shade4) inset,
      -0.15em -0.15em 0.15em var(--shade1) inset,
      0.25em 0.25em 0.5em var(--shade1),
      -0.25em -0.25em 0.5em var(--shade4);
    transform: translate(4em,0);
  }
}

@keyframes move2 {
  from, 8% {
    transform: translate(0,0);
    width: 3em;
    height: 3em;
  }
  12% {
    transform: translate(-4em,0);
    width: 7em;
    height: 3em;
  }
  16%, 83% {
    transform: translate(-4em,0);
    width: 3em;
    height: 3em;
  }
  87% {
    transform: translate(-4em,0);
    width: 3em;
    height: 7em;
  }
  91%, to {
    transform: translate(-4em,4em);
    width: 3em;
    height: 3em;
  }
}

@keyframes fadeIn {
  from, 67% {
    opacity: 0;
  }
  83.3%, to {
    opacity: 1;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --fg: #e3e4e8;
    --shade1: #23252a;
    --shade2: #3e424c;
    --shade3: #4a4e5a;
    --shade4: #686e7e;
  }
}
*/`,
    usage: `<NeumorphicPreloader />`,
    darkPreview: false,
  },
  'preloader-3': {
    id: 'preloader-3',
    name: 'Circular Balls',
    category: 'Preloaders',
    description: 'Animated balls moving up and down in a circular pattern with neumorphic design.',
    preview: (
      <div className="relative w-full h-96 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
        <style>{`
          @keyframes ballMove {
            0% { transform: translateY(0); }
            50% { transform: translateY(12em); }
            100% { transform: translateY(0); }
          }
          .ball-animated {
            width: 1.15em;
            height: 1.15em;
            box-shadow:
              rgba(0, 0, 0, 0.17) 0px -10px 10px 0px inset,
              rgba(0, 0, 0, 0.15) 0px -15px 15px 0px inset,
              rgba(0, 0, 0, 0.1) 0px -40px 20px 0px inset,
              rgba(0, 0, 0, 0.06) 0px 2px 1px,
              rgba(0, 0, 0, 0.09) 0px 4px 2px,
              rgba(0, 0, 0, 0.09) 0px 8px 4px,
              rgba(0, 0, 0, 0.09) 0px 16px 8px,
              rgba(0, 0, 0, 0.09) 0px 32px 16px;
            border-radius: 50%;
            background-color: rgb(232, 232, 232);
            animation: ballMove 3.63s ease-in-out infinite;
          }
          .track {
            position: absolute;
            width: 1.15em;
            height: 13em;
            border-radius: 50px;
            background: #e0e0e0;
          }
          .track:after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 1.15em;
            height: 5em;
            background: #e0e0e0;
            border-radius: 50px;
            border: 1px solid #e2e2e2;
            box-shadow:
              inset 5px 5px 15px #d3d2d2ab,
              inset -5px -5px 15px #e9e9e9ab;
            mask-image: linear-gradient(to bottom, black calc(100% - 48px), transparent 100%);
          }
          .track::before {
            content: "";
            position: absolute;
            bottom: 0;
            right: 0;
            width: 1.15em;
            height: 4.5em;
            background: #e0e0e0;
            border-radius: 50px;
            border: 1px solid #e2e2e2;
            box-shadow:
              inset 5px 5px 15px #d3d2d2ab,
              inset -5px -5px 15px #e9e9e9ab;
            mask-image: linear-gradient(to top, black calc(100% - 48px), transparent 100%);
          }
        `}</style>
        <div className="relative w-52 h-52">
          {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((rotation, index) => (
            <div key={index} className="track absolute" style={{ transform: `rotate(${rotation}deg)` }}>
              <div className="ball-animated" style={{ animationDelay: `${index * 0.2}s` }} />
            </div>
          ))}
        </div>
      </div>
    ),
    code: `// Circular Balls Preloader
function CircularBallsPreloader() {
  return (
    <div className="main">
      <div className="up">
        <div className="loaders">
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
        </div>
        <div className="loadersB">
          <div className="loaderA"><div className="ball0"></div></div>
          <div className="loaderA"><div className="ball1"></div></div>
          <div className="loaderA"><div className="ball2"></div></div>
          <div className="loaderA"><div className="ball3"></div></div>
          <div className="loaderA"><div className="ball4"></div></div>
          <div className="loaderA"><div className="ball5"></div></div>
          <div className="loaderA"><div className="ball6"></div></div>
          <div className="loaderA"><div className="ball7"></div></div>
          <div className="loaderA"><div className="ball8"></div></div>
        </div>
      </div>
    </div>
  );
}

// Add this CSS to your stylesheet
/*
.main {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loaders,
.loadersB {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  position: absolute;
  width: 1.15em;
  height: 13em;
  border-radius: 50px;
  background: #e0e0e0;
}

.loader:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 1.15em;
  height: 5em;
  background: #e0e0e0;
  border-radius: 50px;
  border: 1px solid #e2e2e2;
  box-shadow:
    inset 5px 5px 15px #d3d2d2ab,
    inset -5px -5px 15px #e9e9e9ab;
  mask-image: linear-gradient(
    to bottom,
    black calc(100% - 48px),
    transparent 100%
  );
}

.loader::before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1.15em;
  height: 4.5em;
  background: #e0e0e0;
  border-radius: 50px;
  border: 1px solid #e2e2e2;
  box-shadow:
    inset 5px 5px 15px #d3d2d2ab,
    inset -5px -5px 15px #e9e9e9ab;
  mask-image: linear-gradient(
    to top,
    black calc(100% - 48px),
    transparent 100%
  );
}

.loaderA {
  position: absolute;
  width: 1.15em;
  height: 13em;
  border-radius: 50px;
  background: transparent;
}

.ball0, .ball1, .ball2, .ball3, .ball4,
.ball5, .ball6, .ball7, .ball8, .ball9 {
  width: 1.15em;
  height: 1.15em;
  box-shadow:
    rgba(0, 0, 0, 0.17) 0px -10px 10px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -15px 15px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -40px 20px 0px inset,
    rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px,
    0px -1px 15px -8px rgba(0, 0, 0, 0.09);
  border-radius: 50%;
  transition: transform 800ms cubic-bezier(1, -0.4, 0, 1.4);
  background-color: rgb(232, 232, 232);
  animation: 3.63s move ease-in-out infinite;
}

.loader:nth-child(2) { transform: rotate(20deg); }
.loader:nth-child(3) { transform: rotate(40deg); }
.loader:nth-child(4) { transform: rotate(60deg); }
.loader:nth-child(5) { transform: rotate(80deg); }
.loader:nth-child(6) { transform: rotate(100deg); }
.loader:nth-child(7) { transform: rotate(120deg); }
.loader:nth-child(8) { transform: rotate(140deg); }
.loader:nth-child(9) { transform: rotate(160deg); }

.loaderA:nth-child(2) { transform: rotate(20deg); }
.loaderA:nth-child(3) { transform: rotate(40deg); }
.loaderA:nth-child(4) { transform: rotate(60deg); }
.loaderA:nth-child(5) { transform: rotate(80deg); }
.loaderA:nth-child(6) { transform: rotate(100deg); }
.loaderA:nth-child(7) { transform: rotate(120deg); }
.loaderA:nth-child(8) { transform: rotate(140deg); }
.loaderA:nth-child(9) { transform: rotate(160deg); }

.ball1 { animation-delay: 0.2s; }
.ball2 { animation-delay: 0.4s; }
.ball3 { animation-delay: 0.6s; }
.ball4 { animation-delay: 0.8s; }
.ball5 { animation-delay: 1s; }
.ball6 { animation-delay: 1.2s; }
.ball7 { animation-delay: 1.4s; }
.ball8 { animation-delay: 1.6s; }
.ball9 { animation-delay: 1.8s; }

@keyframes move {
  0% { transform: translateY(0em); }
  50% { transform: translateY(12em); }
  100% { transform: translateY(0em); }
}
*/`,
    usage: `<CircularBallsPreloader />`,
    darkPreview: false,
  },
  'preloader-4': {
    id: 'preloader-4',
    name: 'Pulse Gradient',
    category: 'Preloaders',
    description: 'A pulsing loader with gradient center and expanding border animation.',
    preview: (
      <div className="relative w-full h-96 flex items-center justify-center bg-white rounded-xl">
        <style>{`
          @keyframes pulse-border {
            0% {
              border: 3px solid #fff;
            }
            50% {
              border: 40px solid #fff;
            }
            100% {
              border: 3px solid #fff;
            }
          }
          @keyframes pulse-inner {
            0% {
              height: 30px;
              width: 30px;
            }
            50% {
              height: 53.33333px;
              width: 53.33333px;
            }
            100% {
              height: 30px;
              width: 30px;
            }
          }
          .pulse-loader {
            height: 80px;
            width: 80px;
            border: 3px solid #e5e5e5;
            border-radius: 50%;
            animation: pulse-border 1200ms ease-in-out infinite;
            position: relative;
          }
          .pulse-inner {
            display: block;
            height: 40px;
            width: 40px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            background: linear-gradient(180deg, rgb(0, 140, 255) 0%, rgb(218, 67, 218) 100%);
            border-radius: 50%;
            animation: pulse-inner 1200ms ease-in-out infinite;
            animation-delay: 600ms;
            box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
          }
        `}</style>
        <div className="pulse-loader">
          <div className="pulse-inner"></div>
        </div>
      </div>
    ),
    code: `// Pulse Gradient Preloader
function PulseGradientPreloader() {
  return (
    <div className="loader-box">
      <div className="loading-wrapper">
        <div className="loader">
          <div className="loader-inner"></div>
        </div>
      </div>
    </div>
  );
}

// Add this CSS to your stylesheet
/*
.loader-box {
  background: #fff;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.loading-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.loading-wrapper .loader {
  height: 80px;
  width: 80px;
  border: 3px solid #e5e5e5;
  border-radius: 50%;
  animation: pulse1572 1200ms ease-in-out;
  animation-iteration-count: infinite;
}

.loading-wrapper .loader .loader-inner {
  display: block;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: linear-gradient(180deg, rgb(0, 140, 255) 0%, rgb(218, 67, 218) 100%);
  transform-origin: 50% 50%;
  border-radius: 50%;
  animation: innerPulse934 1200ms ease-in-out;
  animation-iteration-count: infinite;
  animation-delay: 600ms;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}

@keyframes pulse1572 {
  0% {
    border: 3px solid #fff;
  }
  50% {
    border: 40px solid #fff;
  }
  100% {
    border: 3px solid #fff;
  }
}

@keyframes innerPulse934 {
  0% {
    height: 30px;
    width: 30px;
  }
  50% {
    height: 53.33333px;
    width: 53.33333px;
  }
  100% {
    height: 30px;
    width: 30px;
  }
}
*/`,
    usage: `<PulseGradientPreloader />`,
    darkPreview: false,
  },
  'preloader-5': {
    id: 'preloader-5',
    name: 'Neumorphic Spinner',
    category: 'Preloaders',
    description: 'A 3D neumorphic loader with rotating gradient and soft shadows.',
    preview: (
      <div className="relative w-full h-96 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl">
        <style>{`
          @keyframes spin-gradient {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          .neuro-loader {
            position: relative;
            width: 200px;
            height: 200px;
            background: #c9d5e0;
            border-radius: 50px;
            transform-style: preserve-3d;
            mix-blend-mode: hard-light;
            box-shadow:
              25px 25px 25px -5px rgba(0, 0, 0, 0.15),
              inset 15px 15px 10px rgba(255, 255, 255, 0.75),
              -15px -15px 30px rgba(255, 255, 255, 0.55),
              inset -1px -1px 10px rgba(0, 0, 0, 0.2);
          }
          .neuro-circle {
            position: absolute;
            inset: 35px;
            background: #acbaca;
            border-radius: 50%;
            transform-style: preserve-3d;
            box-shadow:
              5px 5px 15px 0 #152b4a66,
              inset 5px 5px 5px rgba(255, 255, 255, 0.55),
              -6px -6px 10px rgba(255, 255, 255, 1);
          }
          .neuro-circle::before {
            content: "";
            position: absolute;
            inset: 4px;
            background: linear-gradient(#2196f3, #e91e63);
            mix-blend-mode: color-burn;
            border-radius: 50%;
            animation: spin-gradient 2s linear infinite;
          }
          .neuro-circle::after {
            content: "";
            position: absolute;
            inset: 25px;
            filter: blur(0.9px);
            background: #acbaca;
            border-radius: 50%;
            z-index: 1000;
          }
        `}</style>
        <div className="neuro-loader">
          <div className="neuro-circle"></div>
        </div>
      </div>
    ),
    code: `// Neumorphic Spinner Preloader
function NeumorphicSpinnerPreloader() {
  return (
    <div className="loader">
      <div className="circle"></div>
    </div>
  );
}

// Add this CSS to your stylesheet
/*
.loader {
  position: relative;
  width: 200px;
  overflow: hidden;
  height: 200px;
  background: #c9d5e0;
  border-radius: 50px;
  transform-style: preserve-3d;
  mix-blend-mode: hard-light;
  box-shadow:
    25px 25px 25px -5px rgba(0, 0, 0, 0.15),
    inset 15px 15px 10px rgba(255, 255, 255, 0.75),
    -15px -15px 30px rgba(255, 255, 255, 0.55),
    inset -1px -1px 10px rgba(0, 0, 0, 0.2);
}

.circle {
  position: absolute;
  inset: 35px;
  background: #acbaca;
  border-radius: 50%;
  transform-style: preserve-3d;
  box-shadow:
    5px 5px 15px 0 #152b4a66,
    inset 5px 5px 5px rgba(255, 255, 255, 0.55),
    -6px -6px 10px rgba(255, 255, 255, 1);
}

.circle::before {
  content: "";
  position: absolute;
  inset: 4px;
  background: linear-gradient(#2196f3, #e91e63);
  mix-blend-mode: color-burn;
  border-radius: 50%;
  animation: anim 2s linear infinite;
}

.circle::after {
  content: "";
  position: absolute;
  inset: 25px;
  filter: blur(0.9px);
  background: #acbaca;
  border-radius: 50%;
  z-index: 1000;
}

@keyframes anim {
  0% {
    transform: rotate(0deg);
    filter: blur(2px);
  }
  100% {
    transform: rotate(360deg);
    filter: blur(4px);
  }
}
*/`,
    usage: `<NeumorphicSpinnerPreloader />`,
    darkPreview: false,
  },
  'preloader-6': {
    id: 'preloader-6',
    name: 'Pokéball Loader',
    category: 'Preloaders',
    description: 'A bouncing Pokéball animation with realistic shadow and rotation.',
    preview: (
      <div className="relative w-full h-96 flex items-center justify-center bg-white rounded-xl">
        <style>{`
          @keyframes pokeball-bounce {
            30%, 70% {
              transform: rotate(0deg);
            }
            49.99% {
              transform: rotate(0.2deg);
            }
            50% {
              transform: rotate(-0.2deg);
            }
          }
          .pokeball-loader {
            height: 60px;
            aspect-ratio: 1;
            position: relative;
          }
          .pokeball-loader::before,
          .pokeball-loader::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50%;
            transform-origin: bottom;
          }
          .pokeball-loader::after {
            background: 
              radial-gradient(at 75% 15%, #fffb, #0000 35%),
              radial-gradient(at 80% 40%, #0000, #0008),
              radial-gradient(circle 5px, #fff 94%, #0000),
              radial-gradient(circle 10px, #000 94%, #0000),
              linear-gradient(#F93318 0 0) top / 100% calc(50% - 5px),
              linear-gradient(#fff 0 0) bottom / 100% calc(50% - 5px) #000;
            background-repeat: no-repeat;
            animation: pokeball-bounce 1s infinite cubic-bezier(0.5, 120, 0.5, -120);
          }
          .pokeball-loader::before {
            background: #ddd;
            filter: blur(8px);
            transform: scaleY(0.4) translate(-13px, 0px);
          }
        `}</style>
        <div className="pokeball-loader"></div>
      </div>
    ),
    code: `// Pokéball Loader Preloader
function PokeballLoader() {
  return <div className="loader"></div>;
}

// Add this CSS to your stylesheet
/*
.loader {
  height: 60px;
  aspect-ratio: 1;
  position: relative;
}

.loader::before,
.loader::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  transform-origin: bottom;
}

.loader::after {
  background: 
    radial-gradient(at 75% 15%, #fffb, #0000 35%),
    radial-gradient(at 80% 40%, #0000, #0008),
    radial-gradient(circle 5px, #fff 94%, #0000),
    radial-gradient(circle 10px, #000 94%, #0000),
    linear-gradient(#F93318 0 0) top / 100% calc(50% - 5px),
    linear-gradient(#fff 0 0) bottom / 100% calc(50% - 5px) #000;
  background-repeat: no-repeat;
  animation: l20 1s infinite cubic-bezier(0.5, 120, 0.5, -120);
}

.loader::before {
  background: #ddd;
  filter: blur(8px);
  transform: scaleY(0.4) translate(-13px, 0px);
}

@keyframes l20 {
  30%, 70% {
    transform: rotate(0deg);
  }
  49.99% {
    transform: rotate(0.2deg);
  }
  50% {
    transform: rotate(-0.2deg);
  }
}
*/`,
    usage: `<PokeballLoader />`,
    darkPreview: false,
  },
};


function PreloadersGridView() {
  const navigate = useNavigate();
  const preloadersList = Object.values(preloadersData);

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
              <h1 className="text-5xl font-bold mb-4">Preloaders</h1>
              <p className="text-xl text-gray-400">Click on any preloader to view its code and documentation</p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
              {preloadersList.map((preloader) => (
                <div key={preloader.id} onClick={() => navigate(`/others/preloaders/${preloader.id}`)} className="group text-left cursor-pointer">
                  <div className="relative bg-[#0d0520] rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                    <div className="p-6 pb-4">
                      <h3 className="text-xl font-semibold mb-1 text-white">{preloader.name}</h3>
                      <p className="text-sm text-gray-400">{preloader.category}</p>
                    </div>
                    <div className="px-6 pb-6">
                      <div className={`rounded-xl p-8 flex items-center justify-center min-h-[400px] pointer-events-none ${preloader.darkPreview ? 'bg-black' : 'bg-white'}`}>
                        {preloader.preview}
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

function PreloaderDetailView({ preloaderId }: { preloaderId: string }) {
  const navigate = useNavigate();
  const preloader = preloadersData[preloaderId as keyof typeof preloadersData];

  if (!preloader) {
    return (
      <div className="min-h-screen bg-[#0a0118] flex overflow-hidden">
        <ComponentSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Preloader Not Found</h1>
            <button onClick={() => navigate('/others/preloaders')} className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" />
              Back to Preloaders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ComponentDetail
      title={preloader.name}
      description={preloader.description}
      preview={
        <div>
          <button onClick={() => navigate('/others/preloaders')} className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to all preloaders
          </button>
          <div className={`rounded-xl p-12 flex items-center justify-center min-h-[500px] ${preloader.darkPreview ? 'bg-black' : 'bg-white'}`}>
            {preloader.preview}
          </div>
        </div>
      }
      code={preloader.code}
      usage={preloader.usage}
      props={[]}
      dependencies={[]}
    />
  );
}

export default function Preloaders() {
  const { preloaderId } = useParams();

  if (preloaderId) {
    return <PreloaderDetailView preloaderId={preloaderId} />;
  }

  return <PreloadersGridView />;
}
