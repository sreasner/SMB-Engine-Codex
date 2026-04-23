/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUBMIT_WEBHOOK_URL?: string;
  readonly VITE_CALENDLY_URL?: string;
  readonly VITE_PATHFINDER_ENABLED?: string;
  readonly VITE_ADMIN_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
