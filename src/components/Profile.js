import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Profile = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
            setCharacter(response.data);
        };
        fetchCharacter();
    }, [id]);

    if (!character) return <div>Loading...</div>;

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>{character.name}</h1>
            <img src={character.image} alt={character.name} />
            <p>Species: {character.species}</p>
            <p>Status: {character.status}</p>
            <Link to="/">Back</Link>
        </div>
    );
};

export default Profile;
