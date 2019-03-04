import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import Swipe from "react-easy-swipe";

const Wrapper = styled.div`
  --block: 4px;
  position: relative;
  max-width: 450px;
  padding: 0 10px;
  margin: 0 auto;
  text-transform: uppercase;
`;

const Bg = styled.div`
  --col: ${props => props.col};
  position: absolute;
  opacity: ${props => props.opacity || 1};
  z-index: -1;
  top: ${props => props.offset || 0};
  left: ${props => props.offset || 0};
  right: ${props => props.offset || 0};
  bottom: ${props => props.offset || 0};
  background-image: linear-gradient(var(--col), var(--col)),
    linear-gradient(var(--col), var(--col));
  background-repeat: no-repeat;
  background-size: calc(100% - var(--block) * 2) 100%,
    100% calc(100% - var(--block) * 2);
  background-position: var(--block) 0, 0 var(--block);
`;

const Title = styled.div`
  font-size: 14px;
  padding: 20px 0 10px;
  color: #fff;
  text-shadow: 0 3px 0 #000;
`;

const Description = styled.div`
  font-family: Arial, sans-serif;
  font-size: 15px;
  padding: 0 0 11px;
  line-height: 1.2;
  text-transform: none;
  color: #999;
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
    width: 130px;
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

const Board = styled.div`
  position: relative;
  width: 85%;
  margin: 0 auto 8px;
  height: 0;
  padding-top: 85%;
  overflow: hidden;
`;

const BoardInner = styled.div`
  --size: ${props => props.size}
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  bottom: 12px;
  font-size: ${props => props.fontSize};
`;

const Col = styled.div`
  position: absolute;
  width: var(--size);
  left: ${props => props.left};
  top: 0;
  bottom: 0;
`;

const Cell = styled.div`
  position: absolute;
  cursor: pointer;
  display: grid;
  place-content: center;
  height: var(--size);
  left: 0;
  right: 0;
  font-size: 1em;
  @media (max-width: 340px) {
    font-size: 0.7em;
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
  z-index: 5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  place-content: center;
  font-size: 18px;
  & > span {
    color: #888;
    font-size: 12px;
  }
  &.fade {
    opacity: 0;
    animation: ${fadeIn} 0.7s ease-in ${props => props.delay || "1s"} forwards;
  }
`;

const Arrow = styled.div`
  width: 60px;
  height: 60px;
  position: absolute;
  top: calc(50% - 30px);
  cursor: pointer;
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 15px;
    top: 15px;
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
  padding: 18px 18px 14px;
  margin-top: 20px;
  color: #000;
  cursor: pointer;
  .small {
    font-size: 14px;
    line-height: 26px;
  }
  .large {
    font-size: 20px;
    line-height: 26px;
  }
`;

const TopMessage = styled.div`
  position: absolute;
  width: 100%;
  top: 40px;
  left: 0;
  font-size: 20px;
`;

let interval;

class App extends Component {
  //
  // animate the dropping tiles
  componentDidMount() {
    clearInterval(interval);
    interval = setInterval(() => {
      const { setBoard, size, board } = this.props;
      const newBoard = board.map(col => {
        return col.map((cell, y) => {
          return {
            ...cell,
            yOffset: Math.max(size - y - 1, cell.yOffset - 0.2)
          };
        });
      });
      setBoard(newBoard);
    }, 1000 / 30);
  }

  sizeBigger = () => {
    const { size, changeSize } = this.props;
    changeSize(size <= 3 ? 6 : size - 1);
  };

  sizeSmaller = () => {
    const { size, changeSize } = this.props;
    changeSize(size >= 6 ? 3 : size + 1);
  };

  render() {
    const {
      size,
      board,
      score,
      topScore,
      active,
      won,
      carryOn,
      gameOver,
      touchBoard,
      startGame,
      startNewGame,
      openSettings
    } = this.props;
    return (
      <Wrapper>
        <Title>Get to ten</Title>
        <Description>
          Tap adjecent tiles with the same number to get a bigger number
        </Description>
        <Board>
          <Bg col="#000" />
          <BoardInner
            size={100 / size + "%"}
            fontSize={size < 4 ? "22px" : size < 6 ? "18px" : "14px"}
          >
            {board.map((col, x) => (
              <Col
                key={"col" + x}
                left={"calc(((100% / " + size + ")) * " + x + ")"}
              >
                {col.map((cell, y) => (
                  <Cell
                    key={x + "-" + y}
                    style={{
                      bottom:
                        "calc(((100% / " + size + ")) * " + cell.yOffset + ")"
                    }}
                    onClick={() => {
                      if (active && !gameOver) {
                        touchBoard(x, y, board, size, score, topScore);
                      }
                    }}
                  >
                    <Bg
                      offset={
                        size > 5 ? "calc(var(--block) / 2)" : "var(--block)"
                      }
                      col={cols[Math.min(cell.value, cols.length - 1)]}
                    />
                    {cell.value}
                  </Cell>
                ))}
              </Col>
            ))}
          </BoardInner>
          {won ? (
            <Options className="fade" delay="0s">
              <Bg col="#000" opacity="0.8" />
              <div>
                You Win!
                <BigButton onClick={carryOn}>
                  <Bg col="#eee" />
                  Carry On
                </BigButton>
              </div>
            </Options>
          ) : null}
          {(!active || gameOver) && !won ? (
            <Swipe
              onSwipeLeft={this.sizeBigger}
              onSwipeRight={this.sizeSmaller}
            >
              <Options className={gameOver && active ? "fade" : ""}>
                <Bg col="#000" opacity="0.8" />
                <Arrow className="left" onClick={this.sizeBigger} />
                <Arrow className="right" onClick={this.sizeSmaller} />
                <div>
                  {gameOver ? <TopMessage>Game Over</TopMessage> : null}
                  {size} <span>x</span> {size}
                  <BigButton
                    onClick={() => {
                      if (gameOver) {
                        startNewGame(size);
                      } else {
                        startGame();
                      }
                    }}
                  >
                    <Bg col="#eee" />
                    {gameOver ? (
                      <span className="small">Try Again</span>
                    ) : (
                      <span className="large">Play</span>
                    )}
                  </BigButton>
                </div>
              </Options>
            </Swipe>
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
      </Wrapper>
    );
  }
}

export default App;
