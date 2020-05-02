import React, { useState, useRef, Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import Measure from 'react-measure';
import  useUserMedia  from './Hooks/useUserMedia';
import  useCardRatio  from './Hooks/useCardRatio';
import  useOffsets  from './Hooks/useOffSets';
import {
    Video,
    Canvas,
    Wrapper,
    Container,
    Flash,
    Overlay
} from './styles';
const CAPTURE_OPTIONS = {
    audio: false,
    video: { facingMode: 'user' },
};
export default function Camera({ onCapture, onClear }) {
    
    const canvasRef = useRef();
    const videoRef = useRef();
    const [dataURL,setDataURL]=useState();

    const [container, setContainer] = useState({ width: 0, height: 0 });

    const [isVideoPlaying, setIsVideoPlaying] = useState(sessionStorage.getItem('isVideoPlaying'));
    const [isCanvasEmpty, setIsCanvasEmpty] = useState(sessionStorage.getItem('isCanvasEmpty'));
    const [isFlashing, setIsFlashing] = useState(false);
    // const [isFullscreen, setIsFullscreen] = useFullscreenStatus(videoRef);

    const mediaStream = useUserMedia(CAPTURE_OPTIONS);
    const [aspectRatio, calculateRatio] = useCardRatio(1);
    const offsets = useOffsets(
        videoRef.current && videoRef.current.videoWidth,
        videoRef.current && videoRef.current.videoHeight,
        container.width,
        container.height
    );
    var elem=document.getElementById("root");
    if(elem.requestFullscreen){
        elem.requestFullscreen();
    }else if(elem.msRequestFullscreen){
        elem.msRequestFullscreen();
    }else if(elem.mozRequestFullscreen){
        elem.mozRequestFullscreen();
    }else if(elem.webkitRequestFullscreen){
        elem.webkitRequestFullscreen();
    }
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream;
    }

    function handleResize(contentRect) {
        setContainer({
            width: contentRect.bounds.width,
            height: 2.05*Math.round(contentRect.bounds.width / aspectRatio),
        });
    }

    function handleCanPlay() {
        calculateRatio(
            videoRef.current.videoHeight,
            videoRef.current.videoWidth
        );
        setIsVideoPlaying(true);
        sessionStorage['isVideoPlaying']=true;
        videoRef.current.play();
        // fullscreenModal.current = videoRef.current;
    }

    function handleCapture() {
        const context = canvasRef.current.getContext('2d');
        

        context.drawImage(
            videoRef.current,
            offsets.x,
            offsets.y,
            container.width,
            container.height,
            0,
            0,
            container.width,
            container.height
        );
        // sessionStorage['imageURL']=dataURL;
        canvasRef.current.toBlob((blob) => onCapture(blob), 'image/jpeg', 1);
        setDataURL(canvasRef.current.toDataURL());
        setIsCanvasEmpty(false);
        sessionStorage['isCanvasEmpty']=false;
        setIsVideoPlaying(false);
        sessionStorage['isVideoPlaying']=false;
        setIsFlashing(true);
    }

    function handleClear() {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );
        setIsCanvasEmpty(true);
        sessionStorage['isCanvasEmpty']=true;
        setIsVideoPlaying(true)
        sessionStorage['isVideoPlaying']=true;
        onClear();
    }
    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = container.width;
        canvas.height = container.height;
    
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
    
        var dataURL = canvas.toDataURL("image/png");
    
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
    function saveImage(){
        const myImage=document.getElementById("selfieImage");
        const imageData=getBase64Image(myImage);
        sessionStorage['myImage']=imageData;
        sessionStorage['isVideoPlaying']=true;
        setIsVideoPlaying(true);
        sessionStorage['isCanvasEmpty']=false;
        setIsCanvasEmpty(false);
        
    }
    // const fullscreenModal = videoRef;

    // function openContentFullscreen() {
    //     const elem = fullscreenModal.current;
    //     if (elem.requestFullscreen) {
    //         elem.requestFullscreen();
    //     }
    // }

    if (!mediaStream) {
        return null;
    }
    else if(sessionStorage.getItem('myImage')){
        return (<Redirect to='/selfie'/>)
    }
    return (
        <Measure bounds onResize={handleResize}>
            {({ measureRef }) => (
                <Wrapper>
                    <Container
                        ref={measureRef}
                        maxHeight={
                            videoRef.current && videoRef.current.videoHeight
                        }
                        maxWidth={
                            videoRef.current && videoRef.current.videoWidth
                        }
                        style={{
                            height: `${container.height}px`,
                        }}
                    >
                        <Video
                            ref={videoRef}
                            hidden={!isVideoPlaying}
                            onCanPlay={handleCanPlay}
                            autoPlay
                            playsInline
                            muted
                            style={{
                                top: `-${offsets.y}px`,
                                left: `-${offsets.x}px`,
                            }}
                        />
                        <Overlay hidden={!isVideoPlaying} />
                        <Canvas
                            id="selfieImage"
                            ref={canvasRef}
                            width={container.width}
                            height={container.height}
                        />
                        <Flash
                            flash={isFlashing}
                            onAnimationEnd={() => setIsFlashing(false)}
                        />
                    </Container>

                        <div>
                            <button
                                onClick={
                                    isCanvasEmpty ? handleCapture : handleClear
                                }
                            >
                                {isCanvasEmpty
                                    ? 'Take a picture'
                                    : 'Take another picture'}
                            </button>
                            {!isCanvasEmpty &&(
                                <button onClick={saveImage}>Looks Good</button>
                            )
                            }
                        </div>
        
                </Wrapper>
            )}
        </Measure>
    );
}