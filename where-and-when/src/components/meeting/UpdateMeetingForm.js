import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getMeetingById,
    updateMeeting,
    getDays,
    getTypes,
    getAreas,
    getDistricts,
} from '../../managers/MeetingManager';

export const EditMeetingForm = () => {
    const { meetingId } = useParams();
    const [user, setUser] = useState({});
    console.log('meetingId:', meetingId);
    const navigate = useNavigate();
    const [days, setDays] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [currentMeeting, setCurrentMeeting] = useState(null);
    const [currentType, setCurrentType] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [currentDistrict, setCurrentDistrict] = useState([]);

    //////////// GET ALL THE DATA

    useEffect(() => {
        // Fetch the meeting data and other required data here
        getMeetingData(meetingId);
        getDaysData();
        getTypesData();
        getDistrictsData();
    }, [meetingId]);

    const getMeetingData = (meetingId) => {
        getMeetingById(meetingId)
            .then((meeting) => {
                setCurrentMeeting(meeting);
                setCurrentType(meeting.type);
                setSelectedDays(meeting.days);
                setCurrentDistrict(meeting.district);

                //////////// CONSOLE LOGS
                console.log('meeting.days:', meeting.days);
                console.log('meeting.type:', meeting.type);
                console.log('meeting.district:', meeting.district);
            })
            .catch((error) => {
                console.error('Error fetching meeting:', error);
            });
    };

    const getDaysData = () => {
        getDays()
            .then((days) => {
                setDays(days);
            })
            .catch((error) => {
                console.error('Error fetching days:', error);
            });
    };

    const getTypesData = () => {
        getTypes()
            .then((types) => {
                setTypes(types);
            })
            .catch((error) => {
                console.error('Error fetching types:', error);
            });
    };

    const getDistrictsData = () => {
        getDistricts()
            .then((districts) => {
                setDistricts(districts);
            })
            .catch((error) => {
                console.error('Error fetching districts:', error);
            });
    };

    //////////// HANDLERS

    const changeMeetingState = (event) => {
        const { id, value } = event.target;
        setCurrentMeeting(prevMeeting => ({
            ...prevMeeting,
            [id]: value
        }));
    }

    const handleDayChange = (event) => {
        const { value } = event.target;

        //////////// CONSOLE LOGS
        console.log('Current value:', value);
        console.log('Before update - selectedDays:', selectedDays);

        setSelectedDays((prevSelectedDays) => {
            if (prevSelectedDays.includes(value)) {
                return prevSelectedDays.filter((day) => day !== value);
            } else {
                return [...prevSelectedDays, parseInt(value)];
            }
        });

        //////////// CONSOLE LOGS
        console.log('After update - selectedDays:', selectedDays);
    };

    const handleTypeChange = (selectedType) => {
        setSelectedType(selectedType);
    };

    const handleDistrictChange = (selectedDistrict) => {
        setCurrentDistrict(selectedDistrict);
    };

    const handleSave = (evt) => {
        evt.preventDefault();

        const updatedMeeting = {
            wso_id: currentMeeting.wso_id,
            district: currentDistrict,
            area: currentMeeting.area,
            meeting_name: currentMeeting.meeting_name,
            days: selectedDays,
            start_time: currentMeeting.start_time,
            street_address: currentMeeting.street_address,
            city: currentMeeting.city,
            zip: currentMeeting.zip,
            location_details: currentMeeting.location_details,
            type: selectedType,
            zoom_login: currentMeeting.zoom_login,
            zoom_pass: currentMeeting.zoom_pass,
            email: currentMeeting.email,
            phone: currentMeeting.phone,
        };

        updateMeeting(meetingId, updatedMeeting)
            .then(() => {
                navigate(`/meetings/${meetingId}`);
            })
            .catch(error => {
                console.error("Error updating meeting:", error);
            });
    }

    return (
        <form className="form-container">
            <h2 className="form-title">Edit Meeting</h2>

            {currentMeeting !== null ? (
                <div>
                    <div className="form-input">
                        Days:
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

                    <div className="form-input">
                        Start Time:
                        <input
                            type="time"
                            id="start_time"
                            required
                            autoFocus
                            value={currentMeeting.start_time}
                            onChange={changeMeetingState}
                        />
                    </div>

                    <div className="form-input">
                        Meeting Name:
                        <input
                            type="text"
                            id="meeting_name"
                            required
                            autoFocus
                            value={currentMeeting.meeting_name}
                            onChange={changeMeetingState}
                        />
                    </div>

                    <div className="form-input">
                        Type:
                        <div>
                            {types.map((type) => (
                                <div key={type.id}>
                                    <input
                                        type="radio"
                                        name="type"
                                        value={type.id}
                                        checked={selectedType === type.id}
                                        onChange={() => handleTypeChange(type.id)}
                                    />
                                    {type.type_name}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="form-input">
                            District:
                            {districts.map((district) => (
                                <div key={district.id}>
                                    <input
                                        type="radio"
                                        name="district"
                                        value={district.id}
                                        checked={currentDistrict === district.id}
                                        onChange={() => handleDistrictChange(district.id)}
                                    />
                                    {district.district_number}
                                </div>
                            ))}
                        </div>

                        <div>
                            <div className="form-input">
                                WSO ID:
                                <input
                                    type="number"
                                    id="wso_id"
                                    required
                                    autoFocus
                                    value={currentMeeting.wso_id}
                                    onChange={changeMeetingState}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-input">
                                Street Address (if applicable):
                                <input
                                    type="text"
                                    id="street_address"
                                    autoFocus
                                    value={currentMeeting.street_address}
                                    onChange={changeMeetingState}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-input">
                                City:
                                <input
                                    type="text"
                                    id="city"
                                    required
                                    autoFocus
                                    value={currentMeeting.city}
                                    onChange={changeMeetingState}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-input">
                                Zipcode:
                                <input
                                    type="number"
                                    id="zip"
                                    required
                                    autoFocus
                                    value={currentMeeting.zip}
                                    onChange={changeMeetingState}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-input">
                                Location Details (if applicable):
                                <input
                                    type="text"
                                    id="location_details"
                                    autoFocus
                                    value={currentMeeting.location_details}
                                    onChange={changeMeetingState}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-input">
                                Zoom Login ID (if applicable):
                                <input
                                    type="number"
                                    id="zoom_login"
                                    autoFocus
                                    value={currentMeeting.zoom_login}
                                    onChange={changeMeetingState}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-input">
                                Zoom Password (if applicable):
                                <input
                                    type="number"
                                    id="zoom_pass"
                                    autoFocus
                                    value={currentMeeting.zoom_pass}
                                    onChange={changeMeetingState}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-input">
                                Meeting Email:
                                <input
                                    type="text"
                                    id="email"
                                    autoFocus
                                    value={currentMeeting.email}
                                    onChange={changeMeetingState}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-input">
                                Meeting Phone Number:
                                <input
                                    type="text"
                                    id="phone"
                                    autoFocus
                                    value={currentMeeting.phone}
                                    onChange={changeMeetingState}
                                />
                            </div>
                        </div>

                        <button type="submit" onClick={handleSave} className="form-button">
                            Save
                        </button>
                    </div>
                </div>
            ) : (
                // Render a loading indicator or message while waiting for data
                <p>Loading...</p>
            )}
        </form>
    );
};