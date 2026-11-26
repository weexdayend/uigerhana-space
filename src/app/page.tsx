import { SiteHeader } from "@/components/SiteHeader";
import { HeroAndServices } from "@/components/HeroAndServices";
import { ProcessSection } from "@/components/ProcessSection";
import { WorkSection } from "@/components/WorkSection";
import { NotesSection } from "@/components/NotesSection";
import { OpenSourceSection } from "@/components/OpenSourceSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactAndFooter } from "@/components/ContactAndFooter";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroAndServices />
        <ProcessSection />
        <WorkSection />
        <NotesSection />
        <OpenSourceSection />
        <FaqSection />
        <ContactAndFooter />
      </main>
    </div>
  );
}
