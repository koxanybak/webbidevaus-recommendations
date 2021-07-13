import axios from "axios";
import { Episode } from "../types/Episode";
import { Recommendation } from "../types/Recommendation";


export const getAllRecommendations = async () => {
    const { data: episodes } = await axios.get("https://webbidevaus.fi/episodes.json");

    // Parse recommendations out of the episodes
    const recos: Recommendation[] = [];
    episodes.forEach((episode: Episode) => {
        // The regexes need to be declared in again for every iteration.
        // This little "feature" ate like 3 hours of my time :(
        // For more information: https://stackoverflow.com/questions/11477415/why-does-javascripts-regex-exec-not-always-return-the-same-value
        const recoSectionRegex = /jakson\svalinnat:?[\n\s\t\r*-]+(.+?)(?=$|##)/gis;
        const recosAndAuthorRegex = /([\wÀ-ž]+):[\n\s*-]+(.+?)(?=$|[\n\s*-]+[\wÀ-ž]+:(?![^[]*\]))/gis;

        // Get the recommendation section
        const recoSectionMatch = recoSectionRegex.exec(episode.long_description);
        if (!recoSectionMatch) {
            console.error(`Couldn't find recommendation section for episode ${episode.number}`);
            return;
        }
        const recoSection = recoSectionMatch[1];

        // Extract the authors and the recommendations
        // NOTE: (Two recommendations made by the same author will be classified as one recommendation.)
        const recoAndAuthorMatchs = [...recoSection.matchAll(recosAndAuthorRegex)];
        // if (episode.number === 9) {
        //     return;
        // }
        if (recoAndAuthorMatchs.length === 0) {
            console.error(`Couldn't find recommendations or authors for episode ${episode.number}`);
            return;
        }
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
