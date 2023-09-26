import { Extendable } from './common';
import { Header } from './header';
import { Link } from './link';
import { MediaType } from './media';
import { Reference } from './reference';

/**
 * Describes a single response from an API Operation, including design-time,
 * static `links` to operations based on the response.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#response-object
 */
export interface Response extends Extendable {
    /**
     * A short description of the response. [CommonMark
     * syntax](https://spec.commonmark.org/) _MAY_ be used for rich text
     * representation.
     */
    description: string;
    /**
     * Maps a header name to its definition.
     * \[[RFC7230](https://spec.openapis.org/oas/v3.0.3#bib-RFC7230)\] states
     * header names are case insensitive. If a response header is defined with
     * the name `"Content-Type"`, it _SHALL_ be ignored.
     */
    headers?: Record<string, Header | Reference>;
    /**
     * A map containing descriptions of potential response payloads. The key is
     * a media type or [media type
     * range](https://tools.ietf.org/html/rfc7231#appendix-D) and the value
     * describes it. For responses that match multiple keys, only the most
     * specific key is applicable. e.g. text/plain overrides text/\*
     */
    content?: Record<string, MediaType>;
    /**
     * A map of operations links that can be followed from the response. The key
     * of the map is a short name for the link, following the naming constraints
     * of the names for [Component
     * Objects](https://spec.openapis.org/oas/v3.0.3#componentsObject).
     */
    links?: Record<string, Link | Reference>;
}

/**
 * A container for the expected responses of an operation. The container maps a
 * HTTP response code to the expected response.
 *
 * The documentation is not necessarily expected to cover all possible HTTP
 * response codes because they may not be known in advance. However,
 * documentation is expected to cover a successful operation response and any
 * known errors.
 *
 * The `default` _MAY_ be used as a default response object for all HTTP codes
 * that are not covered individually by the specification.
 *
 * The `Responses Object` _MUST_ contain at least one response code, and it
 * _SHOULD_ be the response for a successful operation call.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#responses-object
 */
export interface Responses extends Extendable {
    /**
     * The documentation of responses other than the ones declared for specific
     * HTTP response codes. Use this field to cover undeclared responses. A
     * [Reference Object](https://spec.openapis.org/oas/v3.0.3#referenceObject)
     * can link to a response that the [OpenAPI Object’s
     * components/responses](https://spec.openapis.org/oas/v3.0.3#componentsResponses)
     * section defines.
     */
    default?: Response | Reference;
    /**
     * Any [HTTP status code](https://spec.openapis.org/oas/v3.0.3#httpCodes)
     * can be used as the property name, but only one property per code, to
     * describe the expected response for that HTTP status code. A [Reference
     * Object](https://spec.openapis.org/oas/v3.0.3#referenceObject) can link to
     * a response that is defined in the [OpenAPI Object’s
     * components/responses](https://spec.openapis.org/oas/v3.0.3#componentsResponses)
     * section. This field _MUST_ be enclosed in quotation marks (for example,
     * “200”) for compatibility between JSON and YAML. To define a range of
     * response codes, this field _MAY_ contain the uppercase wildcard character
     * `X`. For example, `2XX` represents all response codes between
     * `[200-299]`. Only the following range definitions are allowed: `1XX`,
     * `2XX`, `3XX`, `4XX`, and `5XX`. If a response is defined using an
     * explicit code, the explicit code definition takes precedence over the
     * range definition for that code.
     */
    [code: string]: Response | Reference | undefined;
}
