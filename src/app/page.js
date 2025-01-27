import Header from "@/components/Header/Header";
import MotivationSection from "@/components/MotivationSection/MotivationSection";
import OurEvents from "@/components/OurEvents/OurEvents";
import OurMission from "@/components/OurMission/OurMission";
import Stats from "@/components/Stats/Stats";
import UpcomingEvents from "@/components/UpcommingEvents/UpcommingEvents";


export default function Home() {
  return (
      <div className="mt-6 min-h-screen space-y-2 md:space-y-4">
        <Header/>
        <OurEvents/>
        <OurMission/>
        <Stats/>
        <UpcomingEvents/>
        <MotivationSection/>
      </div>
  );
}
