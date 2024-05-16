import { useEffect } from 'react';
import Header from './Header';
import { useNavigate ,Link } from 'react-router-dom';

function Home(){

    const navigate = useNavigate()

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }

    },[])
    return(
        <div>
            <Header/>
            <Link to="/add-books">ADD BOOKS</Link>
        </div>
    )
}

export default Home;