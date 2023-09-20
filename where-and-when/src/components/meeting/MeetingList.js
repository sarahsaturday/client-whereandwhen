import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMeetings, deleteMeeting, getAreas, getDays, getDistricts, getTypes } from "../../managers/MeetingManager";
import "../../Generic.css";

export const MeetingList = () => {
    const [meetings, setMeetings] = useState([]);
    const [daysList, setDaysList] = useState([]);
    const [types, setTypes] = useState([]);
    const [areas, setAreas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getMeetings()
            .then(data => {
                console.log("Received data:", data);
                if (Array.isArray(data)) {
                    setMeetings(data);
                    setSearchQuery("");
                } else {
                    console.error("Error: Meetings data is not an array");
                }
            })
            .catch(error => {
                console.error("Error fetching meetings:", error);
            });

        getDays().then((data) => setDaysList(data)).catch((error) => console.error("Error fetching days:", error));
        getTypes().then((data) => setTypes(data)).catch((error) => console.error("Error fetching types:", error));
        getAreas().then((data) => setAreas(data)).catch((error) => console.error("Error fetching areas:", error));
        getDistricts().then((data) => setDistricts(data)).catch((error) => console.error("Error fetching districts:", error));
    }, []);


    const handleDelete = (meetingId) => {
        // Prompt the user for confirmation before deleting the meeting
        if (window.confirm("Are you sure you want to delete this meeting?")) {
            // If the user confirms, call the deleteMeeting function
            deleteMeeting(meetingId)
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Error deleting meeting:", error);
                });
        }
    };

    const handleEdit = async (meetingId) => {
        // Navigate to the edit page for the specific meeting
        navigate(`/manage/edit/${meetingId}`);
    };

    const filteredMeetings = meetings.filter((meeting) =>
        (meeting.meeting_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (meeting.start_time?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (meeting.city?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (typeof meeting.zip === 'number' && String(meeting.zip).includes(searchQuery)) ||
        (meeting.location_details?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        meeting.days.some(dayId => {
            const day = daysList.find(d => d.id === dayId);
            return day && day.day.toLowerCase().includes(searchQuery.toLowerCase());
        })
    );

    const renderValueOrNa = (value) => (value ? value : "N/A");

    const renderValueOrMissing = (value) => (value ? value : "[Missing]");

    const mapDayIdsToValues = (dayIds) => {
        if (!Array.isArray(dayIds)) {
            return "N/A";
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

    const isUserLoggedIn = () => {
        const token = localStorage.getItem("lu_token");
        return token !== null;
    };

    const userLoggedIn = isUserLoggedIn();

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
        <article>
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search meetings"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input"
                />
            </div>
            <div className="meetings-grid">
                {filteredMeetings.map((meeting, index) => (
                    <section key={`meeting--${meeting.id}`} className="meetings-container">
                        <div>
                            <p className="form-label"><strong>Day(s):</strong> {daysList.length > 0 ? mapDayIdsToValues(meeting.days) : 'Loading...'}</p>
                            <p className="form-label"><strong>Start Time:</strong> {formatTime(meeting.start_time)}</p>
                            <p className="form-label"><strong>Meeting Name:</strong> {meeting.meeting_name}</p>
                            <p className="form-label"><strong>Type:</strong> {mapTypeIdToValue(meeting.type)}</p>
                            <p className="form-label"><strong>District:</strong> {mapDistrictIdToValue(meeting.district)}</p>
                            <p className="form-label"><strong>Area:</strong> {mapAreaIdToValue(meeting.area)}</p>
                            <p className="form-label"><strong>WSO ID:</strong> {renderValueOrMissing(meeting.wso_id)}</p>
                            <p className="form-label"><strong>Address:</strong> {renderValueOrNa(meeting.street_address)}</p>
                            <p className="form-label"><strong>City:</strong> {meeting.city}</p>
                            <p className="form-label"><strong>Zip:</strong> {meeting.zip}</p>
                            <p className="form-label"><strong>Location Details:</strong> {renderValueOrNa(meeting.location_details)}</p>
                            <p className="form-label"><strong>Zoom Login:</strong> {renderValueOrNa(meeting.zoom_login)}</p>
                            <p className="form-label"><strong>Zoom Password:</strong> {renderValueOrNa(meeting.zoom_pass)}</p>
                            <p className="form-label"><strong>Email:</strong> {renderValueOrMissing(meeting.email)}</p>
                            <p className="form-label"><strong>Phone:</strong> {renderValueOrMissing(meeting.phone)}</p>
                        </div>
                        <div>
                            {userLoggedIn ? (
                                <>
                                    <button onClick={() => handleEdit(meeting.id)} className="button">Edit</button>
                                    <button onClick={() => handleDelete(meeting.id)} className="button">Delete</button>
                                </>
                            ) : null}
                        </div>
                    </section>
                ))}
            </div>
        </article>
    );
};