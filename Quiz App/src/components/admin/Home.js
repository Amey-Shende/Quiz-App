import React from 'react'
import { Link } from 'react-router-dom'

const cards = [
    { title: "Total Quizzes", value: 3 },
    { title: "Total Users", value: 5 },
    { title: "Total Completed Quizzes", value: 75 },
    { title: "Average Score", value: `85%` },
];

function Home() {

    return (
        <div className="container mt-4 px-5">
            <div className="row mb-4">
                {
                    cards?.map((val, index) => (
                        <div className="col-md-3">
                            <div className="card text-center shadow-sm rounded-3 py-3">
                                <div className="card-body">
                                    <h5 className="card-title">{val.title}</h5>
                                    <p className="card-text fs-5">{val.value}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <h5>Recent Activity</h5>
            <ul className="list-group mb-4">
                <li className="list-group-item">Quiz "React Quiz" created.</li>
                <li className="list-group-item">User "john_doe" completed "JavaScript Quiz".</li>
                <li className="list-group-item">New user registered: "jane_doe".</li>
            </ul>

            <h5>Quick Links</h5>
            <nav>
                <ul className="list-group mb-4">
                    <li className="list-group-item"><Link to="/admin/addQuestion" className="text-decoration-none">Create New Quiz</Link></li>
                    <li className="list-group-item"><Link to="/admin/manageQuizzes" className="text-decoration-none">Manage Quizzes</Link></li>
                    <li className="list-group-item"><Link to="/admin/userResults" className="text-decoration-none">View User Results</Link></li>
                    <li className="list-group-item"><Link to="/admin/settings" className="text-decoration-none">Settings</Link></li>
                </ul>
            </nav>

        </div >

    )
}

export default Home
