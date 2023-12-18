import React from 'react';
import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';

const GameBoard = styled.div`
padding: 40px;
justify-content: center;
align-items: center;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
grid-gap: 15px;
`;


const CardWrapper = styled.div`
  width: 80px;
  height: 100px;
  position: relative;
`;

const Card = styled.div`
  border-radius: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  cursor: pointer;
  perspective: 1000px; 
  transform-style: preserve-3d;
  transition: transform .3s;
  background: ${(props) => (props.flipped || props.matched ? 'rgba(119, 119, 119, .7)' : 'rgba(119, 119, 119, 1)')};


  ${(props) => props.flipped && css`
    transform: rotateY(180deg);
  `}

  .inner {
    transform-style: preserve-3d;
    transition: transform 0.6s;
  }

  .characters {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    transform: rotateY(180deg);
    transition: opacity 0.6s;
    opacity: ${(props) => (props.flipped || props.matched ? 1 : 0)};
    pointer-events: none; /* Prevent clicking on hidden characters */
    visibility: ${(props) => (props.flipped || props.matched ? 'visible' : 'hidden')};
  }
`;


const characters = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐔', '🐧',
    '🐦', '🐤', '🦆', '🦉', '🐢', '🐍', '🦎', '🐊', '🐋', '🐳', '🐬', '🐟', '🐠', '🐡', '🦈', '🐙', '🦑',
    '🦐', '🦞', '🦀', '🐌', '🦋', '🐛', '🐜', '🐝', '🐞', '🦗', '🕷️', '🦂', '🍏', '🍎', '🍐', '🍑', '🍒',
    '🍓', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🌽', '🍠', '🍇', '🍈', '🍉', '🍊', '🍋', '🍌',
    '🌈', '🌞', '⭐', '🍄', '🌺', '🚀', '🚢', '🎈', '🎉', '🎁', '🎊', '🎮', '🎸', '🎤', '📷', '💻',
    '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🥥', '🥝', '🍅', '🍆', '🌽', '🍠', '🍏', '🍎', '🍐',
    '🍑', '🍒', '🍓', '🦄', '🦖', '🐲', '🧚', '🧜', '🧝', '🧞', '🧛', '🧟', '🌍', '🌎', '🌏', '🌕', '🌖',
    '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌚', '🌝', '🌛', '🌜', '🌞', '⭐', '🌟', '💫', '✨', '☀️', '🌈'
];


const CongratsTitle = styled.div`
display: flex
justify-content: center;
text-align: center;
align-items: center;
font-size: 1.8rem;

span {
    border-radius: 5px;
    padding: 10px;
    background: rgba(50, 50, 50, .05);
}

button {
    margin-top: 20px;
    width: 150px;
    background: rgb(130, 130, 130);
    border-radius: 5px;
    padding: 10px;
    color: #eee;
}

button:hover {
    background: rgb(170, 170, 170);
}

`;


const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};



const MemoryGame = ({ numberOfCards }) => {
    const [shuffledCharacters, setShuffledCharacters] = useState([]);
    const [openedCards, setOpenedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [isGameComplete, setIsGameComplete] = useState(false);


    useEffect(() => {
        const selectedCharacters = shuffle(characters).slice(0, numberOfCards / 2);
        const duplicatedCharacters = [...selectedCharacters, ...selectedCharacters];
        const shuffledCards = shuffle(
            duplicatedCharacters.map((character) => ({
                character,
                flipped: false,
                matched: false,
            }))
        );
        setShuffledCharacters(shuffledCards);
    }, [numberOfCards]);

    const handleCardClick = (index) => {
        const updatedCharacters = [...shuffledCharacters];
        const clickedCard = updatedCharacters[index];

        if (clickedCard.flipped || clickedCard.matched) {
            return;
        }

        clickedCard.flipped = true;

        if (openedCards.length === 2) {
            const [firstCard, secondCard] = openedCards;
            firstCard.flipped = false;
            secondCard.flipped = false;
            setOpenedCards([]);
        }

        setOpenedCards((prevOpenedCards) => [...prevOpenedCards, clickedCard]);

        if (openedCards.length === 1) {
            const [firstCard] = openedCards;
            setMoves((prevMoves) => prevMoves + 1);

            if (firstCard.character === clickedCard.character) {
                firstCard.matched = true;
                clickedCard.matched = true;
                setOpenedCards([]);
                
            } 

            if (shuffledCharacters.every((card) => card.matched)) {
                setIsGameComplete(true);
            }
        }
        

        setShuffledCharacters(updatedCharacters);
    };
    

    const handleRetry = () => {
        const selectedCharacters = shuffle(characters).slice(0, numberOfCards / 2);
        const duplicatedCharacters = [...selectedCharacters, ...selectedCharacters];
        const shuffledCards = shuffle(
            duplicatedCharacters.map((character) => ({
                character,
                flipped: false,
                matched: false,
            }))
        );
        setShuffledCharacters(shuffledCards);
        setOpenedCards([]);
        setMoves(0);
        setIsGameComplete(false);
    };


    return (
        <div>
            <GameBoard>
                {shuffledCharacters.map((card, index) => (
                    <CardWrapper key={index} flipped={card.flipped}>
                        <Card onClick={() => handleCardClick(index)} flipped={card.flipped}>
                            <div className="inner">
                                <div className="characters">
                                    {card.flipped || card.matched ? card.character : ''}
                                </div>
                            </div>
                        </Card>
                    </CardWrapper>
                ))}
            </GameBoard>
            {isGameComplete && (
                <CongratsTitle>
                    <p>The game completed with <span>{moves}</span> moves!</p>
                    <button onClick={handleRetry}>Restart</button>
                </CongratsTitle>
            )}
        </div>
    );
};

export default MemoryGame;
