import styled from 'styled-components'

const Container = styled.div`
  color: var(--theme-fontColor);
  transition: all .8s;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  @media only screen and (max-width: 750px){
    .tools-item {
      width: 47%;
      margin-right: 6%;
      padding: 10px 5px;
      img {
        width: 50px;
      }
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
  @media only screen and (min-width: 750px){
    .tools-item {
      width: 30%;
      margin-right: 5%;
      padding: 10px;
      img {
        width: 60px;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
`

export default Container