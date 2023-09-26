import { Extendable } from './common';

export interface BaseExample extends Extendable {
    /**
     * Short description for the example.
     */
    summary?: string;
    /**
     * Long description for the example. [CommonMark
     * syntax](https://spec.commonmark.org/) _MAY_ be used for rich text
     * representation.
     */
    description?: string;
    value?: never;
    externalValue?: never;
}

export interface InlineExample extends Omit<BaseExample, 'value'> {
    /**
     * Embedded literal example. The `value` field and `externalValue` field are
     * mutually exclusive. To represent examples of media types that cannot
     * naturally represented in JSON or YAML, use a string value to contain the
     * example, escaping where necessary.
     */
    value?: any;
}

export interface ExternalExample extends Omit<BaseExample, 'externalValue'> {
    /**
     * A URL that points to the literal example. This provides the capability to
     * reference examples that cannot easily be included in JSON or YAML
     * documents. The `value` field and `externalValue` field are mutually
     * exclusive.
     */
    externalValue?: string;
}

/**
 * In all cases, the example value is expected to be compatible with the type
 * schema of its associated value. Tooling implementations _MAY_ choose to
 * validate compatibility automatically, and reject the example value(s) if
 * incompatible.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#example-object
 */
export type Example = InlineExample | ExternalExample;
