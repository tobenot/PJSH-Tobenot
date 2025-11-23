export const GAME_CONFIG = {
  TILE_SIZE: 64, // 默认放大一些，用户提到的256可能过大导致视野太小，建议配合缩放使用
  MAP_WIDTH: 20,
  MAP_HEIGHT: 50,
  SCREEN_WIDTH: 1024, // 稍微加大屏幕宽度
  SCREEN_HEIGHT: 768,
};

export const CONTROLS = {
  MOVE_UP: ['w', 'ArrowUp'],
  MOVE_DOWN: ['s', 'ArrowDown'],
  MOVE_LEFT: ['a', 'ArrowLeft'],
  MOVE_RIGHT: ['d', 'ArrowRight'],
  INTERACT: ['e', 'Enter'],
  IMPROVISE: ['t'], // 战术/LLM
  CANCEL: ['Escape'],
};

