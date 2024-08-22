import { Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { FC, ReactNode, useContext, useEffect, useState } from 'react';

import {
    Alert,
    IconButton,
    Snackbar
} from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

import CloseIcon from '@mui/icons-material/Close';
import { HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import SubLayout from './SubLayout';
import { ISnackbarOption } from '../../models/ISnackbarOption';
import LoadingSectionComponent from '../../components/LoadingSection';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ children }) => {
    const theme = useTheme();
    const router = useRouter();
    



    const [ isSubmitting, setIsSubmitting] = useState<boolean>();
    const [ isHandlingSeeMore, setIsHandlingSeeMore] = useState<boolean>();
    const [ isHandlingSeeMoreInbox, setIsHandlingSeeMoreInbox] = useState<boolean>();
    const [ snackbarOption, setSnackbarOption ] = useState<ISnackbarOption>({
        open: false,
        type: 'success',
        messages: '',
    });


    useEffect(() => {
        setDataTypeSubLayout();
    }, [router.query.id]);









    const handleCloseSnackbar = (): void => {
        setSnackbarOption({
            ...snackbarOption,
            open: false,
            messages: ''
        });
    };



    const onShowNavigateInBox = (id?: string): void => {
        const param = id !== undefined ? '?id='+id : '';
        router.push(`/management/library/inbox${param}`);
    };



    const redirectToInboxPage = (): void => {
        onShowNavigateInBox();
    };

    const getLayoutBody = (): JSX.Element => {

        return <Box display="block" paddingX={{xs: '15px', md:3}} width="100%">{children}</Box>;
    };

    return (
        <>
            <Header
                isHandlingSeeMore={isHandlingSeeMore}
                setIsSubmitting={setIsSubmitting}
                setSnackbarOption={setSnackbarOption}
                redirectToInboxPage={redirectToInboxPage} 
                isHandlingSeeMoreInbox={false}            />
            <Sidebar />
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flex: 1,
                    pt: `${theme.header.height}`,
                    minHeight: `100vh`,
                    [theme.breakpoints.up('md')]: {
                        ml: `${theme.sidebar.width}`
                    }
                }}
            >
                {
                    getLayoutBody()
                }
            </Box>

            <LoadingSectionComponent 
                isLoading={isSubmitting} 
                isShowBackdrop={true}>
            </LoadingSectionComponent>

            <Snackbar
                open={snackbarOption.open}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={snackbarOption?.timeHidden || 2000}
                security={snackbarOption.type}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    variant="filled"
                    severity={snackbarOption.type}
                    sx={{ width: '100%' }}
                    onClose={handleCloseSnackbar}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            style={{ color: '#fff' }}
                            onClick={handleCloseSnackbar}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                >
                    {snackbarOption.messages}
                </Alert>
            </Snackbar>
        </>
    );
};
    

SidebarLayout.propTypes = {
    children: PropTypes.node
};

export default SidebarLayout;
function setDataTypeSubLayout() {
    throw new Error('Function not implemented.');
}

