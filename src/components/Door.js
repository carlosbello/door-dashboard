import React from 'react';

export default function Door({isOpen = false}) {
    return <div>{isOpen ? 'abierta' : 'cerrada'}</div>
}
