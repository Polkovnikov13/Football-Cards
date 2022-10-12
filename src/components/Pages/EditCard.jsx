import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditCard({ player }) {
  const { id } = useParams();

  const navigate = useNavigate();

  const [editPlayer, setEditPlayer] = useState(player || null);

  const [form, setForm] = useState({
    name: editPlayer?.name || '',
    surname: editPlayer?.surname || '',
    photo: editPlayer?.photo || '',
    team: editPlayer?.team || '',
    age: editPlayer?.age || '',
  });

  useEffect(() => {
    if (!window.initState) {
      fetch(`/api/v1/players/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    } else {
      delete window.initState;
    }
  }, []);

  const changeHandler = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`/api/v1/players/${id}/edit`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(() => {
        navigate('/players');
      })
      .catch(console.log);
  };
  return (
    <div className="col-md-8">
      <h1>Редактировать игрока</h1>
      <main className="form-wrapper">
        <form className="row" onSubmit={submitHandler}>
          <div className="col-md-3">
            <label className="form-label">Имя</label>
            <input id="edit_name" name="name" type="text" value={form.name} onChange={changeHandler} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Фамилия</label>
            <input id="edit_surname" name="surname" type="text" value={form.surname} onChange={changeHandler} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Возраст</label>
            <input id="edit_age" name="age" type="number" value={form.age} onChange={changeHandler} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Фотография</label>
            <input id="edit_photo" name="photo" type="text" value={form.photo} onChange={changeHandler} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Команда</label>
            <input id="edit_team" name="team" type="text" value={form.team} onChange={changeHandler} />
          </div>
          <div className="col-md-4 p-2">
            <input className="btn btn-outline-primary" type="submit" value="Обновить" />
          </div>
        </form>
      </main>
    </div>

  );
}
