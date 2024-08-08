import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { FC } from "react";
import { CKEditorWrapper } from "./my-editor.styles";

interface IMyEditor {
    value?: string;
    disabled?: boolean;
    isShowToolbar?: true;
    toolbar?: {
        items: string[]
    }
    placeholder?: string;
    onChange: (event: any, editor: any) => void;
    onKeyDown?: (event: any, editor: any) => void;
}

const MyEditor: FC<IMyEditor> = ({ isShowToolbar, value, disabled, toolbar, onChange, onKeyDown, placeholder }): any => {
    return (
        <CKEditorWrapper isShowToolbar={isShowToolbar}>
            <CKEditor
                disabled={disabled}
                editor={ClassicEditor}
                config={{
                    placeholder: placeholder || 'Write something...',
                    toolbar: toolbar || {
                        items: [
                            '|', 'heading',
                            '|', 'bold', 'italic', 'underline', 'strikethrough',
                            '|', 'link',
                            '|', 'bulletedList', 'numberedList', 'outdent', 'indent', 'emoji'
                        ]
                    },
                    link: {
                        addTargetToExternalLinks: true,
                    },
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                            { model: 'heading2', view: 'h2', title: 'Heading', class: 'ck-heading_heading2' }
                        ]
                    }
                }}
                data={value}
                onChange={(_, _editor: any) => {
                    onChange(_, _editor);
                }}
                onReady={(_editor: any): void => {
                    const viewDocument = _editor.editing.view.document;
                    viewDocument.on('keydown', (_: any, evt: Event) => {
                        if (onKeyDown) {
                            onKeyDown(evt, _editor);
                        }
                    });
                }}
            />
        </CKEditorWrapper>
    );
};

export default MyEditor;
