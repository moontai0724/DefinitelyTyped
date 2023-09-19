import { Extendable } from './common';
import { PathItem } from './path';
import { Reference } from './reference';

/**
 * A map of possible out-of band callbacks related to the parent operation. Each
 * value in the map is a Path Item Object that describes a set of requests that
 * may be initiated by the API provider and the expected responses. The key
 * value used to identify the path item object is an expression, evaluated at
 * runtime, that identifies a URL to use for the callback operation.
 *
 * To describe incoming requests from the API provider independent from another
 * API call, use the webhooks field.
 *
 * @see https://spec.openapis.org/oas/v3.1.0#callback-object
 * @see https://spec.openapis.org/oas/v3.1.0#runtime-expressions
 */
export interface Callback extends Extendable {
    /**
     * A Path Item Object, or a reference to one, used to define a callback
     * request and expected responses.
     *
     * The key that identifies the Path Item Object is a runtime expression that
     * can be evaluated in the context of a runtime HTTP request/response to
     * identify the URL to be used for the callback request. A simple example
     * might be `$request.body#/url`. However, using a runtime expression the
     * complete HTTP message can be accessed. This includes accessing any part
     * of a body that a JSON Pointer RFC6901 can reference.
     *
     * @see https://spec.openapis.org/oas/v3.1.0#runtime-expressions
     * @see https://tools.ietf.org/html/rfc6901
     */
    [url: string]: PathItem | Reference;
}
