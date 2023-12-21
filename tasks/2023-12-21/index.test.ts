import { FactoryInjector, InjectionToken } from './index';

test('main functionality - should retrieve standard blueprints for every worker', () => {
  const injector = new FactoryInjector();

  class SnowboardBlueprint {
    brand = 'SnowX';
  }
  injector.registerClass(SnowboardBlueprint);

  const worker1Request = injector.get<SnowboardBlueprint>(SnowboardBlueprint);
  expect(worker1Request).toBeInstanceOf(SnowboardBlueprint);
  expect(worker1Request.brand).toBe('SnowX');

  const worker2Request = injector.get<SnowboardBlueprint>(SnowboardBlueprint);
  expect(worker2Request).toBeInstanceOf(SnowboardBlueprint);
  expect(worker2Request.brand).toBe('SnowX');
});

test('edge case - should throw when trying to retrieve a non-registered blueprint', () => {
  const injector = new FactoryInjector();

  class ConsoleBlueprint {}
  expect(() => injector.get<ConsoleBlueprint>(ConsoleBlueprint)).toThrow();
});

test('edge case - should handle injection tokens properly', () => {
  const injector = new FactoryInjector();

  const TOKEN = new InjectionToken<string>('SPORT_GEAR');
  injector.provideValue(TOKEN, 'Gloves');

  const value = injector.get(TOKEN);
  expect(value).toBe('Gloves');
});
