import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiPropertyOptions,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
  OpenAPIObject,
} from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Column, SortBy } from 'nestjs-paginate/lib/helper';

const APPLICATION_JSON = 'application/json';

export const wrapResponseSchemas = (document: OpenAPIObject) => {
  document.paths = Object.fromEntries(
    Object.entries(document.paths).map(([path, def]) => {
      ['get', 'put', 'options', 'delete', 'patch', 'post'].forEach((method) => {
        if (method in def) {
          if (def[method].operationId) {
            def[method].operationId =
              def[method].operationId.split('Controller_')[1];
          }
          if (def[method].responses) {
            def[method].responses = Object.fromEntries(
              Object.entries(def[method].responses).map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ([statusCode, response]: [string, Record<string, any>]) => {
                  if (
                    +statusCode < 400 &&
                    response.content &&
                    APPLICATION_JSON in response.content &&
                    !response.content[APPLICATION_JSON].schema?.properties?.data
                  ) {
                    response.content[APPLICATION_JSON] = {
                      schema: {
                        type: 'object',
                        properties: {
                          data: response.content[APPLICATION_JSON].schema,
                        },
                      },
                    };
                  }
                  return [statusCode, response];
                },
              ),
            );
          }
        }
      });
      return [path, def];
    }),
  );
  return document;
};

export class Paginated<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: SortBy<T>;
    searchBy: Column<T>[];
    search: string;
    filter?: {
      [column: string]: string | string[];
    };
  };
  links: {
    first?: string;
    previous?: string;
    current: string;
    next?: string;
    last?: string;
  };
}

export const ApiPagination = <T>(type: Type<T>) => {
  return applyDecorators(
    ApiExtraModels(type),
    ApiQuery({ name: 'page', required: false }),
    ApiQuery({ name: 'limit', required: false }),
    ApiQuery({ name: 'search', required: false }),
    ApiQuery({ name: 'sortBy', required: false }),
    ApiQuery({ name: 'filter', required: false }),
    ApiResponse({
      status: 200,
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              $ref: getSchemaPath(type),
            },
          },
          meta: {
            type: 'object',
            properties: {
              itemsPerPage: { type: 'number' },
              totalItems: { type: 'number' },
              currentPage: { type: 'number' },
              totalPages: { type: 'number' },
              sortBy: {
                type: 'array',
                items: {
                  type: 'array',
                  items: { type: 'string' },
                },
              },
              searchBy: { type: 'object' },
              search: { type: 'string' },
              filter: { type: 'object' },
            },
          },
          links: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              previous: { type: 'string' },
              current: { type: 'string' },
              next: { type: 'string' },
              last: { type: 'string' },
            },
          },
        },
      },
    }),
  );
};

export const nDimensionalSelectionType = (...types: Array<string | object>) => {
  const schemaFromType = (_types: typeof types, index: number) => {
    const schema: Partial<SchemaObject> = {};
    const _type = _types[index];
    if (index < _types.length - 1) {
      schema.type = 'object';
      const childScheme = schemaFromType(_types, index + 1);
      if (typeof _type === 'object') {
        schema.properties = Object.values(_type).reduce((props, key) => {
          props[key] = childScheme;
          return props;
        }, {});
      } else {
        schema.additionalProperties = childScheme;
      }
    } else {
      schema.type = _type as string;
    }
    return schema;
  };
  return schemaFromType(types, 0) as unknown as ApiPropertyOptions;
};
