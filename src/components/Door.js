import React from 'react';
import {IconWcBusy, IconWcFree} from './Icon';
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
        leftAvatar={isOpen ? <IconWcFree style={styles.mediumSize}/> : <IconWcBusy style={styles.mediumSize}/>}
    >
        {isOpen ? "Available" : "Busy"}
    </ListItem>
);

export default Door;
