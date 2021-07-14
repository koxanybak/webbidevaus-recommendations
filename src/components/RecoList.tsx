import { CircularProgress, Divider } from "@material-ui/core";
import React from "react";
import ReactMarkdown from "react-markdown";
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
                    <div>{reco.episodeNumber}</div>
                    {reco.author}
                    <ReactMarkdown>{reco.recommendation}</ReactMarkdown>
                    <Divider />
                </div>
            ))}
        </div>
    );
};

export default RecoList;
