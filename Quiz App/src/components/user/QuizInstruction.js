
function QuizInstruction({ setQuizStarted, quizName }) {

    return (
        <div className='bg-light d-flex justify-content-center  vh-100 vw-100'>
            <div className='w-50 mt-3' >
                <h3 className='text-center'>Quiz Instructions</h3>
                <div className='mt-4 ms-4'>
                    <h5>Quiz Format</h5>
                    <p className='mb-2'>1. Number of Questions: The {quizName} consists of 15 questions.</p>
                    <p className='mb-2'>2. Question Type: Questions may be multiple-choice, true/false, or short answer.</p>
                    <p className='mb-2'>3. Time Limit: You have 15:00 minutes to complete the quiz.</p>

                    <h5 className='mt-3'>Scoring Criteria</h5>
                    <p className='mb-2'>1. Passing Percentage: To pass the quiz, you must achieve a score of at least 25%.</p>
                    <p className='mb-2'>2. Scoring System: Each correct answer earns you 01 points.</p>
                    {/* <p>3. Results: After completing the quiz, your score will be displayed along with feedback on incorrect answers.</p> */}

                    <h5 className='mt-3'>Taking the Quiz</h5>
                    <p className='mb-2'>1. Start the Quiz: Click on the "Start Quiz" button to begin.</p>
                    <p className='mb-2'>2. Navigating Questions: Use "Next" and "Previous" buttons to navigate through questions.</p>
                    <p className='mb-2'>3. Review Your Answers: Before submitting, review your answers.</p>
                    <p className='mb-2'>4. Submit Your Quiz: Click "Submit" to receive your score.</p>

                    <h5 className='mt-3'>Tips for Success</h5>
                    <ul>
                        <li>Read each question carefully before selecting your answer.</li>
                        <li>Manage your time wisely; keep an eye on the timer.</li>
                        <li>If unsure about an answer, make your best guess rather than leaving it blank.</li>
                    </ul>
                </div>

                <div className='text-center mb-4'>
                    <button
                        onClick={() => setQuizStarted(true)}
                        className='btn btn-primary mt-3 start-button'>
                        Start Quiz
                    </button>
                </div>

            </div>
        </div>
    )
}

export default QuizInstruction
