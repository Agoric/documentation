import type React from "react"
import styled, { keyframes } from "styled-components"

const HolographicAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const HeaderContainer = styled.div`
  text-align: center;
  padding: 20px;
  color: white;
`

const MainTitle = styled.h1`
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 10px;
  background: linear-gradient(
    -45deg,
    #ee7752,
    #e73c7e,
    #23a6d5,
    #23d5ab
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${HolographicAnimation} 15s ease infinite;
  display: inline-block; /* Ensures the background only covers the text */
  line-height: 1.2; /* Adjust line height for better spacing */
`

const Subtitle = styled.p`
  font-size: 1.2em;
  font-style: italic;
  color: #ddd;
  margin-top: 10px;
`

const HolographicHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <MainTitle>Inclusive Lending and Credit Empirical Authority</MainTitle>
      <Subtitle>
        New World Wealth Navigation Assistant. Introducing the Benefits of Economic Global Citizenship, Welcome Home
      </Subtitle>
    </HeaderContainer>
  )
}

export default HolographicHeader
