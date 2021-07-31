import styled from 'styled-components'

const Container = styled.div`
  color: var(--theme-fontColor);
  background-color: var(--theme-colorbg);
  transition: all .8s;
  min-height: 100vh;
  .detials-header {
    width: 100%;
    height: 40px;
    margin: 10px 0;
    border-top: 1px dashed #ccc;
    border-bottom: 1px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      color: #666;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .summary {
    color: var(--theme-fontColor);
    background-color: var(--theme-colorbg);
    transition: all .8s;
    h1 {
      color: var(--theme-fontColor);
      font-weight: 600;
      font-size: 2em;
    }
    p {
      text-indent: 2em;
      padding: 10px 0;
      margin-bottom: 20px;
    }
  }
  @media only screen and (max-width:750px){
    .detials-header {
      display: none;
    }
    .pre {
      width: 48% !important;
    }
    .next {
      width: 48% !important;
    }
  }
  .vditor-reset {
    h1, h2, h3, h4, h5, h6, p, li {
      color: var(--theme-fontColor);
    }
    h1:target, h2:target, h3:target, h4:target, h5:target, h6:target {
      padding-top: 60px;  
    }
  }
  .detail-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    h3 {
      color: #000058;
      font-weight: 600;
    }
    p {
      overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    }
    .pre {
      color: #000058;
      width: 30%;
      padding: 40px 4px;
      text-align: right;
      cursor: pointer;
      background-image: linear-gradient(to left, #a8edea 0%, #fed6e3 100%);
      clip-path: polygon(100% 40px, 35% 40px, 40% 0, 0 50%, 40% 100%, 35% calc(100% - 40px), 100% calc(100% - 40px));
      p {
        padding-left: 10%;
      }
    }
    .next {
      color: #000058;
      width: 30%;
      padding: 40px 4px;
      cursor: pointer;
      background-image: linear-gradient(to right, #a8edea 0%, #fed6e3 100%);
      clip-path: polygon(0 40px, 65% 40px, 60% 0, 100% 50%, 60% 100%, 65% calc(100% - 40px), 0 calc(100% - 40px));
      p {
        padding-right: 10%;
      }
    }
  }
`
export default Container