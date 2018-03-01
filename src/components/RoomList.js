import React from 'react';
import Room from './Room';

export default function RoomList({rooms = []}) {
    return (
        <div>
            {rooms.map(({name, doors, isOpen}, idx) =>
                <Room key={idx} name={name} doors={doors} isOpen={isOpen}/>)
            }
        </div>
    )

}