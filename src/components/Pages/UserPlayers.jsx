/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import PlayerCard from '../ui/PlayerCard';

export default function UserPlayers({ userPlayers, user, findInput }) {
  const [myCards, setMycards] = useState(userPlayers || []);

  useEffect(() => {
    fetch('/api/v1/myplayers')
      .then((res) => res.json())
      .then((data) => setMycards(data));
  }, []);

  const deleteHandler = async (id) => {
    const response = await fetch(`api/v1/players/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setMycards((prev) => (prev.filter((el) => el.id !== id)));
    }
  };

  console.log('Мои Футболисты ,Проверка в UserPlayers.jsx', myCards);
  return (
    <div className="row d-flex">

      {myCards && myCards.filter((el) => (findInput ? el.name.includes(findInput) : true)).map((el) => (
        <PlayerCard
          user={user}
          deleteHandler={deleteHandler}
          onePlayer={el}
          key={el.id}
        />
      ))}

    </div>
  );
}
