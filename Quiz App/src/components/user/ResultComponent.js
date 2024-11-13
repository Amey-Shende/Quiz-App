import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

function ResultComponent() {
    const location = useLocation();
    const navigate = useNavigate();

    // Calculate values for display
    const percentage = parseInt(location.state?.data.percentage) || 0;
    const correctAnswers = location.state?.data.correctQuestion || 0;
    const totalQuestions = location.state?.data.totalQuestion || 0;
    const incorrectAnswers = totalQuestions - correctAnswers;

    return (
        <div className='vw-100 vh-100 bg-light py-5'>
            <div className='container d-flex justify-content-center'>
                <div className='w-50'>
                    <div className='card shadow border-0'>
                        <div className='card-body text-center'>
                            <h4 className='card-title mb-4'>Quiz Result</h4>
                            {percentage < 25 ? (
                                <>
                                    <p className='text-danger fs-1'>{percentage}%</p>
                                    <p className='fs-5 fst-italic'>You can try again!</p>

                                </>
                            ) : (
                                <>
                                    <p className='text-success fs-1'>{percentage}%</p>
                                    <p className='fs-5'>Great job!</p>
                                    <Confetti mode="boom" colors={['#ff577f', '#ff884b']}
                                        width={650} height={450} numberOfPieces={60} />
                                </>
                            )}
                            <hr />
                            <p className='fs-5'>Correct Answers:
                                <span className='text-success'> {correctAnswers}</span>
                            </p>
                            <p className='fs-5'>Total Questions:
                                <span className='text-primary'> {totalQuestions}</span>
                            </p>
                            <p className='fs-5'>Incorrect Answers:
                                <span className='text-danger fs-5'> {incorrectAnswers}</span>
                            </p>

                            <div className='mt-4'>
                                <button className='btn btn-primary' onClick={() => navigate("/user", { replace: true })}>Retake Quiz</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultComponent;