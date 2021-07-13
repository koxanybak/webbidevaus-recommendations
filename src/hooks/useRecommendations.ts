import { useEffect, useState } from "react";
import { getAllRecommendations } from "../services/recommendation.service";
import { Recommendation } from "../types/Recommendation";

export const useRecommendations = (searchTerm: string) => {
    const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
    const [filteredRecommendations, setFilteredRecommendations] = useState<Recommendation[] | null>(null);
    
    // Get all recommendations
    useEffect(() => {
        async function effect() {
            setRecommendations(await getAllRecommendations());
        }
        effect();
    }, []);

    // Filter recommendations
    useEffect(() => {
        if (!recommendations) return;

        setFilteredRecommendations(recommendations.filter(reco => {
            return reco.recommendation.toLowerCase().includes(searchTerm);
        }));
    }, [recommendations, searchTerm]);

    return {
        filteredRecommendations,
    };
};
