import { AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { CommunityGroupModel } from '@/models/Post/CommunityGroup.model';
import { AvatarWrapper, BoxMenuItem, BoxIconWrapper, GridWrapperMenuItem, TypographyMenu, TypographyMenuH4, TypographyMenuH5, ButtonSendFile, AccordionWrapper } from './menu-item.styles';
import { FollowUser } from '@/models/Community/Follow/FollowUser.model';
import LazyImage from '@/components/LazyImage';
import GroupIcon from '@mui/icons-material/Group';
import FolderIcon from '@mui/icons-material/Folder';
import TelegramIcon from '@mui/icons-material/Telegram';
import { E_TypeMenuFile } from '@/enums/E_TypeMenuFile';
import { UserDetail } from '@/models/Management/Users/IUserDetail';
import { LibraryLayoutContext } from '@/contexts/LibraryContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoadingSectionComponent from '@/components/LoadingSection';
import { isExistRoles } from '@/util/helpers/helper';
import { E_ROLES } from '@/enums/E_RoleUser';

interface MenuItemProps {
    typeMenu: E_TypeMenuFile;
    communityGroup: CommunityGroupModel[];
    currentMenuId?: string;
    currentUserLoginData: UserDetail
    redirectTo: (
        url: string,
        typeMenu?: E_TypeMenuFile,
        userSelected?: FollowUser,
        communityGroup?: CommunityGroupModel
    ) => void;
    openSendFileModal: () => void;
}

const MenuItems: FC<MenuItemProps> = ({ typeMenu, communityGroup, currentMenuId, currentUserLoginData, redirectTo, openSendFileModal }) => {
    
    const { isExpandCommunity, setIsExpandCommunity } = useContext(LibraryLayoutContext);
  
    return (
        <>
            <GridWrapperMenuItem>
                <Grid item mb={1}>
                    <TypographyMenu>
                        Files
                    </TypographyMenu>
                    <ButtonSendFile
                        color='secondary'
                        startIcon={<TelegramIcon />}
                        onClick={openSendFileModal}
                        variant="contained">
                        <Typography>Send File</Typography>
                    </ButtonSendFile>
                </Grid>
               
                <AccordionWrapper defaultExpanded disabled>
                    <AccordionSummary
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <TypographyMenuH4>
                            File Lists
                        </TypographyMenuH4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <BoxMenuItem
                            isActive={typeMenu === E_TypeMenuFile.PriceList}
                            onClick={(): void => redirectTo(`/management/library/price-lists`, E_TypeMenuFile.PriceList)}>
                            <BoxIconWrapper>
                                {
                                    typeMenu === E_TypeMenuFile.PriceList ?
                                        <LazyImage
                                            src={'/static/images/icons/folder-open.svg'}
                                            sizeLoading="small"
                                            width={28}
                                            height={28}
                                            borderRadius="5px">
                                        </LazyImage> :
                                        <FolderIcon></FolderIcon>
                                }
                            </BoxIconWrapper>
                            <Box>
                                <TypographyMenuH5>
                                    Price Lists
                                </TypographyMenuH5>
                            </Box>
                        </BoxMenuItem>

                        {
                            currentUserLoginData?.sbus && currentUserLoginData?.sbus.length > 0 || isExistRoles([E_ROLES.Admin], currentUserLoginData?.listRoleShortName) ? <>
                                <BoxMenuItem
                                    isActive={typeMenu === E_TypeMenuFile.SBUFile}
                                    onClick={(): void => redirectTo(`/management/library/sbu-files?`, E_TypeMenuFile.SBUFile)}>
                                    <BoxIconWrapper>
                                        {
                                            typeMenu === E_TypeMenuFile.SBUFile ?
                                                <LazyImage
                                                    src={'/static/images/icons/folder-open.svg'}
                                                    sizeLoading="small"
                                                    width={28}
                                                    height={28}
                                                    borderRadius="5px">
                                                </LazyImage> :
                                                <FolderIcon></FolderIcon>
                                        }
                                    </BoxIconWrapper>
                                    <Box>
                                        <TypographyMenuH5>
                                            SBU Files
                                        </TypographyMenuH5>
                                    </Box>
                                </BoxMenuItem> </> : <></>

                        }

                        <LoadingSectionComponent 
                            isLoading={ currentUserLoginData?.sbus === undefined} 
                            isShowBackdrop={false}
                            size={20}
                            left={true}
                            pt="10px"
                            pb="10px"
                        >
                        </LoadingSectionComponent>

                        <BoxMenuItem
                            isActive={typeMenu === E_TypeMenuFile.MyPractice}
                            onClick={(): void => redirectTo(`/management/library/my-practice?`, E_TypeMenuFile.MyPractice)}>
                            <BoxIconWrapper>
                                {
                                    typeMenu === E_TypeMenuFile.MyPractice ?
                                        <LazyImage
                                            src={'/static/images/icons/folder-open.svg'}
                                            sizeLoading="small"
                                            width={28}
                                            height={28}
                                            borderRadius="5px">
                                        </LazyImage> :
                                        <FolderIcon></FolderIcon>
                                }
                            </BoxIconWrapper>
                            <Box>
                                <TypographyMenuH5>
                                    {
                                        isExistRoles([E_ROLES.Admin, E_ROLES.SBUAdmin], currentUserLoginData?.listRoleShortName) ? 'View by Practice' : 'My Practice'
                                    }
                                </TypographyMenuH5>
                            </Box>
                        </BoxMenuItem> 

                        <BoxMenuItem
                            isActive={typeMenu === E_TypeMenuFile.SearchAll}
                            onClick={(): void => redirectTo(`/management/library/search-all`, E_TypeMenuFile.SearchAll)}>
                            <BoxIconWrapper>
                                {
                                    typeMenu === E_TypeMenuFile.SearchAll ?
                                        <LazyImage
                                            src={'/static/images/icons/folder-open.svg'}
                                            sizeLoading="small"
                                            width={28}
                                            height={28}
                                            borderRadius="5px">
                                        </LazyImage> :
                                        <FolderIcon></FolderIcon>
                                }
                            </BoxIconWrapper>
                            <Box>
                                <TypographyMenuH5>
                                    Search All Files
                                </TypographyMenuH5>
                            </Box>
                        </BoxMenuItem>
                       
                    </AccordionDetails>
                </AccordionWrapper>

                <AccordionWrapper defaultExpanded disabled>
                    <AccordionSummary
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <TypographyMenuH4>
                            My Files
                        </TypographyMenuH4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <BoxMenuItem
                            isActive={typeMenu === E_TypeMenuFile.InBox}
                            onClick={(): void => redirectTo(`/management/library/inbox`, E_TypeMenuFile.InBox)}>
                            <BoxIconWrapper>
                                {
                                    typeMenu === E_TypeMenuFile.InBox ?
                                        <LazyImage
                                            src={'/static/images/icons/folder-open.svg'}
                                            sizeLoading="small"
                                            width={28}
                                            height={28}
                                            borderRadius="5px">
                                        </LazyImage> :
                                        <FolderIcon></FolderIcon>
                                }
                            </BoxIconWrapper>
                            <Box>
                                <TypographyMenuH5>
                                    Inbox
                                </TypographyMenuH5>
                            </Box>
                        </BoxMenuItem>
                        <BoxMenuItem
                            isActive={typeMenu === E_TypeMenuFile.SentFiles}
                            onClick={(): void => redirectTo(`/management/library/sent-files`, E_TypeMenuFile.SentFiles)}>
                            <BoxIconWrapper>
                                {
                                    typeMenu === E_TypeMenuFile.SentFiles ?
                                        <LazyImage
                                            src={'/static/images/icons/folder-open.svg'}
                                            sizeLoading="small"
                                            width={28}
                                            height={28}
                                            borderRadius="5px">
                                        </LazyImage> :
                                        <FolderIcon></FolderIcon>
                                }
                            </BoxIconWrapper>
                            <Box>
                                <TypographyMenuH5>
                                            Sent Files
                                </TypographyMenuH5>
                            </Box>
                        </BoxMenuItem>
                        <BoxMenuItem
                            isActive={typeMenu === E_TypeMenuFile.Bookmarked}
                            onClick={(): void => redirectTo(`/management/library/bookmarked`, E_TypeMenuFile.Bookmarked)}>
                            <BoxIconWrapper>
                                {
                                    typeMenu === E_TypeMenuFile.Bookmarked ?
                                        <LazyImage
                                            src={'/static/images/icons/folder-open.svg'}
                                            sizeLoading="small"
                                            width={28}
                                            height={28}
                                            borderRadius="5px">
                                        </LazyImage> :
                                        <FolderIcon></FolderIcon>
                                }
                            </BoxIconWrapper>
                            <Box>
                                <TypographyMenuH5>
                                            Bookmarked
                                </TypographyMenuH5>
                            </Box>
                        </BoxMenuItem>
                    </AccordionDetails>
                </AccordionWrapper>
                { 
                    communityGroup?.length ? <>
                        <AccordionWrapper 
                            expanded={isExpandCommunity}
                            onChange={() => {
                                setIsExpandCommunity(!isExpandCommunity);
                            }} 
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                <TypographyMenuH4>
                                    Community Files
                                </TypographyMenuH4>
                            </AccordionSummary>
                            <AccordionDetails>
                                {
                                    communityGroup?.map((item, index) => (
                                        <BoxMenuItem
                                            isActive={typeMenu === E_TypeMenuFile.GroupCommunity && currentMenuId === item.id}
                                            key={index}
                                            onClick={(): void => redirectTo(`/management/library/community/${item.id}`, E_TypeMenuFile.GroupCommunity, undefined, item)}
                                        >
                                            <AvatarWrapper>
                                                {
                                                    item?.avatarFile ?
                                                        <LazyImage
                                                            src={item?.avatarFile}
                                                            sizeLoading="small"
                                                            width={24}
                                                            height={24}
                                                            borderRadius="5px">
                                                        </LazyImage> :
                                                        <GroupIcon></GroupIcon>
                                                }
                                            </AvatarWrapper>
                                            <Box>
                                                <TypographyMenuH5>
                                                    {item.groupName}
                                                </TypographyMenuH5>
                                            </Box>
                                        </BoxMenuItem>
                                    ))
                                }
                            </AccordionDetails>
                        </AccordionWrapper></> : <></>
                }

            </GridWrapperMenuItem>
        </>
    );
};

export default MenuItems;
