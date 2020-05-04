import styled, { keyframes, css } from 'styled-components';

const flashAnimation = keyframes`
  from {
    opacity: 0.75;
  }

  to {
    opacity: 0;
  }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    height: 100%;
    
`;

export const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: ${({ maxWidth }) => maxWidth && `${maxWidth}px`};
    max-height: ${({ maxHeight }) => maxHeight && `${maxHeight}px`};
    overflow: hidden;
`;

export const Canvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

export const Video = styled.video`
    position: relative;
    
    &::-webkit-media-controls-play-button {
        display: none !important;
        -webkit-appearance: none;
    }
`;
export const Overlay1 = styled.div`
    position: absolute;
    width:100%;
    bottom: 5%;
    border: none;
    text-align:center;

`;
export const Overlay2=styled.div`
    position: absolute;
    top: 13%;
    right: 20%;
    left: 20%;
    bottom: 33%;
    border:2px dashed white;
    
`;
export const Button=styled.button`
    border:none;
    width:74px;
    height:74px;
    border-radius:37px;
    background-color:red;
    border:2px solid white;
`;
export const Overlay = styled.div`
    position: absolute;
    top: 13%;
    right: 20%;
    left: 20%;
    bottom: 33%;
    border:2px dashed white;
    border-radius: 800px;
`;

export const Flash = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    opacity: 0;

    ${({ flash }) => {
        if (flash) {
            return css`
                animation: ${flashAnimation} 750ms ease-out;
            `;
        }
    }}
`;
