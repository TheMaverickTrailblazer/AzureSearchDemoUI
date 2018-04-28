import { CounterComponent } from "../counter/counter.component";


export interface FacetModel {
    type: number;
    from?: any;
    to?: any;
    value: string;
    count: number;
}

export interface Facets {
    Category: FacetModel[];
    Color: FacetModel[];
    Size: FacetModel[];
}

export interface Document {
    ModelName: string;
    Description: string;
    ProductName: string;
    ProductID: string;
    Name: string;
    ProductNumber: string;
    Color: string;
    StandardCost: string;
    ListPrice: string;
    Size: string;
    Weight?: any;
    ProductCategoryID: number;
    ProductModelID: number;
    ThumbnailPhotoFileName: string;
    Category: string;
}

export interface ProductResult {
    score: number;
    highlights?: any;
    document: Document;
}

export interface SearchResult {
    count: number;
    coverage?: any;
    facets: Facets;
    results: ProductResult[];
    continuationToken?: any;
}


export interface SearchRequest {
    Keyword: string;
    PageSize: number;
    PageNumber: number;

    //Filters
    ProductID?: string;
    Color?: string;
    Size?: string;
    Category?: string;

    //Sorting
    OrderBy?: string

    //Suggestions
    SuggestText?: string;
}

export interface FilterOption {
    Key: string;
    Value: string;
    Count: number;
    Selected: boolean;
}
