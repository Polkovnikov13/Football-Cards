import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddPlayers from './Pages/AddPlayers';
import AllPlayers from './Pages/AllPlayers';
import EditCard from './Pages/EditCard';
import LogIn from './Pages/LogIn';
import MainPage from './Pages/MainPage';
import SignUp from './Pages/SignUp';
import UserPlayers from './Pages/UserPlayers';
import Navbar from './ui/Navbar';

export default function App({
  allPlayers, player, sessionUser, userPlayers,
}) {
  const [user, setUser] = useState(sessionUser || {});

  const [findInput, setFindInput] = useState('');

  // чтобы не вылетал гость
  useEffect(() => {
    fetch('/api/v1/auth')
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} findInput={findInput} setFindInput={setFindInput} />
      <Routes>
        <Route path="/" element={<MainPage user={user} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/login" element={<LogIn setUser={setUser} />} />
        <Route path="/players" element={<AllPlayers user={user} setUser={setUser} allPlayers={allPlayers} findInput={findInput} />} />
        <Route path="/players/add" element={<AddPlayers />} />
        <Route path="/players/:id/edit" element={<EditCard player={player} />} />
        <Route path="/myplayers" element={<UserPlayers user={user} userPlayers={userPlayers} findInput={findInput} />} />
      </Routes>
    </>
  );
}
