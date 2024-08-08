import { Button, styled } from "@mui/material";

export const OkButtonDialog = styled(Button)<{isFull?: boolean}>(({isFull}) => ({
    backgroundColor: '#3d1a52',
    borderColor: '#3d1a52',
    width: isFull ? '100% !important' : "92px",
    '&:hover': {
        backgroundColor: '#4a2062',
        borderColor: '#4a2062',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#4a2062',
        borderColor: '#4a2062',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
}));

export const DeleteButtonDialog = styled(Button)({
    backgroundColor: '#3d1a5200',
    borderColor: '#3d1a52',
    color: '#f11515',
    width: "92px",

    '&:hover': {
        backgroundColor: '#3d1a5200',
        borderColor: '#fd5252',
        boxShadow: 'none',
        color: '#f76060',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#3d1a5200',
        borderColor: '#4a2062',
    },
    '&:focus': {
        boxShadow: '0 0 0 0rem rgba(0,123,255,.5)',
    },
});

export const CancelButtonDialog = styled(Button)({
    color: '#3d1a52',
    backgroundColor: 'rgb(255, 255, 255)',
    borderColor: '#3d1a52',
    '&:hover': {
        borderColor: '#4a2062',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        borderColor: '#4a2062',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});
