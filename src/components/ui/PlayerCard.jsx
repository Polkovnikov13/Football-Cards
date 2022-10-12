import React from 'react';
import { Link } from 'react-router-dom';

export default function PlayerCard({ onePlayer, deleteHandler, user }) {
  return (
    <div className="col-3 d-flex p-2">
      <div className="card">
        <img src={onePlayer?.photo} className="card-img-top" alt={`${onePlayer?.surname}`} />
        <div className="card-body">
          <h5 className="card-title-bottom text-truncate">
            {' '}
            {onePlayer?.name}
            {' '}
            {onePlayer?.surname}
          </h5>
          <p className="card-text">{onePlayer?.team}</p>
          <p className="card-text">{`Age: ${onePlayer?.age} years`}</p>
          <p className="card-text"><small className="text-muted">{`Игрок добавлен: ${new Date(onePlayer?.updatedAt).toLocaleString()}`}</small></p>
          <p className="card-text">
            <small className="text-muted">{`Likes: "${onePlayer.likes}"`}</small>
            👍
          </p>
        </div>

        {user && user.id === onePlayer.user_id
            && (
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <Link className="nav-link" to={`/players/${onePlayer?.id}/edit`}>Редактировать</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-danger" type="button" onClick={() => deleteHandler(onePlayer.id)}>Удалить</a>
              </li>
            </ul>
            )}
      </div>
    </div>
    // <div>
    //   <div className="card mb-3">
    //     <div className="row g-0">
    //       <div className="col-md-4">
    //         <img src={onePlayer?.photo} className="img-fluid rounded-start" alt={`${onePlayer?.surname}`} />
    //       </div>
    //       <div className="col-md-8">
    //         <div className="card-body">
    //           <p className="card-text"><small className="text-muted">{`Likes: "${onePlayer.likes}"`}</small></p>
    //           <h5 className="card-title">
    //             {onePlayer?.name}
    //             {'  '}
    //             {onePlayer?.surname}
    //           </h5>
    //           <p className="card-text">{onePlayer?.team}</p>
    //           {/* <p className="card-text">{`Производитель: ${ }`}</p> */}
    //           <p className="card-text">{`Age: ${onePlayer?.age} years`}</p>
    //           <p className="card-text"><small className="text-muted">{`Player updated: ${new Date(onePlayer?.updatedAt).toLocaleString()}`}</small></p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {/* <ul className="nav justify-content-center">
    //     <li className="nav-item">
    //       <Link className="nav-link" to={`/products/${onePlayer?.id}/edit`}>Редактировать</Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link text-danger" to="#" onClick={() => deleteHandler(onePlayer.id)}>Удалить</Link>
    //     </li>
    //   </ul> */}
    // </div>
  );
}
