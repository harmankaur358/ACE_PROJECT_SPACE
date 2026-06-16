import Link from "next/link";
import Image from "next/image";

export default function ChairNavigation() {
    const profileImg = "/profile.png";

    return (
        <div className="flex flex-col gap-4 border rounded p-4">
            <div className="flex flex-col gap-4">
                <Link href={`/chair`} className="border rounded bg-red-500">Home</Link>
                <Link href={`/chair/nominations`} className="border rounded bg-red-500">View Nominations</Link>
                <Link href={`/chair/users`} className="border rounded bg-red-500">Users Management</Link>
                <Link href={`/chair/inquiry-forms`} className="border rounded bg-red-500">Inquiry Forms</Link>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <Link href={`/chair/profile`}>
                    <Image src={profileImg} alt="Profile" width={50} height={50} />
                </Link>
            </div>
        </div>
    );
}