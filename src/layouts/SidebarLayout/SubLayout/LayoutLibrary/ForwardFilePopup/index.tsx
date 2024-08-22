import { CancelButtonDialog, OkButtonDialog } from "@/components/Button/Dialog/button-dialog.styles";
import { ISelectOption } from "@/models/ISelectOption";
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, AutocompleteChangeReason, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import MessageSystem from "@/components/MessageSystem";
import { IForwardFileForm, SentFilesTableModel } from "@/models/Management/Library/SentFiles/ISentFilesListTable";
import CheckIcon from "@mui/icons-material/Check";
import { AutocompleteCustom } from "./forward-file-popup.styles";

interface IForwardFilePopupProps {
    currentFile?: SentFilesTableModel
    userSendToOption?: ISelectOption[];
    open: boolean,
    submitting: boolean,
    isScreenMobile: boolean,
    isLoadingUser: boolean,
    onSubmit: (fileForm: IForwardFileForm) => Promise<void>
    onChangeInputUserSend: (event: any) => Promise<void>
    onOpenInputUserSend: (event: any) => Promise<void>
    handleClose: () => void,
}

const ForwardFilePopup: FC<IForwardFilePopupProps> = ({
    open,
    submitting,
    currentFile,
    userSendToOption,
    isScreenMobile,
    isLoadingUser,
    handleClose,
    onChangeInputUserSend,
    onOpenInputUserSend,
    onSubmit
}): JSX.Element => {

    const {
        handleSubmit, clearErrors,
        setValue, setError,
        formState: { errors }
    } = useForm<IForwardFileForm>({ mode: 'onChange' });

    const [selectedValueSend, setSelectedValueSends] = useState<ISelectOption[]>([]);
    const [tagSelected, setTagSelected] = useState<any[]>([]);

    useEffect(() => {
        if (open) {
            initFormValue();
        }
    }, [open]);

    const initFormValue = (): void => {
        setSelectedValueSends(userSendToOption.filter(option => currentFile.sentTos?.includes(option.value)));
        setTagSelected(currentFile.fileTags);
        setValue('fileId', currentFile?.id ? currentFile?.id : undefined);
        setValue('sendToUsers', currentFile?.sentTos ? currentFile.sentTos : undefined);
        setValue('fileTags', currentFile?.fileTags ? currentFile?.fileTags : undefined);
        clearErrors(['fileId', 'sendToUsers', 'fileTags']);
    };

    const handleKeyDownTag = (event: any): void => {
        switch (event.key) {
            case ",":
            case " ": {
                event.preventDefault();
                event.stopPropagation();
                if (event.target.value.length > 0) {
                    const value = event.target.value;
                    updateValueTag([...tagSelected, value], value, 'createOption');
                    setTimeout(() => {
                        event.target.value = '';
                    }, 20);
                }
                break;
            }
            default:
        }
    };

    const updateValueTag = (values: string[], newValue: string, reason: AutocompleteChangeReason): void => {
        if (reason === 'createOption') {

            if (!tagSelected.some(x => x.trim() === newValue.trim()) && newValue.trim()) {
                setTagSelected(values);
                setValue('fileTags', values, { shouldDirty: true });
            }

        }
        else {
            setTagSelected(values);
            setValue('fileTags', values, { shouldDirty: true });
        }
    };

    const handleSelectChangeSend = (_event, values: ISelectOption[]): void => {
        const duplicateValues = values.filter((item, index, array) => {
            return array.findIndex(t => t.value === item.value) !== index;
        });

        const uniqueValues = values.filter((item) => {
            return !duplicateValues.map((t) => t.value).includes(item.value);
        });

        setSelectedValueSends(uniqueValues);

        const userSends = uniqueValues.map(u => u.value);
        setValue('sendToUsers', userSends, { shouldDirty: true });
        clearErrors(['sendToUsers']);
    };

    const onSubmitForm = (data: IForwardFileForm): void => {

        if (validate()) {
            const param: IForwardFileForm = {
                fileId: currentFile.fileId,
                sendToUsers: data.sendToUsers,
                fileTags: data.fileTags
            };
            onSubmit(param);
        }
    };

    const onClose = (_: object, reason: string): void => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return;
        }
        handleClose();
    };

    const handleSelectTags = (_event, values: string[]): void => {
        setTagSelected(values);
        setValue('fileTags', values, { shouldDirty: true });
    };

    const validate = (): boolean => {
        let result = true;
        if (!selectedValueSend || !selectedValueSend.length) {
            setError('sendToUsers', {
                type: 'required',
                message: 'Please chose user',
            });
            result = false;
        }
        else {
            clearErrors(['sendToUsers']);
        }

        return result;
    };

    return (
        <>
            <Dialog
                fullWidth={true}
                fullScreen={isScreenMobile}
                onClose={onClose}
                open={open}
                maxWidth="sm"
            >
                <DialogTitle>Forward File</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent>
                    <Grid item xs={12} sx={{ marginBottom: '1.5rem' }}>
                        <Typography variant="h6">
                            File: <b>{currentFile?.fileName}</b>
                        </Typography>
                    </Grid>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <AutocompleteCustom
                                    size='small'
                                    multiple
                                    disableCloseOnSelect
                                    options={userSendToOption}
                                    value={selectedValueSend}
                                    noOptionsText={isLoadingUser ? "Loading..." : "No result found"}
                                    getOptionLabel={(option: ISelectOption): any => option.label}
                                    onOpen={onOpenInputUserSend}
                                    onInputChange={onChangeInputUserSend}
                                    onChange={handleSelectChangeSend}
                                    renderInput={(params): any => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            placeholder="Select User Forward To"
                                            label="Forward to"
                                            error={!!errors.sendToUsers}
                                        />
                                    )}
                                    renderOption={(props, option: ISelectOption, { selected }): any => {
                                        const isOptionSelected = selectedValueSend.some((val) => val.value === option.value);

                                        return (
                                            <MenuItem
                                                {...props}
                                                key={option.value}
                                                value={option.value}
                                                selected={isOptionSelected}
                                                sx={{ justifyContent: "space-between" }}
                                            >
                                                {option.label}
                                                {(selected || isOptionSelected) && (
                                                    <CheckIcon color="info" />
                                                )}
                                            </MenuItem>
                                        );
                                    }}
                                />
                                <MessageSystem data={{ open: !!errors.sendToUsers, messages: errors.sendToUsers?.message, type: 'error' }}></MessageSystem>
                            </Grid>

                            <Grid item xs={12}>
                                <Autocomplete
                                    size='small'
                                    multiple
                                    freeSolo
                                    options={[]}
                                    getOptionLabel={(option: ISelectOption): any => option.label}
                                    disableCloseOnSelect
                                    value={tagSelected}
                                    onChange={handleSelectTags}
                                    renderTags={(value: readonly string[], getTagProps) =>
                                        value.map((option: string, index: number) => (
                                            <Chip key={1} variant="outlined" label={option} {...getTagProps({ index })} />
                                        ))
                                    }
                                    renderInput={(params): any => {
                                        params.inputProps.onKeyDown = handleKeyDownTag;
                                        return <TextField
                                            {...params}
                                            variant="outlined"
                                            placeholder="Select Tags / keywords"
                                            label="Tags / keywords"
                                        />;
                                    }}
                                />
                            </Grid>

                        </Grid>
                    </form>
                </DialogContent>

                <DialogActions>
                    <Grid
                        container
                        flexDirection="row"
                        justifyContent="center"
                        spacing={2}>

                        <Grid item>
                            <OkButtonDialog
                                onClick={handleSubmit(onSubmitForm)}
                                color="secondary"
                                variant="contained"
                                disabled={submitting}
                            >
                                OK
                            </OkButtonDialog>
                        </Grid>
                        <Grid item>
                            <CancelButtonDialog
                                onClick={handleClose}
                                variant="outlined"
                            >
                                Cancel
                            </CancelButtonDialog>
                        </Grid>

                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ForwardFilePopup;


