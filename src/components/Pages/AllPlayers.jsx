/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import PlayerCard from '../ui/PlayerCard';

export default function AllPlayers({
  allPlayers, setUser, user, findInput,
}) {
  const [players, setPlayers] = useState(allPlayers || null);
  console.log(players);
  useEffect(() => {
    if (!window.initState) {
      fetch('/api/v1/players')
        .then((res) => res.json())
        .then((data) => setPlayers(data));
    } else {
      delete window.initState;
    }
  }, []);

  const deleteHandler = async (id) => {
    const response = await fetch(`api/v1/players/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setPlayers((prev) => (prev.filter((el) => el.id !== id)));
    }
  };

  return (
    <div className="row d-flex">

      {players && players.filter((el) => (findInput ? el.name.includes(findInput) : true)).map((el) => (
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
