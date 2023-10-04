import { Extendable } from './common';
import { Server } from './server';

export interface BaseLink extends Extendable {
    operationRef?: never;
    operationId?: never;
    /**
     * A map representing parameters to pass to an operation as specified with
     * `operationId` or identified via `operationRef`. The key is the parameter
     * name to be used, whereas the value can be a constant or an expression to
     * be evaluated and passed to the linked operation. The parameter name can
     * be qualified using the [parameter
     * location](https://spec.openapis.org/oas/v3.1.0#parameterIn)
     * `[{in}.]{name}` for operations that use the same parameter name in
     * different locations (e.g. [path.id](http://path.id/)).
     */
    parameters?: Record<string, any>;
    /**
     * A literal value or
     * [{expression}](https://spec.openapis.org/oas/v3.1.0#runtimeExpression) to
     * use as a request body when calling the target operation.
     */
    requestBody?: any;
    /**
     * A description of the link. [CommonMark
     * syntax](https://spec.commonmark.org/) _MAY_ be used for rich text
     * representation.
     */
    description?: string;
    /**
     * A server object to be used by the target operation.
     */
    server?: Server;
}

export interface ReferencedLink extends Omit<BaseLink, 'operationRef'> {
    /**
     * A relative or absolute URI reference to an OAS operation. This field is
     * mutually exclusive of the `operationId` field, and _MUST_ point to an
     * [Operation Object](https://spec.openapis.org/oas/v3.1.0#operationObject).
     * Relative `operationRef` values _MAY_ be used to locate an existing
     * [Operation Object](https://spec.openapis.org/oas/v3.1.0#operationObject)
     * in the OpenAPI definition. See the rules for resolving [Relative
     * References](https://spec.openapis.org/oas/v3.1.0#relativeReferencesURI).
     */
    operationRef?: string;
}

export interface IdSpecifiedLink extends Omit<BaseLink, 'operationId'> {
    /**
     * The name of an _existing_, resolvable OAS operation, as defined with a
     * unique `operationId`. This field is mutually exclusive of the
     * `operationRef` field.
     */
    operationId?: string;
}

/**
 * The `Link object` represents a possible design-time link for a response. The
 * presence of a link does not guarantee the caller’s ability to successfully
 * invoke it, rather it provides a known relationship and traversal mechanism
 * between responses and other operations.
 *
 * Unlike _dynamic_ links (i.e. links provided **in** the response payload), the
 * OAS linking mechanism does not require link information in the runtime
 * response.
 *
 * For computing links, and providing instructions to execute them, a [runtime
 * expression](https://spec.openapis.org/oas/v3.1.0#runtimeExpression) is used
 * for accessing values in an operation and using them as parameters while
 * invoking the linked operation.
 *
 * @see https://spec.openapis.org/oas/v3.1.0#link-object
 */
export type Link = ReferencedLink | IdSpecifiedLink;
