import { Extendable } from './common';
import { Example } from './example';
import { MediaTypeMap } from './media';
import { Reference } from './reference';
import { Schema } from './schema';

/**
 * There are four possible parameter locations specified by the in field:
 * - path - Used together with Path Templating, where the parameter value is
 *   actually part of the operation's URL. This does not include the host or
 *   base path of the API. For example, in /items/{itemId}, the path parameter
 *   is itemId.
 * - query - Parameters that are appended to the URL. For example, in
 *   /items?id=###, the query parameter is id.
 * - header - Custom headers that are expected as part of the request. Note that
 *   RFC7230 states header names are case insensitive.
 * - cookie - Used to pass a specific cookie value to the API.
 */
export type ParameterLocation = 'query' | 'path' | 'header' | 'cookie';

/**
 * @see https://swagger.io/docs/specification/serialization
 */
export type ParameterStyle = PathParameterStyle | QueryParameterStyle | HeaderParameterStyle | CookieParameterStyle;

export interface BaseParameter extends Extendable {
    /**
     * The name of the parameter. Parameter names are _case sensitive_.
     */
    name: string;
    /**
     * The location of the parameter.
     */
    in: ParameterLocation;
    /**
     * A brief description of the parameter. This could contain examples of use.
     * CommonMark syntax MAY be used for rich text representation.
     * @see https://spec.commonmark.org/
     */
    description?: string;
    /**
     * Determines whether this parameter is mandatory. If the parameter location
     * is `"path"`, this property is **REQUIRED** and its value MUST be `true`.
     * Otherwise, the property MAY be included and its default value is `false`.
     * @default false
     */
    required?: boolean;
    /**
     * Specifies that a parameter is deprecated and SHOULD be transitioned out
     * of usage.
     * @default false
     */
    deprecated?: boolean;
    /**
     * Describes how the parameter value will be serialized depending on the
     * type of the parameter value. Default value based on value of `in`.
     */
    style?: ParameterStyle;
    /**
     * When this is true, parameter values of type `array` or `object` generate
     * separate parameters for each value of the array or key-value pair of the
     * map. For other types of parameters this property has no effect. When
     * style is `form`, the default value is `true`. For all other styles, the
     * default value is `false`.
     */
    explode?: boolean;
    /**
     * Determines whether the parameter value SHOULD allow reserved characters,
     * as defined by RFC3986 `:/?#[]@!$&'()*+,;=` to be included without
     * percent-encoding. This property only applies to parameters with an `in`
     * value of `query`.
     * @default false
     * @see https://tools.ietf.org/html/rfc3986#section-2.2
     */
    allowReserved?: boolean;
    /**
     * The schema defining the type used for the parameter.
     */
    schema?: Schema;
    /**
     * Example of the parameter's potential value. The example SHOULD match the
     * specified schema and encoding properties if present. The `example` field
     * is mutually exclusive of the `examples` field. Furthermore, if
     * referencing a `schema` that contains an example, the `example` value
     * SHALL override the example provided by the schema. To represent examples
     * of media types that cannot naturally be represented in JSON or YAML, a
     * string value can contain the example with escaping where necessary.
     */
    example?: any;
    /**
     * Examples of the parameter's potential value. Each example SHOULD contain
     * a value in the correct format as specified in the parameter encoding. The
     * `examples` field is mutually exclusive of the `example` field. Furthermore,
     * if referencing a `schema` that contains an example, the `examples` value
     * SHALL override the example provided by the schema.
     */
    examples?: Record<string, Example | Reference>;
    /**
     * A map containing the representations for the parameter. The key is the
     * media type and the value describes it. The map MUST only contain one
     * entry.
     * @see https://www.iana.org/assignments/media-types/media-types.xhtml
     */
    content?: MediaTypeMap;
}

/**
 * Describes how the parameter value will be serialized depending on the type of
 * the parameter value.
 * - **simple** – (default) comma-separated values. Corresponds to the
 *   `{param_name}` URI template.
 * - **label** – dot-prefixed values, also known as label expansion. Corresponds
 *   to the `{.param_name}` URI template.
 * - **matrix** – semicolon-prefixed values, also known as path-style expansion.
 *   Corresponds to the `{;param_name}` URI template.
 * @see https://swagger.io/docs/specification/serialization/#path
 */
export type PathParameterStyle = 'simple' | 'label' | 'matrix';

/**
 * Path parameters are variable parts of a URL path.
 */
export interface PathParameter extends BaseParameter {
    in: 'path';
    required: true;
    /**
     * Describes how the parameter value will be serialized depending on the
     * type of the parameter value.
     * - **simple** – (default) comma-separated values. Corresponds to the
     *   `{param_name}` URI template.
     * - **label** – dot-prefixed values, also known as label expansion.
     *   Corresponds to the `{.param_name}` URI template.
     * - **matrix** – semicolon-prefixed values, also known as path-style
     *   expansion. Corresponds to the `{;param_name}` URI template.
     * @default "simple"
     * @see https://swagger.io/docs/specification/serialization/#path
     */
    style?: PathParameterStyle;
}

