import React, { useState } from 'react'
import { Button, Form, Input, DatePicker, Steps } from 'antd'
import { useNavigate,Link } from 'react-router-dom'
import axiosApi from '../../utils/axiosApi'
import { LeftCircleOutlined} from '@ant-design/icons'

const { Step } = Steps

const DoctorRegistration = () => {
    const [form] = Form.useForm()
    const [currentStep, setCurrentStep] = useState(0)
    const [message, setMessage] = useState(null)
    const [formData,setFormData]=useState({})
    const navigate = useNavigate()

    const nextStep = () => {
        form.validateFields().then((values) => {setFormData({...values}),setCurrentStep(currentStep + 1)})
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1)
    }

    const handleSubmit = async (values) => {
        // Handle form submission for the last step
        try {
            const response = await axiosApi.post(
                '/doctor/create-doctor',
                {...formData,...values}
            )
            const data = response.data
            if (response) {
                setMessage('Registration Successful')
                form.resetFields()
                setCurrentStep(0) // Reset to the first step after successful submission
            } else {
                setMessage(data.message)
            }
        } catch (error) {
            setMessage(error.message)
        }
    }

    const steps = [
        {
            title: 'Basic Info.',
            content: (
                <>
                    <Form.Item
                        name='username'
                        label='Username'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='name'
                        label='Name'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label='Email'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                                type: 'email',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label='Password'
                        rules={[
                            {
                                required:true,
                                message:""
                            },
                            {
                                validator: (_, value) => {
                                    if (value.length < 8) {
                                        return Promise.reject('Password must be at least 8 characters');
                                    }
                                    if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
                                        return Promise.reject('Password must contain at least 1 letter and 1 number');
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}>
                        <Input.Password />
                    </Form.Item>
                </>
            ),
        },
        {
            title: 'Personal Info.',
            content: (
                <>
                <Form.Item
                        name='dob'
                        label='Date of Birth'
                        rules={[
                            {
                                required: true,
                                message: 'Please select your date of birth!',
                            },
                        ]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name='education'
                        label='Educational Background'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please input your educational background!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                </>
            ),
        },
        {
            title: 'Work Info.',
            content: (
                <>
         <Form.Item
                        name='hourly_rate'
                        label='Hourly Rate'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your hourly rate!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='speciality'
                        label='Speciality'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your speciality!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='affiliation'
                        label='Affiliation'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your affiliation!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                </>
            ),
        },
    ]

    return (
        <div
            style={{
                width: '600px',
                margin: 'auto',
                padding: '2%',
                border: '1px solid #ccc',
                borderRadius: '8px',
            }}>
                    <Link to='/login'>
                <Button
                    icon={<LeftCircleOutlined />}
                    size='small'
                    type='primary'>
                    Back to Login
                </Button>
            </Link>
            <h2 style={{ textAlign: 'center' }}>Doctor Registration</h2>
            <Steps current={currentStep} style={{ marginBottom: '20px' }}>
                {steps.map((step, index) => (
                    <Step key={index} title={step.title} />
                ))}
            </Steps>
            <Form form={form} onFinish={handleSubmit}>
                {steps[currentStep].content}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}>
                    {currentStep > 0 && (
                        <Button type='default' onClick={prevStep}>
                            Previous
                        </Button>
                    )}
                    {currentStep < steps.length - 1 && (
                        <Button type='primary' onClick={nextStep}>
                            Next
                        </Button>
                    )}
                    {currentStep === steps.length - 1 && (
                        <Button type='primary' htmlType='submit'>
                            Register
                        </Button>
                    )}
                </div>
                {message && (
                    <p
                        style={{
                            color:
                                message === 'Registration Successful'
                                    ? 'green'
                                    : 'red',
                            textAlign: 'center',
                            marginTop: '20px',
                        }}>
                        {message}
                    </p>
                )}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button type='link' onClick={() => navigate('/register')}>
                        Want to register as a Patient?
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default DoctorRegistration
