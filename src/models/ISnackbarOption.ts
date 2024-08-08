export interface ISnackbarOption {
    open: boolean,
    type: 'success' | 'info' | 'warning' | 'error',
    messages: string,
    timeHidden?: number;
}