import { alpha, Badge, IconButton, Tooltip } from '@mui/material';
import { useRef } from 'react';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { styled } from '@mui/material/styles';

const NotificationsBadge = styled(Badge)(
    ({ theme }) => `

    .MuiBadge-badge {
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
       
    }
`
);

const IconButtonWrapper = styled(IconButton)(
    () => `
    .BaseBadge-root {
        color: #fff;
    }
`
);

function HeaderMails(): JSX.Element {
    const ref = useRef<any>(null);
    return (
        <>
            <Tooltip arrow title="Notifications">
                <IconButtonWrapper color="primary" ref={ref}>
                    <NotificationsBadge
                        color="error"
                        badgeContent={1}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                    >
                        <MailOutlineOutlinedIcon />
                    </NotificationsBadge>
                </IconButtonWrapper>
            </Tooltip>
        </>
    );
}

export default HeaderMails;
