// import React, { useEffect } from 'react';
// import tinymce from 'tinymce/tinymce';

// // Import the TinyMCE plugins you want to use
// import '@/tinymce/icons/default';
// import '@/tinymce/themes/silver';
// import '@/tinymce/plugins/paste';
// import '@/tinymce/plugins/link';
// import '@/tinymce/plugins/image';

// const TinyMCEEditor = ({ initialValue, onChange }) => {
//     useEffect(() => {
//         tinymce.init({
//             selector: '#editor',
//             plugins: 'paste link image',
//             toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | link image',
//             height: 500,
//             setup: editor => {
//                 editor.on('change', () => {
//                     const content = editor.getContent();
//                     onChange(content);
//                 });
//             },
//             init_instance_callback: editor => {
//                 editor.setContent(initialValue || '');
//             }
//         });

//         return () => {
//             tinymce.get('editor')?.remove();
//         };
//     }, [initialValue, onChange]);

//     return (
//         <textarea id="editor" style={{ visibility: 'hidden' }} />
//     );
// };

// export default TinyMCEEditor;
