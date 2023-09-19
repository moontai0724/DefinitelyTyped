import { Extendable } from './common';

export interface BaseExample extends Extendable {
    /**
     * Short description for the example.
     */
    summary?: string;
    /**
     * Long description for the example. CommonMark syntax MAY be used for rich
     * text representation.
     * @see https://spec.commonmark.org/
     */
    description?: string;
}

export interface InlineExample extends BaseExample {
    /**
     * Embedded literal example. The `value` field and `externalValue` field are
     * mutually exclusive. To represent examples of media types that cannot
     * naturally represented in JSON or YAML, use a string value to contain the
     * example, escaping where necessary.
     */
    value?: any;
}

export interface ExternalExample extends BaseExample {
    /**
     * A URI that points to the literal example. This provides the capability to
     * reference examples that cannot easily be included in JSON or YAML
     * documents. The `value` field and `externalValue` field are mutually
     * exclusive. See the rules for resolving Relative References.
     * @see https://spec.openapis.org/oas/v3.1.0#relative-references-in-uris
     */
    externalValue?: string;
}

export type Example = InlineExample | ExternalExample;
