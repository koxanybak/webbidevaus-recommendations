import { CircularProgress, Divider } from "@material-ui/core";
import React from "react";
import ReactMarkdown from "react-markdown";
import Select from "react-select";
import { Option } from "react-select/src/filters";
import { useRecommendations } from "../hooks/useRecommendations";

const RecommendationOption: React.FC<Option> = ({ data }) => {
    return (
        <div>
            <div>Episode number: <strong>{data.episodeNumber}</strong></div>
            <div>Author: <strong>{data.author}</strong></div>
            <strong><ReactMarkdown>{data.recommendation}</ReactMarkdown></strong>
            <Divider />
        </div>
    );
};


const Recommendations = () => {
    const { recommendationOptions } = useRecommendations();

    if (!recommendationOptions) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <h2>Search for a recommendation</h2>
            <Select
                options={recommendationOptions}
                formatOptionLabel={RecommendationOption}
                menuIsOpen
            />
        </div>
    );
};

export default Recommendations;
