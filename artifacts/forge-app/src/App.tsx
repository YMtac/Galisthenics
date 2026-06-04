import { useState } from 'react';
import BottomNav from './components/BottomNav';
import SideNav from './components/SideNav';
import PlanPage from './pages/PlanPage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import PreviewOverlay from './overlays/PreviewOverlay';
import TrainingOverlay from './overlays/TrainingOverlay';
import CompleteOverlay from './overlays/CompleteOverlay';

export type Page = 'plan' | 'explore' | 'profile';
type Overlay = 'none' | 'preview' | 'training' | 'complete';

export default function App() {
  const [page, setPage] = useState<Page>('plan');
  const [overlay, setOverlay] = useState<Overlay>('none');

  const showOverlay = overlay !== 'none';

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex' }}>
      {/* Desktop sidebar */}
      <SideNav current={page} onChange={setPage} />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        {/* Scrollable page area */}
        <div
          className="scroll-area"
          style={{
            flex: 1,
            maxWidth: 520,
            width: '100%',
            margin: '0 auto',
          }}
        >
          {page === 'plan' && (
            <PlanPage key="plan" onStartPreview={() => setOverlay('preview')} />
          )}
          {page === 'explore' && <ExplorePage key="explore" />}
          {page === 'profile' && <ProfilePage key="profile" />}
        </div>

        {/* Mobile bottom nav */}
        {!showOverlay && (
          <BottomNav current={page} onChange={setPage} />
        )}
      </div>

      {/* Overlays */}
      {overlay === 'preview' && (
        <PreviewOverlay
          onBack={() => setOverlay('none')}
          onStart={() => setOverlay('training')}
        />
      )}
      {overlay === 'training' && (
        <TrainingOverlay
          onClose={() => setOverlay('none')}
          onComplete={() => setOverlay('complete')}
        />
      )}
      {overlay === 'complete' && (
        <CompleteOverlay
          onBack={() => {
            setOverlay('none');
            setPage('plan');
          }}
        />
      )}
    </div>
  );
}
