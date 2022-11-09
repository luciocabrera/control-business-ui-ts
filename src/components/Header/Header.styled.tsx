import styled from 'styled-components';

const customStyles = ({ isTable }: { isTable?: boolean }) =>
  isTable
    ? ` border-top:  1px solid transparent;
        border-right:  1px solid transparent;
        border-left:  1px solid transparent;
        // background: linear-gradient(white, white), linear-gradient(to right, #03542f 0%, #d19000 100%);
        border-bottom: 2px solid transparent;
        background-repeat: no-repeat;
        background-origin: padding-box, border-box;

          background: linear-gradient(135deg,white 20%, #c2e5da8a 0%, rgb(239 216 165 / 53%) 100%);
  height: var(--navbar-root-height);
  font-family: '72override', var(--font-family);
  font-size: var(--large-font-size);
  font-weight: 600;
  max-height: 40px;
  padding: 0 1.5rem;
  border: 1px solid grey;
  color: var(--header-bg-color);
  /* overflow: hidden; */


        h1,
        span {
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
         }
        .title-content {
           background: linear-gradient(to right, #03542f 0%, #d19000 100%);
          -webkit-background-clip: text;
         }`
    : ` background: linear-gradient(135deg,var(--header-bg-color) 0%,rgba(253,187,45,1) 100%);
        color: white;
      `;
//    background: linear-gradient(135deg,#144435bf 0%,rgb(253 187 45 / 69%) 100%);
//linear-gradient(135deg,#c2e5da8a 0%,rgb(239 216 165 / 53%) 100%);

//linear-gradient(135deg,#d4efe68a 0%,rgb(247 228 185 / 53%) 100%);
export const HeaderStyled = styled.header`
  display: flex;
  gap: 1rem;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-top-left-radius: 12px;

  border-top-right-radius: 12px;
  padding: 0.4rem 1.2rem;
  justify-content: flex-start;
  flex-direction: row;

  font-family: '72override', var(--font-family);
  font-size: var(--font-size);
  font-weight: 400;
  height: 40px;
  padding: 0 1.5rem;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 46%), 0 2px 10px 0 rgb(0 0 0 / 42%);

  ${customStyles}
  img {
    height: 2rem;
    width: 2rem;
  }
  h1,
  span {
    margin: 0;
    // font-size: 1.5rem;
  }
  .children-content {
    text-align: right;
  }

  button {
    right: 1.5rem;
    position: absolute;
  }
`;

// display: flex;
// gap: 1rem;

// align-items: center;
// flex-wrap: wrap;

// padding: 0.4rem 1.2rem;
// -webkit-box-pack: start;
// -webkit-justify-content: flex-start;
// -ms-flex-pack: start;
// justify-content: flex-start;
// -webkit-flex-direction: row;
// -ms-flex-direction: row;
// flex-direction: row;
// font-family: '72override',var(--font-family);
// font-size: var(--font-size);
// font-weight: 400;
// height: 40px;

// background-repeat: no-repeat;
// background-origin: padding-box,border-box;
// background: linear-gradient(135deg,#d4efe68a 0%,rgb(247 228 185 / 53%) 100%);
// height: var(--navbar-root-height);
// font-family: '72override',var(--font-family);
// font-size: var(--font-size);
// font-weight: 400;
// max-height: 40px;
// padding: 0 1.5rem;
// border: 1px solid grey;
