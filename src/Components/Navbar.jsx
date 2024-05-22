import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [edit, setEdit] = useState(true)
    return (
        
            
            <nav className='navi'>
                <Link to='/' className={edit?"selected":"navItem"} onClick={()=>{setEdit(true)}}>Books</Link>
                <Link to='/authors' className={!edit?"selected":"navItem"} onClick={()=>{setEdit(false)}}>Authors</Link>
            </nav>
        
    );
};

export default Navbar;