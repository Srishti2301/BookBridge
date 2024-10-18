import { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate ,Link } from 'react-router-dom';
import axios from 'axios';
import Categorie from './Categorie';

function Home(){

    const navigate = useNavigate()
    const [books,setbooks] = useState([]);
    const [cbooks,setcbooks] = useState([]);
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
        console.log('books',books);
        let filteredBooks= books.filter((item)=>{
            if(item.bname.toLowerCase().includes(search.toLowerCase()) || item.bdesc.toLowerCase().includes(search.toLowerCase())|| item.category.toLowerCase
            ().includes(search.toLowerCase())){
                return item;
            }
            
        })
        setcbooks(filteredBooks)

    }

    const handleCategory =(value) => {
        let filteredBooks= books.filter((item,index)=>{
            console.log(value, item ,"v")
            if(item.category == value){
                return item;
            }
            
        })
        setcbooks(filteredBooks)

    }
    return(
        <div>
            <Header search={search} handlesearch={handlesearch }handleClick ={handleClick}/>
            <Categorie handleCategory={handleCategory}/>
            {!!localStorage.getItem('token') && <Link to="/add-books">ADD BOOKS</Link>}
            <h5> SEARCH RESULTS </h5>
            <div className='d-flex justify-content-center flex-wrap'>
                {cbooks && books.length >0 &&
                 cbooks.map((item,index)=>{
                    return(
                        <div key={item._id} className='card m-3'>
                            <img width="300px" height="200px" src={'http://localhost:4000/' + item.bimage}/>
                            <p className='m-2'>{item.bname} | {item.category}</p>
                            <h3 className='m-2 text-danger'>{item.price}</h3>
                            <p className='m-2 text-success'>{item.bdesc}</p>
                            
                            
                            

                        </div>
                )
                })}
              </div>
            <h5> ALL RESULTS </h5>
            <div className='d-flex justify-content-center flex-wrap'>
                {books && books.length >0 &&
                books.map((item,index)=>{
                    return(
                        <div key={item._id} className='card m-3'>
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