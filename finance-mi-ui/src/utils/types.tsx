/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AppController_getHello"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_logout"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["UsersController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UsersController_getProfile"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transactions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["TransactionController_findAll"];
        put?: never;
        post: operations["TransactionController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transactions/filters-parameters": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["TransactionController_getListFiltersParameters"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transactions/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["TransactionController_findOne"];
        put?: never;
        post?: never;
        delete: operations["TransactionController_remove"];
        options?: never;
        head?: never;
        patch: operations["TransactionController_update"];
        trace?: never;
    };
    "/transactions/dashboard": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["TransactionController_getDashboardData"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/categories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["CategoryController_findAll"];
        put?: never;
        post: operations["CategoryController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/categories/{name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["CategoryController_findOne"];
        put?: never;
        post?: never;
        delete: operations["CategoryController_remove"];
        options?: never;
        head?: never;
        patch: operations["CategoryController_update"];
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        SignInBody: {
            /** @example john.doe@example.com */
            email: string;
            /** @example johndoe123 */
            password: string;
        };
        CreateUserDto: {
            /** @example john */
            firstName: string;
            /** @example doe */
            lastName: string;
            /** @example john.doe@example.com */
            email: string;
            /** @example Johndoe123 */
            password: string;
        };
        GetCurrenUserDto: {
            /** @example cm3djx26l0000iyopkh6f19e0 */
            id: string;
            /** @example john */
            firstName: string;
            /** @example doe */
            lastName: string;
            /** @example john.doe@example.com */
            email: string;
            /** @example customer */
            role: string;
            /**
             * Format: date-time
             * @example null
             */
            lastLogin: string | null;
            /**
             * Format: date-time
             * @example 2024-11-11T21:44:32.588Z
             */
            createdAt: string;
            /**
             * Format: date-time
             * @example 2024-11-11T21:44:32.588Z
             */
            updatedAt: string;
        };
        CreateTransactionDto: {
            /** @description Amount of the transaction */
            amount: number;
            /** @description Description of the transaction */
            description: string;
            /**
             * Format: date-time
             * @description Date of the transaction
             */
            date: string;
            /** @description Name of the payment method used for the transaction */
            paymentMethod: string;
            /** @description Name of the category of the transaction */
            category: string;
        };
        CreateTransactionResponseDto: {
            /** @description Id of the created transaction */
            id: string;
        };
        ListTransactionQueryDto: {
            page?: number;
            pageSize?: number;
            minAmount?: string;
            maxAmount?: string;
            /** Format: date-time */
            after?: string;
            /** Format: date-time */
            before?: string;
            category?: string;
            paymentMethod?: string;
            search?: string;
        };
        TransactionDto: {
            /**
             * @description The description of the transaction
             * @example Payment for services rendered
             */
            description: string;
            /**
             * @description The unique identifier of the transaction
             * @example 12345-abcde
             */
            id: string;
            /**
             * @description The amount of the transaction
             * @example 150.75
             */
            amount: number;
            /**
             * Format: date-time
             * @description The date when the transaction occurred
             * @example 2023-11-01T15:30:00.000Z
             */
            date: string;
            /**
             * @description The payment method used for the transaction
             * @example creditCard
             */
            paymentMethod: string;
            /**
             * Format: date-time
             * @description The date when the transaction was created
             * @example 2023-10-30T10:15:00.000Z
             */
            createdAt: string;
            /**
             * Format: date-time
             * @description The date when the transaction was last updated
             * @example 2023-11-01T16:45:00.000Z
             */
            updatedAt: string;
            /**
             * @description The ID of the user associated with the transaction
             * @example user-12345
             */
            userId: string;
            /**
             * @description The name of the category associated with the transaction
             * @example Utilities
             */
            categoryName: string;
        };
        ListTransactionResponseDto: {
            /** @description The page number of the results */
            page: number;
            /** @description The number of results per page */
            pageSize: number;
            /** @description The total number of results */
            count: number;
            /** @description The transactions */
            results: components["schemas"]["TransactionDto"][];
        };
        GetListFiltersParametersResponseDto: {
            /** @description The min amount of transactions */
            minAmount: number;
            /** @description The mac amount of transactions */
            maxAmount: number;
        };
        UpdateTransactionDto: {
            /** @description Amount of the transaction */
            amount?: number;
            /** @description Description of the transaction */
            description?: string;
            /**
             * Format: date-time
             * @description Date of the transaction
             */
            date?: string;
            /** @description Name of the payment method used for the transaction */
            paymentMethod?: string;
            /** @description Name of the category of the transaction */
            category?: string;
        };
        UpdateTransactionResponseDto: {
            /** @description Id of the updated transaction */
            id: string;
        };
        MinMaxConsumptionDto: {
            /**
             * Format: date-time
             * @description The date of the consumption
             */
            date: string;
            /** @description The amount of the consumption */
            amount: number;
        };
        DashboardResponseDto: {
            /** @description Consumptions from the previous days */
            previousConsumptions: unknown[][];
            /** @description Forecasted consumptions for the next days */
            forecastedConsumption: unknown[][];
            /** @description The total consumption amount */
            total: number;
            /** @description The minimum consumption details */
            minConsumption: components["schemas"]["MinMaxConsumptionDto"];
            /** @description The maximum consumption details */
            maxConsumption: components["schemas"]["MinMaxConsumptionDto"];
        };
        CreateCategoryDto: {
            /**
             * @description The name of the category
             * @example Utilities
             */
            name: string;
            /**
             * @description The URL of the category icon
             * @example https://example.com/icon.png
             */
            IconUrl: string;
        };
        CreateCategoryResponseDto: {
            /** @description Name of the created category */
            name: string;
        };
        CategoryDto: {
            /**
             * @description The unique identifier of the category
             * @example 12345-abcde
             */
            name: string;
            /**
             * @description The name of the category
             * @example Utilities
             */
            IconUrl: string;
            /**
             * Format: date-time
             * @description The date when the category was created
             * @example 2023-10-30T10:15:00.000Z
             */
            createdAt: string;
            /**
             * Format: date-time
             * @description The date when the category was last updated
             * @example 2023-11-01T16:45:00.000Z
             */
            updatedAt: string;
        };
        UpdateCategoryDto: {
            /**
             * @description The name of the category
             * @example Utilities
             */
            name?: string;
            /**
             * @description The URL of the category icon
             * @example https://example.com/icon.png
             */
            IconUrl?: string;
        };
        UpdateCategoryResponseDto: {
            /** @description Name of the updated category */
            name: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    AppController_getHello: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SignInBody"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_logout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UsersController_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateUserDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UsersController_getProfile: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetCurrenUserDto"];
                };
            };
        };
    };
    TransactionController_findAll: {
        parameters: {
            query?: {
                page?: number;
                pageSize?: number;
                minAmount?: string;
                maxAmount?: string;
                after?: string;
                before?: string;
                category?: string;
                paymentMethod?: string;
                search?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ListTransactionQueryDto"];
            };
        };
        responses: {
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ListTransactionResponseDto"];
                };
            };
        };
    };
    TransactionController_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateTransactionDto"];
            };
        };
        responses: {
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreateTransactionResponseDto"];
                };
            };
        };
    };
    TransactionController_getListFiltersParameters: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetListFiltersParametersResponseDto"];
                };
            };
        };
    };
    TransactionController_findOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TransactionDto"];
                };
            };
        };
    };
    TransactionController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    TransactionController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateTransactionDto"];
            };
        };
        responses: {
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UpdateTransactionResponseDto"];
                };
            };
        };
    };
    TransactionController_getDashboardData: {
        parameters: {
            query: {
                /** @description Number of days (15, 30, or 60) */
                days: 15 | 30 | 60;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DashboardResponseDto"];
                };
            };
        };
    };
    CategoryController_findAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CategoryDto"][];
                };
            };
        };
    };
    CategoryController_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateCategoryDto"];
            };
        };
        responses: {
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreateCategoryResponseDto"];
                };
            };
        };
    };
    CategoryController_findOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CategoryDto"];
                };
            };
        };
    };
    CategoryController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    CategoryController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateCategoryDto"];
            };
        };
        responses: {
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UpdateCategoryResponseDto"];
                };
            };
        };
    };
}