export function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = elmnt.querySelector(".moveableheader");

  if (header) {
    header.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation(); // Prevent the box from becoming inactive
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Calculate new position and add constraints
    var newTop = elmnt.offsetTop - pos2;
    var newLeft = elmnt.offsetLeft - pos1;

    // Ensure the element stays within the screen bounds
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var elementWidth = elmnt.offsetWidth;
    var elementHeight = elmnt.offsetHeight;

    // Get the height of the navbar
    var navbarHeight = document.querySelector('.navbar').offsetHeight;

    // Constrain the new position
    if (newTop < navbarHeight) {
      newTop = navbarHeight;
    } else if (newTop + elementHeight > screenHeight) {
      newTop = screenHeight - elementHeight;
    }

    if (newLeft < 0) {
      newLeft = 0;
    } else if (newLeft + elementWidth > screenWidth) {
      newLeft = screenWidth - elementWidth;
    }

    // set the element's new position:
    elmnt.style.top = newTop + "px";
    elmnt.style.left = newLeft + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}