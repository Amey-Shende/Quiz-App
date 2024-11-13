import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'intro.js/introjs.css';
import { Steps } from 'intro.js-react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizInstruction from './QuizInstruction';


const steps = [
  {
    element: '.selector1',
    intro: 'This is your test name',
    position: "bottom",
  },
  {
    element: '.selector2',
    intro: 'This is the quiz timer. Keep an eye on the time remaining to answer all questions. Don’t rush, but make sure to finish before time runs out!',
    position: "bottom",
  },
  {
    element: '.selector3',
    intro: 'Here is where the quiz question will be displayed. Read the question carefully and select your answer from the options provided below.Your can clear response also.',
  }, {
    element: '.selector4',
    intro: 'This section shows the number of attempted, unattempted, and total questions in the quiz. Use this information to track your progress.',
    position: "top",
  },
  {
    element: '.selector5',
    intro: 'At the bottom, you will find navigation buttons: Next, Previous, and Submit. Use these buttons to navigate through the quiz and submit your answers when you are finished.',
    position: "top",
  }
];

function UserDashboard() {
  // get api data
  const [formData, setFormData] = useState([]);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizStated, setQuizStarted] = useState(false);
  const [timer, setTimer] = useState(15 * 60);  //15*60

  const [stepsEnabled, setStepsEnabled] = useState(true);
  const [stepsCompleted, setStepsCompleted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/${location?.state?.endPoint}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Api fetching data:- ", error);
      } finally {
        setLoading(false);
      }
    };
    getApi();
  }, [location?.state?.endPoint]);

  useEffect(() => {
    // if (stepsCompleted && timer > 0) {
    //   const time = setTimeout(() => {
    //     setTimer(timer => timer - 1);
    //   }, 1000)

    //   return () => clearTimeout(time);
    // }

    let interval = null;

    if (stepsCompleted && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setStepsCompleted(false);
      handleSubmit();
    }

    return () => clearInterval(interval);

  }, [stepsCompleted, timer]);


  if (loading) return <div className='d-flex justify-content-center align-items-center vh-100'>
    <div className="spinner-border text-gray" role="status"></div>
  </div>;

  //************** Handle Change **********/
  const handleChange = (e, val) => {
    const { name, value } = e.target;
    const present = result.findIndex((val) => val.question === name);

    if (present !== -1) {
      const temp = [...result];
      temp[present].choice = value;
      setResult(temp);
    } else {
      setResult([...result, { question: name, choice: value, answer: val }]);
    }
  };

  //********** Handle Submit **********/
  const handleSubmit = () => {
    const totalQuestion = formData.length;
    const correctQuestion = result.filter((val) => val.answer === val.choice).length;
    const Percentage = totalQuestion > 0 ? ((correctQuestion / totalQuestion) * 100).toFixed(2) + "%" : "0%";

    navigate("/user-result", {
      state: { data: { percentage: Percentage, totalQuestion, correctQuestion } },
      replace: true
    });
  };

  //********** Next Question **********/
  const handleNext = () => {
    if (currentIndex < formData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  //**********  Previous Question ********/
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  //********* Clear Response **********/
  const handleClearResponse = () => {
    const res = result.find(m => m.question === formData[currentIndex].question)
    if (res) {
      const temp = result.filter((val, index) => val.question !== res.question);
      setResult(temp);
    }
  }

  const handlStepper = () => {
    console.log("stepper1:- ", stepsCompleted);
    setStepsEnabled(false);
    setStepsCompleted(true);
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;


  return (
    <div className='d-flex flex-column vh-100'>
      <ToastContainer />

      {!quizStated ? (
        <QuizInstruction setQuizStarted={setQuizStarted} quizName={location?.state?.testName} />
      )
        : (
          <>
            <Steps enabled={stepsEnabled}
              steps={steps}
              initialStep={0}
              onExit={handlStepper}
              options={{
                doneLabel: 'Done',
                nextLabel: 'Next',
                prevLabel: 'Back',
                showStepNumbers: true,
                showBullets: false,
                exitOnOverlayClick: false,
              }}
            />

            <nav className="navbar navbar-light bg-primary" >
              <div className=' w-100 d-flex justify-content-evenly align-items-center'>
                <p className='text-white fs-5 selector1'>Test name:- {location?.state?.testName}</p>
                <p className='text-white ms-5 fs-5 selector2'>Time :-  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
                {/* {formatTime(timer)} */}
              </div>
            </nav>

            {/* Question Number */}
            <div className='selector4 w-75 m-auto'>
              <div className='d-flex justify-content-evenly mt-4 mb-4'>
                <div className=''>
                  <span className='border border-1 bg-success-subtle px-4 py-3 rounded-1'>{result?.length || 0}</span>
                  <span className='ms-3' style={{ fontSize: "18px" }}>Attempt Questions</span>
                </div>

                <div className=''>
                  <span className='border border-1 bg-danger-subtle px-4 py-3 rounded-1'>{formData?.length - result?.length || 0}</span>
                  <span className='ms-3' style={{ fontSize: "18px" }}>Un-Attempt Questions</span>
                </div>

                <div className=''>
                  <span className='border border-1 bg-secondary-subtle px-4 py-3 rounded-1'>{formData?.length || 0}</span>
                  <span className='ms-3' style={{ fontSize: "18px" }}>Total Questions</span>
                </div>
              </div>
            </div>

            {/* Question section */}
            <div className='flex-fill d-flex justify-content-center align-items-center bg-white h-75 '>
              <div className='container w-75 h-75 mb-3  p-4 border rounded shadow-sm selector3'>
                {formData.length > 0 && (
                  <>
                    <div className='mb-5'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <h5>Question {currentIndex + 1} of {formData.length}</h5>
                        <p className='me-4 '>(Mark:- 01)</p>
                      </div>

                      <p className='' style={{ fontSize: "1.2rem" }}>{formData[currentIndex].question}</p>
                      <hr />

                      {formData[currentIndex].options && formData[currentIndex].options.map((value, index) => (
                        <Fragment key={index}>
                          <input
                            type="radio"
                            className='ms-3'
                            value={value}
                            name={formData[currentIndex].question}
                            onChange={(e) => handleChange(e, formData[currentIndex].answer)}
                            checked={result.find(r => r.question === formData[currentIndex].question)?.choice === value}
                          /> <span style={{ fontSize: "1.1rem" }}>{value}</span>
                          <br />
                        </Fragment>
                      ))}
                    </div>

                    <div className='d-flex justify-content-center pt-2 position-absolute'>
                      <button onClick={() => handleClearResponse()}
                        className='btn bg-secondary-subtle border border-2 ' title='clear response'>Clear Response</button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <footer className='bg-primary text-white p-3 '>

              <div className='selector5'>
                <div className='d-flex justify-content-center mb-3 '>
                  <button className='btn btn-light me-4' onClick={handlePrevious}
                    disabled={currentIndex === 0}>&lt;&lt; Previous Question
                  </button>

                  <button className='btn btn-light ms-4' onClick={handleNext}
                    disabled={currentIndex === formData.length - 1}>Next Question &gt;&gt;
                  </button>
                </div>

                <div className='d-flex justify-content-center mb-3'>
                  <button className='btn btn-light py-2 px-5' disabled={result.length === 0}
                    onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </footer>
          </>
        )
      }
    </div >
  );
}

export default UserDashboard;