import { Extendable } from './common';
import { Operation } from './operation';
import { Parameter } from './parameter';
import { Referable, Reference } from './reference';
import { Server } from './server';

/**
 * Holds the relative paths to the individual endpoints and their operations.
 * The path is appended to the URL from the Server Object in order to construct
 * the full URL. The Paths MAY be empty, due to Access Control List (ACL)
 * constraints.
 * @see https://spec.openapis.org/oas/v3.1.0#paths-object
 */
export interface Paths extends Extendable {
    /**
     * A relative path to an individual endpoint. The field name MUST begin with
     * a forward slash (`/`). The path is appended (no relative URL resolution)
     * to the expanded URL from the Server Object's `url` field in order to
     * construct the full URL. Path templating is allowed. When matching URLs,
     * concrete (non-templated) paths would be matched before their templated
     * counterparts. Templated paths with the same hierarchy but different
     * templated names MUST NOT exist as they are identical. In case of
     * ambiguous matching, it's up to the tooling to decide which one to use.
     * @see https://spec.openapis.org/oas/v3.1.0#path-templating
     */
    [pathName: `/${string}`]: PathItem;
}

/**
 * Describes the operations available on a single path. A Path Item MAY be
 * empty, due to ACL constraints. The path itself is still exposed to the
 * documentation viewer but they will not know which operations and parameters
 * are available.
 * @see https://spec.openapis.org/oas/v3.1.0#path-item-object
 * @see https://spec.openapis.org/oas/v3.1.0#security-filtering
 */
export interface PathItem extends Referable, Extendable {
    /**
     * Allows for a referenced definition of this path item. The referenced
     * structure MUST be in the form of a Path Item Object. In case a Path Item
     * Object field appears both in the defined object and the referenced
     * object, the behavior is undefined. See the rules for resolving Relative
     * References.
     */
    $ref?: string;
    /**
     * An optional, string summary, intended to apply to all operations in this
     * path.
     */
    summary?: string;
    /**
     * An optional, string description, intended to apply to all operations in
     * this path. CommonMark syntax MAY be used for rich text representation.
     * @see https://spec.commonmark.org/
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
     * level, but cannot be removed there. The list MUST NOT include duplicated
     * parameters. A unique parameter is defined by a combination of a name and
     * location. The list can use the Reference Object to link to parameters
     * that are defined at the OpenAPI Object's components/parameters.
     */
    parameters?: Array<Parameter | Reference>;
}
