import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  color: var(--theme-fontColor);
  transition: all .8s;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  border: 1px solid #fff !important;
  box-shadow: 0 1px 5px 0px rgba(0, 0, 0, .2);
  margin-bottom: 20px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    transform: translateY(-6px);
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
    &:hover {
      color: #ff7675;
    }
  }
  .tools-content {
    padding-left: 5px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

export default Container