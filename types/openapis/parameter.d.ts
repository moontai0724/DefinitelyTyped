import { Extendable } from './common';
import { Example } from './example';
import { MediaTypeMap } from './media';
import { Reference } from './reference';
import { Schema } from './schema';

/**
 * There are four possible parameter locations specified by the `in` field:
 *
 * - path - Used together with [Path
 *   Templating](https://spec.openapis.org/oas/v3.1.0#pathTemplating), where the
 *   parameter value is actually part of the operation’s URL. This does not
 *   include the host or base path of the API. For example, in
 *   `/items/{itemId}`, the path parameter is `itemId`.
 * - query - Parameters that are appended to the URL. For example, in
 *   `/items?id=###`, the query parameter is `id`.
 * - header - Custom headers that are expected as part of the request. Note that
 *   \[[RFC7230](https://spec.openapis.org/oas/v3.1.0#bib-RFC7230)\] states
 *   header names are case insensitive.
 * - cookie - Used to pass a specific cookie value to the API.
 *
 * @see https://spec.openapis.org/oas/v3.1.0#parameter-locations
 */
export type ParameterLocation = 'path' | 'query' | 'header' | 'cookie';

/**
 * Path-style parameters defined by
 * \[[RFC6570](https://spec.openapis.org/oas/v3.1.0#bib-RFC6570)\]
 */
export type MatrixStyle = 'matrix';
/**
 * Label style parameters defined by
 * \[[RFC6570](https://spec.openapis.org/oas/v3.1.0#bib-RFC6570)\]
 */
export type LabelStyle = 'label';
/**
 * Form style parameters defined by
 * \[[RFC6570](https://spec.openapis.org/oas/v3.1.0#bib-RFC6570)\]. This option
 * replaces `collectionFormat` with a `csv` (when `explode` is false) or `multi`
 * (when `explode` is true) value from OpenAPI 2.0.
 */
export type FormStyle = 'form';
/**
 * Simple style parameters defined by
 * \[[RFC6570](https://spec.openapis.org/oas/v3.1.0#bib-RFC6570)\]. This option
 * replaces `collectionFormat` with a `csv` value from OpenAPI 2.0.
 */
export type SimpleStyle = 'simple';
/**
 * Space separated array or object values. This option replaces
 * `collectionFormat` equal to `ssv` from OpenAPI 2.0.
 */
export type SpaceDelimitedStyle = 'spaceDelimited';
/**
 * Pipe separated array or object values. This option replaces
 * `collectionFormat` equal to `pipes` from OpenAPI 2.0.
 */
export type PipeDelimitedStyle = 'pipeDelimited';
/**
 * Provides a simple way of rendering nested objects using form parameters.
 */
export type DeepObjectStyle = 'deepObject';

export type PathParameterStyle = SimpleStyle | LabelStyle | MatrixStyle;
export type QueryParameterStyle = FormStyle | SpaceDelimitedStyle | PipeDelimitedStyle | DeepObjectStyle;
export type HeaderParameterStyle = SimpleStyle;
export type CookieParameterStyle = FormStyle;
/**
 * In order to support common ways of serializing simple parameters, a set of
 * `style` values are defined.
 *
 * @see https://spec.openapis.org/oas/v3.1.0#style-values
 */
export type ParameterStyle = PathParameterStyle | QueryParameterStyle | HeaderParameterStyle | CookieParameterStyle;

interface BaseParameter extends Extendable {
    /**
     * The name of the parameter. Parameter names are _case sensitive_.
     *
     * - If [`in`](https://spec.openapis.org/oas/v3.1.0#parameterIn) is
     *   `"path"`, the `name` field _MUST_ correspond to a template expression
     *   occurring within the
     *   [path](https://spec.openapis.org/oas/v3.1.0#pathsPath) field in the
     *   [Paths Object](https://spec.openapis.org/oas/v3.1.0#pathsObject). See
     *   [Path Templating](https://spec.openapis.org/oas/v3.1.0#pathTemplating)
     *   for further information.
     * - If [`in`](https://spec.openapis.org/oas/v3.1.0#parameterIn) is
     *   `"header"` and the `name` field is `"Accept"`, `"Content-Type"` or
     *   `"Authorization"`, the parameter definition _SHALL_ be ignored.
     * - For all other cases, the `name` corresponds to the parameter name used
     *   by the [`in`](https://spec.openapis.org/oas/v3.1.0#parameterIn)
     *   property.
     */
    name: string;
    /**
     * The location of the parameter. Possible values are `"query"`, `"header"`,
     * `"path"` or `"cookie"`.
     */
    in: ParameterLocation;
    /**
     * A brief description of the parameter. This could contain examples of use.
     * [CommonMark syntax](https://spec.commonmark.org/) _MAY_ be used for rich
     * text representation.
     */
    description?: string;
    /**
     * Determines whether this parameter is mandatory. If the [parameter
     * location](https://spec.openapis.org/oas/v3.1.0#parameterIn) is `"path"`,
     * this property is **_REQUIRED_** and its value _MUST_ be `true`.
     * Otherwise, the property _MAY_ be included and its default value is
     * `false`.
     *
     * @default false
     */
    required?: boolean;
    /**
     * Specifies that a parameter is deprecated and _SHOULD_ be transitioned out
     * of usage.
     * 
     * @default false
     */
    deprecated?: boolean;
    allowEmptyValue?: never;
    style?: never;
    explode?: never;
    allowReserved?: never;
    schema?: never;
    example?: never;
    examples?: never;
    content?: never;
}

