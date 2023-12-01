import React from 'react';
import './ListItem.scss';
import arrow from './../../assets/icons/greater-than.png';

type ListItemProps = {
    desc : string;
    url : string;
};

const ListItem = (props : ListItemProps) => {
  return (
    <div className='listItem'>
        <img src={props.url} alt="" className='icon'/>
        <div>{props.desc}</div>
        <img src={arrow} alt="" className='arrow'/>
    </div>
  );
};

export default ListItem;
