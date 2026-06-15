import Link from "next/link";

export default function ChairHeader() {
    return (
        <div>
            <div>
                <h1>ACE Project Space</h1>
            </div>
            <div>
                <Link href={`/chair/notifications`}>Notifications</Link>
                <Link href={`/chair/profile`}>Profile</Link>
            </div>
        </div>
    );
}