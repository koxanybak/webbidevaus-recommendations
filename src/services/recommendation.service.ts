import axios from "axios";
import { Recommendation } from "../types/Recommendation";

const recoSectionRegex = /jakson valinnat(\s.+)/gi;
const recosAndAuthorRegex = /\s(\w+):\s(.+?)(?=$|\s\w+:\s)/gi;


export const getAllRecommendations = async () => {
    const { data: episodes } = await axios.get("https://webbidevaus.fi/episodes.json");

    // Parse recommendations out of the episodes
    const recos: Recommendation[] = [];
    episodes.forEach((episode: any) => {
        // Get the recommendation section
        const recoSectionMatchs = (episode.long_description as string).matchAll(recoSectionRegex).next().value;
        if (!recoSectionMatchs) {
            console.error(`Couldn't find recommendation section for episode ${episode.number}`);
            return;
        }
        const recoSection = recoSectionMatchs[1] as string; // No idea why the group array would be 'any', but seems like this is necessary

        // Extract the authors and the recommendations itself
        // NOTE: (Two recommendations made by the same author will be classified as one recommendation.)
        const recoAndAuthorMatchs = [...recoSection.matchAll(recosAndAuthorRegex)];
        recoAndAuthorMatchs.forEach((match) => {
            recos.push({
                episodeNumber: episode.number,
                author: match[1],
                recommendation: match[2],
            });
        });
        
    });

    return recos;
};
