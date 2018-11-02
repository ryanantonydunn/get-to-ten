import React from "react";
import styled, { keyframes } from "styled-components";

const cols = [
  "#ccddcc",
  "#9900ff",
  "#00ffaa",
  "#ff9900",
  "#6666ff",
  "#ff00ff",
  "#00ffff",
  "#ff4444",
  "#ffff00",
  "#44ee00"
];

const collapse = keyframes`
  from {
    height: var(--height);
  }
  to {
    height: 0;
  }
`;

const Board = styled.div`
  position: absolute;
  bottom: var(--block);
  right: var(--block);
  top: 0;
  left: 0;
  display: flex;
  --height: ${props => {
    return 100 / props.rows + "%";
  }};
`;

const Col = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Cell = styled.div`
  --col: ${props => cols[props.value]};
  position: relative;
  display: grid;
  place-content: center;
  width: 100%;
  height: var(--height);
  color: #000;
  font-size: 20px;
  cursor: ${props => {
    return props.value < 1 ? "default" : "pointer";
  }};
  background-image: linear-gradient(var(--col), var(--col)),
    linear-gradient(var(--col), var(--col));
  background-repeat: no-repeat;
  background-size: calc(100% - var(--block) * 3) calc(100% - var(--block)),
    calc(100% - var(--block)) calc(100% - var(--block) * 3);
  background-position: var(--block) 0, 0 var(--block);
  &.removing {
    animation: ${collapse} 0.15s linear forwards;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
  span {
    position: absolute;
    bottom: 5px;
    left: 5px;
    font-size: 10px;
    font-weight: bold;
    color: #000;
  }
`;

const Game = ({ board, rows, pause, touchBoard }) => (
  <Board rows={rows}>
    {board.map((col, x) => (
      <Col key={x + "-col"}>
        {col.map((cell, y) => (
          <Cell
            key={x + "-" + y + "-cell"}
            value={cell.value}
            className={cell.removing ? "removing" : ""}
            onClick={() => {
              touchBoard(x, y, board, rows);
            }}
          >
            {cell.removing ? null : cell.value}
          </Cell>
        ))}
      </Col>
    ))}
  </Board>
);

export default Game;
