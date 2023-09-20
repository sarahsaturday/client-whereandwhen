import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Generic.css";

import {
    createMeeting,
    getDays,
    getTypes,
    getDistricts,
    getGroupReps,
} from '../../managers/MeetingManager.js';

export const NewMeetingForm = () => {
    const navigate = useNavigate();
    const [selectedDays, setSelectedDays] = useState([]);

    const [newMeeting, setNewMeeting] = useState({
        days: [],
        startTime: "",
        meetingName: "",
        type: 0,
        district: 0,
        area: 1,
        wsoId: 0,
        address: "",
        city: "",
        zip: 0,
        locationDetails: "",
        zoomLogin: 0,
        zoomPassword: 0,
        email: "",
        phone: "",
        groupReps: [],
    });

    const [days, setDays] = useState([]);
    const [types, setTypes] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [groupReps, setGroupReps] = useState([]);

    useEffect(() => {
        getDays()
            .then((data) => {
                console.log("Received days data:", data);
                if (Array.isArray(data)) {
                    setDays(data);
                } else {
                    console.error("Error: Days data is not an array");
                }
            })
            .catch((error) => {
                console.error("Error fetching days:", error);
            });
    }, []);

    useEffect(() => {
        getTypes()
            .then((data) => {
                console.log("Received types data:", data);
                if (Array.isArray(data)) {
                    setTypes(data);
                } else {
                    console.error("Error: Types data is not an array");
                }
            })
            .catch((error) => {
                console.error("Error fetching types:", error);
            });
    }, []);

    useEffect(() => {
        getDistricts()
            .then((data) => {
                console.log("Received districts data:", data);
                if (Array.isArray(data)) {
                    setDistricts(data);
                } else {
                    console.error("Error: Districts data is not an array");
                }
            })
            .catch((error) => {
                console.error("Error fetching districts:", error);
            });
    }, []);

    useEffect(() => {
        getGroupReps()
            .then((data) => {
                console.log("Received group reps data:", data);
                if (Array.isArray(data)) {
                    setGroupReps(data);
                } else {
                    console.error("Error: Group reps data is not an array");
                }
            })
            .catch((error) => {
                console.error("Error fetching group reps:", error);
            });
    }, []);

    useEffect(() => {
        const loggedInUserId = parseInt(localStorage.getItem("lu_token"));
        setLoggedInUserId(loggedInUserId);
    }, []);

    const groupRepId = groupReps.find((groupRep) => groupRep.user_id === loggedInUserId)?.id;

    const updatedGroupReps = newMeeting.groupReps.map((groupRep) => ({
        ...groupRep,
        is_home_group: groupRep.is_home_group,
    }));

    const handleInputChange = (event) => {
        console.log('data entered:', event.target.name, event.target.value);
        const { name, value, type } = event.target;
        setNewMeeting((prevMeeting) => ({
            ...prevMeeting,
            [name]: type === "number" ? parseInt(value) : value,
        }));
    };

    const handleDayChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            // Handle addition logic here
            setSelectedDays((prevSelectedDays) => [
                ...prevSelectedDays,
                parseInt(value),
            ]);
        } else {
            // Handle removal logic here
            setSelectedDays((prevSelectedDays) =>
                prevSelectedDays.filter((day) => day !== parseInt(value))
            );
        }
    };

    const handleHomeGroupChange = (event) => {
        const { checked } = event.target;

        if (checked) {
            // Checkbox is checked, add the group rep to the groupReps array
            setNewMeeting((prevMeeting) => ({
                ...prevMeeting,
                groupReps: [
                    {
                        id: groupRepId, // Use the groupRepId obtained from the API
                        is_home_group: true,
                    },
                ],
            }));
        } else {
            // Checkbox is unchecked, remove the group rep from the groupReps array
            setNewMeeting((prevMeeting) => ({
                ...prevMeeting,
                groupReps: [],
            }));
        }
    };

    const handleRadioChange = (event) => {
        console.log('Radio button changed:', event.target.name, event.target.value);
        const { name, value } = event.target;

        setNewMeeting((prevMeeting) => ({
            ...prevMeeting,
            [name]: parseInt(value),
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Data to be sent:', newMeeting);

        const newMeetingData = {
            wso_id: newMeeting.wsoId,
            district: newMeeting.district,
            area: newMeeting.area,
            meeting_name: newMeeting.meetingName,
            start_time: newMeeting.startTime,
            street_address: newMeeting.address,
            city: newMeeting.city,
            zip: newMeeting.zip,
            location_details: newMeeting.locationDetails,
            type: newMeeting.type,
            zoom_login: newMeeting.zoomLogin,
            zoom_pass: newMeeting.zoomPassword,
            email: newMeeting.email,
            phone: newMeeting.phone,
            days: selectedDays,
            group_reps: updatedGroupReps,
        };

        try {
            const createdMeeting = await createMeeting(newMeetingData);

            // Redirect to the new meeting detail page
            navigate(`/meetings/${createdMeeting.id}`);
        } catch (error) {
            console.error('Error creating meeting:', error);
        }
    };

        return (
            <div>
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="form-title">Create New Meeting</h2>

                <div className="form-input">
                    Meeting Day(s): {Array.isArray(newMeeting.days) && (
                        <div>
                            {days.map((day) => (
                                <div key={day.id}>
                                    <input
                                        type="checkbox"
                                        value={day.id}
                                        checked={selectedDays.includes(day.id)}
                                        onChange={handleDayChange}
                                    />
                                    {day.day}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="form-input">
                    Start time: <input
                        type="time"
                        name="startTime"
                        required
                        autoFocus
                        value={newMeeting.startTime}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-input">
                    Meeting Name: <input
                        type="text"
                        name="meetingName"
                        required
                        autoFocus
                        value={newMeeting.meetingName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-input">
                    Meeting Type: {types.map((type) => (
                        <div key={type.id}>
                            <input
                                type="radio"
                                name="type"
                                value={type.id}
                                checked={newMeeting.type === type.id}
                                onChange={handleRadioChange}
                            />
                            {type.type_name}
                        </div>
                    ))}
                </div>

                <div className="form-input">
                    District: {districts.map((district) => (
                        <div key={district.id}>
                            <input
                                type="radio"
                                name="district"
                                value={district.id}
                                checked={newMeeting.district === district.id}
                                onChange={handleRadioChange}
                            />
                            {district.district_number}
                        </div>
                    ))}
                </div>

                <div className="form-input">
                    WSO ID: <input
                        type="number"
                        name="wsoId"
                        required
                        autoFocus
                        value={newMeeting.wsoId}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-input">
                    Street Address (if applicable): <input
                        type="text"
                        name="address"
                        autoFocus
                        value={newMeeting.address}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-input">
                    City: <input
                        type="text"
                        name="city"
                        required
                        autoFocus
                        value={newMeeting.city}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-input">
                    Zipcode: <input
                        type="number"
                        name="zip"
                        required
                        autoFocus
                        value={newMeeting.zip}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-input">
                    Location Details (if applicable): <input
                        type="text"
                        name="locationDetails"
                        autoFocus
                        value={newMeeting.locationDetails}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-input">
                    Zoom Login ID (if applicable): <input
                        type="number"
                        name="zoomLogin"
                        autoFocus
                        value={newMeeting.zoomLogin}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-input">
                    Zoom Password (if applicable): <input
                        type="number"
                        name="zoomPassword"
                        autoFocus
                        value={newMeeting.zoomPassword}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-input">
                    Meeting Email: <input
                        type="text"
                        name="email"
                        autoFocus
                        value={newMeeting.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-input">
                    Meeting Phone Number: <input
                        type="text"
                        name="phone"
                        autoFocus
                        value={newMeeting.phone}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-input">
                    <div>
                        <input
                            type="checkbox"
                            name="is_home_group"
                            checked={newMeeting.is_home_group}
                            onChange={handleHomeGroupChange}
                        />
                        This is my home group
                    </div>
                </div>

                <button type="submit" className="form-button">
                    Add Meeting
                </button>
            </form>
            <section className="form-link-container">
            <Link to="/" className="form-link">
                Back to Meetings
            </Link>
        </section>
        </div>
        );
    };      