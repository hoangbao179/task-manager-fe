import { Button, Typography, styled } from "@mui/material";

export const LabelWrapper = styled('span')(
    ({ theme }) => `
      background-color: ${theme.colors.alpha.black[5]};
      padding: ${theme.spacing(0.5, 1)};
      font-size: ${theme.typography.pxToRem(13)};
      border-radius: ${theme.general.borderRadius};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      max-height: ${theme.spacing(3)};
      
      &.MuiLabel {
        &-primary {
          background-color: ${theme.colors.primary.lighter};
          color: ${theme.palette.primary.main}
        }

        &-black {
          background-color: ${theme.colors.alpha.black[100]};
          color: ${theme.colors.alpha.white[100]};
        }
        
        &-secondary {
          background-color: ${theme.colors.secondary.lighter};
          color: ${theme.palette.secondary.main}
        }
        
        &-success {
          background-color: ${theme.colors.success.lighter};
          color: ${theme.palette.success.main}
        }
        
        &-warning {
          background-color: ${theme.colors.warning.lighter};
          color: ${theme.palette.warning.main}
        }
              
        &-error {
          background-color: ${theme.colors.error.lighter};
          color: ${theme.palette.error.main}
        }
        
        &-info {
          background-color: ${theme.colors.info.lighter};
          color: ${theme.palette.info.main}
        }
      }
`
);

export const LabelInputFile = styled('label')(
    ({ }) => `
        padding: 0;
        font-size: 13px;
        display: inline-block;
    `
);

export const CustomButtonSCROMWrapper = styled('label')(
    ({ }) => `
        display: flex;
        align-items: center;
    `
);

export const CustomButtonSCROM = styled(Button)<{component: string}>(
    ({ }) => `
        padding: 9px 10px;
        min-width: 40px;

        &:hover {
            background-color: rgba(85, 105, 255, 0);
        }

        .MuiButton-startIcon {
            margin-left: 0px;
            margin-right: 0px;
        }
    `
);

export const LabelAddImage = styled('span')(
    ({ theme }) => `
        padding: 0;
        font-size: 13px;
        color: ${theme.colors.primary.main};
        font-weight: bold;
        cursor: pointer;
        display: inline-block;

        &:hover {
            background-color: rgba(85, 105, 255, 0);
        }
    `
);

export const NoItemLabel = styled(Typography)<{isSmall?: boolean}>(
    ({ isSmall }) => `
        padding: 0;
        font-size: ${isSmall ? '13' : '17'}px;
        text-align: center;
        color: #b3b3b3;
        font-weight: bold;
        margin-top: ${isSmall ? '0' : '5'}px;
        font-weight: 600;
        letter-spacing: 0.6px;
    `
);