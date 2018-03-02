import React from 'react';
import IconButton from 'material-ui/IconButton';
import NotificationSync from 'material-ui/svg-icons/notification/sync';
import NotificationSyncDisabled from 'material-ui/svg-icons/notification/sync-disabled';
import ActionPlayForWork from 'material-ui/svg-icons/action/play-for-work';

const SyncButton = ({autoUpdate = false, onClick, isLoading = false, color}) => (
    <IconButton onClick={onClick}>
        {autoUpdate
            ? (isLoading ? <ActionPlayForWork color={color} /> : <NotificationSync  color={color} />)
            : <NotificationSyncDisabled  color={color} />}
    </IconButton>
);

export default SyncButton;
