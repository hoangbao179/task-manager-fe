import { useContext} from 'react';
import { useRouter } from 'next/router';

import {
    List,
    Button,
    ListItem
} from '@mui/material';
import NextLink from 'next/link';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuWrapper, SubMenuWrapper } from './expand-menu.styles';
import Scrollbar from '../../../../components/Scrollbar';
import { SidebarContext } from '../../../../contexts/SidebarContext';

function ExpandMenu(): JSX.Element {
    const { closeSidebar, toggleExpandSidebar } = useContext(SidebarContext);
    // const { user} = useAuth0();
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <MenuWrapper>
            <Scrollbar>
                <List component="div">
                    <SubMenuWrapper>
                        <List component="div">
                            {/* <ListItem component="div" >
                                <Button
                                    disableRipple
                                    onClick={(): void => toggleExpandSidebar()}
                                    startIcon={<MenuIcon />}
                                >
                                </Button>
                            </ListItem>
                            {
                                isExistRoles([E_ROLES.Admin, E_ROLES.MemberStaff], user?._roles) && (
                                    <ListItem  component="div" >
                                        <NextLink href="/dashboard/goals" passHref>
                                            <Button
                                                className={currentRoute === '/dashboard/goals' ? 'active' : ''}
                                                disableRipple
                                                onClick={closeSidebar}
                                                startIcon={<DesignServicesTwoToneIcon />}
                                            >
                                            </Button>
                                        </NextLink>
                                    </ListItem>
                                )
                            }
                            {
                                isExistRoles([E_ROLES.Admin], user?._roles) &&  (
                                    <ListItem  component="div" >
                                        <NextLink href="/management/users" passHref>
                                            <Button
                                                className={
                                                    currentRoute === '/management/users'
                                                        ? 'active'
                                                        : ''
                                                }
                                                disableRipple
                                                onClick={closeSidebar}
                                                startIcon={<PersonOutlineOutlinedIcon />}
                                            >
                                            </Button>
                                        </NextLink>
                                    </ListItem>
                                ) 
                            } */}
                        </List>
                    </SubMenuWrapper>
                </List>
            </Scrollbar>
        </MenuWrapper>
    );
}

export default ExpandMenu;
