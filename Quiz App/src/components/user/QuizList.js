import { useNavigate } from "react-router-dom";
import "./quiz.css"

const quizList = [
    {
        title: "React JS Quiz",
        endPoint: "react"
    }, {
        title: "JavaScript Quiz",
        endPoint: "js"
    }, {
        title: "Python Quiz",
        endPoint: "python"
    }
];

function QuizList() {
    const navigate = useNavigate();

    const handleClick = (endPoint, title) => {
        navigate("/user", { state: { endPoint: endPoint, testName: title } });
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 bg-light'>
            <div className="text-center">
                <h3 className='quiz-title'>Welcome to the Quiz App!</h3>
                <p className='fs-5'>Test your knowledge on various topics.</p>

                <div className='card mt-5 shadow-sm'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4'>Choose Your Quiz</h2>
                        <div className='d-grid gap-2'>
                            {
                                quizList.map((val) => (
                                    <button
                                        key={val.endPoint}
                                        onClick={() => handleClick(val.endPoint, val.title)}
                                        className="btn btn-primary btn-lg"
                                    >
                                        {val.title} &gt;&gt;
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizList;