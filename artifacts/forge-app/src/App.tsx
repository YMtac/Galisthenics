import { useState } from 'react';
import BottomNav from './components/BottomNav';
import SideNav from './components/SideNav';
import PlanPage from './pages/PlanPage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import PreviewOverlay from './overlays/PreviewOverlay';
import TrainingOverlay from './overlays/TrainingOverlay';
import CompleteOverlay from './overlays/CompleteOverlay';
import { cardioAbsExercises } from './data/exercises';
import { plans } from './data/plans';

export type Page = 'plan' | 'explore' | 'profile';
type Overlay = 'none' | 'preview' | 'training' | 'complete';

function getExercisesForPlan(planId: string) {
  if (planId === 'cardio-abs') return cardioAbsExercises;
  return cardioAbsExercises; // fallback until other plan data exists
}

export default function App() {
  const [page, setPage] = useState<Page>('plan');
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<Overlay>('none');

  const activePlan = activePlanId ? plans.find((p) => p.id === activePlanId) : null;
  const exercises = activePlanId ? getExercisesForPlan(activePlanId) : cardioAbsExercises;
  const planTitle = activePlan?.title ?? '';
  const totalSets = exercises.reduce((a, e) => a + e.sets, 0);
  const totalMin = Math.round(exercises.reduce((a, e) => a + e.sets * (e.work + e.rest), 0) / 60);

  const handleSelectPlan = (id: string | null) => {
    setActivePlanId(id);
    if (id) setPage('plan');
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex' }}>
      {/* Desktop sidebar */}
      <SideNav current={page} onChange={setPage} activePlanId={activePlanId} />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <div
          className="scroll-area"
          style={{ flex: 1, maxWidth: 520, width: '100%', margin: '0 auto' }}
        >
          {page === 'plan' && (
            <PlanPage
              key="plan"
              activePlanId={activePlanId}
              onGoExplore={() => setPage('explore')}
              onStartSession={() => setOverlay('preview')}
            />
          )}
          {page === 'explore' && (
            <ExplorePage
              key="explore"
              activePlanId={activePlanId}
              onSelectPlan={handleSelectPlan}
            />
          )}
          {page === 'profile' && <ProfilePage key="profile" />}
        </div>

        {/* Mobile bottom nav */}
        <BottomNav current={page} onChange={setPage} />
      </div>

      {/* Overlays */}
      {overlay === 'preview' && activePlanId && (
        <PreviewOverlay
          exercises={exercises}
          planTitle={planTitle}
          onBack={() => setOverlay('none')}
          onStart={() => setOverlay('training')}
        />
      )}
      {overlay === 'training' && activePlanId && (
        <TrainingOverlay
          exercises={exercises}
          planTitle={planTitle}
          onClose={() => setOverlay('none')}
          onComplete={() => setOverlay('complete')}
        />
      )}
      {overlay === 'complete' && (
        <CompleteOverlay
          planTitle={planTitle}
          exerciseCount={exercises.length}
          totalSets={totalSets}
          totalMinutes={totalMin}
          onBack={() => { setOverlay('none'); setPage('plan'); }}
        />
      )}
    </div>
  );
}
