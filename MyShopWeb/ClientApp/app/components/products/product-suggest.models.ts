
export interface AdditionalProp1 {
}

export interface AdditionalProp2 {
}

export interface AdditionalProp3 {
}

export interface Document {
    additionalProp1: AdditionalProp1;
    additionalProp2: AdditionalProp2;
    additionalProp3: AdditionalProp3;
}

export interface Result {
    text: string;
    document: Document;
}

export interface SuggestResult {
    coverage: number;
    results: Result[];
}


