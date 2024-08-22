import { Autocomplete, Box, Button, Grid, styled } from "@mui/material";

export const AddImageSource = styled(Box)(
    ({ theme }) => `
        width: 100%;
        margin-bottom: ${theme.spacing(1)};
    `
);

export const AddImageButton = styled(Button)(
    ({  }) => `
        padding: 0px;
        
        &:hover {
            background-color: rgb(85 105 255 / 0%);
        }
    `
);

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export const AutocompleteCustom = styled(Autocomplete)(
    ({theme}) => `
        width: 100%;

        ${theme.breakpoints.down('md')} {
            width: 100%;
        }
`);

export const InputFileWrapper = styled(Grid)(
    ({ }) => `
       margin-bottom: 15px;

       .message-label {
            margin-top: 10px;
       }
    `
);

export const ListFileSelected = styled(Grid)(
    ({ }) => `
       margin-bottom: 15px;
    `
);
