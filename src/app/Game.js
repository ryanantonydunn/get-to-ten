import React from "react";
import styled, { keyframes } from "styled-components";

const cols = [
  "#44ee00",
  "#ffff00",
  "#ff4444",
  "#00ffff",
  "#ff00ff",
  "#6666ff",
  "#ff9900",
  "#00ffaa",
  "#9900ff",
  "#ccddcc",
  "#666666",
  "#999999",
  "#BBBBBB",
  "#EEEEEE"
];

// eslint-disable-next-line
const dropIn = keyframes`
  to {
    transform: translateY(0);
  }
`;

const Board = styled.div`
  position: absolute;
  bottom: var(--block);
  right: var(--block);
  top: var(--block);
  left: var(--block);
  display: flex;
  --size: ${props => {
    return 100 / props.size + "%";
  }};
`;

const Col = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: var(--size);
`;

const Cell = styled.div`
  position: relative;
  cursor: pointer;
  display: grid;
  place-content: center;
  width: 100%;
  height: var(--size);
  color: #000;

  --col: ${props => cols[props.value]};
  background-image: linear-gradient(var(--col), var(--col)),
    linear-gradient(var(--col), var(--col));
  background-repeat: no-repeat;
  background-size: calc(100% - var(--block) * 3) calc(100% - var(--block)),
    calc(100% - var(--block)) calc(100% - var(--block) * 3);
  background-position: var(--block) 0, 0 var(--block);

  &.dropping {
    transform: translateY(calc(-100% * ${props => props.yOffset}));
    animation: ${dropIn} ${props => props.yOffset * 0.15 + "s"} linear forwards;
  }

  font-size: 20px;
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

const Game = ({ board, options, pause, touchBoard }) => (
  <Board size={options.size}>
    {board.map((col, x) => (
      <Col key={x + "-col"}>
        {col.map((cell, y) => (
          <Cell
            key={x + "-" + y + "-cell"}
            className={cell.yOffset ? "dropping" : ""}
            value={cell.value}
            yOffset={cell.yOffset}
            onClick={() => {
              if (!pause) {
                touchBoard(x, y, board);
              }
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
