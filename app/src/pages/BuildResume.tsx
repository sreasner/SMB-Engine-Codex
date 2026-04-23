import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { decodeResumeToken } from '@/lib/resume';
import { useBuildStore } from '@/store/useBuildStore';

export function BuildResume() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const hydrate = useBuildStore((s) => s.hydrate);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError('No resume token in URL.');
      return;
    }
    const state = decodeResumeToken(token);
    if (!state) {
      setError("This link is expired or tampered with. Please ask us to send a fresh one.");
      return;
    }
    hydrate(state);
    const dest = state.meta.lastRoute && state.meta.lastRoute !== '/' ? state.meta.lastRoute : '/build/step/1';
    navigate(dest, { replace: true });
  }, [token, hydrate, navigate]);

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 py-16 text-center">
      {error ? (
        <>
          <h1 className="fb-h2">Couldn't resume your quote</h1>
          <p className="fb-body mt-2 text-neutral-700">{error}</p>
          <div className="mt-5 flex justify-center gap-3">
            <Link to="/" className="btn btn-primary">
              Start over
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="fb-h2">Restoring your quote…</h1>
          <p className="fb-body mt-2 text-neutral-700">One moment.</p>
        </>
      )}
    </div>
  );
}
