"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CKEditorClient({ value = "", onChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(_event, editor) => {
        const html = editor.getData();
        onChange && onChange(html);
      }}
      config={{
        placeholder: "Type your content here...",
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "link",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "blockQuote",
          "insertTable",
          "imageUpload",
          "mediaEmbed",
          "|",
          "undo",
          "redo",
        ],
      }}
    />
  );
}
