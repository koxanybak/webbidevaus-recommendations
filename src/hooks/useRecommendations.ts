import { useEffect, useState } from "react";
import { Option } from "react-select/src/filters";
import { getAllRecommendations } from "../services/recommendation.service";
import { Recommendation } from "../types/Recommendation";

export const useRecommendations = () => {
    const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
    const [recommendationOptions, setRecommendationOptions] = useState<Option[] | null>(null);
    
    // Get all recommendations
    useEffect(() => {
        async function effect() {
            setRecommendations(await getAllRecommendations());
        }
        effect();
    }, []);

    // Get all recommendations
    useEffect(() => {
        if (!recommendations) return;
        setRecommendationOptions(recommendations.map(reco => ({
            label: reco.recommendation,
            value: reco.recommendation,
            data: reco,
        })));
    }, [recommendations]);

    return {
        recommendations,
        recommendationOptions,
    };
};
