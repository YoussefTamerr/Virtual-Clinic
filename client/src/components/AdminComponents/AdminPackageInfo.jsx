import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import calcAge from '../../utils/calcAge'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Button, Modal, Input } from 'antd'
const { confirm } = Modal

const AdminPackageInfo = () => {
    const [SelectedPackage, setSelectedPackage] = useState({})
    const [editedPackage, setEditedPackage] = useState({});
    const [editMode, setEditMode] = useState(false)
    const [editMessage, setEditMessage] = useState('')
    const { id, type } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/admin/getPackage/${id}`)
            .then((res) => {
                setSelectedPackage(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const btnStyle = {
        marginLeft:'13px',
        backgroundColor: '#4caf50'
    }
    const inputStyle = {
        width: '100px',
        fontSize: '19px',
        padding: '1%',
        height: '30px'
    }

    const cancelStyle = {
        marginLeft:'900px'
    }
    const messageStyle = {
        opacity: '1',
        backgroundColor: '#9e9e9e',
        color: '#ffffff',
        borderRadius: '10px',
        border: '1px solid #9e9e9e',
        width: '500px',
        padding: '4px',
        paddingLeft: '10px',
        fontSize: '13px',
        transition: '0.5s ease-in-out'
    }
    
    const enterEdit = () => {
        setEditMode(true);
        setEditedPackage(SelectedPackage)
    }

    const cancelEdit = () => {
        setEditMode(false);
        setEditedPackage(SelectedPackage)
    }

    const saveFunc = async () => {
        try {
            const ret = await axios.put(`http://localhost:3000/api/admin/updatePackage/${id}`,
        editedPackage)
        setEditMessage('change saved successfully')
        setSelectedPackage(editedPackage)
        setEditMode(false)
        } catch (error) {
        console.log(error.response.data.error)
        setEditMessage(error.response.data.error)    
        }finally{
            setTimeout(() => {
                setEditMessage('')
            }, 5000);
        }
        
    }
    

    const handleInputChange = (e) => {
        console.log(e.target.value)
        setEditedPackage({
          ...editedPackage,
          [e.target.name]: e.target.value,
        });
      };

    const getPatientInfo = () => {
        return (
            <>
                <ul>
                    <li>
                        <strong>ID: </strong> {SelectedPackage._id}
                    </li>
                    <li>
                        <strong>Price: </strong>
                        {!editMode ? (` ${SelectedPackage.price} L.E`) :
                        <Input
                        name="price"
                        value={editedPackage.price}
                        type="number"
                        onChange={handleInputChange}
                        style={inputStyle}
                      />
                        }
                    </li>
                    <li>
                        <strong>Session Discount: </strong>
                        {!editMode ? (` ${SelectedPackage.sessionDiscount}%`):
                         <Input
                         name="sessionDiscount"
                         value={editedPackage.sessionDiscount}
                         type="number"
                         onChange={handleInputChange}
                         style={inputStyle}
                       />
                        }
                    </li>
                    <li>
                        <strong>Medicine Discount: </strong>{' '}
                        {!editMode ? (` ${SelectedPackage.medicineDiscount}%`):
                         <Input
                         name="medicineDiscount"
                         value={editedPackage.medicineDiscount}
                         type="number"
                         onChange={handleInputChange}
                         style={inputStyle}
                       />
                        }
                    </li>
                    <li>
                        <strong>Family Subscription Discount: </strong>{' '}
                        {!editMode ? (` ${SelectedPackage.familySubsDiscount}%`) :
                             <Input
                             name="familySubsDiscount"
                             value={editedPackage.familySubsDiscount}
                             type="number"
                             onChange={handleInputChange}
                             style={inputStyle}
                           />
                        }
                    </li>
                </ul>
                {!editMode ? (
                    <><Button type='primary' onClick={showDeleteConfirm} danger>
                        Delete
                    </Button><Button type='primary' style={btnStyle} onClick={enterEdit}>
                            Edit
                        </Button></>
                ):
                <><Button type='primary' onClick={cancelEdit} danger style={cancelStyle}>
                Cancel
            </Button><Button type='primary' style={btnStyle} onClick={saveFunc}>
                    Save
                </Button></>
                }

            </>
        )
    }

    const showDeleteConfirm = () => {
        confirm({
            title: `Are you sure want to delete ${SelectedPackage.name}?`,
            icon: <ExclamationCircleFilled />,
            content: 'Please confirm!',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete()
            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }
    const success = () => {
        Modal.success({
            content: `${SelectedPackage.name} has been deleted.`,
            onOk() {
                navigate('/admin/view-Packages')
            },
        })
    }

    const error = () => {
        Modal.error({
            title: 'Could not delete this user.',
            content: 'Please try again later.',
        })
    }
    const handleDelete = () => {
        axios
            .delete(`http://localhost:3000/api/admin/deletePackage/${id}`)
            .then((res) => success())
            .catch((err) => {
                console.log(err)
                error()
            })
    }

    return (
        <div className='patient-info-container'>
            <h2>Selected Package</h2>
            <div className='patient-name'>
                <h2>
                {SelectedPackage.name}
                </h2>
            </div>

            <div className='patient-info'>
               {editMessage ? 
                     <div style={messageStyle}>
                     {editMessage}
                 </div>:
                null    
                }
            {getPatientInfo()}
            </div>
        </div>
    )
}

export default AdminPackageInfo