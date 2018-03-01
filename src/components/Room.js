import React from 'react';
import Door from './Door';

export default function Room({name, doors = [], isOpen = false}) {
    return (
        <div>
            <p>{name}</p>
            {isOpen
                ? doors.map(({isOpen = false}, idx) => <Door key={idx} isOpen={isOpen} />)
                : "En mantenimiento"
            }
        </div>
    );
}
