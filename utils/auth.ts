import { useState, useEffect } from 'react';
import { supabase } from './query-utils';
import { Session } from '@supabase/supabase-js';

export default function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  return session;
}

export async function signInWithGithub() {
  const supabaseUrl = 'https://flyuzhywofhcnrpfyuui.supabase.co'; // Replace with your Supabase URL
  const redirectUrl =
    'https://iilhhpgfemomamfecgiaaooobfbjjhpc.chromiumapp.org/';

  const authUrl = `${supabaseUrl}/auth/v1/authorize?provider=github&redirect_to=${encodeURIComponent(redirectUrl)}`;

  chrome.identity.launchWebAuthFlow(
    {
      url: authUrl,
      interactive: true,
    },
    async (redirectUri) => {
      if (chrome.runtime.lastError || !redirectUri) {
        console.error('Auth failed', chrome.runtime.lastError);
        return;
      }

      const params = new URLSearchParams(new URL(redirectUri).hash);
      const access_token = params.get('#access_token');
      const refresh_token = params.get('refresh_token');
      if (!access_token || !refresh_token) {
        console.error('Auth failed: Tokens null');
        return;
      }
      await supabase.auth.setSession({
        access_token,
        refresh_token,
      });
    }
  );
}

export async function signInWithGoogle() {
  const manifest = chrome.runtime.getManifest();

  const url = new URL('https://accounts.google.com/o/oauth2/auth');

  if (!manifest.oauth2 || !manifest.oauth2.scopes)
    return console.error('Manifest misconfig for google auth');

  url.searchParams.set('client_id', manifest.oauth2.client_id);
  url.searchParams.set('response_type', 'id_token');
  url.searchParams.set('access_type', 'offline');
  url.searchParams.set(
    'redirect_uri',
    `https://${chrome.runtime.id}.chromiumapp.org`
  );
  url.searchParams.set('scope', manifest.oauth2.scopes.join(' '));

  chrome.identity.launchWebAuthFlow(
    {
      url: url.href,
      interactive: true,
    },

    async (redirectedTo) => {
      if (chrome.runtime.lastError || !redirectedTo)
        return console.error('Auth failed', chrome.runtime.lastError);

      const token = new URLSearchParams(new URL(redirectedTo).hash).get(
        '#id_token'
      );

      if (!token) return console.error('Google auth token null');

      await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: token,
      });
    }
  );
}
