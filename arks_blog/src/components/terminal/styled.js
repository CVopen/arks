import styled from 'styled-components'

const Container = styled.div`
  .circular{
    width: 50px;
    height: 50px;
    z-index: 99;
    position: fixed;
    bottom: 90px;
    right: -90px;
    border-radius: 50%;
    box-shadow: 0px 11px 12px -6px #ccc;
    background-color: #fff;
    display: flex;
    align-content: center;
    justify-content: center;
    font-size: 30px;
    transition: all 1.4s;
    span {
      color: #000;
      line-height: 50px;
    }
  }
  .circular-full {
    right: 20px;
  }
  .container {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0 , 0, 0, .6);
    position: fixed;
    bottom: 0;
    right: 0;
    transition: all .8s;
    overflow: hidden;
  }
  .container-full {
    width: 0;
    height: 0;
    bottom: 10%;
    right: -20%;
  }
  .terminal {
    width: 50%;
    height: 50%;
    background-color: #000;
    margin: 0 auto;
    margin-top: 10%;
    border-radius: 10px;
    color: #fff;
    overflow: hidden;
    transition: all .8s;
    animation: animation_terminal .8s;
    @keyframes animation_terminal {
      0% {
        transform: rotateX(60deg) rotateY(30deg);
      }
      70% {
        transform: rotateX(-30deg) rotateY(15deg);
      }
      100% {
        transform: rotateX(0) rotateY(0);
      }
    }
    .header {
      height: 35px;
      width: 100%;
      background-color: #fff;
      flex-direction: row-reverse;
      align-items: center;
      display: flex;
      span {
        margin-right: 10px;
        color: #000;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        &:nth-child(3) {
          background-color: #0984e3;
          color: #0984e3;
        }
        &:nth-child(2) {
          background-color: #f39c12;
          color: #f39c12;
        }
        &:nth-child(1) {
          background-color: #c0392b;
          color: #c0392b;
        }
        svg {
          margin-top: 50%;
          transform: translateY(-50%);
        }
        &:hover {
          color: #fff;
        }
      }
    }
  }
  
  .full {
    width: 80%;
    height: 80%;
    margin-top: 5%;
  }
  .terminal-content {
    .help {
      width: 400px;
      margin: 10px auto;
      border: 1px solid #ccc;
      padding: 10px;
      transform: rotate(1deg);
      h1 {
        color: #00c800;
        font-size: 20px;
        display: block;
        text-align: center;
        margin: 0 auto;
      }
      h2 {
        display: block;
        color: #f70000;
        font-size: 16px;
      }
      p {
        color: #0058b9;
      }
    }
  }
`

export default Container