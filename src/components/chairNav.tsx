import Link from "next/link";

export default function ChairNavigation() {
    return (
        <div>
            <Link href={`/chair`}>Home</Link>
            <Link href={`/chair/nominations`}>View Nominations</Link>
            <Link href={`/chair/users`}>Users Management</Link>
            <Link href={`/chair/inquiry-forms`}>Inquiry Forms</Link>
        </div>
    );
}