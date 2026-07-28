import { useEffect, useState } from 'react';

/** The values `<UserProfile appearancePreference>` accepts. */
export type AppearancePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'torii-example:appearance';
const DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * The SDK renders the Appearance control but deliberately doesn't apply it:
 * appearance is device-local, so persisting and applying it is the app's job.
 * Applying means one class, `dark` on <html>, which is what the SDK's dark
 * token block is scoped to.
 */
export function useAppearance() {
  const [preference, setPreference] = useState<AppearancePreference>(stored);
  const [system, setSystem] = useState(() => matchMedia(DARK_QUERY).matches);

  useEffect(() => {
    const query = matchMedia(DARK_QUERY);
    const onChange = (e: MediaQueryListEvent) => setSystem(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const mode = preference === 'system' ? (system ? 'dark' : 'light') : preference;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    document.documentElement.style.colorScheme = mode;
    localStorage.setItem(STORAGE_KEY, preference);
  }, [mode, preference]);

  return {
    preference,
    setPreference,
    mode,
    /** Pins the opposite of the current mode, for the two-state page button. */
    toggle: () => setPreference(mode === 'dark' ? 'light' : 'dark'),
  };
}

function stored(): AppearancePreference {
  const value = localStorage.getItem(STORAGE_KEY);
  return value === 'light' || value === 'dark' || value === 'system' ? value : 'system';
}
