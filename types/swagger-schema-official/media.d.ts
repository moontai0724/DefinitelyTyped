import { Extendable } from './common';
import { Example } from './example';
import { Header } from './header';
import { QueryParameterStyle } from './parameter';
import { Reference } from './reference';
import { Schema } from './schema';

/**
 * A single encoding definition applied to a single schema property.
 * @see https://spec.openapis.org/oas/v3.1.0#encoding-object
 */
export interface Encoding extends Extendable {
    /**
     * 	The Content-Type for encoding a specific property. Default value depends
     * 	on the property type: for object - `application/json`; for array – the
     * 	default is defined based on the inner type; for all other cases the
     * 	default is `application/octet-stream`. The value can be a specific media
     * 	type (e.g. `application/json`), a wildcard media type (e.g. `image/*`),
     * 	or a comma-separated list of the two types.
     */
    contentType?: string;
    /**
     * A map allowing additional information to be provided as headers, for
     * example `Content-Disposition. Content-Type` is described separately and
     * SHALL be ignored in this section. This property SHALL be ignored if the
     * request body media type is not a `multipart`.
     */
    headers?: Record<string, Header | Reference>;
    /**
     * Describes how a specific property value will be serialized depending on
     * its type. The behavior follows the same values as `query` Parameter
     * Object, including default values. This property SHALL be ignored if the
     * request body media type is not `application/x-www-form-urlencoded` or
     * `multipart/form-data`. If a value is explicitly defined, then the value
     * of contentType (implicit or explicit) SHALL be ignored.
     *
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
    /**
     * When this is true, property values of type `array` or `object` generate
     * separate parameters for each value of the array, or key-value-pair of the
     * map. For other types of properties this property has no effect. When
     * style is `form`, the default value is `true`. For all other styles, the
     * default value is `false`. This property SHALL be ignored if the request
     * body media type is not `application/x-www-form-urlencoded` or
     * `multipart/form-data`. If a value is explicitly defined, then the value
     * of contentType (implicit or explicit) SHALL be ignored.
     */
    explode?: boolean;
    /**
     * Determines whether the parameter value SHOULD allow reserved characters,
     * as defined by RFC3986 `:/?#[]@!$&'()*+,;=` to be included without
     * percent-encoding. The default value is `false`. This property SHALL be
     * ignored if the request body media type is not
     * `application/x-www-form-urlencoded` or `multipart/form-data`. If a value
     * is explicitly defined, then the value of `contentType` (implicit or
     * explicit) SHALL be ignored.
     * @default false
     * @see https://tools.ietf.org/html/rfc3986#section-2.2
     */
    allowReserved?: boolean;
}

/**
 * Each Media Type Object provides schema and examples for the media type identified by its key.
 * @see https://spec.openapis.org/oas/v3.1.0#media-type-object
 */
export interface MediaType extends Extendable {
    /**
     * The schema defining the content of the request, response, or parameter.
     */
    schema?: Schema;
    /**
     * Example of the media type. The example object SHOULD be in the correct
     * format as specified by the media type. The `example` field is mutually
     * exclusive of the `examples` field. Furthermore, if referencing a `schema`
     * which contains an example, the `example` value SHALL override the example
     * provided by the schema.
     */
    example?: any;
    /**
     * Examples of the media type. Each example object SHOULD match the media
     * type and specified schema if present. The `examples` field is mutually
     * exclusive of the `example` field. Furthermore, if referencing a `schema`
     * which contains an example, the `examples` value SHALL override the example
     * provided by the schema.
     */
    examples?: Record<string, Example | Reference>;
    /**
     * A map between a property name and its encoding information. The key,
     * being the property name, MUST exist in the schema as a property. The
     * encoding object SHALL only apply to `requestBody` objects when the media
     * type is `multipart` or `application/x-www-form-urlencoded`.
     */
    encoding?: Record<string, Encoding>;
}

export interface MediaTypeMap {
    /**
     * A map containing the representations for the parameter. The key is the
     * media type and the value describes it. The map MUST only contain one
     * entry.
     * @see https://www.iana.org/assignments/media-types/media-types.xhtml
     */
    [mediaType: string]: MediaType;
}
