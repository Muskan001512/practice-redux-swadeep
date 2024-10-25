import axios from 'axios'
import { Field, Formik, Form, ErrorMessage } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { getVenue, updateVenue } from '../../../../redux/Slices/VenueSlice'
const CreateVenue = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const userId = useSelector(state => state?.auth?.userData?._id)
    const [initialValues, setInitialValues] = useState({
        name: "",
        slug: "",
        currency: "",
        theme: "light",
        color: "#000000",
        tags: "",
        file: null
    })
    useEffect(() => {
        if (params?.slug) {
            dispatch(getVenue(params?.slug))?.unwrap()?.then(res => {
                console.log(res)
                if (res?.status) {
                    setInitialValues({
                        name: res.venue.name,
                        slug: res.venue.slug,
                        currency: res.venue.currency,
                        theme: res.venue.theme,
                        color: `#${res.venue.color}`,
                        tags: res.venue.tags,
                    })
                }
            })?.catch(err => toast.error(err))
        }
    }, [])
    const validation = yup.object({
        name: yup.string().required("Name is required"),
        currency: yup.string().required("Currency is required"),
        theme: yup.string().required("Theme is required"),
        color: yup.string().required("Color is required"),
    })
    return <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={async (values) => {
            if (params?.slug) {
                console.log("object", values)
                dispatch(updateVenue({ slug: params?.slug, values: { ...values, slug: values.name.toLowerCase().replaceAll(" ", "-"), color: values?.color?.slice(1) } }))?.unwrap()?.then(res => {
                    console.log(res)
                    if (res?.status) {
                        toast.info(res?.message)
                        navigate('/manage/venues')
                    }
                })?.catch(err => console.log(err))
            } else {
                const formData = new FormData();
                console.log(userId, "userId")
                formData.append('name', values.name);
                formData.append('slug', values.name.toLowerCase().replaceAll(" ", "-"));
                formData.append('currency', values.currency);
                formData.append('theme', values.theme);
                formData.append('color', values.color.slice(1));
                formData.append('tags', values.tags);
                formData.append('createdBy', '66c8f8c4b8ea3f946fdf63fe');

                if (values.file) {
                    formData.append('file', values.file);
                }

                try {
                    const response = await axios.post("http://localhost:5000/private/venues/create-venue", formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log(response, "response");
                    if (response?.data?.status) {
                        toast.success("Venue created successfully");
                        navigate('/manage/venues')
                    }
                } catch (error) {
                    console.error("Error uploading file", error);
                }
            }
        }}
        validationSchema={validation}
    >    {({ values, setFieldValue }) => (
        <Form>

            <Field type='text' name="name" placeholder="Enter name" />
            <ErrorMessage name="name" />
            <Field type='text' disabled={true} value={values?.name?.toLowerCase()?.replaceAll(" ", "-")} name="slug" placeholder="Enter slug" />
            <ErrorMessage name="slug" />
            <Field type='text' name="currency" placeholder="Enter currency" />
            <ErrorMessage name="currency" />
            <Field type='radio' value="light" name="theme" placeholder="Enter theme" />
            <ErrorMessage name="theme" />
            <Field type='radio' value="dark" name="theme" placeholder="Enter theme" />
            <ErrorMessage name="theme" />
            <Field type='color' name="color" placeholder="Enter color" />
            <ErrorMessage name="color" />
            <Field type='text' name="tags" placeholder="Enter tags" />
            <ErrorMessage name="tags" />
            {!params?.id && <input type='file' name="file" onChange={(e) => {
                console.log(e)
                console.log(e?.target)
                console.log(e?.currentTarget)
                console.log(e?.target?.files)
                console.log(e?.target?.files[0])
                setFieldValue("file", e?.target?.files[0])
            }} placeholder="Upload File" />}
            {!params?.id && <ErrorMessage name="file" />}
            <button type='submit'>Click Me</button>
        </Form>
    )}
    </Formik>
}

export default CreateVenue
