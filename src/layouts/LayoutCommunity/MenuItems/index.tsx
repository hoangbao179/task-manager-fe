import FeedIcon from '@mui/icons-material/Feed';
import { Box, Grid } from '@mui/material';
import { FC} from 'react';
import { CommunityGroupModel } from '@/models/Post/CommunityGroup.model';
import { AvatarWrapper, BoxCommunity, BoxIconWrapper, GridWrapperCommunity, TypographyCommunity, TypographyCommunityH4, TypographyCommunityH5 } from './menu-item.styles';
import { FollowUser } from '@/models/Community/Follow/FollowUser.model';
import LazyImage from '@/components/LazyImage';
import { E_TypeMenuCommunities } from '@/enums/E_TypeMenuCommunities';
import { UserDetail } from '@/models/Management/Users/IUserDetail';
import GroupIcon from '@mui/icons-material/Group';

interface MenuItemProps {
    currentMenuId?: string;
    currentUserData: UserDetail
    typeMenu: E_TypeMenuCommunities;
    communityGroup: CommunityGroupModel[];
    userFollow: FollowUser[];
    communityGroupId?: string;
    redirectTo: (
        url: string, 
        typeMenu?: E_TypeMenuCommunities, 
        userSelected?: FollowUser, 
        communityGroup?: CommunityGroupModel
    ) => void;
}

const MenuItems: FC<MenuItemProps> = ({ currentMenuId, currentUserData, typeMenu, communityGroup, userFollow, communityGroupId, redirectTo }) => {
 
    return (
        <>
            <GridWrapperCommunity>
                <Grid item mb={2}>
                    <TypographyCommunity>
                        Communities
                    </TypographyCommunity>
                </Grid>
                
                <Grid item mb={3}>
                    <TypographyCommunityH4>
                        Feed
                    </TypographyCommunityH4>
                    <BoxCommunity 
                        isActive={ communityGroupId == null ? typeMenu === E_TypeMenuCommunities.MyFeed : false}
                        onClick={(): void => redirectTo(`/community`, E_TypeMenuCommunities.MyFeed )}>
                        <BoxIconWrapper>
                            <FeedIcon></FeedIcon>
                        </BoxIconWrapper>
                        <Box>
                            <TypographyCommunityH5>
                                My Feed
                            </TypographyCommunityH5>
                        </Box>
                    </BoxCommunity>
                    <BoxCommunity 
                        isActive={ communityGroupId == null ? typeMenu === E_TypeMenuCommunities.MyPosts : false }
                        onClick={(): void => redirectTo(`/community/my-posts`, E_TypeMenuCommunities.MyPosts)}>
                        <BoxIconWrapper>
                            <LazyImage
                                src={currentUserData?.avatarFile?.avatarOwnerInternalFile}
                                sizeLoading="small"
                                width={24}
                                height={24}
                                borderRadius='5px'>
                            </LazyImage>
                        </BoxIconWrapper>
                        <Box>
                            <TypographyCommunityH5>
                                My Posts
                            </TypographyCommunityH5>
                        </Box>
                    </BoxCommunity>
                </Grid>

                <Grid item mb={3}>
                    <TypographyCommunityH4>
                        My Communities
                    </TypographyCommunityH4>
                    {
                        communityGroup?.map((item, index) => ( 
                            <BoxCommunity 
                                isActive={ communityGroupId === item.id }
                                key={index} 
                                onClick={(): void => redirectTo(`/community/groups/${item.id}`, E_TypeMenuCommunities.MyCommunities, undefined, item)}
                            >
                                <AvatarWrapper>
                                    {
                                        item?.avatarFile ? 
                                            <LazyImage 
                                                src={item?.avatarFile}
                                                sizeLoading="small"
                                                width={28}
                                                height={28}
                                                borderRadius="5px">
                                            </LazyImage> : 
                                            <GroupIcon></GroupIcon>
                                    }
                                </AvatarWrapper>
                                <Box>
                                    <TypographyCommunityH5>
                                        {item.groupName}
                                    </TypographyCommunityH5>
                                </Box>
                            </BoxCommunity>
                        ))
                    }
                </Grid>
               
                <Grid item mb={3}>
                    <TypographyCommunityH4>
                        Following 
                    </TypographyCommunityH4>
                    {
                        userFollow?.map((item, index) => ( 
                            <BoxCommunity 
                                isActive={ item.id === currentMenuId }
                                key={index} 
                                onClick={(): void => redirectTo(`/community/posts-user/${item.id}`, E_TypeMenuCommunities.MyFollowing, item)}
                            >
                                <AvatarWrapper>
                                    <LazyImage
                                        src={item?.avatar.avatarOwnerInternalFile}
                                        sizeLoading="small"
                                        width={28}
                                        height={28}
                                        borderRadius='5px'>
                                    </LazyImage>
                                </AvatarWrapper>
                                <Box>
                                    <TypographyCommunityH5>
                                        {item.name} 
                                    </TypographyCommunityH5>
                                </Box>
                            </BoxCommunity>
                        ))
                    }
                </Grid>
            </GridWrapperCommunity>
        </>
    );
};

export default MenuItems;
