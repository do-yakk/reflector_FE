export type Language = 
    | "C"
    | "CPP"
    | "CSHARP"
    | "GO"
    | "JAVA"
    | "JAVASCRIPT"
    | "KOTLIN"
    | "PYTHON2"
    | "PYTHON3"
    | "RUBY"
    | "SCALA"
    | "SWIFT"

export type BlockType = "CODE" | "TEXT";

// request
export interface CodeCommand {
    content: string;
    language: Language;
    perform_time: string;
    perform_mem: string;
    hashtags: string[];
}

export interface TextCommand {
    content: string;
}

// response
export interface BlockBase {
    id: number;
    type: BlockType;
}

export interface Code extends BlockBase {
    type: "CODE";
    content: string;
    language: Language;
    perform_time: string;
    perform_mem: string;
    hashtags: string[];
}

export interface Text extends BlockBase {
    type: "TEXT";
    content: string;
}

export type Block = Code | Text;