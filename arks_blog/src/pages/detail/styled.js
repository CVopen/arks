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
  @media only screen and (max-width:750px){
    .detials-header {
      display: none;
    }
  }
`
export default Container