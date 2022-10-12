import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddPlayers() {
  const [inputs, setInputs] = useState({
    name: '', surname: '', team: '', age: '', photo: '',
  });
  const inputHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (inputs.name && inputs.surname && inputs.team && inputs.age && inputs.photo) {
      const response = await fetch('/api/v1/players', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });
      if (response.ok) {
        const data = await response.json();
        // setCompanies((prev) => ([data, ...prev]));
        // setInputs({ name: '', number: '' });
        navigate('/players');
      }
    } else {
      alert('Заполнены не все поля!');
    }
  };
  return (
    <div className="col-md-6">
      <h1>Редактировать игрока</h1>
      <main className="form-wrapper">
        <form className="row" onSubmit={submitHandler}>
          <div className="col-md-6">
            <label className="form-label">Имя</label>
            <input id="edit_name" name="name" type="text" value={inputs.name} onChange={inputHandler} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Фамилия</label>
            <input id="edit_surname" name="surname" type="text" value={inputs.surname} onChange={inputHandler} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Возраст</label>
            <input id="edit_age" name="age" type="number" value={inputs.age} onChange={inputHandler} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Фотография</label>
            <input id="edit_photo" name="photo" type="text" value={inputs.photo} onChange={inputHandler} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Команда</label>
            <input id="edit_team" name="team" type="text" value={inputs.team} onChange={inputHandler} />
          </div>
          <div className="col-md-4 p-2">
            <input className="btn btn-outline-primary" type="submit" value="Добавить" />
          </div>
        </form>
      </main>
    </div>

  );
}
