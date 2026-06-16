import InquiryForm from "@/components/InquiryForm";
 
export const metadata = {
  title: "Inquiry | RRC Polytech",
  description: "Submit a project inquiry for ACE Project Space.",
};
 
export default function InquiryPage() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr]">
     
      <div className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
          Project Inquiry
        </p>
 
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
          Tell us about a project opportunity.
        </h1>
 
        <p className="mt-4 text-base leading-7 text-slate-700">
          Share the essentials and the ACE Project Space team will review the
          fit for student-led applied research,cybersecurity or development work.
        </p>
      </div>
 
      <InquiryForm />
    </section>
  );
}