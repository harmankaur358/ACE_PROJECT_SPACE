import ChairHeader from '@/components/chairHeader';
import ChairNavigation from '@/components/chairNav';

export default function ChairPage() {
    return (
        <div>
            <ChairHeader />
            <ChairNavigation />
            <h1>Welcome Ralph</h1>
            <h2>Overview</h2>
            <p>In this portal, you can view and manage all nominations from clients, manage all users, and review inquiry forms.</p>
        </div>
    );
}