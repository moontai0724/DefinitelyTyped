export interface Extendable {
    [key: `x-oai-${string}`]: never;
    [key: `x-oas-${string}`]: never;
    [key: `x-${string}`]: any;
}

/**
 * Allows referencing an external resource for extended documentation.
 * @see https://spec.openapis.org/oas/v3.1.0#external-documentation-object
 */
export interface ExternalDocs extends Extendable {
    /**
     * A description of the target documentation. CommonMark syntax MAY be used
     * for rich text representation.
     * @see https://spec.commonmark.org/
     */
    description?: string;
    /**
     * The URL for the target documentation. This MUST be in the form of a URL.
     */
    url: string;
}
