import dynamic from "next/dynamic";

const MyEditor = dynamic(import("./MyEditor"), { ssr: false });

export default MyEditor;
