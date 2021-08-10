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
      display: block;
      img {
        width: 100px;
        height: 100px;
        display: block;
        object-fit: cover;
        transform: translateY(-10%);
        transition: all .4s;
      }
      .time-visit {
        width: 100%;
        height: 100%;
        background-color: #eae8e842;
        flex-direction: column;
        position: relative;
        span {
          padding: 0;
          &:first-child {
            font-size: 36px;
            font-weight: bold;
          }
          &:last-child {
            font-size: 14px;
          }
        }
      }
      &:hover {
        img {
          transform: translateY(-100%);
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    width: 100%;
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
    width: 100%;
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
    margin-top: 5px;
    
    span {
      padding: 0;
    }
  }
  .tag_item {
    display: inline-block;
    margin-left: 5px;
    font-size: 14px;
    transition: all .4s;
    &:hover {
      color: #ff7675;
    }
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