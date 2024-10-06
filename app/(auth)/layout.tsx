import FooterInfo from '@/components/FooterInfo';
import MomsLogo from '../../lib/logo';
import AuthHeader from '@/components/AuthHeader';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AuthHeader />
      {children}
    </div>
  );
}