/**
 * Describes how the parameter value will be serialized depending on the type of
 * the parameter value.
 * - **form** – (default) ampersand-separated values, also known as form-style
 *   query expansion. Corresponds to the `{?param_name}` URI template.
 * - **spaceDelimited** – space-separated array values. Same as
 *   `collectionFormat: ssv` in OpenAPI 2.0. Has effect only for non-exploded
 *   arrays (`explode: false`), that is, the space separates the array values if
 *   the array is a single parameter, as in `arr=a b c`.
 * - **pipeDelimited** – pipeline-separated array values. Same as
 *   `collectionFormat: pipes` in OpenAPI 2.0. Has effect only for non-exploded
 *   arrays (`explode: false`), that is, the pipe separates the array values if
 *   the array is a single parameter, as in `arr=a|b|c`.
 * - **deepObject** – simple non-nested objects are serialized as
 *   `paramName[prop1]=value1&paramName[prop2]=value2&....` The behavior for
 *   nested objects and arrays is undefined.
 * @see https://swagger.io/docs/specification/serialization/#query
 */
export type QueryParameterStyle = 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject';

/**
 * Query parameters are the most common type of parameters. They appear at the
 * end of the request URL after a question mark (`?`), with different
 * `name=value` pairs separated by ampersands (`&`).
 */
export interface QueryParameter extends BaseParameter {
    in: 'query';
    /**
     * Sets the ability to pass empty-valued parameters. This is valid only for
     * `query` parameters and allows sending a parameter with an empty value. If
     * style is used, and if behavior is `n/a` (cannot be serialized), the value
     * of `allowEmptyValue` SHALL be ignored. Use of this property is NOT
     * RECOMMENDED, as it is likely to be removed in a later revision.
     * @default false
     */
    allowEmptyValue?: boolean;
    /**
     * Describes how the parameter value will be serialized depending on the
     * type of the parameter value.
     * - **form** – (default) ampersand-separated values, also known as
     *   form-style query expansion. Corresponds to the `{?param_name}` URI
     *   template.
     * - **spaceDelimited** – space-separated array values. Same as
     *   `collectionFormat: ssv` in OpenAPI 2.0. Has effect only for
     *   non-exploded arrays (`explode: false`), that is, the space separates
     *   the array values if the array is a single parameter, as in `arr=a b c`.
     * - **pipeDelimited** – pipeline-separated array values. Same as
     *   `collectionFormat: pipes` in OpenAPI 2.0. Has effect only for
     *   non-exploded arrays (`explode: false`), that is, the pipe separates the
     *   array values if the array is a single parameter, as in `arr=a|b|c`.
     * - **deepObject** – simple non-nested objects are serialized as
     *   `paramName[prop1]=value1&paramName[prop2]=value2&....` The behavior for
     *   nested objects and arrays is undefined.
     * @default "form"
     * @see https://swagger.io/docs/specification/serialization/#query
     */
    style?: QueryParameterStyle;
}

/**
 * Header parameters always use the `simple` style, that is, comma-separated
 * values. This corresponds to the `{param_name}` URI template. An optional
 * `explode` keyword controls the object serialization. Given the request header
 * named `X-MyHeader`, the header value is serialized as follows:
 */
export type HeaderParameterStyle = 'simple';

export interface HeaderParameter extends BaseParameter {
    in: 'header';
    /**
     * Header parameters always use the `simple` style, that is, comma-separated
     * values. This corresponds to the `{param_name}` URI template. An optional
     * `explode` keyword controls the object serialization. Given the request
     * header named `X-MyHeader`, the header value is serialized as follows:
     */
    style?: HeaderParameterStyle;
}

/**
 * Cookie parameters always use the form style. An optional explode keyword
 * controls the array and object serialization. Given the cookie named id, the
 * cookie value is serialized as follows:
 */
export type CookieParameterStyle = 'form';

export interface CookieParameter extends BaseParameter {
    in: 'cookie';
    /**
     * Cookie parameters always use the form style. An optional explode keyword
     * controls the array and object serialization. Given the cookie named id,
     * the cookie value is serialized as follows:
     */
    style?: CookieParameterStyle;
}

/**
 * Describes a single operation parameter. A unique parameter is defined by a
 * combination of a name and location.
 * @see https://spec.openapis.org/oas/v3.1.0#parameter-object
 * @see https://swagger.io/docs/specification/describing-parameters
 */
export type Parameter = PathParameter | QueryParameter | HeaderParameter | CookieParameter;
