import React, { useEffect, useState } from 'react'
import ReactTableExample from "../../Commom/CommonReactTable"
import { useDispatch } from 'react-redux';
import { deleteVenue, getAllVenues, setActiveVenue } from '../../../../redux/Slices/VenueSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const VenueListing = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [venues, setVenues] = useState([])
    useEffect(() => {
        fetchVenues()
    }, [])
    const columns = [
        { Header: 'ID', accessor: '_id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Theme', accessor: 'theme' },
        { Header: 'Slug', accessor: 'slug' },
        { Header: 'Currency', accessor: 'currency' },
        {
            Header: 'Edit', accessor: '_',
            Cell: (props) => <h6 onClick={() => {
                console.log(props)
                navigate(`/manage/venues/edit/${props?.row?.original?.slug}`)
            }}>Edit</h6>
        },
        {
            Header: 'View', accessor: '__',
            Cell: (props) => <h6 onClick={() => {
                console.log(props)
                dispatch(setActiveVenue(props?.row?.original))
                navigate(`/manage/venues/${props?.row?.original?.slug}/items/`)
            }}>View</h6>,
        },
        {
            Header: 'Delete', accessor: '___',
            Cell: (props) => <h6 onClick={() => {
                console.log(props)
                dispatch(deleteVenue(props?.row?.original?._id))?.unwrap()?.then(res => {
                    console.log(res)
                    if (res?.status) {
                        toast.success("Venue Deleted Successfully")
                        fetchVenues()
                    }
                })?.catch(err => toast.error(err))
            }}>Delete</h6>
        },
    ];

    const fetchVenues = () => {
        dispatch(getAllVenues())?.unwrap()?.then(res => {
            console.log(res)
            if (res?.status && res?.venueList?.length > 0) {
                setVenues(res?.venueList)
            }
        })?.catch(err => toast.error(err))
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>VenueListing</p>
                <button onClick={() => {
                    navigate(`/manage/venues/add`)
                }}>Add New Venue</button>
            </div>
            <ReactTableExample data={venues} columns={columns} />
        </div>
    )
}

export default VenueListing
