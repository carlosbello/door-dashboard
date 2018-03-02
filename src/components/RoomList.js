import React from 'react';
import Room from './Room';

const RoomList = ({rooms = []}) => (
    <div>
        {rooms.map(({name, doors, isOpen}, idx) =>
            <Room key={idx} name={name} doors={doors} isOpen={isOpen}/>)
        }
    </div>
);

export default RoomList;
