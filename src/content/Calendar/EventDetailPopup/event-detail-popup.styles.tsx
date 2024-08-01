import { Grid, styled } from "@mui/material";

export const ItemDetailWrapper = styled(Grid)<{isRichText?: boolean}>(
  ({ isRichText }) => `
    display: ${isRichText ? "block" : "flex"};
    align-items: center;
    border-top: ${isRichText ? "1px solid #ededed" : "0px"};
`
);

export const LabelDetail = styled("strong")(
  () => `
    display: flex;
    align-items: center;
    min-width: 40px;
    align-self: start;
`
);

export const LabelDescriptionDetail = styled("strong")(
    () => `
      display: flex;
      align-items: center;
      min-width: 40px;
      align-self: start;
      margin-top: 1rem;
  `
  );
  

export const ItemDetailDescriptionWrapper = styled(Grid)<{isRichText?: boolean}>(
    ({ isRichText }) => `
      display: ${isRichText ? "block" : "flex"};
      align-items: center;
      border-top: ${isRichText ? "1px solid #ededed" : "0px"};
      margin-top: 1rem;
  `
  );
  
