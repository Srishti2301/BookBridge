import { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate ,Link } from 'react-router-dom';
import axios from 'axios';
function Home(){

    const navigate = useNavigate()
    const [books,setbooks] = useState([]);
    const [search,setsearch] = useState([]);

    // useEffect(()=>{
    //     if(!localStorage.getItem('token')){
    //         navigate('/login')
    //     }

    // },[])
    useEffect(()=>{
        const url = 'http://localhost:4000/get-books'
            axios.get(url)
            .then((res)=>{
                console.log(res)
                if(res.data.books){
                    setbooks(res.data.books);

                }
            })
            .catch((err)=>{
                console.log(err)
                alert('Server Err')

            })

    },[])
    const handlesearch =(value)=>{
        setsearch(value);
    }
    const handleClick=()=>{
        console.log('clicked')

    }
    return(
        <div>
            <Header search={search} handlesearch={handlesearch }handleClick ={handleClick}/>
            {!!localStorage.getItem('token') && <Link to="/add-books">ADD BOOKS</Link>}
            
            <div className='d-flex justify-content-center flex-wrap'>
            {books && books.length >0 &&
              books.map((item,index)=>{
                return(
                    <div className='card m-3'>
                        <img width="300px" height="200px" src={'http://localhost:4000/' + item.bimage}/>
                        <p className='m-2'>{item.bname} | {item.category}</p>
                        <h3 className='m-2 text-danger'>{item.price}</h3>
                        <p className='m-2 text-success'>{item.bdesc}</p>
                        
                        
                        

                    </div>
              )
              })}
              </div>
        </div>
    )
}

export default Home;