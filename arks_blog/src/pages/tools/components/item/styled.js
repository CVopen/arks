import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  color: var(--theme-fontColor);
  transition: all .8s;
  border-radius: 10px;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #fff !important;
  box-shadow: 0 1px 5px 0px rgba(0, 0, 0, .2);
  margin-bottom: 20px;
  padding: 5px;
  cursor: pointer;
  height: 120px;
  &:hover {
    transform: translateY(-6px);
    .tools-content{
      width: 100%;
    }
    .tools-item-title {
      height: 0;
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
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-height: 16px;
  }
  h2 {
    margin: 0;
    transition: all .8s;
    word-wrap:break-word; 
    word-break:break-all; 
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow : hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-weight: bold;
    font-size: 20px;
    line-height: 20px;
    color: var(--theme-fontColor);
    &:hover {
      color: #ff7675;
    }
  }
  .tools-content {
    width: 0;
    padding-left: 5px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all .6s;
  }
  .tools-item-content {
    display: flex;
    justify-content: center;
  }
  .tools-item-title {
    text-align: center;
    height: 35px;
    line-height: 35px;
    transition: all .6s;
    overflow: hidden;
  }
`

export default Container