import React, { useEffect, useState } from "react";
import Applications from "../Applications";
import Controller from "./controller";

const RankingApplication = (props) => {
    const [ranking, setRanking] = useState(Applications.state.ranking.surroundingUsers || []);
    const [top, setTop] = useState(Applications.state.ranking?.topRanking || []);
    const [position, setPosition] = useState(Applications.state.ranking?.userPosition || {});
    const [participants, setParticipants] = useState(Applications.state.ranking?.totalParticipants || 0);
    const [userId, setUserId] = useState(null);

    useEffect(async () => {
        Applications.on("profile", async data => {
            setUserId(data._id);
            await Controller.load(data._id);
        })

        Applications.on("ranking", data => {
            setTop(data?.topRanking);
            setRanking(data?.surroundingUsers);
            setPosition(data?.userPosition);
            setParticipants(data?.totalParticipants);
        })

        if (Applications.state.profile._id) {
            setUserId(Applications.state.profile._id);
            await Controller.load(Applications.state.profile._id)
        };
    }, [])

    return {
        ranking,
        top,
        position,
        participants,
        userId
    }
}

export default RankingApplication;