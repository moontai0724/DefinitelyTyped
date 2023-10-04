import { Callback } from './callback';
import { Extendable, ExternalDocs } from './common';
import { Parameter } from './parameter';
import { Reference } from './reference';
import { RequestBody } from './request';
import { Responses } from './response';
import { SecurityRequirement } from './security';
import { Server } from './server';

/**
 * Describes a single API operation on a path.
 *
 * @see https://spec.openapis.org/oas/v3.1.0#operation-object
 */
export interface Operation extends Extendable {
    /**
     * A list of tags for API documentation control. Tags can be used for
     * logical grouping of operations by resources or any other qualifier.
     */
    tags?: string[];
    /**
     * A short summary of what the operation does.
     */
    summary?: string;
    /**
     * A verbose explanation of the operation behavior. [CommonMark
     * syntax](https://spec.commonmark.org/) _MAY_ be used for rich text
     * representation.
     */
    description?: string;
    /**
     * Additional external documentation for this operation.
     */
    externalDocs?: ExternalDocs;
    /**
     * Unique string used to identify the operation. The id _MUST_ be unique
     * among all operations described in the API. The operationId value is
     * **case-sensitive**. Tools and libraries _MAY_ use the operationId to
     * uniquely identify an operation, therefore, it is _RECOMMENDED_ to follow
     * common programming naming conventions.
     */
    operationId?: string;
    /**
     * A list of parameters that are applicable for this operation. If a
     * parameter is already defined at the [Path
     * Item](https://spec.openapis.org/oas/v3.1.0#pathItemParameters), the new
     * definition will override it but can never remove it. The list _MUST NOT_
     * include duplicated parameters. A unique parameter is defined by a
     * combination of a
     * [name](https://spec.openapis.org/oas/v3.1.0#parameterName) and
     * [location](https://spec.openapis.org/oas/v3.1.0#parameterIn). The list
     * can use the [Reference
     * Object](https://spec.openapis.org/oas/v3.1.0#referenceObject) to link to
     * parameters that are defined at the [OpenAPI Object’s
     * components/parameters](https://spec.openapis.org/oas/v3.1.0#componentsParameters).
     */
    parameters?: Array<Parameter | Reference>;
    /**
     * The request body applicable for this operation. The `requestBody` is
     * fully supported in HTTP methods where the HTTP 1.1 specification
     * \[[RFC7231](https://spec.openapis.org/oas/v3.1.0#bib-RFC7231)\] has
     * explicitly defined semantics for request bodies. In other cases where the
     * HTTP spec is vague (such as
     * [GET](https://tools.ietf.org/html/rfc7231#section-4.3.1),
     * [HEAD](https://tools.ietf.org/html/rfc7231#section-4.3.2) and
     * [DELETE](https://tools.ietf.org/html/rfc7231#section-4.3.5)),
     * `requestBody` is permitted but does not have well-defined semantics and
     * _SHOULD_ be avoided if possible.
     */
    requestBody?: RequestBody | Reference;
    /**
     * The list of possible responses as they are returned from executing this
     * operation.
     */
    responses?: Responses;
    /**
     * A map of possible out-of band callbacks related to the parent operation.
     * The key is a unique identifier for the Callback Object. Each value in the
     * map is a [Callback
     * Object](https://spec.openapis.org/oas/v3.1.0#callbackObject) that
     * describes a request that may be initiated by the API provider and the
     * expected responses.
     */
    callbacks?: Record<string, Callback | Reference>;
    /**
     * Declares this operation to be deprecated. Consumers _SHOULD_ refrain from
     * usage of the declared operation.
     * 
     * @default false
     */
    deprecated?: boolean;
    /**
     * A declaration of which security mechanisms can be used for this
     * operation. The list of values includes alternative security requirement
     * objects that can be used. Only one of the security requirement objects
     * need to be satisfied to authorize a request. To make security optional,
     * an empty security requirement (`{}`) can be included in the array. This
     * definition overrides any declared top-level
     * [`security`](https://spec.openapis.org/oas/v3.1.0#oasSecurity). To remove
     * a top-level security declaration, an empty array can be used.
     */
    security?: SecurityRequirement[];
    /**
     * An alternative `server` array to service this operation. If an
     * alternative `server` object is specified at the Path Item Object or Root
     * level, it will be overridden by this value.
     */
    servers?: Server[];
}
