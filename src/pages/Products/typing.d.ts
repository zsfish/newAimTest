declare namespace ProductAPI {

  type Params_TokenInfo__ = {
    email?: string;
    password?: string;
  }

  interface Result_TokenInfo__ {
    iat?: number;
    exp?: number;
    token?: string;
  }

  type Params_ProductsInfo__ ={
    keywords?: string;
    page_no?: number;
    limit?: number;

  }
  interface Result_ProductInfo__ {

  }

  interface Result_ProductsInfo__ {
    result?: Array<Record<string, any>>;
    total?: number;
    total_pages: number;
    current_page: number;
    page_size: number;
  }

  
}
