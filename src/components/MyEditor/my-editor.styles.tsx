import { Box, styled } from "@mui/material";

export const CKEditorWrapper = styled(Box)<{isShowToolbar: boolean}>(
    ({ isShowToolbar }) => `
        width: 100%;

        .ck-editor {
            .ck-editor__top {
                display: ${isShowToolbar ? 'block' : 'none'};
                transform: translateY(-10px);
                width: 100%;
                margin-top: 15px;
                
                .ck.ck-toolbar {
                    border: 1px solid #eee;
                    border-radius: 10px;
                    border-radius: 10px !important;
                }

            }

            .ck-content {

                &.ck-focused {
                    box-shadow: 0px 0px 0px 0px !important;
                }

                &.ck-read-only {
                    color: #9099a9;
                }

                .mention {
                    display:inline-block;
                    background-color: rgb(206, 228, 229);
                    color:black;
                }
            }

            
        }
    `
);