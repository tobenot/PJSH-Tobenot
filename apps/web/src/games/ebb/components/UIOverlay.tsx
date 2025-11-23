import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { MainMenu } from './MainMenu';
import clsx from 'clsx';

export const UIOverlay = () => {
  const { player, turn, tideLevel, logs, gameStatus } = useGameStore();

  if (gameStatus === 'menu') return <MainMenu />;

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-start">
        {/* Status Panel */}
        <div className="bg-black/80 text-green-500 p-4 border border-green-900 font-mono rounded pointer-events-auto">
          <h2 className="text-xl font-bold mb-2">STATUS</h2>
          <div className="space-y-1">
            <div className="flex justify-between gap-8">
              <span>HP</span>
              <span className={clsx(player.hp && player.hp < 30 ? 'text-red-500' : 'text-green-500')}>
                {player.hp}/{player.maxHp}
              </span>
            </div>
            <div className="flex justify-between gap-8">
              <span>SANITY</span>
              <span>100/100</span>
            </div>
            <div className="flex justify-between gap-8">
              <span>WEIGHT</span>
              <span>12/30kg</span>
            </div>
          </div>
        </div>

        {/* Controls Guide */}
        <div className="bg-black/80 text-gray-400 p-4 border border-gray-800 font-mono text-sm rounded pointer-events-auto">
            <h3 className="text-gray-200 font-bold mb-2 border-b border-gray-700 pb-1">CONTROLS</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <span>WASD / Arrows</span> <span className="text-gray-500">Move</span>
                <span>T</span> <span className="text-gray-500">Improvise (LLM)</span>
                <span>Space</span> <span className="text-gray-500">Interact</span>
            </div>
        </div>

        {/* Tide Meter */}
        <div className="bg-black/80 text-blue-400 p-4 border border-blue-900 font-mono rounded text-center">
          <h2 className="text-xl font-bold">TIDE LEVEL</h2>
          <div className="text-3xl my-2">{tideLevel}%</div>
          <div className="text-xs text-gray-400">TURN: {turn}</div>
          <div className="w-32 h-2 bg-gray-800 mt-2 rounded overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500" 
              style={{ width: `${Math.min(tideLevel, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Log Panel */}
      <div className="w-full max-w-xl bg-black/70 p-2 rounded pointer-events-auto overflow-hidden">
        <div className="h-40 overflow-y-auto flex flex-col-reverse scrollbar-hide">
          {logs.map((log) => (
            <div key={log.id} className={clsx(
              "text-sm mb-1 font-mono",
              log.type === 'danger' && "text-red-500",
              log.type === 'narrative' && "text-yellow-500 italic",
              log.type === 'combat' && "text-orange-400",
              log.type === 'info' && "text-gray-300"
            )}>
              <span className="opacity-50 mr-2">[{log.turn}]</span>
              {log.message}
            </div>
          ))}
        </div>
      </div>

      {/* Game Over / Menu Overlay (if needed) */}
      {gameStatus === 'game_over' && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center pointer-events-auto">
          <div className="text-center">
            <h1 className="text-6xl text-red-600 font-bold mb-4">YOU DIED</h1>
            <p className="text-gray-400 mb-8">The city has claimed another soul.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-900 text-white rounded hover:bg-red-800"
            >
              RESTART
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

