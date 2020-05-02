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
    top: 10%;
    right: 20px;
    bottom: 20px;
    left: 10px;
    box-shadow: 0px 0px 20px 56px rgba(0, 0, 0, 0.4);
    border: 1px solid #ffffff;
    border-radius: 10px;
`;

export const Overlay = styled.div`
    position: absolute;
    top: 13%;
    right: 20%;
    left: 20%;
    bottom: 33%;

    ${'' /* z-index: 30; */}
    box-shadow: 0px 0px 20px 800px  rgba(0, 0, 0, 0.4);
    border: 0.4px solid #ffffff;
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
