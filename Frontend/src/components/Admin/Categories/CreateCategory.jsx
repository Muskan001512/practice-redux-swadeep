import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { string, object } from 'yup'
import { createCategory, getCategory, updateCategory } from '../../../../redux/Slices/CategorySlice'
import { toast } from "react-toastify"

const CreateCategory = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [initialValues, setInitialValues] = useState({
        name: "",
        status: true
    })
    const validaton = object().shape({
        name: string().required("Name is required"),
    })
    console.log(params)
    useEffect(() => {
        if (params?.id) {
            dispatch(getCategory(params?.id))?.unwrap().then(res => {
                console.log(res)
                if (res?.status) {
                    setInitialValues(res?.category)
                }
            }).catch(err => console.log(err))
        }
    }, [])
    return <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validaton}
        onSubmit={(values) => {
            let newValues = { ...values, slug: params?.slug }
            console.log(values, "form submitted")
            // return
            const action = params?.id ? dispatch(updateCategory({ id: params?.id, values })) : dispatch(createCategory(newValues))
            action?.unwrap().then(res => {
                console.log(res)
                if (res?.status) {
                    toast.success(res?.message)
                    navigate(`/manage/venues/${params?.slug}/items`)
                } else toast.error(res?.message)
            }).catch(err => console.log(err))
        }}
    >
        <Form>
            <Field type='text' name='name' />
            <ErrorMessage name='name' />
            <Field type='checkbox' name='status' />
            <button type='submit'>Click Me to Create Category</button>
        </Form>
    </Formik>
}

export default CreateCategory;