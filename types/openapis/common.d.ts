export type MayLowercase<T extends string> = T | Lowercase<T>;

/**
 * While the OpenAPI Specification tries to accommodate most use cases, additional data can be added to extend the specification at certain points.
 *
 * The extensions properties are implemented as patterned fields that are always prefixed by `"x-"`.
 *
 * @see https://spec.openapis.org/oas/v3.1.0#specification-extensions
 */
export interface Extendable {
    [key: `x-oai-${string}`]: never;
    [key: `x-oas-${string}`]: never;
    /**
     * Allows extensions to the OpenAPI Schema. The field name _MUST_ begin with
     * `x-`, for example, `x-internal-id`. Field names beginning `x-oai-` and
     * `x-oas-` are reserved for uses defined by the [OpenAPI
     * Initiative](https://www.openapis.org/). The value can be `null`, a
     * primitive, an array or an object.
     */
    [key: `x-${string}`]: any;
}

/**
 * Allows referencing an external resource for extended documentation.
 *
 * @see https://spec.openapis.org/oas/v3.1.0#external-documentation-object
 */
export interface ExternalDocs extends Extendable {
    /**
     * A description of the target documentation. [CommonMark
     * syntax](https://spec.commonmark.org/) _MAY_ be used for rich text
     * representation.
     */
    description?: string;
    /**
     * The URL for the target documentation. This _MUST_ be in the form of a
     * URL.
     */
    url: string;
}
