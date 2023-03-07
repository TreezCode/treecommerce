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
 * @param {boolean} mouseInsideImageFlag - Indicates if the mouse is inside the image element
 * @returns {void}
 */
export const handleMagnify = (() => {
  return (imgID, zoom, magnifierEnabledFlag, mouseInsideImageFlag) => {

    // If the magnifier is not enabled, return
    if (!magnifierEnabledFlag) return;

    // Get the image element with the given ID
    const img = document.getElementById(imgID);
  
    // Remove any existing magnifying glasses to avoid duplicates
    const glasses = document.querySelectorAll('.img-magnifier-glass');
    glasses.forEach((glass) => glass.remove());
  
    // Create magnifier glass
    const glass = document.createElement('DIV');
    glass.setAttribute('class', 'img-magnifier-glass');
  
    // Insert the magnifier glass into the image's parent element
    img.parentElement.insertBefore(glass, img);
  
    // Set the background properties for the magnifier glass
    glass.style.backgroundImage = `url('${img.src}')`;
    glass.style.backgroundRepeat = 'no-repeat';
    glass.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`;
  
    // Variables to set the border width and half the width and height of the magnifier glass
    const bw = 3; // Border width
    const w = glass.offsetWidth / 2; // Half of the width of the magnifier glass
    const h = glass.offsetHeight / 2; // Half of the height of the magnifier glass
  
    const createMagnifier = (e) => {
      e.preventDefault();
      handleMagnify(imgID, zoom, magnifierEnabledFlag, mouseInsideImageFlag);
    };
  
    /**
     * Get the cursor position relative to the image element
     * @param {Event} e - The pointer event
     * @returns {Object} - An object with x and y properties representing the pointer position
     */
    const getCursorPos = (e) => {
      let x = 0,
        y = 0;
      e = e || window.event;
  
      const a = img.getBoundingClientRect();
  
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x, y };
    };
  
    /**
     * Move the magnifier glass as the mouse/finger moves over the image/glass
     * @param {Event} e - The mouse or touch event
     * @returns {void}
     */
    const moveMagnifier = (e) => {
      e.preventDefault();
  
      // Initialize x and y coordinates
      let x = 0,
        y = 0;
  
      const pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
  
      // Check if cursor position is outside of image
      if (x > img.width || x < 0 || y > img.height || y < 0) {
        if (mouseInsideImageFlag) {
          // Remove magnifier glass if cursor is outside of image
          glass.remove();
          mouseInsideImageFlag = false;
        }
        return;
      }
      // Set flag to true if cursor is inside image
      if (!mouseInsideImageFlag) mouseInsideImageFlag = true;
  
      // Limit x and y coordinates to within the bounds of the image
      x = Math.min(Math.max(x, w / zoom), img.width - w / zoom);
      y = Math.min(Math.max(y, h / zoom), img.height - h / zoom);
  
      // Set the position of magnifier glass
      glass.style.left = `${x - w + 10}px`;
      glass.style.top = `${y - h + 50}px`;
  
      // Set the background position of magnifier glass
      glass.style.backgroundPosition = `-${x * zoom - w + bw}px -${y * zoom - h + bw}px`;
    };
  
    // Add event listeners to the magnifier glass and the image
    img.addEventListener('pointerdown', createMagnifier);
    img.addEventListener('pointermove', moveMagnifier);
    glass.addEventListener('pointermove', moveMagnifier);
    glass.addEventListener('pointerup', glass.remove);
  };

})();
