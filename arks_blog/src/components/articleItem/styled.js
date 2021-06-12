import styled from 'styled-components'

const Container = styled.div`
  color: var(--theme-fontColor);
  transition: all .8s;
  padding: 20px 0;
  cursor: pointer;
  h2 {
    color: var(--theme-fontColor);
    transition: all .8s;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
    &:hover {
      color: #ff7675;
    }
  }
  p {
    margin-bottom: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  span {
    font-size: 20px;
    padding-right: 10px;
  }
  div {
    display: flex;
    align-items: center;
  }
  .item {
    padding-right: 20px;
  }
  .tag {
    justify-content: space-between;
  }
  @media only screen and (max-width: 500px){
  .tag-right {
    display: none;
  }
}
`

export default Container