import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  color: var(--theme-fontColor);
  transition: all .8s;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  box-shadow: 0 1px 5px 0px rgba(0, 0, 0, .2);
  margin-bottom: 20px;
  padding: 10px;
  cursor: pointer;
  width: 47%;
  margin-right: 6%;
  &:nth-child(2n) {
    margin-right: 0;
  }
  background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);
  &:hover {
    transform: translateY(-6px);
  }
  img {
    width: 80px;
    clip-path: polygon(50% 3%,91% 25%,91% 75%,50% 97%,9% 75%,9% 25%)
  }
  @media only screen and (max-width: 750px){
    & {
      width: 100%;
      margin-right: 0;
    }
  }
`

export default Container