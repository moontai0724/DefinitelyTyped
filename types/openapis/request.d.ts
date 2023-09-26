import { Extendable } from './common';
import { MediaTypeMap } from './media';

/**
 * Describes a single request body.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#request-body-object
 */
export interface RequestBody extends Extendable {
    /**
     * A brief description of the request body. This could contain examples of
     * use. [CommonMark syntax](https://spec.commonmark.org/) _MAY_ be used for
     * rich text representation.
     */
    description?: string;
    /**
     * The content of the request body. The key is a media type or [media type
     * range](https://tools.ietf.org/html/rfc7231#appendix-D) and the value
     * describes it. For requests that match multiple keys, only the most
     * specific key is applicable. e.g. text/plain overrides text/\*
     */
    content: MediaTypeMap;
    /**
     * Determines if the request body is required in the request.
     *
     * @default false
     */
    required?: boolean;
}
