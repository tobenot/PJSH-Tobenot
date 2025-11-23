import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { ASSET_PATHS } from '../constants/assetPaths';

export const MainMenu = () => {
  const { initGame } = useGameStore();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white z-50">
      <div className="max-w-4xl w-full text-center">
        {/* 海报区域 / Poster Area */}
        <div className="relative w-full aspect-video bg-gray-900 mb-8 border-2 border-gray-800 rounded-lg overflow-hidden group">
          {/* 海报图片 */}
          <img 
            src={ASSET_PATHS.POSTER} 
            alt="Project: EBB - The Drowned City"
            className="w-full h-full object-cover"
            onError={(e) => {
              // 如果海报不存在，显示占位符
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const placeholder = target.nextElementSibling as HTMLElement;
              if (placeholder) placeholder.style.display = 'flex';
            }}
          />
          <div className="hidden absolute inset-0 items-center justify-center text-gray-600 text-xl group-hover:text-gray-400 transition-colors">
            [ POSTER / TITLE ART PLACEHOLDER ]
            <br />
            <span className="text-sm">Put your poster.webp in: apps/web/public/img/ebb/poster.webp</span>
          </div>
          
          {/* 装饰性标题 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
             <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-600 filter drop-shadow-lg">
              PROJECT: EBB
            </h1>
            <p className="text-xl text-gray-400 mt-2 tracking-widest uppercase">The Drowned City</p>
          </div>
        </div>

        {/* 菜单按钮 */}
        <div className="space-y-4">
          <button
            onClick={initGame}
            className="px-12 py-4 bg-blue-900/50 hover:bg-blue-800 text-blue-100 text-xl font-mono border border-blue-700 rounded transition-all hover:scale-105 active:scale-95 w-64"
          >
            START GAME
          </button>
          
          <div className="text-gray-500 text-sm font-mono mt-8">
            v0.1.0 MVP
          </div>
        </div>
      </div>
    </div>
  );
};
