import React from "react";
import RankingApplication from "../../../application/ranking";
import "./style.css"
import Page from "../../ui/page";
import Ranking from "../../ui/ranking";

const RankingView = ({ ...props }) => {
    const {
        ranking,
        top,
        position,
        participants,
        userId,
    } = RankingApplication(props);

    return <>
        <Page>
            <Ranking topRanking={top} userPosition={position} surroundingUsers={ranking} totalParticipants={participants} userId={userId} />
        </Page>
    </>
}

export default RankingView;