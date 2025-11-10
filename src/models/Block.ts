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
export interface Code {

}

export interface Text {

}