import confetti from 'canvas-confetti';

export const runFireWorks = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};

/**
 * Creates a magnifying glass effect for a given image element
 * @param {string} imgID - The ID of the image element to magnify
 * @param {number} zoom - The zoom level for the magnifying glass (e.g. 2x, 4x, etc.)
 * @param {boolean} magnifierEnabledFlag - Indicates if the magnifying glass effect is enabled
 * @returns {void}
 */
export const handleMagnify = (() => {
  return (imgID, magnifierEnabled) => {
    console.clear();
    
    // Get the image element with the given ID
    const image = document.getElementById(imgID);
    
    // Create magnifier glass
    const zoom = document.createElement('div');
    zoom.setAttribute('class', 'zoom');
    
    const zoomImage = document.createElement('img');
    zoomImage.setAttribute('class', 'zoom-image');    

    let clearSrc;
    let zoomLevel = 1;

    const enterImage = function(e) {
      // Remove any previously added `zoom` elements
      const existingZooms = document.querySelectorAll('.zoom');
      existingZooms.forEach(z => z.parentNode.removeChild(z));

      zoom.classList.add('show', 'loading');
      clearTimeout(clearSrc);
      
      let originalImage = image.src;
      zoomImage.src = originalImage;

      // Append image to the zoom glass and insert into the image's parent element
      zoom.appendChild(zoomImage);
      image.parentElement.insertBefore(zoom, image);
      
      // remove the loading class
      zoomImage.onload = function() {
        console.log('hires image loaded!');
        setTimeout(() => {
          zoom.classList.remove('loading');
        }, 500);
      }
    }

    const leaveImage = function() {
      // remove scaling to prevent non-transition 
      zoom.style.transform = null;
      zoomLevel = 1;
      zoom.classList.remove('show');
      clearSrc = setTimeout(() => { zoomImage.src = '' }, 250);
    }
    
    const move = function(e) {
      e.preventDefault();
      
      const a = image.getBoundingClientRect();
      let posX, posY, touch = false;
      
      if (e.touches) {
        posX = e.touches[0].clientX - a.left;
        posY = e.touches[0].clientY - a.top;
        touch = true;
      } else {
        posX = e.clientX - a.left;
        posY = e.clientY - a.top;
      }
      
      // move the zoom a little bit up on mobile (because of your fat fingers :<)
      touch
        ? zoom.style.top = `${posY - zoom.offsetHeight / 1.25}px`
        : zoom.style.top = `${posY - zoom.offsetHeight / 2}px`;

      // subtract zoom's half width from the position to center it
      zoom.style.left = `${posX - zoom.offsetWidth / 2}px`;
      
      let percX = (posX - image.offsetLeft) / image.offsetWidth,
          percY = (posY - image.offsetTop) / image.offsetHeight;
      
      let zoomLeft = -percX * zoomImage.offsetWidth + (zoom.offsetWidth / 2),
          zoomTop = -percY * zoomImage.offsetHeight + (zoom.offsetHeight / 2);
      
      zoomImage.style.left = `${zoomLeft}px`;
      zoomImage.style.top = `${zoomTop}px`;
    }

    image.addEventListener('mouseover', enterImage);
    image.addEventListener('touchstart', enterImage);

    image.addEventListener('mouseout', leaveImage);
    image.addEventListener('touchend', leaveImage);

    image.addEventListener('mousemove', move);
    image.addEventListener('touchmove', move);
    
    // use your mousewheel to zoom in 🔍
    image.addEventListener('wheel', e => {
      e.preventDefault();
      e.deltaY > 0 ? zoomLevel-- : zoomLevel++;
      
      if (zoomLevel < 1) zoomLevel = 1;
      if (zoomLevel > 5) zoomLevel = 5;
      
      console.log(`zoom level: ${zoomLevel}`);
      zoom.style.transform = `scale(${zoomLevel})`;
    });
  };

})();