import { SiteHeader } from "@/components/SiteHeader";
import { IntroductionSection } from "@/components/IntroductionSection";
import { WorkSection } from "@/components/WorkSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ContactAndFooter } from "@/components/ContactAndFooter";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <IntroductionSection />
        <WorkSection />
        <ExpertiseSection />
        <ExperienceSection />
        <ProcessSection />
      </main>
      <ContactAndFooter />
    </div>
  );
}
