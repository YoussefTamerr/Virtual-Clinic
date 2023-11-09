import { useEffect, useState } from 'react'
import AdminList from '../../components/admin/ViewAdmins/AdminList'
import axiosApi from '../../utils/axiosApi'

const AdminViewAdmins = () => {
    const [Admins, setAdmins] = useState(null)
    useEffect(() => {
        fetchPatients()
    }, [])
    const fetchPatients = async () => {
        try {
            let res = await axiosApi.get(
                '/admin/getAllAdmins'
            )
            if (res.length !== 0) setAdmins(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='page'>
            {Admins ? (
                <AdminList Admins={Admins} setAdmins={setAdmins} />
            ) : null}
        </div>
    )
}

export default AdminViewAdmins
