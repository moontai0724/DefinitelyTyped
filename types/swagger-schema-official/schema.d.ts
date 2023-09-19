import { Extendable, ExternalDocs } from './common';
import { Reference } from './reference';

/**
 * When request bodies or response payloads may be one of a number of different
 * schemas, a `discriminator` object can be used to aid in serialization,
 * deserialization, and validation. The discriminator is a specific object in a
 * schema which is used to inform the consumer of the document of an alternative
 * schema based on the value associated with it.
 *
 * When using the discriminator, _inline_ schemas will not be considered.
 */
export interface Discriminator<PropertyName extends string = string> extends Extendable {
    /**
     * The name of the property in the payload that will hold the discriminator
     * value.
     */
    propertyName: PropertyName;
    /**
     * An object to hold mappings between payload values and schema names or
     * references.
     */
    mapping?: Record<string, string>;
}

/**
 * A metadata object that allows for more fine-tuned XML model definitions. When
 * using arrays, XML element names are not inferred (for singular/plural forms)
 * and the `name` property SHOULD be used to add that information. See examples
 * for expected behavior.
 *
 * @see https://swagger.io/docs/specification/data-models/representing-xml/
 */
export interface XML extends Extendable {
    /**
     * Replaces the name of the element/attribute used for the described schema
     * property. When defined within `items`, it will affect the name of the
     * individual XML elements within the list. When defined alongside `type`
     * being `array` (outside the `items`), it will affect the wrapping element
     * and only if `wrapped` is `true`. If `wrapped` is `false`, it will be
     * ignored.
     */
    name?: string;
    /**
     * The URI of the namespace definition. This MUST be in the form of an
     * absolute URI.
     */
    namespace?: string;
    /**
     * The prefix to be used for the `name`.
     */
    prefix?: string;
    /**
     * Declares whether the property definition translates to an attribute
     * instead of an element.
     *
     * @default false
     */
    attribute?: boolean;
    /**
     * MAY be used only for an array definition. Signifies whether the array is
     * wrapped (for example, `<books><book/><book/></books>`) or unwrapped
     * (`<book/><book/>`). The definition takes effect only when defined
     * alongside `type` being `array` (outside the `items`).
     * @default false
     */
    wrapped?: boolean;
}

/**
 * The Schema Object allows the definition of input and output data types. These
 * types can be objects, but also primitives and arrays. This object is a
 * superset of the JSON Schema Specification Draft 2020-12.
 *
 * For more information about the properties, see JSON Schema Core and JSON
 * Schema Validation.
 *
 * @see https://tools.ietf.org/html/draft-bhutton-json-schema-00
 * @see https://tools.ietf.org/html/draft-bhutton-json-schema-validation-00
 *
 * Unless stated otherwise, the property definitions follow those of JSON Schema
 * and do not add any additional semantics. Where JSON Schema indicates that
 * behavior is defined by the application (e.g. for annotations), OAS also
 * defers the definition of semantics to the application consuming the OpenAPI
 * document.
 *
 * @see https://spec.openapis.org/oas/v3.1.0#schema-object
 */
export interface BaseSchema extends Extendable {
    /**
     * This MAY be used only on properties schemas. It has no effect on root
     * schemas. Adds additional metadata to describe the XML representation of
     * this property.
     */
    xml?: XML;
    /**
     * Additional external documentation for this schema.
     */
    externalDocs?: ExternalDocs;
    /**
     * A free-form property to include an example of an instance for this
     * schema. To represent examples that cannot be naturally represented in
     * JSON or YAML, a string value can be used to contain the example with
     * escaping where necessary.
     *
     * @deprecated The `example` property has been deprecated in favor of the
     * JSON Schema `examples` keyword. Use of `example` is discouraged, and
     * later versions of this specification may remove it.
     */
    example?: any;
}

interface BaseComposition extends BaseSchema {
    /**
     * Adds support for polymorphism. The discriminator is an object name that
     * is used to differentiate between other schemas which may satisfy the
     * payload description. See Composition and Inheritance for more details.
     */
    discriminator?: Discriminator;
}

export interface OneOfSchema extends BaseComposition {
    oneOf: Array<Schema | Reference>;
}

export interface AnyOfSchema extends BaseComposition {
    anyOf: Array<Schema | Reference>;
}

export interface AllOfSchema extends BaseComposition {
    allOf: Array<Schema | Reference>;
}

export interface NotSchema extends BaseSchema {
    not: Schema | Reference;
}

export type CompositionSchema = OneOfSchema | AnyOfSchema | AllOfSchema | NotSchema;

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/
 */
export type SchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object';

export interface TypedSchema extends BaseSchema {
    type: SchemaType;
    /**
     * OpenAPI 3.0 does not have an explicit `null` type as in JSON Schema, but
     * you can use `nullable: true` to specify that the value may be `null`.
     * Note that `null` is different from an empty string "".
     *
     * In objects, a nullable property is not the same as an optional property,
     * but some tools may choose to map an optional property to the null value.
     */
    nullable?: boolean;
    /**
     * `readOnly` properties are included in responses but not in requests.
     *
     * If a `readOnly` or `writeOnly` property is included in the required list,
     * required affects just the relevant scope – responses only or requests
     * only. That is, read-only required properties apply to responses only, and
     * write-only required properties – to requests only.
     */
    readOnly?: boolean;
    /**
     * `writeOnly` properties may be sent in requests but not in responses.
     *
     * If a `readOnly` or `writeOnly` property is included in the required list,
     * required affects just the relevant scope – responses only or requests
     * only. That is, read-only required properties apply to responses only, and
     * write-only required properties – to requests only.
     */
    writeOnly?: boolean;
}

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/#number
 */
