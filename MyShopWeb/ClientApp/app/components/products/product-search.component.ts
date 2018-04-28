import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ProductSearchService } from './product-search.service'
import { SearchResult, SearchRequest, FilterOption, FacetModel } from './product-search.models';
import { SuggestResult } from './product-suggest.models';

@Component({
    selector: 'product-search',
    templateUrl: './product-search.html',
    styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
    public searchRequest: SearchRequest;
    public colorFilter: FilterOption[];
    public categoryFilter: FilterOption[];
    public sizeFilter: FilterOption[];
    public orderByOptions: FilterOption[] = [
        { Key: "ListPrice", Value: "Price", Count: 0, Selected: false },
        { Key: "", Value: "Relevancy", Count: 0, Selected: true }
    ];

    public searchResult: SearchResult;
    public isResultsAvailable: boolean = false;

    constructor(private productSearchService: ProductSearchService) {
        this.searchRequest = <SearchRequest>{ Keyword: "bike", PageNumber: 0, PageSize: 10 }
    }

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        this.productSearchService.search(this.searchRequest)
            .subscribe(searchResult => {
                this.searchResult = searchResult;
                this.setFilters();
                this.isResultsAvailable = (this.searchResult && this.searchResult.results.length > 0) ? true : false;
            });
    }

    getSuggestions() {
        //this.productSearchService.suggest(this.searchRequest.SuggestText)
        //    .subscribe(searchResult:SuggestResult  => {
        //    //
        //    });
    }

    setFilters() {
        this.colorFilter = this.mapFilter(this.searchResult.facets.Color);
        this.categoryFilter = this.mapFilter(this.searchResult.facets.Category);
        this.sizeFilter = this.mapFilter(this.searchResult.facets.Size);
    }

    mapFilter(facets: FacetModel[]): FilterOption[] {
        return facets.map(facet => {
            return <FilterOption>{
                Key: facet.value,
                Value: facet.value,
                Count: facet.count,
                Selected: false
            }
        }).sort((option1, option2) => {
            return option2.Count - option1.Count;
        });
    }

    applyColorFilter() {
        var colors = this.colorFilter
            .filter(option => option.Selected)
            .map(option => option.Value)
            .join();
        this.searchRequest.Color = colors;

        this.getProducts();
    }

    applySizeFilter() {
        var sizes = this.sizeFilter
            .filter(option => option.Selected)
            .map(option => option.Value)
            .join();
        this.searchRequest.Size = sizes;

        this.getProducts();
    }

    resetFilter() {
        this.searchRequest.PageNumber = 0;
        this.getProducts();
    }

    resetColor() {
        this.searchRequest.Color = undefined;
        this.resetFilter();
    }
    resetSize() {
        this.searchRequest.Size = undefined;
        this.resetFilter();
    }

    resetCategory() {
        this.searchRequest.Category = undefined;
        this.resetFilter();
    }


    goToNextPage() {
        this.searchRequest.PageNumber++;
        this.getProducts()
    }
    goToPreviousPage() {
        this.searchRequest.PageNumber--;
        this.getProducts()
    }
}
