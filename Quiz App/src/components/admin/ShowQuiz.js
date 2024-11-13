import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loader from '../loading/Loader';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function ShowQuiz() {

    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const endpoint = location?.state?.endPoint || null;

    //**** Fetch API data ***/
    useEffect(() => {
        const getApi = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/${endpoint}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        getApi();
    }, [formData, endpoint]);


    if (loading) return <Loader />


    //************************** handle edit question (CRUD)***************************/
    const editQuestion = async (id) => {
        const res = formData?.filter((val => val.id === id));
        if (res) {
            console.log(res);
            navigate("/admin/editQuestion", { state: { editData: res, endpoint: endpoint } })
        }
    }

    //************************** handle delete question (CRUD)***************************/
    const deleteQuestions = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3001/${endpoint}/${id}`);
            if (res.status === 200) {
                toast.success("Question deleted successfully",
                    { position: "top-center", autoClose: 3000 });
            } else {
                toast.error("Unable to delete question!",
                    { position: "top-center", autoClose: 3000 })
            }
        } catch (error) {
            toast.error("Unable to delete question!",
                { position: "top-center", autoClose: 3000 })
            console.error("deleted question api:- ", error);
        }
    }

    return (
        <>
            {/* Add Question */}
            <div className='mt-2 d-flex justify-content-end' >
                <NavLink to={`/admin/addQuestion`}
                    state={{ endpoint: endpoint }}
                    className='btn btn-success me-5'>
                    + New Question
                </NavLink>
            </div >

            <div className='d-flex justify-content-center mt-3 mb-5' style={{ height: "83vh" }}>
                <div className='container card w-75 px-5' style={{ height: "100%", overflowY: "auto" }}>

                    <h4 className='text-center mt-2'>{location?.state?.quizTitle} Questions</h4>

                    {/* Previous questions rendering */}
                    <div className='mt-2 mb-2'>
                        {formData.length > 0 && formData?.map((val, index) => (
                            <div key={val.question}>
                                <div className='d-flex justify-content-between align-items-center mb-0'>
                                    <p className='mb-1'>Q{index + 1}. {val.question}</p>

                                    {/* Edit and delete button */}
                                    <div>
                                        <button className='text-success cursor-pointer border-0 bg-white'
                                            title="Edit question" >
                                            <i className="bi bi-pencil-fill" style={{ fontSize: "17px" }}
                                                onClick={() => editQuestion(val.id)}></i>
                                        </button>

                                        <button className='text-danger cursor-pointer border-0 bg-white'
                                            title="Delete question">
                                            <i className="bi bi-trash " style={{ fontSize: "17px" }}
                                                onClick={() => deleteQuestions(val.id)}></i>
                                        </button>
                                    </div>
                                </div>

                                {val.options && val.options.map((optionValue, optionIndex) => (
                                    <p key={optionIndex} className='ms-4 mb-1'>({optionIndex + 1}) {optionValue}</p>
                                ))}
                                <p className='ms-4 text-success mb-1'>Correct answer: {val.answer}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div >
        </>
    )
}

export default ShowQuiz
