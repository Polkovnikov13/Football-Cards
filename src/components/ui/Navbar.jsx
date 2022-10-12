import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navbar({
  user, setUser, findInput, setFindInput,
}) {
  const navigate = useNavigate();

  // console.log('navbar', user);

  const logoutHandler = async () => {
    const response = await fetch('/api/v1/logout');
    if (response.ok) {
      setUser({});
      navigate('/players');
    }
  };

  const findInputHandler = (e) => {
    setFindInput(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Football</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!user.id ? (
              <>
                <div className="nav-link text-white">
                  Привет, гость!
                </div>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/players">Все Футболисты</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">Регистрация</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Авторизация</NavLink>
                </li>

              </>
            ) : (
              <>
                <div className="nav-link text-white">
                  Hello,
                  {user.name}
                  !
                </div>
                <li className="nav-item">
                  <a className="nav-link text-white" type="button" onClick={logoutHandler}>Выйти</a>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/players">Все Футболисты</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/myplayers">Мои Футболисты</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/players/add">Добавить футболиста</NavLink>
                </li>
              </>
            )}
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" name="title" value={findInput} onChange={findInputHandler} placeholder="Поиск по имени" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Искать</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
