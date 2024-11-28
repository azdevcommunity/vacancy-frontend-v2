import SearchComponent from "@/components/SearchComponent.tsx";
import {FeaturesSection} from "@/components/features-section.tsx";
import {CvCarousel} from "@/components/cv-carousel.tsx";
import {PremiumJobPostings} from "@/components/premium-job-postings.tsx";
import {FooterComponent} from "@/components/footer.tsx";

export const Dashboard = () => {
    return (
        <>
            <div
                className="w-full flex flex-col items-center bg-arc-blue-100 justify-center pb-20 max-sm: px-20"
            >
                <div className={"pt-20"}>
                    <h1 className={"text-white font-bold text-7xl"}>İdeal işin bir klik uzaqdadır</h1>
                    <h1 className={"text-white font-bold text-7xl"}>Axtarışa indi başla</h1>
                    <SearchComponent/>

                </div>

            </div>
            <FeaturesSection/>
            <CvCarousel/>
            <PremiumJobPostings/>
            <FooterComponent/>
        </>
    );
};