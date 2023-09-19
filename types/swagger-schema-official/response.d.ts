import { Extendable } from './common';
import { Header } from './header';
import { Link } from './link';
import { MediaType } from './media';
import { Reference } from './reference';

/**
 * Describes a single response from an API Operation, including design-time,
 * static `links` to operations based on the response.
 * @see https://spec.openapis.org/oas/v3.1.0#response-object
 */
export interface Response extends Extendable {
    /**
     * A description of the response. CommonMark syntax MAY be used for rich
     * text representation.
     * @see https://spec.commonmark.org/
     */
    description?: string;
    /**
     * Maps a header name to its definition. RFC7230 states header names are
     * case insensitive. If a response header is defined with the name
     * `"Content-Type"`, it SHALL be ignored.
     * @see https://tools.ietf.org/html/rfc7230#page-22
     */
    headers?: Record<string, Header | Reference>;
    /**
     * A map containing descriptions of potential response payloads. The key is
     * a media type or media type range and the value describes it. For
     * responses that match multiple keys, only the most specific key is
     * applicable. e.g. text/plain overrides text/*
     * @see https://tools.ietf.org/html/rfc7231#appendix--d
     */
    content?: Record<string, MediaType>;
    /**
     * A map of operations links that can be followed from the response. The key
     * of the map is a short name for the link, following the naming constraints
     * of the names for Component Objects.
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
 * The default MAY be used as a default response object for all HTTP codes that
 * are not covered individually by the Responses Object.
 *
 * The Responses Object MUST contain at least one response code, and if only one
 * response code is provided it SHOULD be the response for a successful
 * operation call.
 *
 * @see https://spec.openapis.org/oas/v3.1.0#responses-object
 */
export interface Responses extends Extendable {
    /**
     * The documentation of responses other than the ones declared for specific
     * HTTP response codes. Use this field to cover undeclared responses.
     */
    default?: Response | Reference;
    /**
     * Any HTTP status code can be used as the property name, but only one
     * property per code, to describe the expected response for that HTTP status
     * code. This field MUST be enclosed in quotation marks (for example, "200")
     * for compatibility between JSON and YAML. To define a range of response
     * codes, this field MAY contain the uppercase wildcard character `X`. For
     * example, `2XX` represents all response codes between `[200-299]`. Only
     * the following range definitions are allowed: `1XX`, `2XX`, `3XX`, `4XX`,
     * and `5XX`. If a response is defined using an explicit code, the explicit
     * code definition takes precedence over the range definition for that code.
     */
    [code: string]: Response | Reference | undefined;
}
