import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMeetingById } from "../../managers/MeetingManager";
import { Link } from "react-router-dom";
import "../../Generic.css";

export const MeetingDetail = () => {
    const { meetingId } = useParams();
    const [meeting, setMeeting] = useState({});

    useEffect(() => {
        getMeetingById(meetingId)
            .then(data => setMeeting(data))
            .catch(error => console.error("Error fetching meeting:", error));
    }, [meetingId]);

    if (!meeting) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <main>
            <section className="form-container">
                <h3 className="form-title">Meeting Details</h3>
                <div className="form-input">
                    Day: {meeting.days}
                </div>
                <div className="form-input">
                    Start Time: {meeting.start_time}
                </div>
                <div className="form-input">
                    Meeting Name: {meeting.meeting_name}
                </div>
                <div className="form-input">
                    Type: {meeting.type}
                </div>
                <div className="form-input">
                    District: {meeting.district}
                </div>
                <div className="form-input">
                    Area: {meeting.area}
                </div>
                <div className="form-input">
                    WSO ID: {meeting.wso_id}
                </div>
                <div className="form-input">
                    Address: {meeting.street_address}
                </div>
                <div className="form-input">
                    City: {meeting.city}
                </div>
                <div className="form-input">
                    Zip: {meeting.zip}
                </div>
                <div className="form-input">
                    Location Details: {meeting.location_details}
                </div>
                <div className="form-input">
                    Zoom Login: {meeting.zoom_login}
                </div>
                <div className="form-input">
                    Zoom Password: {meeting.zoom_pass}
                </div>
                <div className="form-input">
                    Email: {meeting.email}
                </div>
                <div className="form-input">
                    Phone: {meeting.phone}
                </div>
            </section>

            <section className="form-link-container">
                    <Link to="/" className="form-link">
                        Back to Meetings
                    </Link>
                </section>
            </main>
        </div>
    );
};