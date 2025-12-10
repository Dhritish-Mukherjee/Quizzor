import React, { useEffect } from "react";
import "./Cursor.css"; 

const CustomCursor = () => {
  useEffect(() => {
    const smallCursor = document.querySelector(".smallCursor");
    const shadowCursor = document.querySelector(".shadowCursor");

    let mouseX = 0;
    let mouseY = 0;
    let animationId = null;
    let timer = null;

    const mouseMoveHandler = (eventObj) => {
      mouseX = eventObj.clientX;
      mouseY = eventObj.clientY;

      smallCursor.style.left = mouseX + "px";
      smallCursor.style.top = mouseY + "px";

      if (!animationId) {
        animateShadowCursor();
      }

      clearTimeout(timer);
      timer = setTimeout(() => {
        cancelAnimationFrame(animationId);
        animationId = null;
      }, 2000);
    };

    function animateShadowCursor() {
      let currentX = parseFloat(shadowCursor.style.left) || 0;
      let currentY = parseFloat(shadowCursor.style.top) || 0;

      let distanceX = mouseX - currentX;
      let distanceY = mouseY - currentY;

      shadowCursor.style.left = currentX + distanceX * 0.1 + "px";
      shadowCursor.style.top = currentY + distanceY * 0.1 + "px";

      animationId = requestAnimationFrame(animateShadowCursor);
    }

    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div className="smallCursor"></div>
      <div className="shadowCursor"></div>
    </>
  );
};

export default CustomCursor;
