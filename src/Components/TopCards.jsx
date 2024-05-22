import React from 'react';
import Card from './Card';

const TopCards = ({totalBooks, totalAuthors}) => {
    return (
        <div className='topCards'> 
            <Card value = {totalBooks} name='Total Books'  color='grey'/>
            <Card value = {totalAuthors} name='Total Authors'  color='grey'/>
        </div>
    );
};

export default TopCards;