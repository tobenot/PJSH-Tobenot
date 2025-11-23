import React, { useCallback } from 'react';
import { Stage, Container, Graphics } from '@pixi/react';
import { useGameStore } from '../store/useGameStore';
import { TileData, Entity } from '../types';
import { GAME_CONFIG } from '../constants/gameConfig';
import * as PIXI from 'pixi.js';

const { TILE_SIZE, SCREEN_WIDTH, SCREEN_HEIGHT } = GAME_CONFIG;

// Component to render a single tile
const Tile = ({ data }: { data: TileData }) => {
  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    
    // Color mapping
    let color = 0x222222; // default ground
    if (data.terrain === 'wall') color = 0x555555;
    else if (data.terrain === 'water_shallow') color = 0x224466;
    else if (data.terrain === 'water_deep') color = 0x001133;
    else if (data.terrain === 'floor_safe') color = 0x444433;

    g.beginFill(color);
    g.drawRect(0, 0, TILE_SIZE, TILE_SIZE);
    g.endFill();

    // Structure (simple dot)
    if (data.structure) {
      g.beginFill(0x886644); // Brown crate/object
      g.drawRect(TILE_SIZE * 0.25, TILE_SIZE * 0.25, TILE_SIZE * 0.5, TILE_SIZE * 0.5);
      g.endFill();
    }
  }, [data]);

  return <Graphics draw={draw} x={data.x * TILE_SIZE} y={data.y * TILE_SIZE} />;
};

// Component to render an entity
const GameEntity = ({ entity }: { entity: Entity }) => {
  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    let color = 0xFFFFFF;
    if (entity.type === 'player') color = 0x00FF00;
    else if (entity.type === 'enemy') color = 0xFF0000;
    else if (entity.type === 'item') color = 0xFFFF00;

    g.beginFill(color);
    g.drawCircle(TILE_SIZE / 2, TILE_SIZE / 2, TILE_SIZE / 3);
    g.endFill();
  }, [entity]);

  return (
    <Container x={entity.x * TILE_SIZE} y={entity.y * TILE_SIZE}>
      <Graphics draw={draw} />
    </Container>
  );
};

export const GameCanvas = () => {
  const { tiles, player, entities, camera } = useGameStore();

  // Camera logic: Center on player
  const worldX = SCREEN_WIDTH / 2 - camera.x * TILE_SIZE;
  const worldY = SCREEN_HEIGHT / 2 - camera.y * TILE_SIZE;

  return (
    <Stage width={SCREEN_WIDTH} height={SCREEN_HEIGHT} options={{ backgroundColor: 0x101010 }}>
      <Container position={[worldX, worldY]}>
        {/* Layer 1: Terrain */}
        <Container>
          {Object.values(tiles).map((tile) => (
            <Tile key={`${tile.x},${tile.y}`} data={tile} />
          ))}
        </Container>

        {/* Layer 2: Entities */}
        <Container>
          {entities.map(ent => <GameEntity key={ent.id} entity={ent} />)}
          <GameEntity entity={player} />
        </Container>
      </Container>
    </Stage>
  );
};


