import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { MeetingList } from "../components/meeting/MeetingList"
import { EditMeetingForm } from "../components/meeting/UpdateMeetingForm"
import { MeetingDetail } from "../components/meeting/MeetingDetail"
import { NewMeetingForm } from "../components/meeting/NewMeetingForm"

export const ApplicationViews = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<MeetingList />} />

            {/* Protected Routes */}
            <Route element={<Authorized />}>
                <Route path="/meetings/:meetingId" element={<MeetingDetail />} />
                <Route path="/manage/add" element={<NewMeetingForm />} />
                <Route path="/manage/edit/:meetingId" element={<EditMeetingForm />} />
            </Route>
        </Routes>
    );
};
