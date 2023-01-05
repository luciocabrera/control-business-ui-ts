import styled from 'styled-components';

export const TableStyled = styled.div`


  // overflow: auto;
  //   max-width: 100%;
  //   display: block;



  height: ${({ height }: { height?: string; useRadius?: boolean }) => (height ? height : 'inherit')};
   box-shadow: 0 2px 5px 0 rgb(0 0 0 / 46%), 0 2px 10px 0 rgb(0 0 0 / 42%);
  overflow: auto;
  table {
    border-collapse: collapse;
    border-spacing: 0;
    font-family: arial, sans-serif;
    table-layout: fixed;
    font-family: '72override', var(--font-family);
    font-size: var(--font-size);
    font-weight: 300;




    //     width: 100%;
    // border-collapse: collapse;
    // overflow-x: scroll;
  }


  thead {
    background: #03542f;
    color: white;
    margin: 0;
    position: sticky;
    top: 0;
    cursor: pointer;
       box-shadow: 0 1px 5px 0 rgb(0 0 0 / 40%), 0 2px 10px 0 rgb(0 0 0 / 38%);
    th {
      border-bottom: 1px solid lightgray;
      border-right: 1px solid lightgray;
       padding: 2px 6px;
      position: relative;
          height: 28px;
        
    }
  }

  th {
    border-bottom: 1px solid lightgray;
    border-right: 1px solid lightgray;
    padding: 2px 4px;
    text-align: left;
  }

  td {
    padding: 6px;
  }

      tbody {
      td {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

      }
      tr {
        border-bottom: 1px solid #b2b2b47a;
        :nth-of-type(even) {
  background: #a2bd6b1f;
}
        :hover {
          color: var(--er-teal);
          background: var(--er-grey-3) !important;
          cursor: pointer;
        }
      }
    }
  }
  .resizer {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background: rgba(0, 0, 0, 0.5);
    cursor: col-resize;
    user-select: none;
    touch-action: none;
  }

  .resizer.isResizing {
    background: blue;
    opacity: 1;
  }

  @media (hover: hover) {
    .resizer {
      opacity: 0;
    }

    *:hover > .resizer {
      opacity: 1;
    }
  }

`;

// td.pivoted {
//   /* Behave like a "row" */
//   border: none !important;
//   position: relative;
//   padding-left: calc(50% + 10px) !important;
//   text-align: left !important;
//   white-space: pre-wrap;
//   overflow-wrap: break-word;
// }

// td .tdBefore {
//   /* Now like a table header */
//   position: absolute;
//   display: block;

//   /* Top/left values mimic padding */
//   left: 1rem;
//   width: calc(50% - 20px);
//   white-space: pre-wrap;
//   overflow-wrap: break-word;
//   text-align: left !important;
//   font-weight: 600;
// }
