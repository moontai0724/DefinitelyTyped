export interface Referable {
    $ref?: string;
}

/**
 * A simple object to allow referencing other components in the OpenAPI
 * document, internally and externally. The `$ref` string value contains a URI
 * RFC3986, which identifies the location of the value being referenced.
 * @see https://tools.ietf.org/html/rfc3986
 */
export interface Reference extends Required<Referable> {
    /**
     * The reference identifier. This MUST be in the form of a URI.
     */
    $ref: string;
    /**
     * A short summary which by default SHOULD override that of the referenced
     * component. If the referenced object-type does not allow a `summary`
     * field, then this field has no effect.
     */
    summary?: string;
    /**
     * A description which by default SHOULD override that of the referenced
     * component. CommonMark syntax MAY be used for rich text representation. If
     * the referenced object-type does not allow a `description` field, then
     * this field has no effect.
     * @see https://spec.commonmark.org/
     */
    description?: string;
}
