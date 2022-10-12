import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn({ setUser }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const inputHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/v1/login', {
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
      setError('Ошибка!');
    }
  };
  return (
    <>
      {error && <div>{error}</div>}
      <form onSubmit={submitHandler}>
        <h3>Форма авторизации</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input name="email" value={inputs.email} onChange={inputHandler} type="email" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
          <input name="password" value={inputs.password} onChange={inputHandler} type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Войти</button>
      </form>
    </>
  );
}
