import styled from 'styled-components'

const Container = styled.div`
  color: var(--theme-fontColor);
  transition: all .8s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  .category-item {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .category-num {
    display: flex;
    margin-left: 20px;
    flex-direction: column;
    width: 100px;
    align-items: center;
    img {
      width: 60px;
    }
    span {
      word-wrap:break-word; 
      word-break:break-all; 
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow : hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
  .category-circular {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ff7675;
    margin-right: 20px;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
  }
  .category-info {
    width: calc(100% - 70px);
    .category-title {
      font-size: 18px;
      font-weight: 600;
      transition: all .8s;
      &:hover {
        color: #ff7675;
      }
    }
    p {
      margin: 0;
      word-wrap:break-word; 
      word-break:break-all; 
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow : hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  @media only screen and (max-width: 500px){
    .category-num {
      img {
        width: 40px;
      }
    }
  }
`

export default Container