/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { QueryInventoryResponseItem } from './query-inventory-response-item';
/**
 * Representation of the 'QueryInventoryResponse' schema.
 */
export type QueryInventoryResponse =
  | {
      /**
       * The stock detail items
       */
      content?: QueryInventoryResponseItem[];
      /**
       * The current page number. The initial page number starts from '0'.
       * Format: "int32".
       */
      number?: number;
      /**
       * Indicates how many stocks are returned on the current page
       * Format: "int64".
       */
      numberOfElements?: number;
      /**
       * Indicates how many stocks are returned in total
       * Format: "int64".
       */
      totalElements?: number;
      /**
       * Indicates how many pages are returned
       * Format: "int32".
       */
      totalPages?: number;
    }
  | Record<string, any>;
