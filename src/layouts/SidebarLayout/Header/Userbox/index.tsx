import {
    Avatar,
    Badge,
} from '@mui/material';
import { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react';


import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import KeyIcon from '@mui/icons-material/Key';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { CircularProgress } from "@mui/material";
import {
    ButtonAction,
    ButtonActions,
    IconButtonNotification, IconButtonWrapper,
    MenuUserBox,
    PopoverUser,
} from './user-box.styles';

interface HeaderUserBoxProps {
    amountNotification: number;
    isHandlingSeeMoreInbox: boolean;

    showConfirmChangeTabDialog: boolean;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    onSubmitChangePassword: (password: string) => Promise<void>;
    redirectToInboxPage: () => void;
}

const HeaderUserBox: FC<HeaderUserBoxProps> = ({
    amountNotification,
}) => {
    // const { handleLogout } = useCommonAuth();

    // const { currentUser } = useContext(AppContext);

    const ref = useRef<any>(null);
    const refNotification = useRef<any>(null);
    const refInboxNotification = useRef<any>(null);

    const [isOpen, setOpen] = useState<boolean>(false);
    // const [userProfile, setUserProfile] = useState<ProfileUser>();
    const [isOpenNotification, setOpenNotification] = useState<boolean>(false);
    const [isOpenInboxNotification, setOpenInboxNotification] = useState<boolean>(false);
    const [isHandlingReadAllNotification, setIsHandlingReadAllNotification] = useState<boolean>(false);

    // useEffect(() => {
    //     setUserProfile(new ProfileUser({
    //         id:  currentUser?.id,
    //         email: currentUser?.email,
    //         name: currentUser?.name,
    //         shortName: currentUser?.shortName,
    //         avatarFile: currentUser?.avatar,
    //         jobTitle: currentUser?.jobTitle,
    //         sbuName: currentUser?.sbu?.name,
    //     }));
    // }, [currentUser]);


    // useEffect(() => {
    //     if (openChangeProfile) {
    //         UsersCommunityGroupService.getUserById().then((res) => {
    //             if(res.data){
    //                 setUserProfile(new ProfileUser({
    //                     id:  currentUser?.id,
    //                     email: res.data?.email,
    //                     name: res.data?.name,
    //                     shortName: res.data?.shortName,
    //                     avatarFile: res.data?.avatarFile,
    //                     jobTitle: res.data?.jobTitle,
    //                     sbuName: res.data?.sbuNames,
    //                 }));
    //             }
    //         });
    //     }
    // }, [openChangeProfile]);

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const handleOpenNotification = (): void => {
        setOpenNotification(true);
    };




    // const onLogout = (): void => {
    //     handleLogout(LOGOUT_ROUTER);
    // };

    // const openDialogChangePassword = (): void => {
    //     setOpenChangePassword(true);
    //     setOpen(false);
    // };

    // const openDialogChangeProfile = (): void => {
    //     setOpenChangeProfile(true);
    //     setOpen(false);
    // };








    // const getLinkAvatar = (currentUser?: CurrentUser): string => {
    //     if (!currentUser) {
    //         return '';
    //     }
    //     return getFinalLinkResource(currentUser.avatar?.folderLocation, currentUser.avatar?.id);
    // };

    return (
        <>

            <IconButtonNotification 
                color="primary" 
                ref={refNotification} 
                onClick={handleOpenNotification} 
                size="large">
                <Badge 
                    badgeContent={amountNotification} 
                    color="error" 
                    overlap="circular"
                    sx={{
                        transform: 'translate(26px, -10px)'
                    }}
                />
                <NotificationsNoneOutlinedIcon />
            </IconButtonNotification>
            
            <IconButtonWrapper color="primary" ref={ref} onClick={handleOpen}>
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
                    {/* <Avatar
                        variant="rounded"
                        alt={getLinkAvatar(currentUser)}
                        src={getLinkAvatar(currentUser)}/>
                    <UserBoxText>
                        <UserBoxLabel variant="body1">{currentUser?.name}</UserBoxLabel>
                    </UserBoxText> */}
                </MenuUserBox>
                
                <ButtonActions>
                    <ButtonAction fullWidth >
                        <KeyIcon sx={{ mr: 1 }} />
                        Change password
                    </ButtonAction>
                    <ButtonAction fullWidth >
                        <AssignmentIndIcon sx={{ mr: 1 }} />
                        Change profile
                    </ButtonAction>
                    <ButtonAction fullWidth >
                        <LockOpenTwoToneIcon sx={{ mr: 1 }} />
                        Sign out
                    </ButtonAction>
                </ButtonActions>
            </PopoverUser>
            

        </>
    );
};

export default HeaderUserBox;
