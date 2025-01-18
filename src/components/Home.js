import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchCharacters = async () => {
            const response = await axios.get('https://rickandmortyapi.com/api/character');
            setCharacters(response.data.results);
        };
        fetchCharacters();
    }, []);

    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
    const currentItems = filteredCharacters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search characters..." 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <table>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Species</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(character => (
                        <tr key={character.id}>
                            <td><img src={character.image} alt={character.name} width="50" /></td>
                            <td><Link to={`/profile/${character.id}`}>{character.name}</Link></td>
                            <td>{character.species}</td>
                            <td>{character.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
        </div>
    );
};

export default Home;
