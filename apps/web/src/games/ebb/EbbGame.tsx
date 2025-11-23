import React, { useEffect } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { UIOverlay } from './components/UIOverlay';
import { useGameStore } from './store/useGameStore';

export const EbbGame = () => {
  const { movePlayer, gameStatus } = useGameStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;

      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          movePlayer(0, -1);
          break;
        case 's':
        case 'ArrowDown':
          movePlayer(0, 1);
          break;
        case 'a':
        case 'ArrowLeft':
          movePlayer(-1, 0);
          break;
        case 'd':
        case 'ArrowRight':
          movePlayer(1, 0);
          break;
        case 't':
          // Open LLM Input (TODO)
          console.log("Open Improvisation Menu");
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, movePlayer]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <GameCanvas />
      <UIOverlay />
    </div>
  );
};

export default EbbGame;

