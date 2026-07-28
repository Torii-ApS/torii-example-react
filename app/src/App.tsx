import {
  AuthCard,
  AuthLoading,
  LanguageSelector,
  SignedIn,
  SignedOut,
  UserDashboard,
} from '@torii-js/torii-react';
import { useAppearance } from './theme';

export default function App() {
  const { preference, setPreference, mode, toggle } = useAppearance();

  return (
    <main className="page">
      {/* Signed in, both switches live in the dashboard's profile card: language
          on the Profile section, appearance under Preferences. Signed out there
          is no card, so the page carries them. */}
      <SignedOut>
        <div className="controls">
          <button type="button" onClick={toggle} aria-label="Toggle theme">
            {mode === 'dark' ? '☀' : '☾'}
          </button>
          <LanguageSelector />
        </div>
      </SignedOut>

      <AuthLoading>
        <p className="status">…</p>
      </AuthLoading>

      {/* AuthCard, not SignIn: its footer links flip to sign-up and
          forgot-password in place, so one mount covers every credential screen. */}
      <SignedOut>
        <AuthCard defaultMode="login" />
      </SignedOut>

      {/* The appearance props are what add the profile's Preferences section. */}
      <SignedIn>
        <UserDashboard
          appearancePreference={preference}
          onAppearancePreferenceChange={setPreference}
        />
      </SignedIn>
    </main>
  );
}
