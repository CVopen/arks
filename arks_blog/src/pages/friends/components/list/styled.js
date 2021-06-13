import styled from 'styled-components'

const Container = styled.div`
  color: var(--theme-fontColor);
  transition: all .8s;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  @media only screen and (max-width: 750px){
    .friend-item {
      padding: 5px 10px;
      img {
        width: 60px;
      }
    }
  }
`

export default Container