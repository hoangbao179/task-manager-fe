import { Drawer, Hidden, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { ReactNode, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { BodyWrapper, ChildrenWrapper, LayoutCommunityGrid, LayoutCommunityWrapper, LeftPanelWrapper, RightPanelWrapper } from './layout-community.styles';
import GroupService from '@/services/Community/Groups/group.service';
import { CommunityGroupModel } from '@/models/Post/CommunityGroup.model';
import MenuItems from './MenuItems';
import { FloatButton } from '@/components/Button/Custom/button-cusstom.styles';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import FollowService from '@/services/Community/Follow/follow.service';
import { FollowUser } from '@/models/Community/Follow/FollowUser.model';
import { E_TypeMenuCommunities } from '@/enums/E_TypeMenuCommunities';
import { UserDetail } from '@/models/Management/Users/IUserDetail';
import UsersCommunityGroupService from '@/services/Community/UsersCommunityGroup/users-community-group.service';

interface SidebarCommunityProps {
  communityGroupId?: string;
  children?: ReactNode;
  rightPanel?: JSX.Element;
  onScroll?: (elementBody: HTMLDivElement) => void;
  getCurrentUser?: (currentUser: UserDetail) => void;
  getCurrentUserSelected?: (currentUser: UserDetail) => void;
  onChangeSelectedUserFollow?: (userFollow: FollowUser) => void;
  onChangeSelectedCommunityGroup?: (userFollow: CommunityGroupModel) => void;
}

export interface SidebarCommunityRefProps {
    updateUserFollow?: () => void;
}
  
const LayoutCommunity = forwardRef<any, SidebarCommunityProps>(({ 
    rightPanel, 
    children,
    communityGroupId,
    onScroll, 
    getCurrentUser,
    getCurrentUserSelected,
    onChangeSelectedUserFollow, 
    onChangeSelectedCommunityGroup
}, ref) => {
    const router = useRouter();
    const theme = useTheme();
    
    const [ currentUserLoginData, seCurrentUserLoginData ] = useState<UserDetail>();
    const [ communityGroup, setCommunityGroup ] = useState<CommunityGroupModel[]>([]);
    const [ lsUserFollow, setListUserFollow ] = useState<FollowUser[]>([]);
    const [ currentId, setCurrentId ] = useState<string>('');
    const [ typeMenu, setTypeMenu ] = useState<E_TypeMenuCommunities>(E_TypeMenuCommunities.MyFeed);
    const [ currentUserFollow , setCurrentUserFollow ] = useState<FollowUser | undefined>();
    const [ currentCommunityGroup , setCurrentCommunityGroup ] = useState<CommunityGroupModel | undefined>();
    const [ sidebarToggle, setSidebarToggle ] = useState(false);

    useImperativeHandle(ref, (): SidebarCommunityRefProps => ({

        updateUserFollow(): void {
            getUserFollow();
        },

    }));
      
    useEffect(() => {
        const idQuery = router.query.id as string;
        setCurrentId(idQuery);

        const typeMenuData = getDataTypeMenu();
        setTypeMenu(typeMenuData);

        const listRequest = [
            GroupService.getAll(),
            FollowService.getUserFollow(),
            UsersCommunityGroupService.getUserById()
        ];

        if (E_TypeMenuCommunities.MyFollowing) {
            listRequest.push(UsersCommunityGroupService.getUserById(idQuery));
        }
        
        Promise.all(listRequest).then(([group, lsUserFollow, currentUserLogin, currentUserSelected])  => {
            const groupData = group.data as CommunityGroupModel[];
            const lsUserFollowData = lsUserFollow.data as FollowUser[];
            const currentUserLoginData = currentUserLogin.data as UserDetail;
            const currentUserSelectedData = currentUserSelected.data as UserDetail;

            setCommunityGroup(groupData);
            setListUserFollow(lsUserFollowData);
            seCurrentUserLoginData(currentUserLoginData);

            if (onChangeSelectedUserFollow) {
                onChangeSelectedUserFollow(currentUserFollow || lsUserFollowData.find(x => x.id === idQuery));
            }
            
            if (onChangeSelectedCommunityGroup) {
                onChangeSelectedCommunityGroup(currentCommunityGroup || groupData.find(x => x.id === idQuery));
            }

            if (getCurrentUser) {
                getCurrentUser(currentUserLoginData);
            }

            if (getCurrentUserSelected) {
                getCurrentUserSelected(currentUserSelectedData);
            }
        });
        
    }, [router.query.id]);
  
    const getDataTypeMenu = (): E_TypeMenuCommunities => {
        let result = E_TypeMenuCommunities.MyFeed;
        switch (router.pathname) {
            case '/community/my-posts':
                result = E_TypeMenuCommunities.MyPosts;
                break;
            case '/community':
                result = E_TypeMenuCommunities.MyFeed;
                break;
            case '/community/groups/[id]':
                result = E_TypeMenuCommunities.MyCommunities;
                break;
            case '/community/post-detail/[id]':
                result = E_TypeMenuCommunities.PostDetail;
                break;
            case '/community/posts-user/[id]':
                result = E_TypeMenuCommunities.MyFollowing;
                break;
        }
        return result;
    };
    
    const redirectTo = (
        path: string, 
        typeMenu?: E_TypeMenuCommunities, 
        userSelected?: FollowUser, 
        communityGroup?: CommunityGroupModel
    ): void => {
        setCurrentUserFollow(userSelected);
        setCurrentCommunityGroup(communityGroup);
        setTypeMenu(typeMenu);
        setSidebarToggle(false);
        router.push(path);
    };

    const handleScroll = (event: any): void => {
        if (onScroll) {
            onScroll(event.currentTarget);
        }
    };
      
    const toggleSidebar= (): void => {
        setSidebarToggle(!sidebarToggle);
    };

    const getUserFollow = async (): Promise<void> => {
        await FollowService.getUserFollow().then(result => {
            setListUserFollow(result.data);
        });
    };

    return (
        <>
            <LayoutCommunityWrapper>
                <Hidden mdUp>
                    <FloatButton 
                        onClick={(): void => toggleSidebar()}
                        right="25px"
                        shape="circular"
                        variant="contained"
                        color="secondary">
                        <ViewCompactIcon></ViewCompactIcon> 
                    </FloatButton>
                </Hidden>

                <LayoutCommunityGrid container spacing={2} onScroll={handleScroll}>
                    <Hidden mdDown>
                        <LeftPanelWrapper item>
                            <MenuItems 
                                currentUserData={currentUserLoginData}
                                communityGroupId={communityGroupId}
                                currentMenuId={currentId}
                                typeMenu={typeMenu}
                                communityGroup={communityGroup}
                                userFollow={lsUserFollow}
                                redirectTo={redirectTo}>
                            </MenuItems>
                        </LeftPanelWrapper>
                    </Hidden>
                    
                    <BodyWrapper item>
                        <ChildrenWrapper>{children}</ChildrenWrapper>
                    </BodyWrapper>

                    <Hidden mdDown>
                        <RightPanelWrapper item>
                            {rightPanel}
                        </RightPanelWrapper>
                    </Hidden>
                </LayoutCommunityGrid>
            </LayoutCommunityWrapper>
        
            <Hidden mdUp>
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
                        currentUserData={currentUserLoginData}
                        communityGroupId={communityGroupId}
                        currentMenuId={currentId}
                        typeMenu={typeMenu}
                        communityGroup={communityGroup}
                        userFollow={lsUserFollow}
                        redirectTo={redirectTo}>
                    </MenuItems>
                </Drawer>
            </Hidden>
        </>
    );
});

LayoutCommunity.propTypes = {
    children: PropTypes.node
};

export default LayoutCommunity;
