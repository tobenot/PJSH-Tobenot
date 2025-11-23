export type Position = {
  x: number;
  y: number;
};

export type TerrainType = 'ground' | 'water_shallow' | 'water_deep' | 'wall' | 'floor_safe';
export type StructureType = 'pillar' | 'car' | 'safe' | 'crate' | 'desk' | 'door_open' | 'door_closed' | null;

export interface TileData {
  x: number;
  y: number;
  terrain: TerrainType;
  structure: StructureType;
}

export type EntityType = 'player' | 'enemy' | 'npc' | 'item';
export type EnemyType = 'mud_walker' | 'mimic' | 'commodore' | 'guard';
export type ItemType = 'gun' | 'medkit' | 'filter' | 'whiskey' | 'black_box' | 'ammo';

export interface Entity {
  id: string;
  type: EntityType;
  subType?: EnemyType | ItemType; // specific type
  x: number;
  y: number;
  hp?: number;
  maxHp?: number;
  name: string;
  sprite: string; // Asset key
  layer: number; // Rendering order
  inventory?: string[]; // For player or containers
  facing?: 'left' | 'right' | 'up' | 'down';
  isAlerted?: boolean; // For enemies
}

export interface VFX {
  id: string;
  type: 'danger_line' | 'fire' | 'smoke' | 'ripple' | 'impact';
  x: number;
  y: number;
  targetX?: number; // For lines
  targetY?: number;
  duration: number; // Turns or frames remaining
}

export interface GameState {
  // Meta
  gameStatus: 'menu' | 'playing' | 'game_over' | 'victory';
  turn: number;
  
  // Environment
  tideLevel: number; // 0-100
  mapWidth: number;
  mapHeight: number;
  tiles: Record<string, TileData>; // Key: "x,y"
  
  // Entities
  player: Entity;
  entities: Entity[]; // Enemies, NPCs, Items
  vfx: VFX[];
  
  // Camera
  camera: Position;

  // Logs
  logs: GameLog[];
}

export interface GameLog {
  id: string;
  turn: number;
  message: string;
  type: 'info' | 'combat' | 'narrative' | 'danger';
}

