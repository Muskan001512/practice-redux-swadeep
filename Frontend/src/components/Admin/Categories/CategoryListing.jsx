import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteCategory, getAllCategories } from '../../../../redux/Slices/CategorySlice'
import CommonReactTable from "../../Commom/CommonReactTable"
import { toast } from 'react-toastify'

const CategoryListing = () => {
    const [category, setCategory] = useState(null)
    const slug = useSelector(state => state?.venue?.activeVenue?.slug)
    console.log(slug)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    console.log(params, "params")
    const columns = [
        { Header: "Name", accessor: "name" },
        {
            Header: "Status", accessor: "status",
            Cell: (props) => <>{props?.row?.original?.status ? "Active" : "Inactive"}</>
        },
        { Header: "Products", accessor: "_", Cell: props => <>Add Products</> },
        {
            Header: "Edit", accessor: "__", Cell: (props) => <h5 onClick={() => {
                navigate(`/manage/venues/${slug}/category/edit/${props?.row?.original?._id}`)
            }}>Edit</h5>
        },
        {
            Header: "Add", accessor: "__[]", Cell: (props) => <h5 onClick={() => {
                navigate(`/manage/venues/${slug}/category/product/add`)
            }}>Add</h5>
        },
        {
            Header: "Delete", accessor: "___", Cell: (props) => <h5 onClick={() => {
                console.log(props)
                dispatch(deleteCategory(props?.row?.original?._id))?.unwrap()?.then(res => {
                    console.log(res)
                    if (res?.status) {
                        toast.success(res?.message)
                        fetchCategories()
                    }
                })?.catch(err => toast.error(err))
            }}>Delete</h5>
        }
    ]

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = () => {
        console.log(params?.slug)
        dispatch(getAllCategories({ slug: params?.slug }))?.unwrap()?.then(res => {
            console.log(res)
            if (res?.status) {
                setCategory(res?.categories)
            } else {
                setCategory([])
            }
        }).catch(err => console.log(err))
    }
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <p>Items listing </p>
                <div>
                    <button onClick={() => {
                        navigate(`/manage/venues/${params?.slug}/category/add`)
                    }} >Create Category</button>
                    <button onClick={() => {
                        navigate(`/manage/venues/${params?.slug}/product/add`)
                    }} >Create Product</button>
                </div>
            </div>
            {(category && category?.length) ? <CommonReactTable data={category} columns={columns} /> :
                <>
                    <p>No categories available</p>
                    <button onClick={() => navigate(`/manage/venues/${params?.slug}/category/add`)}>Add Some Categories</button>
                </>
            }
        </>
    )
}

export default CategoryListing
