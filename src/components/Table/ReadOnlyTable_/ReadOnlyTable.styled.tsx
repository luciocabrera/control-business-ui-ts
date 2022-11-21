import styled from 'styled-components';

export const TableStyled = styled.div`
  [role='grid'] {
    height: ${({ height }: { height?: string; useRadius?: boolean }) => (height ? height : 'inherit')};
  }

  //   /*
  // Max width before this PARTICULAR table gets nasty
  // This query will take effect for any screen smaller than 760px
  // and also iPads specifically.
  // */
  //   @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
  //     /* Force table to not be like tables anymore */

  //        [role='grid'],
  //        [role='row'],
  //        [role='columnheader'],
  //        [role='gridcell'] {
  //     display: block;
  //   }

  //   /* Hide table headers (but not display: none;, for accessibility) */
  //   [role='columnheader'] {
  //     position: absolute;
  //     top: -9999px;
  //     left: -9999px;
  //   }

  //   [role='row'] {
  //     border: 1px solid #ccc;
  //   }

  //   [role='gridcell'] {
  //     /* Behave  like a "row" */
  //     border: none;
  //     border-bottom: 1px solid #eee;
  //     position: relative;
  //     // padding-left: 50%;
  //   }

  // [role='gridcell']:before {
  //   /* Now like a table header */
  //   position: absolute;
  //   /* Top/left values mimic padding */
  //   top: 6px;
  //   left: 6px;
  //   width: 45%;
  //   padding-right: 10px;
  //   white-space: nowrap;
  // }
`;

// @media screen and (max-width: 40em) {
//   /*
//   Force table elements to not behave like tables anymore
//   Hide table headers (but not display: none;, for accessibility)
// */

//   [role='grid'],
//   [role='row'],
//   [role='columnheader'],
//   [role='gridcell'] {
//     display: block;
//   }

//   [role='columnheader'] {
//     position: absolute;
//     top: -9999px;
//     left: -9999px;
//     border-bottom: 2px solid #333;
//   }

//   [role='row'] {
//     border: 1px solid #000;
//     padding: 0.25em;
//   }

//   .responsiveTable .pivoted {
//     /* Behave like a "row" */
//     border: none !important;
//     position: relative;
//     padding-left: calc(50% + 10px) !important;
//     text-align: left !important;
//     white-space: pre-wrap;
//     overflow-wrap: break-word;
//   }

//   [role='gridcell']::before {
//     /* Now like a table header */
//     position: absolute;
//     display: block;
//     background: blue;
//     color: red;
//     /* Top/left values mimic padding */
//     left: 1rem;
//     width: calc(50% - 20px);
//     white-space: pre-wrap;
//     overflow-wrap: break-word;
//     text-align: left !important;
//     font-weight: 600;
//   }
// }
