import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  color: var(--theme-fontColor);
  transition: all .8s;
  margin-top: 30px;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  border: 1px solid #fff !important;
  box-shadow: 0 1px 5px 0px rgba(0, 0, 0, .2);
  img {
    width: 25%;
    object-fit: cover;
  }
  .info {
    padding-left: 30px;
    padding-right: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    .title {
      font-weight: bold;
      font-size: 20px;
      padding-bottom: 30px;
    }
  }
  @media only screen and (max-width: 500px){
    .info {
      padding-left: 10px;
      .title {
        padding-bottom: 10px;
      }
    }
  }
`

export default Container