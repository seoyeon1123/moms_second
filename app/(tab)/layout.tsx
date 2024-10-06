import MainTopBar from '@/components/MainTopBar';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MainTopBar />
      <div className="mt-32">{children}</div>
    </div>
  );
}
