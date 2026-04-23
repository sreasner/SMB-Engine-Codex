import { Navigate } from 'react-router-dom';
import { useBuildStore } from '@/store/useBuildStore';
import { useEffect } from 'react';

export function BuildFromScratch() {
  const setSource = useBuildStore((s) => s.setSource);
  useEffect(() => {
    setSource('linear');
  }, [setSource]);
  return <Navigate to="/build/step/1" replace />;
}
