import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from 'react-toastify'
import { deleteCategory, getAllCategories } from '../../../../redux/Slices/CategorySlice'
import CommonReactTable from "../../Commom/CommonReactTable"
import Selector from './useCustomSelector'

const CategoryListing = () => {
    const [category, setCategory] = useState(null)
    const slug = Selector("venue")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const columns = [
        { Header: "Name", accessor: "name" },
        {
            Header: "Status", accessor: "status",
            Cell: ({ row }) => <>{row?.original?.status ? "Active" : "Inactive"}</>
        },
        { Header: "Products", accessor: "_", Cell: () => <>Add Products</> },
        {
            Header: "Edit", accessor: "__", Cell: ({ row }) => <h5 onClick={() => navigate(`/manage/venues/${{ slug }}/category/edit/${row?.original?._id}`)}>Edit</h5>
        },
        {
            Header: "Add", accessor: "__[]", Cell: () => <h5 onClick={() => navigate(`/manage/venues/${slug}/category/product/add`)}>Add</h5>
        },
        {
            Header: "Delete",
            accessor: "___",
            Cell: (props) => (
                <h5 onClick={() => {
                    console.log(props);
                    dispatch(deleteCategory(props?.row?.original?._id))
                        ?.unwrap()
                        ?.then(res => {
                            console.log(res);
                            if (res?.status) {
                                toast.success(res?.message);
                                fetchCategories();
                            }
                        })
                        ?.catch(err => toast.error(err));
                }}>
                    Delete
                </h5>
            )
        }
        
    ]

    useEffect(() => { fetchCategories() }, [])

    const fetchCategories = () => {
        console.log(params?.slug)
        dispatch(getAllCategories({ slug: params?.slug }))?.unwrap()?.then(res => {
            console.log(res)
            setCategory(res?.status ? res?.categories : [])
        }).catch(err => console.log(err))
    }
    return <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Items listing </p>
            <div>
                {["category", "product"]?.map(el => <button onClick={() => navigate(`/manage/venues/${params?.slug}/${el}/add`)} >Create {el?.toUpperCase()}</button>)}
            </div>
        </div>
        {category?.length ? <CommonReactTable data={category} columns={columns} /> :
            <>
                <p>No categories available</p>
                <button onClick={() => navigate(`/manage/venues/${params?.slug}/category/add`)}>Add Some Categories</button>
            </>}
    </>
}

export default CategoryListing;