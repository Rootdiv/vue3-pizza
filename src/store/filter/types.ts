export enum SortTypeEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type SortItem = {
  title: string;
  type: SortTypeEnum;
  order: string;
};

export interface IFilterState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sorts: SortItem;
}
