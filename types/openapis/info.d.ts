import { Extendable } from './common';

/**
 * Contact information for the exposed API.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#contact-object
 */
export interface Contact extends Extendable {
    /**
     * The identifying name of the contact person/organization.
     */
    name?: string;
    /**
     * The URL pointing to the contact information. _MUST_ be in the format of a
     * URL.
     */
    url?: string;
    /**
     * The email address of the contact person/organization. _MUST_ be in the
     * format of an email address.
     */
    email?: string;
}

/**
 * License information for the exposed API.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#license-object
 */
export interface License extends Extendable {
    /**
     * The license name used for the API.
     */
    name: string;
    /**
     * A URL to the license used for the API. _MUST_ be in the format of a URL.
     */
    url?: string;
}

/**
 * The object provides metadata about the API. The metadata _MAY_ be used by the
 * clients if needed, and _MAY_ be presented in editing or documentation
 * generation tools for convenience.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#info-object
 */
export interface Info extends Extendable {
    /**
     * The title of the API.
     */
    title: string;
    /**
     * A short description of the API. [CommonMark
     * syntax](https://spec.commonmark.org/) _MAY_ be used for rich text
     * representation.
     */
    description?: string;
    /**
     * A URL to the Terms of Service for the API. _MUST_ be in the format of a
     * URL.
     */
    termsOfService?: string;
    /**
     * The contact information for the exposed API.
     */
    contact?: Contact;
    /**
     * The license information for the exposed API.
     */
    license?: License;
    /**
     * The version of the OpenAPI document (which is distinct from the [OpenAPI
     * Specification version](https://spec.openapis.org/oas/v3.0.3#oasVersion)
     * or the API implementation version).
     */
    version: string;
}
