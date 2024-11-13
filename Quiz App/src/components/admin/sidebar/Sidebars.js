import React from 'react'
import { NavLink } from 'react-router-dom';
import "./sidebar.css";

const sidebarData = [
  {
    title: "Home",
    endPoint: "home",
    href: "/admin"
  },
  {
    title: "React Quiz",
    endPoint: "react",
    href: "react/showQuiz"
  },
  {
    title: "Javascript Quiz",
    endPoint: "js",
    href: "js/showQuiz"
  },
  {
    title: "Python Quiz",
    endPoint: "python",
    href: "python/showQuiz"
  }
];

function Sidebars() {

  return (
    <div className='container bg-dark vh-100 ms-0 col-7 col-sm-4 col-md-3 rounded-end custome-lg'>
      <div className='pt-5'>
        <ul className='list-unstyled px-3 mt-2'>
          {
            sidebarData.map((val, index) => (
              <li key={val.title} className='ps-2 py-1 li-hover'>
                <NavLink
                  to={val.href}
                  state={{ endPoint: val.endPoint, quizTitle: val.title }}
                  className={({ isActive }) =>
                    isActive ? 'active text-decoration-none rounded py-2 px-5 '
                      : 'user-select-none text-decoration-none py-2 px-5'
                  }
                  style={{ fontSize: "1.11rem", display: 'block', width: '100%' }}
                  end={val.title === "Home"}
                >
                  {val.title}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div >
    </div >

  )
}

export default Sidebars;
