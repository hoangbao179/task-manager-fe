import { Box } from '@mui/material';
import HeaderNotifications from './Notifications';
import HeaderMails from './Mails';

function HeaderButtons(): JSX.Element {
    return (
        <Box sx={{ mr: 1 }}>
            <Box sx={{ mx: 0.5 }} component="span">
                <HeaderNotifications />
            </Box>
            <Box sx={{ mx: 0.5 }} component="span">
                <HeaderMails/>
            </Box>
        </Box>
    );
}

export default HeaderButtons;
