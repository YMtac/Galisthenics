import { useState } from 'react';
import BottomNav from './components/BottomNav';
import SideNav from './components/SideNav';
import PlanPage from './pages/PlanPage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';

export type Page = 'plan' | 'explore' | 'profile';

export default function App() {
  const [page, setPage] = useState<Page>('plan');

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex' }}>
      {/* Desktop sidebar */}
      <SideNav current={page} onChange={setPage} />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <div
          className="scroll-area"
          style={{ flex: 1, maxWidth: 520, width: '100%', margin: '0 auto' }}
        >
          {page === 'plan' && (
            <PlanPage key="plan" onGoExplore={() => setPage('explore')} />
          )}
          {page === 'explore' && <ExplorePage key="explore" />}
          {page === 'profile' && <ProfilePage key="profile" />}
        </div>

        {/* Mobile bottom nav */}
        <BottomNav current={page} onChange={setPage} />
      </div>
    </div>
  );
}
