import React, { Fragment, useEffect } from 'react'
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

 const User = ({user, loading, getUser, getUserRepos, repos, match}) => {

    useEffect(() => {
            getUser(match.params.login);
            getUserRepos(match.params.login);
    }, []);

        const {
            name,
            avatar_url,
            location,
            company,
            bio,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable,
            website,
            created_at
            } = user;

        if(loading) return <Spinner />

        return (
            <Fragment>
                <Link to="/" className='btn btn-light'>
                    Back to Search
                </Link>
                hireable:{''}
                {hireable ? ( <i className='fas fa-check text-success' /> ) : ( <i className='fas fa-check text-danger'/> 
                )}
                <div className="card grid-2">
                    <div className="all-center">
                        <img 
                            src={avatar_url}
                            className="round-img"
                            alt=""
                            style={{width:'150px'}}
                        />
                    </div>
                    <h1>{name}</h1>
                    <p>Location:{location}</p>
                </div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>    
                    )}
                    <a href={html_url} className="btn btn-dark my-1">
                        Visit Github Profile
                    </a>
                    <ul className="userData">
                        <li>
                            {login && (
                                <Fragment>
                                    <strong>Username:</strong>{login}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {company && (
                                <Fragment>
                                    <strong>company:</strong>{company}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {website && (
                                <Fragment>
                                    <strong>website:</strong>{website}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {created_at && (
                                <Fragment>
                                    <strong>Created account:</strong>
                                     <Moment format="YYYY/MM/DD">
                                        {created_at}
                                     </Moment>
                                </Fragment>
                            )}
                        </li>
                    </ul>
                    <div className="text-center">
                        <div className="badge badge-primary"> Followers: {followers}</div>
                        <div className="badge badge-primary"> Following: {following}</div>
                        <div className="badge badge-primary"> Public Repos: {public_repos}</div>
                        <div className="badge badge-primary"> Public Gists: {public_gists}</div>
                    </div>
                    <Repos repos={repos} />
            </Fragment>
        )
}

User.propTypes = {
    loading: PropTypes.bool,
    user:PropTypes.object.isRequired,
    getUser:PropTypes.func.isRequired,
    getUserRepos:PropTypes.func.isRequired
};


export default User
