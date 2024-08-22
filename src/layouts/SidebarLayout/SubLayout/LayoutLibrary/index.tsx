


import CloseIcon from '@mui/icons-material/Close';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import { Alert, Drawer, Hidden, IconButton, Snackbar, useTheme } from '@mui/material';
import { AxiosProgressEvent } from 'axios';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { ReactNode, forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import MenuItems from './MenuItems';
import SendFilePopup from './SendFilePopup';
import { BodyWrapper, ChildrenWrapper, LayoutLibraryGrid, LayoutLibraryWrapper, LeftPanelWrapper } from './layout-library.styles';
import { AppContext } from '../../../../contexts/AppContext';
import { ISnackbarOption } from '../../../../models/ISnackbarOption';

interface SidebarLibraryProps {
  children?: ReactNode;
}

export interface SidebarLibraryRefProps {
    updateMenuLayout?: () => void;
}
  
const LayoutLibrary = forwardRef<any, SidebarLibraryProps>(({ children }) => {
    const router = useRouter();
    const theme = useTheme();
    
    const { isScreenMobile } = useContext(AppContext);

    
    const [ currentId, setCurrentId ] = useState<string>('');
    // const [ typeMenu, setTypeMenu ] = useState<E_TypeMenuFile>();

    const [ sendFileModalToggle, setSendFileModalToggle ] = useState<boolean>(false);
    // const [ userSendToOption, setUserSendToOption ] = useState<ISelectOption[]>([]);
    // const [ currentFile, setCurrentFile ] = useState<ISendFileForm>();
    const [ submitting, setSubmitting ] = useState(false);

    const [ isLoadingUser, setIsLoadingUser ] = useState(true);
    const [ sidebarToggle, setSidebarToggle ] = useState(false);

    const [ snackbarOption, setSnackbarOption ] = useState<ISnackbarOption>({
        open: false,
        type: 'success',
        messages: ''
    });

    // const debouncedLoadUserOption = useCallback(
    //     debounce((userName: string) => loadUserOption(userName), 500), []
    // );

    const handleCloseSnackbar = (): void => {
        setSnackbarOption({
            ...snackbarOption,
            open: false,
            messages: ''
        });
    };
    
    // useEffect(() => {
    //     const idQuery = router.query.id as string;
    //     setCurrentId(idQuery);

    //     const typeMenuData = getDataTypeMenu();
    //     setTypeMenu(typeMenuData);

    //     initValue();
    // }, [router.query.id]);
  
    // const initValue = (): void => {
    //     if (!communityGroup || communityGroup.length === 0 || !currentUserLoginData) {
    //         setIsLoading(true);
    //         Promise.all([
    //             GroupService.getAll(),
    //             UsersCommunityGroupService.getUserById()
    //         ])
    //             .then(([communityResult, currentUserResult]) => {
    //                 setCommunityGroup(communityResult.data);
    //                 setCurrentUserLoginData(currentUserResult.data);
    //             })
    //             .finally(() => {
    //                 setIsLoading(false);
    //             });
    //     }
    // };

    // const getDataTypeMenu = (): E_TypeMenuFile => {
    //     let result = E_TypeMenuFile.PriceList;
    //     switch (router.pathname) {
    //         case '/management/library/price-lists':
    //             result = E_TypeMenuFile.PriceList;
    //             break;
    //         case '/management/library/sbu-files':
    //             result = E_TypeMenuFile.SBUFile;
    //             break;
    //         case '/management/library/my-practice':
    //             result = E_TypeMenuFile.MyPractice;
    //             break;
    //         case '/management/library/inbox':
    //             result = E_TypeMenuFile.InBox;
    //             break;
    //         case '/management/library/sent-files':
    //             result = E_TypeMenuFile.SentFiles;
    //             break;
    //         case '/management/library/bookmarked':
    //             result = E_TypeMenuFile.Bookmarked;
    //             break;
    //         case '/management/library/community/[id]':
    //             result = E_TypeMenuFile.GroupCommunity;
    //             break;
    //         case '/management/library/search-all':
    //             result = E_TypeMenuFile.SearchAll;
    //             break;
    //     }
    //     return result;
    // };
    
    // const redirectTo = ( path: string, typeMenu?: E_TypeMenuFile): void => {
    //     setTypeMenu(typeMenu);
    //     setSidebarToggle(false);
    //     router.push(path);
    // };



    const toggleSidebar = (): void => {
        setSidebarToggle(!sidebarToggle);
    };

    const handleClose = (): void => {
        setSendFileModalToggle(false);
    };




    return (
        <>
            <LayoutLibraryWrapper>
                {/* <Hidden mdUp>
                    <FloatButton 
                        onClick={(): void => toggleSidebar()}
                        right="25px"
                        shape="circular"
                        variant="contained"
                        color="secondary">
                        <ViewCompactIcon></ViewCompactIcon> 
                    </FloatButton>
                </Hidden> */}
                
                <LayoutLibraryGrid container spacing={2}>
                    <Hidden mdDown>
                        <LeftPanelWrapper item>
                            {/* <MenuItems 
                                currentUserLoginData={currentUserLoginData}
                                currentMenuId={currentId}
                                typeMenu={typeMenu}
                                communityGroup={communityGroup}
                                redirectTo={redirectTo}
                                openSendFileModal={openSendFileModal}>
                            </MenuItems> */}
                        </LeftPanelWrapper>
                    </Hidden>
                    
                    <BodyWrapper item>
                        <ChildrenWrapper>{children}</ChildrenWrapper>
                    </BodyWrapper>
                
                </LayoutLibraryGrid>
            </LayoutLibraryWrapper>
          

            {/* <Hidden mdUp>
                <Drawer
                    sx={{
                        boxShadow: `${theme.sidebar.boxShadow}`,
                    }}
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={sidebarToggle}
                    onClose={toggleSidebar}
                    variant="temporary"
                    elevation={9}
                >
                    <MenuItems 
                        currentUserLoginData={currentUserLoginData}
                        currentMenuId={currentId}
                        typeMenu={typeMenu}
                        communityGroup={communityGroup}
                        redirectTo={redirectTo}
                        openSendFileModal={openSendFileModal}>
                    </MenuItems>
                </Drawer>
            </Hidden> */}

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={snackbarOption?.timeHidden || 2000}
                open={snackbarOption.open}
                security={snackbarOption.type}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    variant="filled"
                    sx={{ width: '100%' }}
                    severity={snackbarOption.type}
                    onClose={handleCloseSnackbar}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            style={{ color: '#fff' }}
                            onClick={handleCloseSnackbar}
                        >
                            <CloseIcon/>
                        </IconButton>
                    }
                >
                    {snackbarOption.messages}
                </Alert>
            </Snackbar>
        </>
    );
});

LayoutLibrary.propTypes = {
    children: PropTypes.node
};

export default LayoutLibrary;