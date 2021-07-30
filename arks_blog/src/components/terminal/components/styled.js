import styled from 'styled-components'

const Container = styled.div`
  span {
    cursor: text;
    user-select: auto;
  }
  .command {
    display: flex;
    .row-item {
      padding-left: 20px;
      padding-right: 5px;
      color: #000;
      white-space: nowrap;
      height: 22px;
      span { 
        color: #000;
        display: inline-block;
        margin-right: 5px;
      }
      &:first-child {
        padding-left: 5px;
      }
    }
    .date {
      background-color: #ff7f50;
      position: relative;
      &::after {
        content: " ";
        position: absolute;
        width: 15px;
        height: 100%;
        top: 0;
        right: -14px;
        background-color: #ff7f50;
        clip-path: polygon(0 0, 100% 50%, 0 100%);
        z-index: 1;
      }
    }
    .clock {
      background-color: #00ff00;
      position: relative;
      &::after {
        content: " ";
        position: absolute;
        width: 15px;
        height: 100%;
        top: 0;
        right: -14px;
        background-color: #00ff00;
        clip-path: polygon(0 0, 100% 50%, 0 100%);
        z-index: 1;
      }
    }
    .username {
      background-color: #ffff00;
      padding-right: 20px;
      clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%)
    }
    span {
      display: inline-block;
      white-space: nowrap;
      box-sizing: border-box;
      padding-left: 5px;
      &:hover {
        color: #fff;
      }
    }
    .command-input {
      position: relative;
      &::after {
        position: absolute;
        content: " ";
        bottom: 0;
        right: -15px;
        animation: caret .8s steps(1) infinite;
        background-color: transparent;
        width: 10px;
        height: 2px;
        @keyframes caret{
          50% { background-color: currentColor}
        }
      }
    }

  }
  .help-item {
    display: flex;
    .help-key {
      color: #c514f4;
      width: 60px;
      font-weight: bold;
    }
    .help-value {
      color: #0058b9
    }
  }
`
export default Container