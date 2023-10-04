import { Extendable } from './common';

/**
 * An object representing a Server Variable for server URL template
 * substitution.
 *
 * @see https://spec.openapis.org/oas/v3.1.0#server-variable-object
 */
export interface ServerVariable extends Extendable {
    /**
     * An enumeration of string values to be used if the substitution options
     * are from a limited set. The array _MUST NOT_ be empty.
     */
    enum?: string[];
    /**
     * The default value to use for substitution, which _SHALL_ be sent if an
     * alternate value is _not_ supplied. Note this behavior is different than
     * the [Schema Object’s](https://spec.openapis.org/oas/v3.1.0#schemaObject)
     * treatment of default values, because in those cases parameter values are
     * optional. If the
     * [`enum`](https://spec.openapis.org/oas/v3.1.0#serverVariableEnum) is
     * defined, the value _MUST_ exist in the enum’s values.
     */
    default: string;
    /**
     * An optional description for the server variable. [CommonMark
     * syntax](https://spec.commonmark.org/) _MAY_ be used for rich text
     * representation.
     */
    description?: string;
}

/**
 * An object representing a Server.
 *
 * @see https://spec.openapis.org/oas/v3.1.0#server-object
 */
export interface Server extends Extendable {
    /**
     * A URL to the target host. This URL supports Server Variables and _MAY_ be
     * relative, to indicate that the host location is relative to the location
     * where the OpenAPI document is being served. Variable substitutions will
     * be made when a variable is named in `{`brackets`}`.
     */
    url: string;
    /**
     * An optional string describing the host designated by the URL. [CommonMark
     * syntax](https://spec.commonmark.org/) _MAY_ be used for rich text
     * representation.
     */
    description?: string;
    /**
     * A map between a variable name and its value. The value is used for
     * substitution in the server’s URL template.
     */
    variables?: Record<string, ServerVariable>;
}
