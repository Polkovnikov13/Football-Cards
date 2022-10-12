import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp({ setUser }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const inputHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data);
      navigate('/players');
    } else {
      setError('Ошибка !');
    }
  };
  return (
    <>
      {error && <div>{error}</div>}
      <form onSubmit={submitHandler}>
        <h3>Заполните форму регистрации</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Введите Имя</label>
          <input name="name" value={inputs.name} onChange={inputHandler} type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Введите Email</label>
          <input name="email" value={inputs.email} onChange={inputHandler} type="email" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Введите Пароль</label>
          <input name="password" value={inputs.password} onChange={inputHandler} type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
      </form>
    </>
  );
}
