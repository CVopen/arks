import styled from 'styled-components'

const Container = styled.div`
  color: var(--theme-fontColor);
  transition: all .8s;
  padding: 20px 0;
  cursor: pointer;
  .header {
    justify-content: space-between;
    flex-direction: row-reverse;
    .img {
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        transform: scale(1);
        transition: all .4s;
        &:hover {
          transform:scale(1.1);
        }
      }
    }
    .header-content {
      width: calc(100% - 110px);
      display: flex;
      flex-direction: column;
    }
  }
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
    .item {
      &:last-child {
        display: none;
      }
    }
  }
`

export default Container