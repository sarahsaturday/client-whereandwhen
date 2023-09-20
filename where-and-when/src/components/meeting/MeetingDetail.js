import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMeetingById, getAreas, getDays, getDistricts, getTypes } from "../../managers/MeetingManager";
import { Link } from "react-router-dom";
import "../../Generic.css";

export const MeetingDetail = () => {
    const { meetingId } = useParams();
    const [meeting, setMeeting] = useState({});
    const [daysList, setDaysList] = useState([]);
    const [types, setTypes] = useState([]);
    const [areas, setAreas] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        getMeetingById(meetingId)
            .then(data => setMeeting(data))
            .catch(error => console.error("Error fetching meeting:", error));
        console.log("Meeting:", meeting);
        getDays().then((data) => setDaysList(data)).catch((error) => console.error("Error fetching days:", error));
        console.log("Days:", daysList);
        getTypes().then((data) => setTypes(data)).catch((error) => console.error("Error fetching types:", error));
        console.log("Types:", types);
        getAreas().then((data) => setAreas(data)).catch((error) => console.error("Error fetching areas:", error));
        console.log("Areas:", areas);
        getDistricts().then((data) => setDistricts(data)).catch((error) => console.error("Error fetching districts:", error));
        console.log("Districts:", districts);
    }, [meetingId]);

    if (!meeting) {
        return <div>Loading...</div>;
    }

    const renderValueOrNa = (value) => (value ? value : "N/A");

    const renderValueOrMissing = (value) => (value ? value : "[Missing]");

    const mapDayIdsToValues = (dayIds) => {
        if (!Array.isArray(dayIds)) {
            return "N/A"; // Fallback value for non-array dayIds
        }

        const dayNames = dayIds.map((dayId) => {
            const day = daysList.find((d) => d.id === dayId);
            return day ? day.day : "N/A";
        });

        return dayNames.join(", ");
    };

    const mapTypeIdToValue = (typeId) => {
        const type = types.find((d) => d.id === typeId);
        if (!type) {
            console.log(`No type found for typeId: ${typeId}`);
            return "[Missing]";
        }
        return type.type_name; // Assuming "name" is the property containing the day name.
    };

    const mapAreaIdToValue = (areaId) => {
        const area = areas.find((d) => d.id === areaId);
        if (!area) {
            console.log(`No area found for areaId: ${areaId}`);
            return "[Missing]";
        }
        return area.area_number; // Assuming "name" is the property containing the day name.
    };

    const mapDistrictIdToValue = (districtId) => {
        const district = districts.find((d) => d.id === districtId);
        if (!district) {
            console.log(`No district found for districtId: ${districtId}`);
            return "[Missing]";
        }
        return district.district_number; // Assuming "name" is the property containing the day name.
    };

    const formatTime = (timeString) => {
        // Parse the time string into a Date object
        const time = new Date(`1970-01-01T${timeString}`);

        // Format the time as "HH:MM AM/PM"
        const formattedTime = time.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });

        return formattedTime;
    };

    return (
        <div>
            <main>
                <section className="form-container">
                    <h3 className="form-title">Meeting Details</h3>
                    <div className="form-input">
                        <strong>Day(s):</strong> {daysList.length > 0 ? mapDayIdsToValues(meeting.days) : 'Loading...'}
                    </div>
                    <div className="form-input">
                        <strong>Start Time:</strong> {formatTime(meeting.start_time)}
                    </div>
                    <div className="form-input">
                        <strong>Meeting Name:</strong> {meeting.meeting_name}
                    </div>
                    <div className="form-input">
                        <strong>Type:</strong> {mapTypeIdToValue(meeting.type)}
                    </div>
                    <div className="form-input">
                        <strong>District:</strong> {mapDistrictIdToValue(meeting.district)}
                    </div>
                    <div className="form-input">
                        <strong>Area:</strong> {mapAreaIdToValue(meeting.area)}
                    </div>
                    <div className="form-input">
                        <strong>WSO ID:</strong> {renderValueOrMissing(meeting.wso_id)}
                    </div>
                    <div className="form-input">
                        <strong>Address:</strong> {renderValueOrNa(meeting.street_address)}
                    </div>
                    <div className="form-input">
                        <strong>City:</strong> {meeting.city}
                    </div>
                    <div className="form-input">
                        <strong>Zip:</strong> {meeting.zip}
                    </div>
                    <div className="form-input">
                        <strong>Location Details:</strong> {renderValueOrNa(meeting.location_details)}
                    </div>
                    <div className="form-input">
                        <strong>Zoom Login:</strong> {renderValueOrNa(meeting.zoom_login)}
                    </div>
                    <div className="form-input">
                        <strong>Zoom Password:</strong> {renderValueOrNa(meeting.zoom_pass)}
                    </div>
                    <div className="form-input">
                        <strong>Email:</strong> {renderValueOrMissing(meeting.email)}
                    </div>
                    <div className="form-input">
                        <strong>Phone:</strong> {renderValueOrMissing(meeting.phone)}
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