import styled from 'styled-components';

export const TableStyled = styled.div`
  border: 1px solid lightgray;
  height: calc(100vh - 120px);
  max-width:  100%; !important;
  overflow: auto;
  font: 300 12px/14px 'Helvetica Neue Regular', Helvetica, Arial, sans-serif;
  table {
    border-collapse: collapse;
    border-spacing: 0;
    font-family: arial, sans-serif;
    table-layout: fixed;
    width: 100%;
  }

  thead {
    background: #03542f;
    color: white;
    margin: 0;
    position: sticky;
    top: 0;
    cursor: pointer;
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

  
.tr {
  display: flex;
}

tr,
.tr {
  width: fit-content;
  height: 30px;
}

th,
.th,
td,
.td {
  box-shadow: inset 0 0 0 1px lightgray;
  padding: 0.25rem;
}

th,
.th {
  padding: 2px 4px;
  position: relative;
  font-weight: bold;
  text-align: center;
  height: 30px;
}

td,
.td {
  height: 30px;
}

   tbody {
      td {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 5px 10px;
        border-right: 0.05rem solid #c7c7c7;
        cursor: pointer;
        // height: 26px;
        // max-height: 26px;
      }
      tr {
        // height: 26px;
        // max-height: 26px;
        :nth-child(even) {
          background: #a2bd6b1f;
        }
        // border-bottom: 1px solid #c7c7c7;
        :hover {
          cursor: pointer;
        }
      }
    }
  }

  .divTable {
  border: 1px solid lightgray;
  width: fit-content;
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

export const TdStyled = styled.div`
  padding: 6px 14px 3px 14px;
`;

export const TrStyled = styled.div`
  :nth-child(even) {
    background: #f7f7f7;
  }
`;

export const HeaderStyled = styled.div`
  cursor: pointer;
  height: 100%;
  padding: 0px;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden !important;
`;

export const TitleHeaderStyled = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden !important;
  div {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const Resizer = styled.div`
  display: inline-block;
  width: 5px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
  z-index: 1;
  ${'' /* prevents from scrolling while dragging on touch devices */}
  touch-action:none;
  background: ${({ isResizing }) => (isResizing ? 'var(--er-accent)' : 'none')};
`;

export const SortIcon = styled.div`
  margin-left: 6px;
`;
