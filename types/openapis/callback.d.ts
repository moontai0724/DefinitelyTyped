import { Extendable } from './common';
import { PathItem } from './path';

/**
 * A map of possible out-of band callbacks related to the parent operation. Each
 * value in the map is a [Path Item
 * Object](https://spec.openapis.org/oas/v3.0.3#pathItemObject) that describes a
 * set of requests that may be initiated by the API provider and the expected
 * responses. The key value used to identify the path item object is an
 * expression, evaluated at runtime, that identifies a URL to use for the
 * callback operation.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#callback-object
 */
export interface Callback extends Extendable {
    /**
     * A Path Item Object used to define a callback request and expected
     * responses. A [complete
     * example](https://github.com/OAI/OpenAPI-Specification/tree/master/examples/v3.0/callback-example.yaml)
     * is available.
     *
     * The key that identifies the [Path Item
     * Object](https://spec.openapis.org/oas/v3.0.3#pathItemObject) is a
     * [runtime
     * expression](https://spec.openapis.org/oas/v3.0.3#runtimeExpression) that
     * can be evaluated in the context of a runtime HTTP request/response to
     * identify the URL to be used for the callback request. A simple example
     * might be `$request.body#/url`. However, using a [runtime
     * expression](https://spec.openapis.org/oas/v3.0.3#runtimeExpression) the
     * complete HTTP message can be accessed. This includes accessing any part
     * of a body that a JSON Pointer
     * \[[RFC6901](https://spec.openapis.org/oas/v3.0.3#bib-RFC6901)\] can
     * reference.
     *
     * @see https://spec.openapis.org/oas/v3.0.3#key-expression
     */
    [url: string]: PathItem;
}
