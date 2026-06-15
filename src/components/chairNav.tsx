import Link from "next/link";

export default function ChairNavigation() {
    return (
        <div className="flex flex-col gap-4 border rounded p-4">
            <div className="flex flex-col gap-4">
                <Link href={`/chair`} className="border rounded bg-red-500">Home</Link>
                <Link href={`/chair/nominations`} className="border rounded bg-red-500">View Nominations</Link>
                <Link href={`/chair/users`} className="border rounded bg-red-500">Users Management</Link>
                <Link href={`/chair/inquiry-forms`} className="border rounded bg-red-500">Inquiry Forms</Link>
            </div>
            <div className="flex flex-col gap-4">
                <Link href={`/chair/profile`}>Profile</Link>
            </div>
        </div>
    );
}