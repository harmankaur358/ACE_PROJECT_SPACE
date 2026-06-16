import Link from "next/link";
import Image from "next/image";

export default function ChairHeader() {
    const notificationBell = "/notificationBell.png";

    return (
        <div className="flex justify-between items-center p-5">
            <div className="text-xl font-bold">
                <h1>ACE Project Space</h1>
            </div>
            <div className="flex text-blue-500 gap-5">
                <Link href={`/chair/notifications`}>
                    <Image src={notificationBell} alt="Notifications" width={24} height={24} />
                </Link>
                <Link href={`/chair/profile`}>Profile</Link>
            </div>
        </div>
    );
}