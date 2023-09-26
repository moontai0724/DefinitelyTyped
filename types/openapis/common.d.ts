export type MayLowercase<T extends string> = T | Lowercase<T>;

export interface Extendable {
    [key: `x-${string}`]: any;
}

/**
 * Allows referencing an external resource for extended documentation.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#external-documentation-object
 */
export interface ExternalDocs extends Extendable {
    /**
     * A short description of the target documentation. [CommonMark
     * syntax](https://spec.commonmark.org/) _MAY_ be used for rich text
     * representation.
     */
    description?: string;
    /**
     * The URL for the target documentation. Value _MUST_ be in the format of a
     * URL.
     */
    url: string;
}
