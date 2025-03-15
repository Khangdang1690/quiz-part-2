import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import Flashcard from './components/Flashcard';
import AnswerInput from './components/AnswerInput';
import FlashcardControls from './components/FlashcardControl';
import WaveText from './components/WaveText';
import ProgressIndicator from './components/ProgressIndicator';
import { flashcards } from './assets/flashcards';
import './App.css';

function App() {
  const [cards, setCards] = useState(flashcards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);
  
  const handlePrevCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => 
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };
  
  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => 
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const toggleCard = () => {
    setShowAnswer(!showAnswer);
  };

  const handleShuffle = () => {
    setCards(prevCards => {
      const shuffled = [...prevCards].sort(() => Math.random() - 0.5);
      setCurrentCardIndex(0);
      setShowAnswer(false);
      return shuffled;
    });
  };

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setLongestStreak(prev => Math.max(prev, newStreak));
    } else {
      setCurrentStreak(0);
    }
  };

  const handleMarkMastered = () => {
    const currentCard = cards[currentCardIndex];
    setMasteredCards(prev => [...prev, currentCard]);
    setCards(prev => {
      const newCards = prev.filter((_, index) => index !== currentCardIndex);
      if (newCards.length === 0) {
        return prev; // Keep the card if it's the last one
      }
      if (currentCardIndex >= newCards.length) {
        setCurrentCardIndex(0);
      }
      return newCards;
    });
  };

  const handleReviewMastered = () => {
    if (masteredCards.length > 0) {
      setCards(masteredCards);
      setMasteredCards([]);
      setCurrentCardIndex(0);
      setShowAnswer(false);
    }
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrevCard();
      if (e.key === 'ArrowRight') handleNextCard();
      if (e.key === ' ') toggleCard();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <Layout>
      <Header title="Flashcard App" />
      <div className="stats">
        <p>Current Streak: <span className="streak-count">{currentStreak}</span></p>
        <p>Longest Streak: <span className="streak-count">{longestStreak}</span></p>
        <p>Mastered: <span className="mastered-count">{masteredCards.length}</span></p>
      </div>
      <div className="flashcard-container">
        {cards.length > 0 ? (
          <>
            <Flashcard 
              question={cards[currentCardIndex].question}
              answer={cards[currentCardIndex].answer}
              showAnswer={showAnswer}
              onToggle={toggleCard}
            />
            <AnswerInput 
              answer={cards[currentCardIndex].answer}
              onSubmit={handleAnswerSubmit}
            />
            <div className="controls-container">
              <FlashcardControls 
                onPrev={handlePrevCard} 
                onNext={handleNextCard} 
              />
              <div className="additional-controls">
                <button className="control-btn shuffle-btn" onClick={handleShuffle}>
                  🔀 Shuffle
                </button>
                <button className="control-btn master-btn" onClick={handleMarkMastered}>
                  ⭐ Mark as Mastered
                </button>
              </div>
            </div>
            <ProgressIndicator 
              currentIndex={currentCardIndex} 
              totalCards={cards.length} 
            />
          </>
        ) : (
          <div className="all-mastered">
            <h2>All Cards Mastered! 🎉</h2>
            <button 
              className="control-btn review-btn"
              onClick={handleReviewMastered}
            >
              Review Mastered Cards
            </button>
          </div>
        )}
        <WaveText text="Master your knowledge!" />
      </div>
    </Layout>
  );
}

export default App;