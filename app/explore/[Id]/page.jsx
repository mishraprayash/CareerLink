"use client"
import ExploreCardFull from "@/app/components/exploreCardFull";
import { useContext, useEffect } from "react";
import { ExploreContext } from "@/app/context/explorecontext";

function SingleInternship({ params }) {
    const internshipID = params.Id;
    const { singleInternship, singleInternshipFetch ,loading } = useContext(ExploreContext);

    useEffect(() => {
        singleInternshipFetch(internshipID);
    }, []);

    return (
        <div className="text-center">
            {loading?<div className="h-[80vh] text-center font-semibold p-5 m-5">Loading.....</div>:(
                <ExploreCardFull internship={singleInternship} />
            )}
        </div>
    );
}

export default SingleInternship;
