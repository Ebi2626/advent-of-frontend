import { createTracer } from './index';

test('trace journey throughout space and time', () => {
  const tracer = createTracer<string>();
  tracer.add('Andromeda');
  tracer.add('Triangulum');
  tracer.add('Large Magellanic Cloud');
  
  expect(tracer.current()).toBe('Large Magellanic Cloud');
  tracer.undo();
  expect(tracer.current()).toBe('Triangulum');
  tracer.redo();
  expect(tracer.current()).toBe('Large Magellanic Cloud');
});

test('cover peeking beyond the limit of history', () => {
  const tracer = createTracer<string>();
  tracer.add('Andromeda');

  tracer.undo();
  tracer.undo();

  expect(tracer.current()).toBeNull();
});

test('support custom representation of space and time', () => {

  interface SpaceTimeCoords {
    x: number;
    y: number;
    z: number;
  }

  const tracer = createTracer<SpaceTimeCoords>();
  tracer.add({ x: 1, y: 2, z: 3 });
  tracer.add({ x: 10, y: -6, z: 12 });

  expect(tracer.current()).toStrictEqual({ x: 10, y: -6, z: 12 });
  tracer.undo();
  expect(tracer.current()).toStrictEqual({ x: 1, y: 2, z: 3 });
});

test('ensure safe forwarding of history', () => {
  const tracer = createTracer<string>();
  tracer.add('Andromeda');

  tracer.undo();
  tracer.add('Large Magellanic Cloud');

  expect(() => tracer.redo()).toThrowError('No more galaxies to explore');
});
