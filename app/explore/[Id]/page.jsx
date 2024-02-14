"use client"
import ExploreCardFull from "@/app/components/exploreCardFull";
import { useContext, useEffect } from "react";
import { ExploreContext } from "@/app/context/explorecontext";

function SingleInternship({ params }) {
    const internshipID = params.Id;
    const { singleInternship, singleInternshipFetch } = useContext(ExploreContext);

    useEffect(() => {
        singleInternshipFetch(internshipID);
    }, []);

    return (
        <div>
            {singleInternship && <ExploreCardFull internship={singleInternship} />}
        </div>
    );
}

export default SingleInternship;
