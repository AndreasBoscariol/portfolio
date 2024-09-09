export const addResizeListeners = (element) => {
  const resizeHandles = element.querySelectorAll('.resize-handle');
  const minSize = 500;

  resizeHandles.forEach(handle => {
    handle.addEventListener('mousedown', initResize.bind(null, handle));
  });

  function initResize(handle, e) {
    e.preventDefault();
    window.addEventListener('mousemove', startResize);
    window.addEventListener('mouseup', stopResize);

    const rect = element.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = rect.width;
    const startHeight = rect.height;
    const startTop = rect.top;
    const startLeft = rect.left;

    function startResize(e) {
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newTop = startTop;
      let newLeft = startLeft;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const navbarHeight = document.querySelector('.navbar').offsetHeight;

      if (handle.classList.contains('right') || handle.classList.contains('top-right') || handle.classList.contains('bottom-right')) {
        newWidth = startWidth + (e.clientX - startX);
        if (newWidth < minSize) {
          newWidth = minSize;
        } else if (newLeft + newWidth > screenWidth) {
          newWidth = screenWidth - newLeft;
        }
      }
      if (handle.classList.contains('left') || handle.classList.contains('top-left') || handle.classList.contains('bottom-left')) {
        newWidth = startWidth - (e.clientX - startX);
        if (newWidth < minSize) {
          newWidth = minSize;
        } else {
          newLeft = startLeft + (e.clientX - startX);
          if (newLeft < 0) {
            newLeft = 0;
            newWidth = startWidth + startLeft;
          }
        }
      }
      if (handle.classList.contains('bottom') || handle.classList.contains('bottom-left') || handle.classList.contains('bottom-right')) {
        newHeight = startHeight + (e.clientY - startY);
        if (newHeight < minSize) {
          newHeight = minSize;
        } else if (newTop + newHeight > screenHeight) {
          newHeight = screenHeight - newTop;
        }
      }
      if (handle.classList.contains('top') || handle.classList.contains('top-left') || handle.classList.contains('top-right')) {
        newHeight = startHeight - (e.clientY - startY);
        if (newHeight < minSize) {
          newHeight = minSize;
        } else {
          newTop = startTop + (e.clientY - startY);
          if (newTop < navbarHeight) {
            newTop = navbarHeight;
            newHeight = startHeight + startTop - navbarHeight;
          }
        }
      }

      element.style.width = `${newWidth}px`;
      element.style.height = `${newHeight}px`;
      if (newTop !== startTop) element.style.top = `${newTop}px`;
      if (newLeft !== startLeft) element.style.left = `${newLeft}px`;
    }

    function stopResize() {
      window.removeEventListener('mousemove', startResize);
      window.removeEventListener('mouseup', stopResize);
    }
  }
};