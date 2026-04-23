import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { StepSidebar } from '@/components/layout/StepSidebar';
import { ProgressBar } from '@/components/layout/ProgressBar';
import { SummaryPanel } from '@/components/summary/SummaryPanel';
import { MobileCartDrawer } from '@/components/summary/MobileCartDrawer';
import { StepCard } from '@/components/flow/StepCard';
import { PageFooter } from '@/components/layout/PageFooter';
import { ScheduleCallCTA } from '@/components/flow/ScheduleCallCTA';
import { useBuildStore } from '@/store/useBuildStore';
import { Step1About } from '@/components/flow/steps/Step1About';
import { Step2Energy } from '@/components/flow/steps/Step2Energy';
import { Step3Internet } from '@/components/flow/steps/Step3Internet';
import { Step4Phones } from '@/components/flow/steps/Step4Phones';
import { Step5WifiSecurity } from '@/components/flow/steps/Step5WifiSecurity';
import { Step6AI } from '@/components/flow/steps/Step6AI';
import { STEPS } from '@/content/copy';

const TOTAL_STEPS = 7;

export function BuildStep() {
  const { n } = useParams<{ n: string }>();
  const navigate = useNavigate();
  const setLastRoute = useBuildStore((s) => s.setLastRoute);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const step = Math.max(1, Math.min(TOTAL_STEPS, parseInt(n ?? '1', 10) || 1));

  useEffect(() => {
    setLastRoute(`/build/step/${step}`);
  }, [step, setLastRoute]);

  useEffect(() => {
    if (step === 7) navigate('/build/review', { replace: true });
  }, [step, navigate]);

  const copy = STEPS[step as 1 | 2 | 3 | 4 | 5 | 6];
  const StepBody = [Step1About, Step2Energy, Step3Internet, Step4Phones, Step5WifiSecurity, Step6AI][step - 1];

  function onBack() {
    if (step === 1) navigate('/');
    else navigate(`/build/step/${step - 1}`);
  }
  function onNext() {
    if (step === 6) navigate('/build/review');
    else navigate(`/build/step/${step + 1}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 pb-28 lg:pb-10">
      <div className="lg:hidden mb-4">
        <ProgressBar current={step} total={TOTAL_STEPS} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[240px_1fr_320px]">
        <div className="hidden lg:block">
          <StepSidebar current={step} onJump={(n) => navigate(`/build/step/${n}`)} />
        </div>
        <div>
          {copy && (
            <StepCard eyebrow={copy.eyebrow} headline={copy.headline} subhead={copy.subhead}>
              <StepBody />
            </StepCard>
          )}
          <PageFooter
            onBack={onBack}
            onNext={onNext}
            nextLabel={step === 6 ? 'Review quote' : 'Next'}
            onSchedule={() => setScheduleOpen(true)}
          />
        </div>
        <div className="hidden lg:block">
          <SummaryPanel />
        </div>
      </div>
      <MobileCartDrawer />
      <ScheduleCallCTA open={scheduleOpen} onClose={() => setScheduleOpen(false)} />
    </div>
  );
}
