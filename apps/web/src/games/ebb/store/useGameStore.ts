import { create } from 'zustand';
import { GameState, TileData, GameLog, TerrainType } from '../types';
import { GAME_CONFIG } from '../constants/gameConfig';

interface GameActions {
  initGame: () => void;
  movePlayer: (dx: number, dy: number) => void;
  nextTurn: () => void;
  addLog: (message: string, type?: GameLog['type']) => void;
  setCamera: (x: number, y: number) => void;
}

type GameStore = GameState & GameActions;

const { MAP_WIDTH, MAP_HEIGHT } = GAME_CONFIG;

const generateMap = (): Record<string, TileData> => {
  const tiles: Record<string, TileData> = {};
  for (let x = 0; x < MAP_WIDTH; x++) {
    for (let y = 0; y < MAP_HEIGHT; y++) {
      let terrain: TerrainType = 'ground';
      // Simple generation logic
      if (y < 5) terrain = 'floor_safe'; // Top (Lighthouse)
      else if (y > 40) terrain = 'water_deep'; // Bottom (Abyss)
      else if (Math.random() > 0.8) terrain = 'water_shallow'; // Random puddles
      
      // Border walls
      if (x === 0 || x === MAP_WIDTH - 1) terrain = 'wall';
      
      tiles[`${x},${y}`] = {
        x,
        y,
        terrain,
        structure: Math.random() > 0.95 && terrain === 'ground' ? 'crate' : null
      };
    }
  }
  return tiles;
};

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial State
  gameStatus: 'menu',
  turn: 0,
  tideLevel: 0,
  mapWidth: MAP_WIDTH,
  mapHeight: MAP_HEIGHT,
  tiles: {},
  player: {
    id: 'player',
    type: 'player',
    x: Math.floor(MAP_WIDTH / 2),
    y: 2,
    hp: 100,
    maxHp: 100,
    name: 'Scavenger',
    sprite: 'player',
    layer: 5,
    inventory: ['filter', 'knife']
  },
  entities: [],
  vfx: [],
  camera: { x: Math.floor(MAP_WIDTH / 2), y: 2 },
  logs: [],


  // Actions
  initGame: () => {
    set({
      gameStatus: 'playing',
      tiles: generateMap(),
      turn: 1,
      tideLevel: 0,
      logs: [{ id: 'init', turn: 0, message: 'Welcome to the Lighthouse. The tide is low.', type: 'narrative' }]
    });
  },

  movePlayer: (dx, dy) => {
    const { player, tiles, entities, nextTurn, addLog } = get();
    const newX = player.x + dx;
    const newY = player.y + dy;
    const key = `${newX},${newY}`;
    const tile = tiles[key];

    // Bounds check
    if (!tile) return;

    // Collision check (Walls)
    if (tile.terrain === 'wall') {
      addLog("Blocked by wall.", 'info');
      return;
    }

    // Collision check (Entities)
    const blocker = entities.find(e => e.x === newX && e.y === newY);
    if (blocker) {
      addLog(`Bumped into ${blocker.name}.`, 'info');
      // Attack logic could go here
      return;
    }

    // Update position
    set((state) => ({
      player: { ...state.player, x: newX, y: newY },
      camera: { x: newX, y: newY }
    }));

    // Cost of movement (1 turn)
    nextTurn();
  },

  nextTurn: () => {
    const { turn, tideLevel, addLog } = get();
    const newTurn = turn + 1;
    const newTide = tideLevel + 1; // Simple linear tide for now

    set({
      turn: newTurn,
      tideLevel: newTide
    });

    if (newTide === 60) addLog("The tide is rising...", 'danger');
    if (newTide === 80) addLog("The water is getting deep!", 'danger');
  },

  addLog: (message, type = 'info') => {
    set((state) => ({
      logs: [
        { id: Math.random().toString(36).substr(2, 9), turn: state.turn, message, type },
        ...state.logs
      ].slice(0, 50) // Keep last 50 logs
    }));
  },

  setCamera: (x, y) => set({ camera: { x, y } })
}));

