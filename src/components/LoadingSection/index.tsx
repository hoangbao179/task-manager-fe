import { Backdrop, CircularProgress, Stack } from "@mui/material";
import { FC } from "react";

interface IIsLoadingProps {
    isLoading: boolean;
    isShowBackdrop?: boolean;
    isInSection?: boolean;
    size?: number | string;
    pt?: number | string;
    pb?: number | string;
    left?: boolean
}

const LoadingSectionComponent: FC<IIsLoadingProps> = ({ isLoading, isShowBackdrop, isInSection, size = 40, pt = '20px', pb, left }): JSX.Element => {
    if (isLoading) {
        return (
            isShowBackdrop ?
                <Backdrop
                    sx={{
                        position: isInSection ? 'absolute' : 'fixed',
                        color: '#fff',
                        backgroundColor: 'rgb(0 7 52 / 50%)!important',
                        zIndex: () => 999999
                    }}
                    open={true}>
                    <Stack direction="row" justifyContent="center" pt={pt}>
                        <CircularProgress color="inherit" />
                    </Stack>
                </Backdrop>
                :
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={left ? 'left' : 'center'}
                    pt={pt}
                    pb={pb}
                    height="100%">
                    <CircularProgress size={size} color="inherit" />
                </Stack>
        );
    }
    return <></>;
};

export default LoadingSectionComponent;