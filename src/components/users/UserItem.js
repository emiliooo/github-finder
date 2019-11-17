import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = ({user:{login,avatar_url}}) => {
    return (
        <div className="card">
            <img src={avatar_url} alt="" className='round-img' style={{width:'60px',margin:'0 auto'}}/>
            <h3>{login}</h3>
            <div>
                <Link className="btn btn-dark btn-sm my-1" to={`/user/${login}`}> more </Link>
            </div>
        </div>
    )
}

UserItem.propTypes = {
    user:PropTypes.object.isRequired
}

export default UserItem
