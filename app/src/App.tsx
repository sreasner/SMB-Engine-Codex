import { Route, Routes } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Landing } from './pages/Landing';
import { BuildQuickQuiz } from './pages/BuildQuickQuiz';
import { BuildBundle } from './pages/BuildBundle';
import { BuildFromScratch } from './pages/BuildFromScratch';
import { BuildStep } from './pages/BuildStep';
import { BuildReview } from './pages/BuildReview';
import { BuildConfirm } from './pages/BuildConfirm';
import { BuildResume } from './pages/BuildResume';
import { Admin } from './pages/Admin';
import { Debug } from './pages/Debug';

export function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/build" element={<BuildQuickQuiz />} />
          <Route path="/build/bundle" element={<BuildBundle />} />
          <Route path="/build/from-scratch" element={<BuildFromScratch />} />
          <Route path="/build/step/:n" element={<BuildStep />} />
          <Route path="/build/review" element={<BuildReview />} />
          <Route path="/build/confirm/:id" element={<BuildConfirm />} />
          <Route path="/build/resume/:token" element={<BuildResume />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/debug" element={<Debug />} />
        </Routes>
      </main>
    </div>
  );
}
