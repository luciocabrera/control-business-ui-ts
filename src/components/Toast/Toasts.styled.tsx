import styled, { css, keyframes } from 'styled-components';

const toastInRight = keyframes`
	from {
	  transform: translateX(100%);
	  
	}
	to {
	  transform: translateX(0);
	}
`;
const toastInLeft = keyframes`
	from {
		transform: translateX(-100%);
		
	}
	to {
		transform: translateX(0);
	}`;

const topRight = css`
  top: 12px;
  right: 12px;
  transition: transform 0.6s ease-in-out;
  animation: ${toastInRight} 0.7s;
`;

const bottomRight = css`
  bottom: 12px;
  right: 12px;
  transition: transform 0.6s ease-in-out;
  animation: ${toastInRight} 0.7s;
`;
const topLeft = css`
  top: 12px;
  left: 12px;
  transition: transform 0.6s ease-in;
  animation: ${toastInLeft} 0.7s;
`;

const bottomLeft = css`
  bottom: 12px;
  left: 12px;
  transition: transform 0.6s ease-in;
  animation: ${toastInLeft} 0.7s;
`;

const complexMixin = ({ position }: { position: string }) => {
  switch (position) {
    case 'topRight':
      return topRight;
    case 'topLeft':
      return topLeft;
    case 'bottomLeft':
      return bottomLeft;
    case 'bottomRight':
    default:
      return bottomRight;
  }
};

export const NotificationContainer = styled.div`
  font-size: 14px;
  box-sizing: border-box;
  position: fixed;
  z-index: 999999;

  button {
    position: relative;
    right: -0.3em;
    top: -0.3em;
    float: right;
    font-weight: 700;
    color: #fff;
    outline: none;
    border: none;
    text-shadow: 0 1px 0 #fff;
    opacity: 0.8;
    line-height: 1;
    font-size: 16px;
    padding: 0;
    cursor: pointer;
    background: 0 0;
    border: 0;
  }

  ${complexMixin}
`;

export const Notification = styled.div`
  background: #fff;
  transition: 0.3s ease;
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  margin: 0 0 6px;
  padding: 30px;
  margin-bottom: 15px;
  width: 300px;
  max-height: 100px;
  border-radius: 3px 3px 3px 3px;
  box-shadow: 0 0 10px #999;
  color: #000;
  opacity: 0.9;
  background-position: 15px;
  background-repeat: no-repeat;
  background-color: ${({ position, backgroundColor }: { position: string; backgroundColor: string }) =>
    backgroundColor};

  height: 50px;
  width: 365px;
  color: #fff;
  padding: 20px 15px 10px 10px;

  :hover {
    box-shadow: 0 0 12px #fff;
    opacity: 1;
    cursor: pointer;
  }

  ${complexMixin}
`;

export const NotificationTitle = styled.p`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 6px;
  width: 300px;
  height: 18px;
`;

export const NotificationMessage = styled.p`
  margin: 0;
  text-align: left;
  height: 18px;
  margin-left: -1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NotificationImage = styled.div`
  float: left;
  margin-right: 15px;
  img {
    width: 30px;
    height: 30px;
  }
`;
