import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SearchResult, ProductResult, SearchRequest } from './product-search.models';
import { SuggestResult } from './product-suggest.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductSearchService {
    public productSearchResults: SearchResult;

    private baseUrl: string = "https://<<your service name>>.azurewebsites.net/api/Products";
    constructor(private http: Http) { }

    search(request: SearchRequest): Observable<SearchResult> {

        var url = this.baseUrl + `?Keyword=${request.Keyword}&PageSize=${request.PageSize}&PageNumber=${request.PageNumber}`;

        if (request.Color) {
            url = url + `&Color=${request.Color}`;
        }
        if (request.Size) {
            url = url + `&Size=${request.Size}`;
        }

        if (request.Category) {
            url = url + `&Category=${request.Category}`;
        }

        if (request.OrderBy) {
            url = url + `&OrderBy=${request.OrderBy}`;
        }

        return this.http.get(url)
            .map(response => {
                return response.json();
            });
    }

    suggest(searchText: string): Observable<SuggestResult> {

        var url = this.baseUrl + `/Suggestions?searchText=${searchText}`;

        return this.http.get(url)
            .map(response => {
                return response.json();
            });
    }
}