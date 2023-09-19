import { Extendable } from './common';

/**
 * Contact information for the exposed API.
 * @see https://spec.openapis.org/oas/v3.1.0#contact-object
 */
export interface Contact extends Extendable {
    /**
     * The identifying name of the contact person/organization.
     */
    name?: string;
    /**
     * The URL pointing to the contact information. This MUST be in the form of
     * a URL.
     */
    url?: string;
    /**
     * The email address of the contact person/organization. This MUST be in the
     * form of an email address.
     */
    email?: string;
}

export interface BaseLicense extends Extendable {
    /**
     * The license name used for the API.
     */
    name: string;
}

export interface EmbeddedLicense extends BaseLicense {
    /**
     * An SPDX license expression for the API. The `identifier` field is
     * mutually exclusive of the `url` field.
     *
     * @since 3.1
     */
    identifier?: string;
    url?: never;
}

export interface LinkedLicense extends BaseLicense {
    /**
     * A URL to the license used for the API. This MUST be in the form of a URL.
     * The `url` field is mutually exclusive of the `identifier` field.
     */
    url?: string;
    identifier?: never;
}

/**
 * License information for the exposed API.
 * @see https://spec.openapis.org/oas/v3.1.0#license-object
 */
export type License = EmbeddedLicense | LinkedLicense;

/**
 * The object provides metadata about the API. The metadata MAY be used by the
 * clients if needed, and MAY be presented in editing or documentation
 * generation tools for convenience.
 * @see https://spec.openapis.org/oas/v3.1.0#info-object
 */
export interface Info extends Extendable {
    /**
     * The title of the application.
     */
    title: string;
    /**
     * A short summary of the API.
     *
     * @since 3.1
     */
    summary?: string;
    /**
     * A description of the API. CommonMark syntax MAY be used for rich text
     * representation.
     * @see https://spec.commonmark.org/
     */
    description?: string;
    /**
     * A URL to the Terms of Service for the API. This MUST be in the form of a
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
     * The version of the OpenAPI document (which is distinct from the OpenAPI
     * Specification version or the API implementation version).
     */
    version: string;
}
