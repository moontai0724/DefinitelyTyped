export interface Referable {
    $ref?: string;
}

/**
 * A simple object to allow referencing other components in the specification,
 * internally and externally.
 *
 * The Reference Object is defined by [JSON
 * Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03) and
 * follows the same structure, behavior and rules.
 *
 * For this specification, reference resolution is accomplished as defined by
 * the JSON Reference specification and not by the JSON Schema specification.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#reference-object
 */
export interface Reference extends Required<Referable> {
    /**
     * The reference string.
     */
    $ref: string;
}
