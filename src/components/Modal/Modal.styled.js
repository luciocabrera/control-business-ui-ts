import styled from 'styled-components';

// color: ${({ theme }) => theme.modal.color};
// backdrop-filter: blur(18px) contrast(0.9);
// background: ${({ theme }) => theme.modal.background};
// border: ${({ theme }) => theme.modal.border};
const fadeInStyles = ({ fadeIn }) =>
  fadeIn
    ? `animation: show 0.1s;
  animation-fill-mode: forwards;`
    : ``;

export const ModalStyled = styled.div`
  .close {
    float: right;
    font-size: 21px;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity=20);
    opacity: 0.2;
  }
  .close:focus,
  .close:hover {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    filter: alpha(opacity=50);
    opacity: 0.5;
  }
  button.close {
    padding: 0;
    cursor: pointer;
    background: 0 0;
    border: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .modal-open {
    overflow: hidden;
  }
  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    display: none;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    outline: 0;
  }
  .modal.fade .modal-dialog {
    -webkit-transform: translate(0, -25%);
    -ms-transform: translate(0, -25%);
    -o-transform: translate(0, -25%);
    transform: translate(0, -25%);
    -webkit-transition: -webkit-transform 0.3s ease-out;
    -o-transition: -o-transform 0.3s ease-out;
    transition: -webkit-transform 0.3s ease-out;
    transition: transform 0.3s ease-out;
    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out,
      -o-transform 0.3s ease-out;
  }
  .modal.in .modal-dialog {
    -webkit-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    -o-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  .modal-open .modal {
    overflow-x: hidden;
    overflow-y: auto;
  }
  .modal-dialog {
    position: relative;
    width: auto;
    margin: 10px;
  }
  .modal-content {
    position: relative;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #999;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    outline: 0;
  }
  .modal-header {
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
  }
  .modal-header .close {
    margin-top: -2px;
  }
  .modal-title {
    margin: 0;
    line-height: 1.42857143;
  }
  .modal-body {
    position: relative;
    padding: 15px;
  }
  .modal-footer {
    padding: 15px;
    text-align: right;
    border-top: 1px solid #e5e5e5;
  }
  .modal-footer .btn + .btn {
    margin-bottom: 0;
    margin-left: 5px;
  }
  .modal-footer .btn-group .btn + .btn {
    margin-left: -1px;
  }
  .modal-footer .btn-block + .btn-block {
    margin-left: 0;
  }

  ${fadeInStyles}
`;
