import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useRecommendations } from "../hooks/useRecommendations";
import RecoList from "./RecoList";

const Recommendations = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { filteredRecommendations } = useRecommendations(searchTerm);

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
            />
            <RecoList recommendations={filteredRecommendations} />
        </div>
    );
};

export default Recommendations;
