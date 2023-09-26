import { Extendable, ExternalDocs } from './common';

/**
 * Adds metadata to a single tag that is used by the [Operation
 * Object](https://spec.openapis.org/oas/v3.0.3#operationObject). It is not
 * mandatory to have a Tag Object per tag defined in the Operation Object
 * instances.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#tag-object
 */
export interface Tag extends Extendable {
    /**
     * The name of the tag.
     */
    name: string;
    /**
     * A short description for the tag. [CommonMark
     * syntax](https://spec.commonmark.org/) _MAY_ be used for rich text
     * representation.
     */
    description?: string;
    /**
     * Additional external documentation for this tag.
     */
    externalDocs?: ExternalDocs;
}
