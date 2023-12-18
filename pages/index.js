import React, { useState } from "react";
import MemoryGame from "@/components/GameBoard";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: rgba(50, 50, 50, .16);
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h1`
background: rgba(50, 50, 50, .03);
border-bottom: 1px solid rgba(30, 30, 30, .16);
text-transform: uppercase;
font-family: Montserrat, sans-serif;
font-size: 3rem;
text-align: center;
`;

const SubTitle = styled.label`
margin-top: 50px;
text-transform: uppercase;
font-family: Montserrat, sans-serif;
font-size: 1.3rem;
text-align: center;
display: flex;
justify-content: center;
text-align: center;
align-items: center;

select {
  font-size: 1.5rem;
  background: rgba(50, 50, 50, .05);
  border-radius: 5px;
}
`;

const Option = styled.option`
display: flex;
background: rgba(50, 50, 50, .16);
text-align: center;
`;

export default function Home() {
  const [numberOfCards, setNumberOfCards] = useState(16);

  const handleOptionChange = (event) => {
    setNumberOfCards(Number(event.target.value));
  };
  return (
<Container>
  <Content>
      <Title>Memory Card Game</Title>

        <SubTitle>
          Number of Cards:
          <select value={numberOfCards} onChange={handleOptionChange}>
            <Option value={16}>16</Option>
            <Option value={32}>32</Option>
            <Option value={64}>64</Option>
            <Option value={128}>128</Option>
          </select>
        </SubTitle>

      <MemoryGame numberOfCards={numberOfCards} />
      </Content>
    </Container>

  )
}