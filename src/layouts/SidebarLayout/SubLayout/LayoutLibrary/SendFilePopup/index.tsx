import { CancelButtonDialog, OkButtonDialog } from "@/components/Button/Dialog/button-dialog.styles";
import { ISelectOption } from "@/models/ISelectOption";
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Stack, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AutocompleteCustom, InputFileWrapper, ListFileSelected } from "./send-file-popup.styles";
import CheckIcon from "@mui/icons-material/Check";
import { ISendFileForm } from "@/models/Management/Library/SendFileForm.model";
import InputFile from "@/components/Input/InputFile";
import MessageSystem from "@/components/MessageSystem";
import { FileModel } from "@/models/File";
import ShowInfoFile from "@/components/ShowInfoFile";
import { getFileTypeFormFileInput, isFileAccepted } from "@/util/helpers/helper";
import { ACCEPTED_TYPES_FILE_OF_POST, ACCEPTED_TYPES_IMAGE_OF_POST } from "@/constants/common";
const crypto = require('crypto');

interface ISendFilePopupProps {
    currentFile? : ISendFileForm
    userSendToOption?: ISelectOption[];
    open: boolean,
    submitting: boolean,
    isScreenMobile: boolean,
    isLoadingUser: boolean,
    onSubmit: (fileForm: ISendFileForm) => Promise<void>
    onChangeInputUserSend: (event: any) => Promise<void>
    onOpenInputUserSend: (event: any) => Promise<void>
    handleClose: () => void,
}

const SendFilePopup: FC<ISendFilePopupProps> = ({ 
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
    } = useForm<ISendFileForm>({mode: 'onChange'});

    const [selectedValueSend, setSelectedValueSends] = useState<ISelectOption[]>([]);
    const [tagSelected, setTagSelected] = useState<string[]>([]);
    const [fileUploads, setFileUploads] = useState<FileModel[]>([]);

    useEffect(() => {
        if (open) {
            initFormValue();
        }
    }, [open]);
    
    useEffect(() => {
        setValue('files', fileUploads);
    }, [fileUploads]);
    
    const initFormValue = (): void => {
        setSelectedValueSends(userSendToOption.filter(option => currentFile.sendToUsers?.includes(option.value)));
        setTagSelected(currentFile.tags);
        setFileUploads([]);

        setValue('id', currentFile?.id ? currentFile?.id : undefined );
        setValue('name', currentFile?.name ? currentFile.name : undefined);
        setValue('sendToUsers', currentFile?.sendToUsers ? currentFile.sendToUsers : undefined);
        setValue('tags', currentFile?.tags ? currentFile.tags :undefined);
        clearErrors(['id','name', 'sendToUsers', 'tags' ]);
    };

    const handleFileUpload = (event): void => {
        const files = event.target.files;
        if (files.length === 0) {
            return;
        }
        
        const fileInputs = event.target.files;
        for (let index = 0; index <  fileInputs.length; index++) {
            const file = fileInputs[index];
            const randomBytes = crypto.randomBytes(20).toString('hex');
            const idUploadFileProcess = randomBytes + Date.now();
            fileUploads.push(
                new FileModel({
                    processId: idUploadFileProcess,
                    fileName: file.name,
                    fileTypeEId: '',
                    fileType: getFileTypeFormFileInput(file),
                    folderLocation: URL.createObjectURL(file),
                    isInternalFile: false,
                    fileSelectInput: file,
                    presignedUrl: URL.createObjectURL(file),
                })
            );
        };
        setFileUploads([...fileUploads]);

        clearErrors(['files']);
        event.target.value = '';
    };
    
    const removeFile = (fileRemove: FileModel): void => {
        setFileUploads(data => { 
            if (fileRemove.id) {
                data = data.filter(file => file.id !== fileRemove.id);
            }
            else {
                data = data.filter(file => file.folderLocation !== fileRemove.folderLocation);
            }
            return [...data];
        });
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

    const onSubmitForm = (data: ISendFileForm): void => {
        if (validate()) {
            onSubmit(data);
        }
    };
    
    const onClose = (_: object, reason: string): void => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return;
        }
        handleClose();
    };

    const handleSelectTags = (_event, values: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any>): void => {
        updateValueTag(values, details?.option, reason);
    };
      
    const handleKeyDownTag = (event: any): void => {
        switch (event.key) {
            case ",":
            case "Tab": {
                event.preventDefault();
                event.stopPropagation();
                if (event.target.value.length > 0) {
                    const value = event.target.value;
                    updateValueTag([...tagSelected, value], value, 'createOption');
                    setTimeout(() => {
                        event.target.value = '';
                    }, 30);
                } 
              
                break;
            }
            default:
        }
    };
    
    const updateValueTag = (values: string[], newValue: string, reason: AutocompleteChangeReason):void => {
        if (reason === 'createOption') { 
            
            if (!tagSelected.some(x=> x.trim() === newValue.trim()) && newValue.trim()) {
                setTagSelected(values);
                setValue('tags', values, { shouldDirty: true });
            }
            
        }
        else {
            setTagSelected(values);
            setValue('tags', values, { shouldDirty: true });
        }
    };
    
    const validate = (): boolean => {
        let result = true;

        if (!fileUploads || !fileUploads.length) {
            setError('files', {
                type: 'required',
                message: 'Please chose file',
            });
            result = false;
        }
        else {
            clearErrors(['files']);
        }

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

    const checkFileTypeInValid = (): boolean => {
        let isCheckFileType = false;

        fileUploads?.forEach(file => {
            if (!isFileAccepted(file, [...ACCEPTED_TYPES_FILE_OF_POST, ...ACCEPTED_TYPES_IMAGE_OF_POST]) && !file.id) {
                isCheckFileType = true;
                return;
            }
        });

        return isCheckFileType;
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
                <DialogTitle>Send File(s)</DialogTitle>
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <InputFileWrapper item xs={12}>
                                <InputFile multiple={true} onChange={handleFileUpload}></InputFile>
                                <MessageSystem data={{open: !!errors.files, messages: errors.files?.message, type: 'error'}}></MessageSystem>
                            </InputFileWrapper>

                            {
                                fileUploads && fileUploads.length > 0 && 
                                    <ListFileSelected item xs={12}>
                                        <Stack direction="column" alignItems="center">
                                            Selected file:
                                        </Stack>
                                        <ShowInfoFile
                                            data={fileUploads} 
                                            showIconClear={true}
                                            showErrorFileType={true}
                                            acceptedTypes={[...ACCEPTED_TYPES_FILE_OF_POST, ...ACCEPTED_TYPES_IMAGE_OF_POST]}
                                            removeFile={removeFile}
                                        />
                                    </ListFileSelected>
                            }
                           
                            <Grid item xs={12}>
                                <AutocompleteCustom
                                    multiple
                                    disableCloseOnSelect
                                    options={userSendToOption}
                                    value={selectedValueSend}
                                    noOptionsText={ isLoadingUser ? "Loading..." : "No results" }
                                    getOptionLabel={(option: ISelectOption): any => option.label}
                                    onOpen={onOpenInputUserSend}
                                    onInputChange={onChangeInputUserSend}
                                    onChange={handleSelectChangeSend}
                                    renderInput={(params): any => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            placeholder="Select user send to"
                                            label="Send to"
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
                                <MessageSystem data={{open: !!errors.sendToUsers, messages: errors.sendToUsers?.message, type: 'error'}}></MessageSystem>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    freeSolo
                                    disableCloseOnSelect
                                    options={[]}
                                    getOptionLabel={(option): any => option}
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
                                
                                disabled={submitting || checkFileTypeInValid()}
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

export default SendFilePopup;


