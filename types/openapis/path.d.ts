import { Extendable } from './common';
import { Operation } from './operation';
import { Parameter } from './parameter';
import { Referable, Reference } from './reference';
import { Server } from './server';

/**
 * Holds the relative paths to the individual endpoints and their operations.
 * The path is appended to the URL from the [`Server
 * Object`](https://spec.openapis.org/oas/v3.1.0#serverObject) in order to
 * construct the full URL. The Paths _MAY_ be empty, due to [Access Control List
 * (ACL) constraints](https://spec.openapis.org/oas/v3.1.0#securityFiltering).
 *
 * @see https://spec.openapis.org/oas/v3.1.0#paths-object
 */
export interface Paths extends Extendable {
    /**
     * A relative path to an individual endpoint. The field name _MUST_ begin
     * with a forward slash (`/`). The path is **appended** (no relative URL
     * resolution) to the expanded URL from the [`Server
     * Object`](https://spec.openapis.org/oas/v3.1.0#serverObject)’s `url` field
     * in order to construct the full URL. [Path
     * templating](https://spec.openapis.org/oas/v3.1.0#pathTemplating) is
     * allowed. When matching URLs, concrete (non-templated) paths would be
     * matched before their templated counterparts. Templated paths with the
     * same hierarchy but different templated names _MUST NOT_ exist as they are
     * identical. In case of ambiguous matching, it’s up to the tooling to
     * decide which one to use.
     */
    [pathName: `/${string}`]: PathItem;
}

/**
 * Describes the operations available on a single path. A Path Item _MAY_ be
 * empty, due to [ACL
 * constraints](https://spec.openapis.org/oas/v3.1.0#securityFiltering). The
 * path itself is still exposed to the documentation viewer but they will not
 * know which operations and parameters are available.
 *
 * @see https://spec.openapis.org/oas/v3.1.0#path-item-object
 */
export interface PathItem extends Referable, Extendable {
    /**
     * Allows for a referenced definition of this path item. The referenced
     * structure _MUST_ be in the form of a [Path Item
     * Object](https://spec.openapis.org/oas/v3.1.0#pathItemObject). In case a
     * Path Item Object field appears both in the defined object and the
     * referenced object, the behavior is undefined. See the rules for resolving
     * [Relative
     * References](https://spec.openapis.org/oas/v3.1.0#relativeReferencesURI).
     */
    $ref?: string;
    /**
     * An optional, string summary, intended to apply to all operations in this
     * path.
     */
    summary?: string;
    /**
     * An optional, string description, intended to apply to all operations in
     * this path. [CommonMark syntax](https://spec.commonmark.org/) _MAY_ be
     * used for rich text representation.
     */
    description?: string;
    /**
     * A definition of a GET operation on this path.
     */
    get?: Operation;
    /**
     * A definition of a PUT operation on this path.
     */
    put?: Operation;
    /**
     * A definition of a POST operation on this path.
     */
    post?: Operation;
    /**
     * A definition of a DELETE operation on this path.
     */
    delete?: Operation;
    /**
     * A definition of a OPTIONS operation on this path.
     */
    options?: Operation;
    /**
     * A definition of a HEAD operation on this path.
     */
    head?: Operation;
    /**
     * A definition of a PATCH operation on this path.
     */
    patch?: Operation;
    /**
     * A definition of a TRACE operation on this path.
     */
    trace?: Operation;
    /**
     * An alternative `server` array to service all operations in this path.
     */
    server?: Server[];
    /**
     * A list of parameters that are applicable for all the operations described
     * under this path. These parameters can be overridden at the operation
     * level, but cannot be removed there. The list _MUST NOT_ include
     * duplicated parameters. A unique parameter is defined by a combination of
     * a [name](https://spec.openapis.org/oas/v3.1.0#parameterName) and
     * [location](https://spec.openapis.org/oas/v3.1.0#parameterIn). The list
     * can use the [Reference
     * Object](https://spec.openapis.org/oas/v3.1.0#referenceObject) to link to
     * parameters that are defined at the [OpenAPI Object’s
     * components/parameters](https://spec.openapis.org/oas/v3.1.0#componentsParameters).
     */
    parameters?: Array<Parameter | Reference>;
}
