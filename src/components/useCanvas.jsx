import { useRef, useEffect, useState } from 'react'

const useCanvas = (draw, setCanvasContext) => {
  
  const canvasRef = useRef(null)
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    setCanvasContext(context);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.left = "0px";
    canvas.style.top = "0px";
    canvas.style.position = "absolute";
    console.log("rendered");
    draw(context);

    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  })
  
  return canvasRef;
}

export default useCanvas