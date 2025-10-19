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

export interface CreateCodeBlockRequest {
    content: string;
    language: Language;
    perform_time: string;
    perform_mem: string;
    hashtags: string[];
}

export interface CreateTextBlockRequest {
    content: string;
}