/**
 * The rules for serialization of the parameter are specified in one of two
 * ways. For simpler scenarios, a
 * [`schema`](https://spec.openapis.org/oas/v3.1.0#parameterSchema) and
 * [`style`](https://spec.openapis.org/oas/v3.1.0#parameterStyle) can describe
 * the structure and syntax of the parameter.
 */
export interface SimpleBaseParameter
    extends Omit<BaseParameter, 'style' | 'explode' | 'schema' | 'example' | 'examples'> {
    /**
     * Describes how the parameter value will be serialized depending on the
     * type of the parameter value. Default values (based on value of `in`): for
     * `query` - `form`; for `path` - `simple`; for `header` - `simple`; for
     * `cookie` - `form`.
     */
    style?: ParameterStyle;
    /**
     * When this is true, parameter values of type `array` or `object` generate
     * separate parameters for each value of the array or key-value pair of the
     * map. For other types of parameters this property has no effect. When
     * [`style`](https://spec.openapis.org/oas/v3.1.0#parameterStyle) is `form`,
     * the default value is `true`. For all other styles, the default value is
     * `false`.
     */
    explode?: boolean;
    allowReserved?: never;
    /**
     * The schema defining the type used for the parameter.
     */
    schema?: Schema | Reference;
    /**
     * Example of the parameter’s potential value. The example _SHOULD_ match
     * the specified schema and encoding properties if present. The `example`
     * field is mutually exclusive of the `examples` field. Furthermore, if
     * referencing a `schema` that contains an example, the `example` value
     * _SHALL_ _override_ the example provided by the schema. To represent
     * examples of media types that cannot naturally be represented in JSON or
     * YAML, a string value can contain the example with escaping where
     * necessary.
     */
    example?: any;
    /**
     * Examples of the parameter’s potential value. Each example _SHOULD_
     * contain a value in the correct format as specified in the parameter
     * encoding. The `examples` field is mutually exclusive of the `example`
     * field. Furthermore, if referencing a `schema` that contains an example,
     * the `examples` value _SHALL_ _override_ the example provided by the
     * schema.
     */
    examples?: Record<string, Example | Reference>;
}

/**
 * For more complex scenarios, the
 * [`content`](https://spec.openapis.org/oas/v3.1.0#parameterContent) property
 * can define the media type and schema of the parameter. A parameter _MUST_
 * contain either a `schema` property, or a `content` property, but not both.
 * When `example` or `examples` are provided in conjunction with the `schema`
 * object, the example _MUST_ follow the prescribed serialization strategy for
 * the parameter.
 */
export interface ComplexBaseParameter extends Omit<BaseParameter, 'content'> {
    /**
     * A map containing the representations for the parameter. The key is the
     * media type and the value describes it. The map _MUST_ only contain one
     * entry.
     */
    content?: MediaTypeMap;
}

interface PathParameterOptions {
    /**
     * The name of the parameter. Parameter names are _case sensitive_.
     *
     * If [`in`](https://spec.openapis.org/oas/v3.1.0#parameterIn) is `"path"`,
     * the `name` field _MUST_ correspond to a template expression occurring
     * within the [path](https://spec.openapis.org/oas/v3.1.0#pathsPath) field
     * in the [Paths Object](https://spec.openapis.org/oas/v3.1.0#pathsObject).
     * See [Path
     * Templating](https://spec.openapis.org/oas/v3.1.0#pathTemplating) for
     * further information.
     */
    name: string;
    in: 'path';
    /**
     * Determines whether this parameter is mandatory. If the [parameter
     * location](https://spec.openapis.org/oas/v3.1.0#parameterIn) is `"path"`,
     * this property is **_REQUIRED_** and its value _MUST_ be `true`.
     * Otherwise, the property _MAY_ be included and its default value is
     * `false`.
     *
     * @default true
     */
    required: true;
    /**
     * Describes how the parameter value will be serialized depending on the
     * type of the parameter value.
     *
     * @default "simple"
     */
    style?: PathParameterStyle;
}

