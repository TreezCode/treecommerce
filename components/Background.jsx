import { useEffect, useRef } from 'react';

const Background = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    const bgCurrent = bgRef.current;
    let timeoutId;

    const handleScroll = () => {
      if (bgCurrent) {
        const scrollPos = window.pageYOffset;
        bgRef.current.style.backgroundPositionY = `${-scrollPos * 0.3}px`;
        // bgRef.current.style.opacity = `${1 - scrollPos / 1000}`;
        bgRef.current.style.opacity = `0.6`;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          bgRef.current.style.opacity = '1';
        }, 100);
      }
    };

    if (bgCurrent) {
      window.addEventListener('scroll', handleScroll);
      console.log('added');
    }

    return () => {
      if (bgCurrent) {
        window.removeEventListener('scroll', handleScroll);
        console.log('removed');
      }
    };
  }, [bgRef]);

  return <div className='background-pattern' ref={bgRef} />;
};

export default Background;
