import { Extendable } from './common';
import { MediaTypeMap } from './media';

/**
 * Describes a single request body.
 * @see https://spec.openapis.org/oas/v3.1.0#request-body-object
 */
export interface RequestBody extends Extendable {
    /**
     * A brief description of the request body. This could contain examples of
     * use. CommonMark syntax MAY be used for rich text representation.
     * @see https://spec.commonmark.org/
     */
    description?: string;
    /**
     * The content of the request body. The key is a media type or media type
     * range and the value describes it. For requests that match multiple keys,
     * only the most specific key is applicable. e.g. text/plain overrides
     * text/*
     * @see https://www.iana.org/assignments/media-types/media-types.xhtml
     */
    content: MediaTypeMap;
    /**
     * Determines if the request body is required in the request.
     * @default false
     */
    required?: boolean;
}
