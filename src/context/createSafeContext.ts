import React from 'react';

/**
 * Generic safe context factory.
 * Eliminates the repeated createContext + useContext + "must be used within Provider" pattern.
 *
 * Usage:
 *   const [MyProvider, useMy, MyContext] = createSafeContext<MyType>('My');
 *   <MyProvider value={...}>{children}</MyProvider>
 *   const value = useMy();
 */
export function createSafeContext<T>(name: string) {
  const Ctx = React.createContext<T | undefined>(undefined);

  const useCtx = (): T => {
    const value = React.useContext(Ctx);
    if (value === undefined) {
      throw new Error(`use${name} must be used within a ${name}Provider`);
    }
    return value;
  };

  return [Ctx.Provider, useCtx, Ctx] as const;
}
