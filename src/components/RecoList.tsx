import { CircularProgress } from "@material-ui/core";
import React from "react";
import { Recommendation } from "../types/Recommendation";

const RecoList: React.FC<{ recommendations: Recommendation[] | null }> = ({ recommendations }) => {
    if (!recommendations) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            {recommendations.map(reco => (
                <div
                    key={`${reco.author}-${reco.recommendation}`}
                >
                    {reco.author} {reco.recommendation}
                </div>
            ))}
        </div>
    );
};

export default RecoList;
