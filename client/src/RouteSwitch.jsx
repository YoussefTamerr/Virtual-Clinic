import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Login from './pages/general/Login/Login'
import PatientRegistration from './pages/patient/Register'
import DoctorRegistration from './pages/doctor/RegisterDoctor'
import DoctorMain from './pages/doctor/DoctorMain'
import DoctorHome from './pages/doctor/DoctorHome'
import DoctorProfile from './pages/doctor/DoctorProfile'
import ViewPatients from './pages/doctor/ViewPatients'
import PatientInfo from './pages/doctor/PatientInfo'
import DoctorAppointments from './pages/doctor/DoctorAppointments'
import PatientMain from './pages/patient/PatientMain'
import PatientHome from './pages/patient/PatientHome'
import PatientProfile from './pages/patient/PatientProfile'
import PatientAppointments from './pages/patient/PatientAppointments'
import DoctorInfo from './pages/patient/DoctorInfo'
import ViewPrescriptions from './pages/patient/ViewPrescriptions'
import PrescriptionInfo from './pages/patient/PrescriptionInfo'
import AdminMain from './pages/admin/AdminMain'
import AdminHome from './pages/admin/AdminHome'
import AdminProfile from './pages/admin/AdminProfile'
import AdminViewDoctors from './pages/admin/AdminViewDoctors'
import AdminViewPatients from './pages/admin/AdminViewPatients'
import ViewAdmins from './pages/admin/ViewAdmins'
import AddAdminForm from './pages/admin/AddAdminForm'
import AddPackageForm from './pages/admin/AddPackageForm'
import AdminPatientInfo from './pages/admin/AdminPatientInfo'
import AdminPackageInfo from './pages/admin/AdminPackageInfo'
import AdminDoctorInfo from './pages/admin/AdminDoctorInfo'
import ViewRequests from './pages/admin/ViewRequests'
import ViewPackages from './pages/admin/ViewPackages'
import NotFound from './pages/general/NotFound/NotFound'
import UploadDocs from './pages/doctor/UploadDocs'

const RouteSwitch = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<PatientRegistration />} />
            <Route path='/register-doctor' element={<DoctorRegistration />} />
            <Route path='/doctor' element={<DoctorMain />}>
                <Route index element={<DoctorHome />} />
                <Route path='profile/:id' element={<DoctorProfile />} />
                <Route path='patients' element={<ViewPatients />} />
                <Route path='patient/info/:id' element={<PatientInfo />} />
                <Route path='appointments' element={<DoctorAppointments />} />
                <Route path='uploadDocuments' element={<UploadDocs />} />
            </Route>

            <Route path='/patient' element={<PatientMain />}>
                <Route index element={<PatientHome />} />
                <Route path='profile' element={<PatientProfile />} />
                <Route path='appointments' element={<PatientAppointments />} />
                <Route path='doctor-info/:id' element={<DoctorInfo />} />
                <Route
                    path='view-prescriptions'
                    element={<ViewPrescriptions />}
                />
                <Route
                    path='prescription-info'
                    element={<PrescriptionInfo />}
                />
            </Route>

            <Route path='/admin' element={<AdminMain />}>
                <Route index element={<AdminHome />} />
                <Route path='profile/:id' element={<AdminProfile />} />
                <Route path='view-doctors' element={<AdminViewDoctors />} />
                <Route path='view-patients' element={<AdminViewPatients />} />
                <Route path='view-admins' element={<ViewAdmins />} />
                <Route path='add-admin/' element={<AddAdminForm />} />
                <Route path='add-package/' element={<AddPackageForm />} />
                <Route path='patient/:id' element={<AdminPatientInfo />} />
                <Route path='package/:id' element={<AdminPackageInfo />} />
                <Route path='doctor/:id' element={<AdminDoctorInfo />} />
                <Route path='view-requests' element={<ViewRequests />} />
                <Route path='view-packages' element={<ViewPackages />} />
            </Route>

            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default RouteSwitch
