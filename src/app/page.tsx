import Link from "next/link";
import Image from "next/image";

// Metadata for Home Page
export const metadata = {
  title: "ACE Space Portal",
  description:
    "Public landing page for the ACE Project Space Nomination Portal.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-16">
        
        <div className="w-full max-w-3xl">
          
          {/* Header  */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
              RRC Polytech
            </p>

            {/* RRC Logo */}
            <Image
              src="/rrc_logo.jpg"
              alt="RRC Polytech Logo"
              width={80}
              height={80}
              className="h-auto w-20"
            />
          </div>

          {/*Title of home page*/}
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            ACE Space Portal
          </h1>

          {/*Title Description*/}
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            Submit a first-contact project inquiry for ACE Project Space 
            and one of our staff member will contact you. Approved clients, 
            instructors, and chairs can sign in to manage nominations, 
            reviews and project communication.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/inquiry"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-red-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800"
            >
              Submit Project Inquiry
            </Link>

            <Link
              href="/sign-in"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}