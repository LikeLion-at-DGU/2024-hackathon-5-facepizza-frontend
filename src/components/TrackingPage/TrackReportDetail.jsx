import React from "react";
import { useParams } from "react-router-dom";

function TrackReportDetail(report) {
    const reportID = useParams().reportKEY; //몰라 구현좀..
    const post_content = Magajine_data.find(p => p.postID === parseInt(postID));


}

export default TrackReportDetail;