export type SchemaNumberFormat = 'float' | 'double';

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/#number
 */
export interface NumberSchema extends TypedSchema {
    type: 'number';
    /**
     * An optional format keyword serves as a hint for the tools to use a
     * specific numeric type:
     */
    format?: SchemaNumberFormat;
    /**
     * The minimum valid value for the number.
     */
    minimum?: number;
    /**
     * The maximum valid value for the number.
     */
    maximum?: number;
    /**
     * Specifies that a maximum value is valid, exclusive.
     * @default false
     */
    exclusiveMaximum?: boolean;
    /**
     * Specifies that a minimum value is valid, exclusive.
     * @default false
     */
    exclusiveMinimum?: boolean;
    /**
     * Specifies that the number must be a multiple of the given value.
     */
    multipleOf?: number;
}

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/#number
 */
export type SchemaIntegerFormat = 'int32' | 'int64';

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/#number
 */
export interface IntegerSchema extends TypedSchema {
    type: 'integer';
    /**
     * An optional format keyword serves as a hint for the tools to use a
     * specific numeric type:
     */
    format?: SchemaIntegerFormat;
    /**
     * The minimum valid value for the number.
     */
    minimum?: number;
    /**
     * The maximum valid value for the number.
     */
    maximum?: number;
    /**
     * Specifies that a maximum value is valid, exclusive.
     * @default false
     */
    exclusiveMaximum?: boolean;
    /**
     * Specifies that a minimum value is valid, exclusive.
     * @default false
     */
    exclusiveMinimum?: boolean;
    /**
     * Specifies that the number must be a multiple of the given value.
     */
    multipleOf?: number;
}

/**
 * An optional format modifier serves as a hint at the contents and format of
 * the string. OpenAPI defines the following built-in string formats:
 * - date – full-date notation as defined by RFC 3339, section 5.6, for example,
 *   _2017-07-21_
 * - date-time – the date-time notation as defined by RFC 3339, section 5.6, for
 *   example, _2017-07-21T17:32:28Z_
 * - password – a hint to UIs to mask the input
 * - byte – base64-encoded characters, for example, _U3dhZ2dlciByb2Nrcw==_
 * - binary – binary data, used to describe files (see Files below)
 *
 * However, format is an open value, so you can use any formats, even not those
 * defined by the OpenAPI Specification, such as:
 * - email
 * - uuid
 * - uri
 * - hostname
 * - ipv4
 * - ipv6
 * - and others
 *
 * @see https://swagger.io/docs/specification/data-models/data-types/#string
 */
export type SchemaStringFormat = 'date' | 'date-time' | 'password' | 'byte' | 'binary';

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/#string
 */
export interface StringSchema extends TypedSchema {
    type: 'string';
    /**
     * An optional format modifier serves as a hint at the contents and format
     * of the string.
     */
    format?: SchemaStringFormat | string;
    /**
     * The pattern keyword lets you define a regular expression template for the
     * string value. Only the values that match this template will be accepted.
     * The regular expression syntax used is from JavaScript (more specifically,
     * ECMA 262). Regular expressions are case-sensitive, that is, [a-z] and
     * [A-Z] are different expressions.
     */
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    /**
     * @see https://swagger.io/docs/specification/data-models/enums/
     */
    enum?: string[];
}

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/#boolean
 */
export interface BooleanSchema extends TypedSchema {
    type: 'boolean';
}

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/#array
 */
export interface ArraySchema extends TypedSchema {
    type: 'array';
    /**
     * The `items` keyword defines an array of items that are allowed in the
     * array.
     *
     * The `items` keyword can define an array of schemas or a single schema.
     * What the array is composed of is specified by the `type` keyword.
     */
    items: CompositionSchema | NormalSchema[];
    /**
     * The `maxItems` keyword specifies the maximum number of items that can be
     * contained in the array.
     */
    maxItems?: number;
    /**
     * The `minItems` keyword specifies the minimum number of items that can be
     * contained in the array. Without `minItems`, an empty array is considered
     * valid.
     */
    minItems?: number;
    /**
     * The `uniqueItems` keyword specifies that all items in the array MUST be
     * unique. The keyword value MUST be a boolean. When not present, the
     * default value is `false`.
     *
     * @default false
     */
    uniqueItems?: boolean;
}

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/#object
 */
export interface ObjectSchema extends TypedSchema {
    type: 'object';
    properties: Record<string, Schema>;
    /**
     * The `required` keyword specifies an array of property names that must be
     * present in the object. An empty list `required: []` is not valid. If all
     * properties are optional, do not specify the required keyword.
     */
    required?: string[];
}

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/#free-form
 */
export interface FreeFormObjectSchema extends TypedSchema {
    type: 'object';
    additionalProperties?: true | Schema;
    minProperties?: number;
    maxProperties?: number;
}

export type NormalSchema =
    | NumberSchema
    | IntegerSchema
    | StringSchema
    | BooleanSchema
    | ArraySchema
    | ObjectSchema
    | FreeFormObjectSchema
    | Reference;

/**
 * @see https://spec.openapis.org/oas/v3.1.0#parameter-object
 * @see https://swagger.io/docs/specification/data-models/data-types
 */
export type Schema = CompositionSchema | NormalSchema;
