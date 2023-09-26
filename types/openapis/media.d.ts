import { Extendable } from './common';
import { Example } from './example';
import { Header } from './header';
import { QueryParameterStyle } from './parameter';
import { Reference } from './reference';
import { Schema } from './schema';

interface BaseEncoding extends Extendable {
    /**
     * The Content-Type for encoding a specific property. Default value depends
     * on the property type: for `string` with `format` being `binary` –
     * `application/octet-stream`; for other primitive types – `text/plain`; for
     * `object` - `application/json`; for `array` – the default is defined based
     * on the inner type. The value can be a specific media type (e.g.
     * `application/json`), a wildcard media type (e.g. `image/*`), or a
     * comma-separated list of the two types.
     */
    contentType?: string;
}

export interface AnyEncoding extends BaseEncoding {
    headers?: never;
    style?: never;
    explode?: never;
    allowReserved?: never;
}

export interface MultiPartFormEncoding extends BaseEncoding {
    /**
     * A map allowing additional information to be provided as headers, for
     * example `Content-Disposition`. `Content-Type` is described separately and
     * _SHALL_ be ignored in this section. This property _SHALL_ be ignored if
     * the request body media type is not a `multipart`.
     */
    headers?: Record<string, Header | Reference>;
    style?: never;
    explode?: never;
    allowReserved?: never;
}

export interface ApplicationXWwwFormUrlEncodedEncoding extends BaseEncoding {
    headers?: never;
    /**
     * Describes how a specific property value will be serialized depending on
     * its type. See [Parameter
     * Object](https://spec.openapis.org/oas/v3.0.3#parameterObject) for details
     * on the [`style`](https://spec.openapis.org/oas/v3.0.3#parameterStyle)
     * property. The behavior follows the same values as `query` parameters,
     * including default values. This property _SHALL_ be ignored if the request
     * body media type is not `application/x-www-form-urlencoded`.
     */
    style?: QueryParameterStyle;
    /**
     * When this is true, property values of type `array` or `object` generate
     * separate parameters for each value of the array, or key-value-pair of the
     * map. For other types of properties this property has no effect. When
     * [`style`](https://spec.openapis.org/oas/v3.0.3#encodingStyle) is `form`,
     * the default value is `true`. For all other styles, the default value is
     * `false`. This property _SHALL_ be ignored if the request body media type
     * is not `application/x-www-form-urlencoded`.
     */
    explode?: boolean;
    /**
     * Determines whether the parameter value SHOULD allow reserved characters,
     * as defined by [RFC3986] :/?#[]@!$&'()*+,;= to be included without
     * percent-encoding. The default value is false. This property SHALL be
     * ignored if the request body media type is not
     * application/x-www-form-urlencoded.
     */
    allowReserved?: boolean;
}

/**
 * A single encoding definition applied to a single schema property.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#encoding-object
 */
export type Encoding = AnyEncoding | MultiPartFormEncoding | ApplicationXWwwFormUrlEncodedEncoding;

interface BaseMediaType extends Extendable {
    /**
     * The schema defining the content of the request, response, or parameter.
     */
    schema?: Schema | Reference;
    /**
     * A map between a property name and its encoding information. The key,
     * being the property name, _MUST_ exist in the schema as a property. The
     * encoding object _SHALL_ only apply to `requestBody` objects when the
     * media type is `multipart` or `application/x-www-form-urlencoded`.
     */
    encoding?: Record<string, Encoding>;
    example?: never;
    examples?: never;
}

interface MediaTypeWithExample extends Omit<BaseMediaType, 'example'> {
    /**
     * Example of the media type. The example object _SHOULD_ be in the correct
     * format as specified by the media type. The `example` field is mutually
     * exclusive of the `examples` field. Furthermore, if referencing a `schema`
     * which contains an example, the `example` value _SHALL_ _override_ the
     * example provided by the schema.
     */
    example?: any;
}

interface MediaTypeWithExamples extends Omit<BaseMediaType, 'examples'> {
    /**
     * Examples of the media type. Each example object _SHOULD_ match the media
     * type and specified schema if present. The `examples` field is mutually
     * exclusive of the `example` field. Furthermore, if referencing a `schema`
     * which contains an example, the `examples` value _SHALL_ _override_ the
     * example provided by the schema.
     */
    examples?: Record<string, Example | Reference>;
}

/**
 * Each Media Type Object provides schema and examples for the media type
 * identified by its key.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#media-type-object
 * @see https://spec.openapis.org/oas/v3.0.3#considerations-for-file-uploads
 * @see
 * https://spec.openapis.org/oas/v3.0.3#support-for-x-www-form-urlencoded-request-bodies
 * @see
 * https://spec.openapis.org/oas/v3.0.3#special-considerations-for-multipart-content
 */
export type MediaType = MediaTypeWithExample | MediaTypeWithExamples;

export interface MediaTypeMap {
    /**
     * A map containing the representations for the parameter. The key is the
     * media type and the value describes it. The map MUST only contain one
     * entry.
     * @see https://www.iana.org/assignments/media-types/media-types.xhtml
     */
    [mediaType: string]: MediaType;
}

export {};
