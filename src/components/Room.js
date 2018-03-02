import React from 'react';
import Door from './Door';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import ActionLockOutline from 'material-ui/svg-icons/action/lock-outline';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';
import List from 'material-ui/List/List';
import {blue500, red500} from 'material-ui/styles/colors'

const styles = {
    mediumSize: {
        height: 48,
        width: 48,
    }
};

const Room = ({name, doors = [], isOpen = false}) => (
    <Card>
        <CardHeader
            title={name}
            subtitle={isOpen ? "Open" : "In maintenance"}
            avatar={
                isOpen
                    ? <ActionLockOpen color={blue500} style={styles.mediumSize} />
                    : <ActionLockOutline color={red500} style={styles.mediumSize} />}
        />
        {isOpen && (
            <CardActions>
                <List>
                    {doors.map(({isOpen = false}, idx) => <Door key={idx} isOpen={isOpen} />)}
                </List>
            </CardActions>
        )}
    </Card>
);

export default Room;
