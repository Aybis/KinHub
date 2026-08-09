import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

// `require.context` is provided by Metro at build time.
const ctx = (require as any).context('./app');

export function App() {
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);