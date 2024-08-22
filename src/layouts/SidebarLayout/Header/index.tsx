import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import {
    Box,
    Divider,
    IconButton,
    Stack,
    alpha,
    lighten,
    styled,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import HeaderUserBox from './Userbox';
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
    ({ }) => `
        color: #fff;
        padding: 0;
        flex-basis: 70px;
    `
);

interface HeaderProps {
    setSnackbarOption: Dispatch<SetStateAction<ISnackbarOption>>
}

const Header: FC<HeaderProps> = ({ }): JSX.Element => {
    const theme = useTheme();
    const isScreenMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
    const [showConfirmChangeTabDialog, setShowConfirmChangeTabDialog] = useState(false);

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

            {isScreenMobile && (
                <Box component="span">
                    <ButtonMenu
                        color="primary"
                        onClick={toggleSidebar}
                    >
                        {!sidebarToggle ? (
                            <MenuTwoToneIcon fontSize="small" />
                        ) : (
                            <CloseTwoToneIcon fontSize="small" />
                        )}
                    </ButtonMenu>
                </Box>
            )}

            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                alignItems="center"
                spacing={2}
            />

            <Box display="flex" alignItems="center">
                <HeaderUserBox
                    showConfirmChangeTabDialog={showConfirmChangeTabDialog}
                />
            </Box>

        </HeaderWrapper>
    );
};

export default Header;
