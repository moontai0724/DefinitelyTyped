import { Callback } from './callback';
import { Extendable, ExternalDocs } from './common';
import { Example } from './example';
import { Header } from './header';
import { Info } from './info';
import { Link } from './link';
import { Parameter } from './parameter';
import { Paths } from './path';
import { Reference } from './reference';
import { RequestBody } from './request';
import { Response } from './response';
import { Schema } from './schema';
import { SecurityScheme, SecurityRequirement } from './security';
import { Server } from './server';
import { Tag } from './tag';

/**
 * Holds a set of reusable objects for different aspects of the OAS. All objects
 * defined within the components object will have no effect on the API unless
 * they are explicitly referenced from properties outside the components object.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#components-object
 */
export interface Components extends Extendable {
    /**
     * An object to hold reusable [Schema
     * Objects](https://spec.openapis.org/oas/v3.0.3#schemaObject).
     */
    schemas?: Record<string, Schema | Reference>;
    /**
     * An object to hold reusable [Response
     * Objects](https://spec.openapis.org/oas/v3.0.3#responseObject).
     */
    responses?: Record<string, Response | Reference>;
    /**
     * An object to hold reusable [Parameter
     * Objects](https://spec.openapis.org/oas/v3.0.3#parameterObject).
     */
    parameters?: Record<string, Parameter | Reference>;
    /**
     * An object to hold reusable [Example
     * Objects](https://spec.openapis.org/oas/v3.0.3#exampleObject).
     */
    examples?: Record<string, Example | Reference>;
    /**
     * An object to hold reusable [Request Body
     * Objects](https://spec.openapis.org/oas/v3.0.3#requestBodyObject).
     */
    requestBodies?: Record<string, RequestBody | Reference>;
    /**
     * An object to hold reusable [Header
     * Objects](https://spec.openapis.org/oas/v3.0.3#headerObject).
     */
    headers?: Record<string, Header | Reference>;
    /**
     * An object to hold reusable [Security Scheme
     * Objects](https://spec.openapis.org/oas/v3.0.3#securitySchemeObject).
     */
    securitySchemes?: Record<string, SecurityScheme | Reference>;
    /**
     * An object to hold reusable [Link
     * Objects](https://spec.openapis.org/oas/v3.0.3#linkObject).
     */
    links?: Record<string, Link | Reference>;
    /**
     * An object to hold reusable [Callback
     * Objects](https://spec.openapis.org/oas/v3.0.3#callbackObject).
     */
    callbacks?: Record<string, Callback | Reference>;
}

/**
 * This is the root document object of the [OpenAPI
 * document](https://spec.openapis.org/oas/v3.0.3#oasDocument).
 */
export interface OpenAPI extends Extendable {
    /**
     * This string _MUST_ be the [semantic version
     * number](https://semver.org/spec/v2.0.0.html) of the [OpenAPI
     * Specification version](https://spec.openapis.org/oas/v3.0.3#versions)
     * that the OpenAPI document uses. The `openapi` field _SHOULD_ be used by
     * tooling specifications and clients to interpret the OpenAPI document.
     * This is _not_ related to the API
     * [`info.version`](https://spec.openapis.org/oas/v3.0.3#infoVersion)
     * string.
     */
    openapi: `3.0.${string}`;
    /**
     * Provides metadata about the API. The metadata _MAY_ be used by tooling as
     * required.
     */
    info: Info;
    /**
     * An array of Server Objects, which provide connectivity information to a
     * target server. If the `servers` property is not provided, or is an empty
     * array, the default value would be a [Server
     * Object](https://spec.openapis.org/oas/v3.0.3#serverObject) with a
     * [url](https://spec.openapis.org/oas/v3.0.3#serverUrl) value of `/`.
     */
    servers?: Server[];
    /**
     * The available paths and operations for the API.
     */
    paths: Paths;
    /**
     * An element to hold various schemas for the specification.
     */
    components?: Components;
    /**
     * A declaration of which security mechanisms can be used across the API.
     * The list of values includes alternative security requirement objects that
     * can be used. Only one of the security requirement objects need to be
     * satisfied to authorize a request. Individual operations can override this
     * definition. To make security optional, an empty security requirement
     * (`{}`) can be included in the array.
     */
    security?: SecurityRequirement[];
    /**
     * A list of tags used by the specification with additional metadata. The
     * order of the tags can be used to reflect on their order by the parsing
     * tools. Not all tags that are used by the [Operation
     * Object](https://spec.openapis.org/oas/v3.0.3#operationObject) must be
     * declared. The tags that are not declared _MAY_
     */
    tags?: Tag[];
    /**
     * Additional external documentation.
     */
    externalDocs?: ExternalDocs;
}
