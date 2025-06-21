import { useState } from 'react';
import './App.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaArrowCircleDown } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function App() {
  let [showContent, setShowContent] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%"
    })
      .to(".vi-mask-group", {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: "expo.inOut",
        transformOrigin: "50% 50%",
        opacity: 0,
        onUpdate: function () {
          if (this.progress() >= 0.9) {
            document.querySelector(".svg")?.remove();
            setShowContent(true);
            this.kill();
          }
        }
      });
  }, []);

  useGSAP(() => {
    if (!showContent) return;

    const tl = gsap.timeline();

    tl.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: "Expo.easeInOut"
    }, 0)
      .to(".sky", {
        scale: 1.3,
        rotate: 0,
        duration: 2,
        ease: "Expo.easeInOut"
      }, 0.2)
      .to(".bg", {
        scale: 1.3,
        rotate: 0,
        duration: 2,
        ease: "Expo.easeInOut"
      }, 0.4)
      .to(".character", {
        scale: 0.75,
        bottom: "-70%",
        x: "-50%",
        rotate: 0,
        duration: 2,
        ease: "Expo.easeInOut"
      }, 0.6)
      .from(".text h1", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "expo.out"
      }, 1);

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`
      });
      gsap.to(".sky", {
        x: xMove
      });
      gsap.to(".bg", {
        x: xMove * 1.7
      });
      gsap.to(".character", {
        x: xMove
      });
    });
  }, [showContent]);

  return (
    <>
      <div className="svg fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black">
        <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href='/bg.png'
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div className='main w-full rotate-[-10deg] scale-[1.7]'>
          <div className='landing overflow-hidden relative w-full h-screen bg-black'>
            <div className='navbar absolute top-0 left-0 z-[10] w-full py-10 px-10 flex items-center justify-between'>
              <div className='logo flex gap-7'>
                <div className='lines flex flex-col gap-2'>
                  <div className='line w-15 h-1 bg-white'></div>
                  <div className='line w-8 h-1 bg-white'></div>
                  <div className='line w-5 h-1 bg-white'></div>
                </div>
                <h3 className='text-5xl -mt-[11px] leading-none text-white tracking-widest'>Rocstar</h3>
              </div>
              <button className='text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300'>Login</button>
            </div>

            <div className='imagesdiv relative overflow-hidden w-full h-screen'>
              <img className='sky scale-[1.7] rotate-[-20deg] absolute top-0 left-0 w-full h-full object-cover' src="./sky.png" alt="sky" />
              <img className='absolute bg scale-[1.5] rotate-[-3deg] top-0 left-0 w-full h-full object-cover' src="./bg.png" alt="bg" />

              <div className='text absolute flex flex-col gap-4 leading-none text-white top-20 left-1/2 -translate-x-1/2 '>
                <h1 className='text-9xl -ml-30 leading-none'>grand</h1>
                <h1 className='text-9xl ml-20 leading-none'>theft</h1>
                <h1 className='text-9xl -ml-30 leading-none'>auto</h1>
              </div>

              <img className='absolute character -bottom-[150%] left-1/2 -translate-x-1/2 scale-[3] rotate-[-20deg]' src="./girlbg.png" alt="character" />
            </div>

            <div className='btmbar absolute bottom-0 text-white left-0 w-full py-10 px-10 bg-gradient-to-t from-black to-transparent flex items-center justify-between'>
              <div className='flex gap-4 items-center'>
                <FaArrowCircleDown className='animate-bounce' />
                <h3 className='text-xl font-bold'>Scroll Down</h3>
              </div>
              <img className="h-[60px]" src="./ps5.png" alt="ps5" />
            </div>
          </div>

          <div className='w-full h-screen flex px-10 items-center justify-center bg-black'>
            <div className="container flex text-white w-full h-[80%] gap-10">
              <div className='limg relative h-full w-1/2 py-30'>
                <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="./imag.png" alt="Lucia & Jason" />
              </div>
              <div className="rimg w-1/2 h-full py-20">
                <h1 className='text-6xl font-bold leading-tight mb-5'>Still Running, Not Hunting</h1>
                <p className='text-lg font-medium'>Lucia, a recent parolee with a determined spirit, and Jason, a former soldier drawn into crime. Their partnership forms the emotional and criminal core of the narrative in Vice City.</p>
                <button className='bg-yellow-500 px-8 py-3 mt-6 text-xl text-black rounded hover:bg-yellow-400 transition duration-300'>Download Now</button>
              </div>
            </div>
          </div>
          <footer className='w-full text-center text-white py-4 bg-black border-t border-gray-700 font-mono'>
            <p className='text-sm md:text-base flex justify-center items-center gap-2'>
              Created by <span className='font-semibold'>Gaurav Rajput</span> —
              <a href='https://instagram.com/gauravr4jput' target='_blank' rel='noopener noreferrer' className='flex items-center gap-1 text-yellow-400 hover:underline'>
                <FaInstagram className='w-4 h-4' />
                @gauravr4jput
              </a>
            </p>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
