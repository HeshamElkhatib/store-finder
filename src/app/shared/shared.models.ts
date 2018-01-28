export class ResultGroup<T>{
    resultAmountTotal: number;
    resultOffset: number;
    resultAmount: number;
    resultLimit: number;
    records: Array<T>;
  }
  
  export class GroupsResponse<T>{
    groupAmount: number;
    resultGroups: Array<ResultGroup<T>>;
  }