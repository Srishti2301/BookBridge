import { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate ,Link } from 'react-router-dom';
import axios from 'axios';

function AddBook(){

    const navigate = useNavigate();

    const [bname,setbname] =useState('');
    const [bdesc,setbdesc] =useState('');
    const [price,setprice] =useState('');
    const [category,setcategory] =useState('');
    const [bimage,setbimage] =useState('');

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }

    },[])

    const handleApi =()=>{

        const formData = new FormData();
        formData.append('bname',bname)
        formData.append('bdesc',bdesc)
        formData.append('price',price)
        formData.append('category',category)
        formData.append('bimage',bimage)

        const url ='http://localhost:4000/add-books'
        axios.post(url,formData)
        .then((res)=>{
            console.log(res)
            if(res.data.message){
                alert(res.data.message);
                navigate('/')
            }

        })
        .catch((err)=>{
            console.log(err)
        })


            
    }
    return(
        <div>
            <Header/>
            <div className='p-3'>
                <h2>ADD BOOKS HERE :</h2>
                <label> Book Name </label>
                <input className="form-control" type ="text" value={bname}
                 onChange={(e)=>{setbname(e.target.value)}}/>
                <label> Book Description </label>
                <input className="form-control" type ="text" value={bdesc}
                 onChange={(e)=>{setbdesc(e.target.value)}}/>
                <label> Book Price </label>
                <input className="form-control" type ="text"value={price}
                 onChange={(e)=>{setprice(e.target.value)}}/>
                <label> Book Category </label>
                <select className="form-control" value={category}
                 onChange={(e)=>{setcategory(e.target.value)}}>
                    <option>SELECT BOARD </option>
                    <option>SSC</option>
                    <option>HSC</option>
                    <option>CBSE</option>
                </select>
                <label> Book Images </label>
                <input className="form-control" type ="file" files={bimage}
                    onChange={(e)=>{
                        const file = e.target.files[0];
                        setbimage(file);
                     }}/>
                <button onClick={handleApi} className='btn btn-primary mt-3'>SUBMIT</button>
            </div>
        </div>
    )
}

export default AddBook;