import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ValueProposition from "@/components/landing/ValueProposition";
import FeatureSections from "@/components/landing/FeatureSections";
import HowItWorks from "@/components/landing/HowItWorks";
import WorkspacePreview from "@/components/landing/WorkspacePreview";
import Differentiation from "@/components/landing/Differentiation";
import TargetUsers from "@/components/landing/TargetUsers";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <ValueProposition />
    <FeatureSections />
    <HowItWorks />
    <WorkspacePreview />
    <Differentiation />
    <TargetUsers />
    <FinalCTA />
    <Footer />
  </div>
);

export default Index;
