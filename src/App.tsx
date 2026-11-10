import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AppShell from '@/components/layout/AppShell';
import Overview from '@/pages/Overview';
import Timeline from '@/pages/Timeline';
import Lessons from '@/pages/Lessons';
import LessonDetail from '@/pages/LessonDetail';
import Worksheets from '@/pages/Worksheets';
import WorksheetDetail from '@/pages/WorksheetDetail';
import References from '@/pages/References';
import NotFound from '@/pages/NotFound';
import { PageLoading } from '@/components/ui/Loading';

// The globe page pulls in three.js; load it on demand to keep first paint fast.
const ExploreWorld = lazy(() => import('@/pages/ExploreWorld'));
// Charts are only needed on the progress page.
const Progress = lazy(() => import('@/pages/Progress'));
const SceneGallery = lazy(() => import('@/pages/SceneGallery'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.getElementById('main')?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AppShell>
      <ScrollToTop />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/explore" element={<ExploreWorld />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:lessonId" element={<LessonDetail />} />
          <Route path="/worksheets" element={<Worksheets />} />
          <Route path="/worksheets/:worksheetId" element={<WorksheetDetail />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/references" element={<References />} />
          <Route path="/overview" element={<Navigate to="/" replace />} />
          {import.meta.env.DEV && <Route path="/dev/scenes" element={<SceneGallery />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}
