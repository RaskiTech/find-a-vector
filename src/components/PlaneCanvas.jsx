import React, { useState } from 'react';
import useCanvas from './useCanvas'

const PlaneCanvas = props => { 
    const { setCanvasContext, onCanvasDrag, addDataPoint, draw, vectorPlane, ...rest } = props;
    const canvasRef = useCanvas(draw, setCanvasContext);
    
    const [isMouseDown, setMouseDown] = useState(false);
    const [hasDragged, setHasDragged] = useState(false);
    const [lastMousePositionX, setLastMousePositionX] = useState(0);
    const [lastMousePositionY, setLastMousePositionY] = useState(0);

    const mouseDown = ({nativeEvent}) => {
        setMouseDown(true);
        setHasDragged(false);
        const {offsetX, offsetY} = nativeEvent;
        setLastMousePositionX(offsetX);
        setLastMousePositionY(offsetY);
    }
    const mouseMove = ({nativeEvent}) => {
        if (isMouseDown) {
            setHasDragged(true);
            const {offsetX, offsetY} = nativeEvent;
            let differenceX = lastMousePositionX - offsetX;
            let differenceY = lastMousePositionY - offsetY;
            setLastMousePositionX(offsetX);
            setLastMousePositionY(offsetY);
            onCanvasDrag(differenceX, differenceY);
        }
    }
    const mouseUp = ({nativeEvent}) => {
        setMouseDown(false);
        if (!hasDragged) {
            // It's a click. Add a point
            const {offsetX, offsetY} = nativeEvent;
            addDataPoint(offsetX, offsetY);
        }
    }

    const touchDown = (event) => {
        setMouseDown(true);
        setHasDragged(false);
        let touch = event.touches[0];
        setLastMousePositionX(touch.clientX);
        setLastMousePositionY(touch.clientY);
    }
    const touchMove = (event) => {
        setHasDragged(true);
        let touch = event.touches[0];
        let differenceX = lastMousePositionX - touch.clientX;
        let differenceY = lastMousePositionY - touch.clientY;
        setLastMousePositionX(touch.clientX);
        setLastMousePositionY(touch.clientY);
        onCanvasDrag(differenceX, differenceY);
    }
    const touchUp = (event) => {
        setMouseDown(false);
        if (!hasDragged) {
            // It's a click. Add a point
            addDataPoint(lastMousePositionX, lastMousePositionY);
        }
    }

    
    
    return <canvas onTouchStart={touchDown} onTouchEnd={touchUp} onTouchMove={touchMove}
        onMouseMove={mouseMove} onMouseDown={mouseDown} onMouseUp={mouseUp} ref={canvasRef} {...rest}/>
  }
  
  export default PlaneCanvas;