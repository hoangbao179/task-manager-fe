import { Grid, styled } from "@mui/material";

export const ItemDetailWrapper = styled(Grid)<{isRichText?: boolean}>(
    ({isRichText}) => `
        display:  ${isRichText ? 'block' : 'flex'};
        align-items: center;
        padding: ${isRichText ? '10px 0px' : '15px 0px 0px 18px'};
        border-top: ${isRichText ? '1px solid #ededed' : '0px'};
    `
);

export const LabelDetail = styled('strong')(
    ({}) => `
        display: flex;
        align-items: center;
        min-width: 40px;
        align-self: start;
    `
);