export interface SimplePathParameter
    extends Omit<SimpleBaseParameter, keyof PathParameterOptions>,
        PathParameterOptions {}
export interface ComplexPathParameter
    extends Omit<ComplexBaseParameter, keyof PathParameterOptions>,
        PathParameterOptions {}
export type PathParameter = SimplePathParameter | ComplexPathParameter;

interface QueryParameterOptions {
    in: 'query';
    /**
     * Sets the ability to pass empty-valued parameters. This is valid only for
     * `query` parameters and allows sending a parameter with an empty value.
     * Default value is `false`. If
     * [`style`](https://spec.openapis.org/oas/v3.1.0#parameterStyle) is used,
     * and if behavior is `n/a` (cannot be serialized), the value of
     * `allowEmptyValue` _SHALL_ be ignored. Use of this property is _NOT
     * RECOMMENDED_, as it is likely to be removed in a later revision.
     *
     * @default false
     */
    allowEmptyValue?: boolean;
    /**
     * Describes how the parameter value will be serialized depending on the
     * type of the parameter value.
     *
     * @default "form"
     */
    style?: QueryParameterStyle;
    /**
     * Determines whether the parameter value _SHOULD_ allow reserved
     * characters, as defined by
     * \[[RFC3986](https://spec.openapis.org/oas/v3.1.0#bib-RFC3986)\]
     * `:/?#[]@!$&'()*+,;=` to be included without percent-encoding. This
     * property only applies to parameters with an `in` value of `query`. The
     * default value is `false`.
     */
    allowReserved?: boolean;
}

export interface SimpleQueryParameter
    extends Omit<SimpleBaseParameter, keyof QueryParameterOptions>,
        QueryParameterOptions {}
export interface ComplexQueryParameter
    extends Omit<ComplexBaseParameter, keyof QueryParameterOptions>,
        QueryParameterOptions {}
export type QueryParameter = SimpleQueryParameter | ComplexQueryParameter;

interface HeaderParameterOptions {
    /**
     * The name of the parameter. Parameter names are _case sensitive_.
     *
     * If [`in`](https://spec.openapis.org/oas/v3.1.0#parameterIn) is `"header"`
     * and the `name` field is `"Accept"`, `"Content-Type"` or
     * `"Authorization"`, the parameter definition _SHALL_ be ignored.
     */
    name: string;
    in: 'header';
    /**
     * Describes how the parameter value will be serialized depending on the
     * type of the parameter value.
     *
     * @default "simple"
     */
    style?: HeaderParameterStyle;
}

export interface SimpleHeaderParameter
    extends Omit<SimpleBaseParameter, keyof HeaderParameterOptions>,
        HeaderParameterOptions {}
export interface ComplexHeaderParameter
    extends Omit<ComplexBaseParameter, keyof HeaderParameterOptions>,
        HeaderParameterOptions {}
export type HeaderParameter = SimpleHeaderParameter | ComplexHeaderParameter;

interface CookieParameterOptions {
    in: 'cookie';
    /**
     * Describes how the parameter value will be serialized depending on the
     * type of the parameter value.
     *
     * @default "form"
     */
    style?: CookieParameterStyle;
}

export interface SimpleCookieParameter
    extends Omit<SimpleBaseParameter, keyof CookieParameterOptions>,
        CookieParameterOptions {}
export interface ComplexCookieParameter
    extends Omit<ComplexBaseParameter, keyof CookieParameterOptions>,
        CookieParameterOptions {}
export type CookieParameter = SimpleCookieParameter | ComplexCookieParameter;

/**
 * Describes a single operation parameter.
 *
 * A unique parameter is defined by a combination of a
 * [name](https://spec.openapis.org/oas/v3.1.0#parameterName) and
 * [location](https://spec.openapis.org/oas/v3.1.0#parameterIn).
 *
 * @see https://spec.openapis.org/oas/v3.1.0#parameter-object
 */
export type Parameter = PathParameter | QueryParameter | HeaderParameter | CookieParameter;

export {};
