import React from "react";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  --block: 4px;
  position: relative;
  max-width: 450px;
  margin: 0 auto;
  text-transform: uppercase;
`;

const Bg = styled.div`
  --col: ${props => props.col};
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(var(--col), var(--col)),
    linear-gradient(var(--col), var(--col));
  background-repeat: no-repeat;
  background-size: calc(100% - var(--block) * 2) 100%,
    100% calc(100% - var(--block) * 2);
  background-position: var(--block) 0, 0 var(--block);
`;

const Title = styled.div`
  font-size: 14px;
  padding: 40px 0 30px;
  color: #fff;
`;

const Scores = styled.div`
  display: flex;
  margin: 0 -4px 8px;
  & > div {
    position: relative;
    width: 50%;
    padding: 8px;
    margin: 0 4px;
  }
  span {
    display: block;
    padding-bottom: 10px;
    font-size: 10px;
    color: #777;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
  & > div {
    position: relative;
    padding: 16px 16px 13px 16px;
    margin: 0 4px;
    font-size: 12px;
    cursor: pointer;
  }
`;

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
  position: relative;
  height: 0;
  padding-top: 100%;
  margin-bottom: 8px;
  overflow: hidden;
`;

const BoardInner = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  bottom: 16px;
  display: flex;
  margin: 0 -8px;
`;

const Col = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: -8px 4px;
`;

const Cell = styled.div`
  position: relative;
  cursor: pointer;
  margin: 4px 0;
  flex-grow: 1;
  display: grid;
  place-content: center;
  &.dropping {
    transform: translateY(calc(-100% * ${props => props.yOffset}));
    animation: ${dropIn} ${props => props.yOffset * 0.15 + "s"} linear forwards;
  }
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
  color: #000;
`;

// eslint-disable-next-line
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Options = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  display: grid;
  place-content: center;
  font-size: 18px;
  span {
    color: #888;
    font-size: 12px;
  }
  &.fade {
    animation: ${fadeIn} 0.7s ease-in forwards;
  }
`;

const Arrow = styled.div`
  width: 80px;
  height: 80px;
  position: absolute;
  top: calc(50% - 30px);
  cursor: POINTER;
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 25px;
    top: 25px;
    width: 30px;
    height: 8px;
    background: #ddd;
  }
  &:after {
    width: 8px;
    height: 30px;
  }
  &.left {
    left: 0;
    transform: rotate(-45deg);
  }
  &.right {
    right: 0;
    transform: rotate(135deg);
  }
`;

const BigButton = styled.div`
  position: relative;
  z-index: 20;
  font-size: 20px;
  padding: 24px 38px 20px;
  margin-top: 20px;
  color: #000;
  cursor: pointer;
`;

const Large = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;

const App = ({
  size,
  board,
  score,
  topScore,
  active,
  gameOver,
  touchBoard,
  changeSize,
  startGame,
  startNewGame,
  openSettings
}) => {
  return (
    <Wrapper>
      <Title>Make big number on tile!</Title>
      <Buttons>
        <div onClick={openSettings}>
          <Bg col="#444" />
          Options
        </div>
        <div
          onClick={() => {
            startNewGame(size);
          }}
        >
          <Bg col="#444" />
          New Game
        </div>
      </Buttons>
      <Board>
        <Bg col="#000" />
        <BoardInner>
          {board.map((col, x) => (
            <Col key={"col" + x}>
              {col.map((cell, y) => (
                <Cell
                  key={x + "-" + y}
                  className={cell.yOffset ? "dropping" : ""}
                  yOffset={cell.yOffset}
                  onClick={() => {
                    if (active && !gameOver) {
                      touchBoard(x, y, board, size, score, topScore);
                    }
                  }}
                >
                  <Bg col={cols[Math.min(cell.value, cols.length - 1)]} />
                  {cell.value}
                </Cell>
              ))}
            </Col>
          ))}
        </BoardInner>
        {gameOver && active ? (
          <Options className="fade">
            <div>
              Game Over
              <BigButton
                onClick={() => {
                  startNewGame(size);
                }}
              >
                <Bg col="#eee" /> Try Again
              </BigButton>
            </div>
          </Options>
        ) : null}
        {!active ? (
          <Options>
            <Arrow
              className="left"
              onClick={() => {
                changeSize(size <= 3 ? 6 : size - 1);
              }}
            />
            <Arrow
              className="right"
              onClick={() => {
                changeSize(size >= 6 ? 3 : size + 1);
              }}
            />
            <div>
              {gameOver ? <Large>Game Over</Large> : null}
              {size} <span>x</span> {size}
              <BigButton onClick={startGame}>
                <Bg col="#eee" /> {gameOver ? "Try Again" : "Play"}
              </BigButton>
            </div>
          </Options>
        ) : null}
      </Board>
      <Scores>
        <div>
          <Bg col="#262626" />
          <span>Best</span>
          {topScore}
        </div>
        <div>
          <Bg col="#262626" />
          <span>Score</span>
          {score}
        </div>
      </Scores>
    </Wrapper>
  );
};

export default App;
