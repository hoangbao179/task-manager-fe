import { FC, useContext, useRef, useState } from 'react';
import KeyIcon from '@mui/icons-material/Key';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import {
    ButtonAction,
    ButtonActions,
    IconButtonWrapper,
    MenuUserBox,
    PopoverUser,
} from './user-box.styles';
import LoginDialog from '../../../../components/Dialog/LoginDialog';
import SignUpDialog from '../../../../components/Dialog/SignUpDialog';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Typography } from '@mui/material';
import { ButtonGroupLoginWrapper, ButtonGroupWrapper } from '../../../../content/Calendar/PageHeader/page-header.style';
import PersonIcon from '@mui/icons-material/Person';
import { AppContext } from '../../../../contexts/AppContext';
interface HeaderUserBoxProps {
    showConfirmChangeTabDialog: boolean;
}

const HeaderUserBox: FC<HeaderUserBoxProps> = ({
}) => {
    // const { handleLogout } = useCommonAuth();
    const { currentUser } = useContext(AppContext);
    const ref = useRef<any>(null);
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
    const [isSignUpDialogOpen, setSignUpDialogOpen] = useState(false);
    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };
    // const onLogout = (): void => {
    //     handleLogout(LOGOUT_ROUTER);
    // };

    const handleOpenSignUp = () => {
        setSignUpDialogOpen(true);
        setLoginDialogOpen(false);
    };

    const handleOpenLogin = () => {
        setLoginDialogOpen(true);
        setSignUpDialogOpen(false);
    };

    return (
        <>
            {
                <>
                    <ButtonGroupLoginWrapper variant="outlined">
                        <Button
                            onClick={() => handleOpenLogin()}
                            color='secondary'
                            startIcon={<AccountCircleIcon />}
                            variant="contained"
                        >
                            <Typography>Login</Typography>
                        </Button>
                    </ButtonGroupLoginWrapper>
                    <IconButtonWrapper color="primary" ref={ref} onClick={handleOpen} style={currentUser ?   {  display: "none"   } : {display: 'flex'} } >
                        <PersonIcon />
                    </IconButtonWrapper>
                    <PopoverUser
                        key='user-box'
                        anchorEl={ref.current}
                        onClose={handleClose}
                        open={isOpen}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                    >
                        <MenuUserBox>
                        </MenuUserBox>
                        <ButtonActions>
                            <ButtonAction fullWidth >
                                <KeyIcon sx={{ mr: 1 }} />
                                Change password
                            </ButtonAction>
                            <ButtonAction fullWidth >
                                <LockOpenTwoToneIcon sx={{ mr: 1 }} />
                                Sign out
                            </ButtonAction>
                        </ButtonActions>
                    </PopoverUser>
                </>
            }

            <LoginDialog
                open={isLoginDialogOpen}
                onClose={() => setLoginDialogOpen(false)}
                onSwitchToSignUp={handleOpenSignUp}
            />

            <SignUpDialog
                open={isSignUpDialogOpen}
                onClose={() => setSignUpDialogOpen(false)}
                onSwitchToLogin={handleOpenLogin}
            />
        </>
    );
};

export default HeaderUserBox;
