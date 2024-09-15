import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as yup from "yup"

const CreateProduct = () => {
    const [initialValues, setInitialValues] = useState({
        name: "",
        price: 0,
        description: "",
        file_1: null,
        file_2: null,
        file_3: null,
    })
    const validation = yup.object().shape({
        name: yup.string().required("name is required"),
        price: yup.number().required("price is required"),
        // description: yup.string().notRequired("description is required"),
        file_1: yup.mixed().required('A file is required'),
        file_2: yup.mixed().required('A file is required'),
        file_3: yup.mixed().required('A file is required'),
    })
    return <Formik initialValues={initialValues}
        validationSchema={validation}
        onSubmit={(values) => {
            console.log(values)
            // const 
        }}
    >
        {({ values, setFieldValue }) => <Form>
            <Field type="text" name="name" placeholder="Name" />
            <ErrorMessage name='name' />
            <Field type="text" name="price" placeholder="Price" />
            <ErrorMessage name='price' />
            <Field type="text" name="description" placeholder="Description" />
            <ErrorMessage name='description' />
            <input type="file" name="file_1" onChange={(e) => {
                setFieldValue("file_1", e?.target?.files[0])
            }} />
            <ErrorMessage name='file_1' />
            <input type="file" name="file_2" onChange={(e) => {
                setFieldValue("file_2", e?.target?.files[0])
            }} />
            <ErrorMessage name='file_2' />
            <input type="file" name="file_3" onChange={(e) => {
                setFieldValue("file_3", e?.target?.files[0])
            }} />
            <ErrorMessage name='file_3' />
            <button type="submit">Submit</button>
        </Form>}
    </Formik>
}

export default CreateProduct
