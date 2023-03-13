/**
 * Creates a magnifying glass effect for a given image element
 * @param {string} imgID - The ID of the image element to magnify
 * @returns {void}
 */
export const handleMagnify = (() => {
  let clearSrc;
  let zoomLevel = 1;
  let posX, posY, touch;
  let image, zoom, zoomImage;
  // let lastClick = 0
  // let magnifierEnabled;

  const getCursorPos = (e) => {
    const a = image.getBoundingClientRect();
    if (e.type.includes('touch')) {
      posX = e.touches[0].clientX - a.left;
      posY = e.touches[0].clientY - a.top;
      touch = true;
    } else {
      posX = e.clientX - a.left;
      posY = e.clientY - a.top;
      touch = false;
    }

    // Moves the zoom a little bit up on mobile because your fat fingers
    touch
      ? (zoom.style.top = `${posY - zoom.offsetHeight / 1.25}px`)
      : (zoom.style.top = `${posY - zoom.offsetHeight / 2}px`);

    // Subtract zoom's half width from the position to center it
    zoom.style.left = `${posX - zoom.offsetWidth / 2}px`;
  };

  const handleEnterImage = function (e) {
    e.preventDefault();
    // Remove any previously added `zoom` elements
    const existingZooms = document.querySelectorAll('.zoom');
    existingZooms.forEach((z) => z.parentNode.removeChild(z));

    zoom.classList.add('show', 'loading');
    clearTimeout(clearSrc);

    // Set zoom src to high resolution
    zoomImage.src = image.dataset.hires;
    // Append image to the zoom glass and insert into the image's parent element
    zoom.appendChild(zoomImage);
    image.parentElement.insertBefore(zoom, image);

    getCursorPos(e);

    // Remove the loading class
    zoomImage.onload = function () {
      setTimeout(() => {
        console.log('hires image loaded!');
        zoom.classList.remove('loading');
      }, 500);
    };
  };

  const handleLeaveImage = function () {
    // Remove scaling to prevent non-transition
    zoom.style.transform = null;
    zoomLevel = 1;
    zoom.classList.remove('show');
    clearSrc = setTimeout(() => {
      zoomImage.src = '';
    }, 250);
    removeEventListeners();
  };

  const handleMove = function (e) {
    getCursorPos(e);
    let percX = (posX - image.offsetLeft) / image.offsetWidth,
      percY = (posY - image.offsetTop) / image.offsetHeight;

    let zoomLeft = -percX * zoomImage.offsetWidth + zoom.offsetWidth / 2,
      zoomTop = -percY * zoomImage.offsetHeight + zoom.offsetHeight / 2;

    zoomImage.style.left = `${zoomLeft}px`;
    zoomImage.style.top = `${zoomTop}px`;
  };

  // Use your mousewheel to zoom 🔍
  const handleWheel = (e) => {
    e.preventDefault();
    e.deltaY > 0 ? zoomLevel-- : zoomLevel++;
    if (zoomLevel < 1) zoomLevel = 1;
    if (zoomLevel > 5) zoomLevel = 5;
    console.log(`zoom level: ${zoomLevel}`);
    zoom.style.transform = `scale(${zoomLevel})`;

    // const imgWidth = image.width * zoomLevel;
    // const imgHeight = image.height * zoomLevel;

    // const a = image.getBoundingClientRect();
    // const percX = (posX - a.left) / image.offsetWidth;
    // const percY = (posY - a.top) / image.offsetHeight;

    // const zoomLeft = -percX * imgWidth + zoom.offsetWidth / 2;
    // const zoomTop = -percY * imgHeight + zoom.offsetHeight / 2;
    // zoomImage.style.width = `${imgWidth}px`;
    // zoomImage.style.height = `${imgHeight}px`;
    // zoomImage.style.left = `${zoomLeft}px`;
    // zoomImage.style.top = `${zoomTop}px`;
  };

  // Double-tap to enable zoom
  // const handleDoubletap = (e) => {
  //   e.preventDefault();
  //   let date = new Date();
  //   let time = date.getTime();
  //   const time_between_taps = 200;
  //   if (time - lastClick < time_between_taps) {
  //     magnifierEnabled = !magnifierEnabled;
  //   }
  //   lastClick = time;
  //   magnifierEnabled && handleEnterImage(e);
  // }

  const removeEventListeners = () => {
    image.removeEventListener('touchstart', handleEnterImage);
    image.removeEventListener('pointerover', handleEnterImage);
    image.removeEventListener('pointerout', handleLeaveImage);
    image.removeEventListener('touchmove', handleMove);
    image.removeEventListener('mousemove', handleMove);
    image.removeEventListener('wheel', handleWheel);
    // image.removeEventListener('pointerover', handleDoubletap);
  };

  return (imgID) => {
    console.clear();
    // Get the image element with the given ID
    image = document.getElementById(imgID);

    // Create magnifier glass
    zoom = document.createElement('div');
    zoom.setAttribute('class', 'zoom');
    zoomImage = document.createElement('img');
    zoomImage.setAttribute('class', 'zoom-image');

    // Add new event listeners
    image.addEventListener('touchstart', handleEnterImage);
    image.addEventListener('pointerover', handleEnterImage);
    image.addEventListener('pointerout', handleLeaveImage);
    image.addEventListener('touchmove', handleMove);
    image.addEventListener('mousemove', handleMove);
    image.addEventListener('wheel', handleWheel);
    // image.addEventListener('pointerover', handleDoubletap);
  };
})();
