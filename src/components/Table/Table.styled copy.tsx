import styled from 'styled-components';

const radius = ({ useRadius }: { useRadius?: boolean }) =>
  useRadius &&
  `
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  `;

export const TableStyled = styled.div`


.loadMoreRowsClassname {
    inline-size: 180px;
  padding-block: 8px;
  padding-inline: 16px;
  position: absolute;
  inset-block-end: 8px;
  inset-inline-end: 8px;
  color: white;
  line-height: 35px;
  background: rgb(0 0 0 / 0.6);
}
  height: ${({ height }: { height?: string; useRadius?: boolean }) => (height ? height : 'inherit')};
  width:  100%;
  overflow: auto;
  // font: 300 12px/14px 'Helvetica Neue Regular', Helvetica, Arial, sans-serif;
  font-family: '72override', var(--font-family);
  font-size: var(--font-size);
   box-shadow: 0 2px 5px 0 rgb(0 0 0 / 46%), 0 2px 10px 0 rgb(0 0 0 / 42%);


  //  .container {
  // border: 1px solid lightgray;
  // height: 500px;
  // overflow: auto;
// }

  ${radius}
  table {
    border-collapse: collapse;
     border-spacing: 0;
      table-layout: fixed;
    // width: 100%;
   
    ${radius}
  }
  thead {
    background: #03542f;
    color: white;
    margin: 0;
    position: sticky;
    top: 0;
    cursor: pointer;  
    font-family: '72override', var(--font-family);
    font-size: var(--font-size);
    font-weight: 400;
    th {
      border-bottom: 1px solid lightgray;
      border-right: 1px solid lightgray;
      padding: 2px 4px;
      position: relative;

    }
  }


tr {
  width: fit-content;
  height: 30px;
}

   tbody {
    font-weight: 300;
      td {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 2px 10px;
        border-right: 0.05rem solid #c7c7c7;
        cursor: pointer;
        box-shadow: inset 0 0 0 1px lightgray;
      }
      tr {
        :nth-child(even) {
          background: #a2bd6b1f;
        }
        :hover {
          cursor: pointer;
          // background: #eabb3a24;
          color: darkcyan;
          border-bottom: 1px solid;
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

.cursor-pointer{          
    display: flex;
    justify-content: flex-start;
    margin-left: 1rem;
    gap: 1rem;
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
