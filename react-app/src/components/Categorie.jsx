import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import categories from './CategoriesList';


function Categorie (props){
    

    return (
        <div className='cat-container'>
            <div>
                <span className='pr-5'>All Book Categories</span>
                { categories && categories.length >0 &&
                    categories.map((item,index)=>{
                        return(
                            <span onClick={()=> props.handleCategory && props.handleCategory(item)} key ={index} className='category'> {item} </span>
                        )
                    })}
           </div>



            
        </div>
    )
        
    
}

export default Categorie;