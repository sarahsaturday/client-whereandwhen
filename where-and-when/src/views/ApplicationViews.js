import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { MeetingList } from "../components/meeting/MeetingList"
import { ManageMeeting } from "../components/meeting/ManageMeeting"
import { EditMeetingForm } from "../components/meeting/UpdateMeetingForm"
// import { NewMeetingForm } from "../components/meeting/NewMeetingForm"

export const ApplicationViews = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<MeetingList />} />

            {/* Protected Routes */}
            <Route element={<Authorized />}>
                <Route path="/manage" element={<ManageMeeting />} />
                <Route path="/manage/edit/:meetingId" element={<EditMeetingForm />} />
                {/* <Route path="/add" element={<NewMeetingForm />} /> */}
            </Route>
        </Routes>
    );
};
