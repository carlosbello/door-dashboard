import React from 'react';
import {IconWcBussy, IconWcFree} from './Icon';
import ListItem from 'material-ui/List/ListItem';

const styles = {
    mediumSize: {
        height: 48,
        width: 48,
    }
};

const Door = ({isOpen = false}) => (
    <ListItem
        disabled={true}
        leftAvatar={isOpen ? <IconWcFree style={styles.mediumSize}/> : <IconWcBussy style={styles.mediumSize}/>}
    >
        {isOpen ? "Available" : "Bussy"}
    </ListItem>
);

export default Door;
