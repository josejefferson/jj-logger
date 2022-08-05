declare type Config = {
    loadFn: null | ((...args: any[]) => Promise<any[]>);
    saveFn: null | ((...args: any[]) => Promise<any>);
};
/**
 * Define a função de carregamento do banco de dados
 */
export declare function setLoadFn(fn: Config['loadFn']): void;
/**
 * Define a função de salvamento do banco de dados
 */
export declare function setSaveFn(fn: Config['saveFn']): void;
/**
 * Define as funções de carregamento e salvamento do banco de dados MongoDB
 */
export declare function setMongooseModel(model: any): void;
/**
 * Executa a função de carregamento do banco de dados
 */
export declare function load(...args: any[]): Promise<any[]>;
/**
 * Executa a função de salvamento do banco de dados
 */
export declare function save(...args: any[]): Promise<any>;
export {};
