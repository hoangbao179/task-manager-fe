
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import {
    Box,
    Divider,
    Hidden,
    IconButton,
    Stack,
    alpha,
    lighten,
    styled,
    useTheme
} from '@mui/material';
import { HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import HeaderUserBox from './Userbox';
import { MSG_ERROR_COMMON } from '../../../constants/common';
import { SidebarContext } from '../../../contexts/SidebarContext';
import { ISnackbarOption } from '../../../models/ISnackbarOption';


const HeaderWrapper = styled(Box)(
    ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, '15px')};
        right: 0;
        background-color: ${theme.header.background};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        z-index: 1000;
`
);

const ButtonMenu = styled(IconButton)(
    ({  }) => `
        color: #fff;
        padding: 0;
        flex-basis: 70px;
    `
);

interface HeaderProps {
    isHandlingSeeMore: boolean; 
    isHandlingSeeMoreInbox: boolean; 
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    setSnackbarOption: Dispatch<SetStateAction<ISnackbarOption>>;
    redirectToInboxPage: () => void;
}

const Header: FC<HeaderProps> = ({ 
    isHandlingSeeMoreInbox,
    setIsSubmitting, 
    redirectToInboxPage
}) : JSX.Element => {
    const theme = useTheme();
    const router = useRouter();
    
    // const { handleLogin } = useCommonAuth();
    const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

    const [ openChangePassword, setOpenChangePassword ] = useState(false);
    const [ openChangeProfile, setOpenChangeProfile ] = useState(false);

    const [showConfirmChangeTabDialog, setShowConfirmChangeTabDialog] = useState(false);

    
    // const onSubmitChangePassword = async (password: string): Promise<void> => {
    //     if (password) {
    //         setIsSubmitting(true);

    //         const passwordForm: PasswordForm = {
    //             password: password
    //         };

    //         await UserService.changePasswordUser(currentUser?.id, passwordForm)
    //             .then((result) => {
    //                 if (HttpStatusCode.Ok === result.statusCode) {
    //                     setOpenChangePassword(false);
    //                     handleLogin();
    //                 }
    //                 else {
    //                     setSnackbarOption({
    //                         open: true,
    //                         type: 'error',
    //                         messages: result.message,
    //                         timeHidden: 3000,
    //                     });
    //                 }
    //             })
    //             .catch((_) => {
    //                 setSnackbarOption({
    //                     open: true,
    //                     type: 'error',
    //                     messages: MSG_ERROR_COMMON
    //                 });
    //             })
    //             .finally(() => {
    //                 setTimeout(() => {
    //                     setIsSubmitting(false);
    //                 }, 500);
    //             });
    //     }
    // };

    // const onSubmitChangeProfile = async (data: IProfileUserForm): Promise<void> => {
    //     if (data) {
    //         setIsSubmitting(true);
    //         await UserService.changeUserProfile(data)
    //             .then((result) => {
    //                 setCurrentUser({
    //                     ...currentUser,
    //                     name: result?.data?.name,
    //                     shortName: result?.data?.shortName,
    //                     avatar: new Avatar(result?.data?.avatarFile),
    //                     jobTitle: result?.data?.jobTitle
    //                 });

    //                 if (HttpStatusCode.Ok === result.statusCode) {
    //                     if (showConfirmChangeTabDialog) {
    //                         setShowConfirmChangeTabDialog(false);
    //                         setValueTab(valueTabTemp);
    //                     } 
    //                     else {
    //                         setOpenChangeProfile(false);
    //                         router.reload();
    //                     }
    //                 }
    //                 else {
    //                     setSnackbarOption({
    //                         open: true,
    //                         type: 'error',
    //                         messages: result.message,
    //                         timeHidden: 3000,
    //                     });
    //                 }
    //             })
    //             .catch((_) => {
    //                 setSnackbarOption({
    //                     open: true,
    //                     type: 'error',
    //                     messages: MSG_ERROR_COMMON
    //                 });
    //             })
    //             .finally(() => {
    //                 setTimeout(() => {setIsSubmitting(false);}, 500);
    //             });
    //     }
    // };

    return (
        <HeaderWrapper
            display="flex"
            alignItems="center"
            sx={{
                boxShadow:
                theme.palette.mode === 'dark'
                    ? `0 1px 0 ${alpha(
                        lighten(theme.colors.primary.main, 0.7),
                        0.15
                    )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
                    : `0px 2px 8px -3px ${alpha(
                        theme.colors.alpha.black[100],
                        0.2
                    )}, 0px 5px 22px -4px ${alpha(
                        theme.colors.alpha.black[100],
                        0.1
                    )}`
            }}
        >

            <Hidden mdUp>
                <Box component="span">
                    <ButtonMenu
                        color="primary"
                        onClick={toggleSidebar}
                    >
                        {
                            !sidebarToggle ? 
                                (
                                    <MenuTwoToneIcon fontSize="small" />
                                ) : 
                                (
                                    <CloseTwoToneIcon fontSize="small" />
                                )
                        }
                    </ButtonMenu>
                </Box>
            </Hidden>

            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                alignItems="center"
                spacing={2}
            >
    
            </Stack>

            <Box display="flex" alignItems="center">
                <HeaderUserBox 
                    redirectToInboxPage={redirectToInboxPage}
                    showConfirmChangeTabDialog={showConfirmChangeTabDialog}
                    isHandlingSeeMoreInbox={isHandlingSeeMoreInbox} amountNotification={0} setIsSubmitting={function (value: SetStateAction<boolean>): void {
                        throw new Error('Function not implemented.');
                    } } onSubmitChangePassword={function (password: string): Promise<void> {
                        throw new Error('Function not implemented.');
                    } }                    
                    
                    />
            </Box>

        </HeaderWrapper>
    );
};

export default Header;
