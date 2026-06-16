import ChairHeader from '@/components/chairHeader';
import ChairNavigation from '@/components/chairNav';

export default function ChairPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <ChairHeader />
            <div className="flex gap-10">
                <ChairNavigation />
                <div className="flex flex-col gap-5">
                    <h1 className='text-3xl font-bold'>Welcome Ralph</h1>
                    <h2 className='text-2xl'>Overview</h2>
                    <p>In this portal, you can view and manage all nominations from clients, manage all users, and review inquiry forms.</p>
                </div>
            </div>
        </div>
    );
}