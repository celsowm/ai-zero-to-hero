/**
 * Generic registry factory.
 * Eliminates duplicated key→value lookup patterns across visualRegistry and future registries.
 *
 * Usage:
 *   const registry = createRegistry<string, FC>('visual');
 *   registry.register('my-key', MyComponent);
 *   const comp = registry.get('my-key');
 */
export function createRegistry<K extends string, V>(name: string) {
  const store = new Map<K, V>();

  return {
    register(key: K, value: V): void {
      store.set(key, value);
    },

    get(key: K): V | undefined {
      return store.get(key);
    },

    getOrThrow(key: K): V {
      const value = store.get(key);
      if (value === undefined) {
        throw new Error(`${name} registry: key "${key}" not found. Available keys: [${Array.from(store.keys()).join(', ')}]`);
      }
      return value;
    },

    has(key: K): boolean {
      return store.has(key);
    },

    list(): K[] {
      return Array.from(store.keys());
    },

    size(): number {
      return store.size;
    },
  };
}
