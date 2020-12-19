//@ts-nocheck
import _ from 'lodash'

export function toCamelCase<T, TResult>(obj: T): TResult {
    return _.transform<T, TResult>(obj, (acc, value, key, target) => {
        const camelKey = _.isArray(target) ? key : _.camelCase(key);

        acc[camelKey] = _.isObject(value) ? toCamelCase(value) : value;
    });
}
