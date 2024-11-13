import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddQuestion() {

    // State to hold the question data including options
    const [questionData, setQuestionData] = useState({
        question: "",
        options: [""],
        answer: "",
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const location = useLocation();

    // console.log("Location:-", location);

    //************************** handle change ***************************/
    const handleChange = (e) => {
        const { value, name } = e.target;
        setQuestionData({ ...questionData, [name]: value });
    };

    //************************** handle options change ***************************/
    const handleOptionChange = (e, index) => {
        const newOptions = [...questionData.options];
        newOptions[index] = e.target.value;
        setQuestionData({ ...questionData, options: newOptions });
    };

    //************************** Add options function ***************************/
    const handleAddOptions = () => {
        setQuestionData(prev => ({ ...prev, options: [...prev.options, ""] }))
    }

    const isQuestion = (question) => {
        const qnameRegex = /^\s*[a-zA-Z0-9 ?-]*$/;
        return qnameRegex.test(question);
    }

    //************************** validation ***************************/
    const validateForm = () => {
        let newError = {};

        //*** question ***/
        if (!(questionData.question.trim())) {
            newError.question = "question is required";
        } else if (!isQuestion(questionData.question)) {
            newError.question = "invalid question";
        }

        //***options ***/
        if (questionData.options.length === 0) {
            newError.options = "options is required";
        } else if (questionData.options.length < 2) {
            newError.options = "add at least 2 options";
        } else if (questionData.options.length > 4) {
            newError.options = "add at most 4 options";
        } else {
            const emptyOptions = questionData.options.filter(option => option.trim() === "");
            if (emptyOptions.length > 0) {
                newError.options = "options cannot be empty";
            }
        }

        //**** answer ***/
        if (questionData.answer === "") {
            newError.answer = "select a correct answer"
        }

        setErrors(newError);
        return Object.keys(newError).length === 0;
    };

    //************************** handle cancle question function ***************************/
    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
            setQuestionData({ question: "", answer: "", options: [""] });
            setErrors({});
            navigate(-1);
        }
    };

    //************************** handle delete options ***************************/
    const handleremoveOpition = (val, index) => {
        const res = questionData.options.filter((v, index) => v !== val);
        setQuestionData({ ...questionData, options: res });
    };

    //************************** handle submit function (CRUD) ***************************/
    const handleSubmit = async () => {
        const isValid = validateForm();
        if (isValid) {
            try {
                // console.log("Inside post submit:- ", questionData)
                await axios.post(`http://localhost:3001/${location?.state?.endpoint}`, questionData);
                toast.success("Question added successfully",
                    { position: "top-center", autoClose: 3000 });
                setQuestionData({ question: "", answer: "", options: [""] });
                setErrors({});
                navigate(-1);

            } catch (error) {
                toast.error("unable to add question!", {
                    position: "top-center",
                    autoClose: 3000
                });
                console.error("Error submitting data:", error);
            }
        } else {
            console.log("Form validation failed!")
        }
    };

    return (
        <div className='d-flex justify-content-center mt-5 mb-3 '>
            <div className='container card mb-3 w-75 px-5'>
                <h3 className='text-center mt-3'>Add Question</h3>
                <div className='p-3'>
                    <div className='mb-2'>
                        <label htmlFor="question">Question</label>
                        <input
                            type="text"
                            id="question"
                            name="question"
                            placeholder='Enter the question'
                            className='form-control'
                            onChange={handleChange}
                            value={questionData.question}
                        />

                        {
                            errors?.question &&
                            <small className='text-danger'>
                                {errors.question}
                            </small>
                        }
                    </div>

                    {/* Rendering options */}
                    <div>
                        {
                            questionData?.options.map((val, index) => (
                                <div key={index} className='mt-1'>
                                    <label htmlFor={`option${index + 1}`}>Option {index + 1}</label>

                                    <div className='d-flex'>
                                        <input
                                            type="text"
                                            id={`option${index + 1}`}
                                            name="option"
                                            placeholder={`Enter option ${index + 1}`}
                                            className='form-control'
                                            onChange={(e) => handleOptionChange(e, index)}
                                            value={val}
                                        />
                                        <button className='border border-0 text-danger bg-white'
                                            onClick={() => handleremoveOpition(val, index)}>
                                            <i className="bi bi-trash" style={{ fontSize: "15px" }}></i></button>
                                    </div>
                                </div>
                            ))
                        }

                        <div className='text-end' >
                            <button
                                className='border border-0 bg-white mt-1 me-4'
                                onClick={handleAddOptions} title="Add options">
                                <i className="bi bi-plus-circle fs-5 text-success"></i>
                            </button>
                        </div>

                        {errors.options && <small className='text-danger'>{errors.options}</small>}
                    </div>

                    {/* select  Correct  input */}
                    <div className='mb-2'>
                        <label htmlFor="answer">Correct Answer</label>

                        <select className="form-select" id="answer"
                            value={questionData?.answer || "select"}
                            onChange={(e) => setQuestionData({ ...questionData, answer: e.target.value })}
                        >
                            <option value="select" >select</option>
                            {
                                questionData?.options?.map((val, index) => (
                                    val !== "" ? <option value={val} key={val}>{val}</option>
                                        : null
                                ))
                            }
                        </select>

                        {errors.answer && <small className='text-danger'> {errors.answer}</small>}
                    </div>

                    {/* Save and Cancel buttons */}
                    <div className='d-flex justify-content-around mt-4 mb-2 px-4'>
                        <button
                            className='btn btn-success py-2 px-5'
                            onClick={handleSubmit}>
                            Save
                        </button>

                        <button
                            className='btn btn-light btn-outline-danger py-2 px-5'
                            onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddQuestion;
