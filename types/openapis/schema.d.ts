import { Extendable, ExternalDocs } from './common';
import { Reference } from './reference';

/**
 * When request bodies or response payloads may be one of a number of different
 * schemas, a `discriminator` object can be used to aid in serialization,
 * deserialization, and validation. The discriminator is a specific object in a
 * schema which is used to inform the consumer of the specification of an
 * alternative schema based on the value associated with it.
 *
 * When using the discriminator, _inline_ schemas will not be considered.
 *
 * The discriminator object is legal only when using one of the composite
 * keywords `oneOf`, `anyOf`, `allOf`.
 */
export interface Discriminator extends Extendable {
    /**
     * The name of the property in the payload that will hold the discriminator
     * value.
     */
    propertyName: string;
    /**
     * An object to hold mappings between payload values and schema names or
     * references.
     */
    mapping?: Record<string, string>;
}

/**
 * A metadata object that allows for more fine-tuned XML model definitions.
 *
 * When using arrays, XML element names are _not_ inferred (for singular/plural
 * forms) and the `name` property _SHOULD_ be used to add that information. See
 * examples for expected behavior.
 *
 * @see https://spec.openapis.org/oas/v3.0.3#xml-object
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
     * The URI of the namespace definition. Value _MUST_ be in the form of an
     * absolute URI.
     */
    namespace?: string;
    /**
     * The prefix to be used for the
     * [name](https://spec.openapis.org/oas/v3.0.3#xmlName).
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
     * _MAY_ be used only for an array definition. Signifies whether the array
     * is wrapped (for example, `<books><book/><book/></books>`) or unwrapped
     * (`<book/><book/>`). Default value is `false`. The definition takes effect
     * only when defined alongside `type` being `array` (outside the `items`).
     * @default false
     */
    wrapped?: boolean;
}

/**
 * Schemas from [OpenAPI v3.0.3 Schema
 * Object](https://spec.openapis.org/oas/v3.0.3#schema-object)
 */
interface AllSchema {
    title?: never;
    multipleOf?: never;
    maximum?: never;
    exclusiveMaximum?: never;
    minimum?: never;
    exclusiveMinimum?: never;
    maxLength?: never;
    minLength?: never;
    pattern?: never;
    maxItems?: never;
    minItems?: never;
    uniqueItems?: never;
    maxProperties?: never;
    minProperties?: never;
    required?: never;
    enum?: never;
    type?: never;
    allOf?: never;
    oneOf?: never;
    anyOf?: never;
    not?: never;
    items?: never;
    properties?: never;
    additionalProperties?: never;
    description?: never;
    format?: never;
    default?: never;
    nullable?: never;
    discriminator?: never;
    readOnly?: never;
    writeOnly?: never;
    xml?: never;
    externalDocs?: never;
    example?: never;
    deprecated?: never;
}

/**
 * @see https://spec.openapis.org/oas/v3.0.3#schema-object
 */
export interface BaseSchema extends Omit<AllSchema, 'title' | 'description'> {
    /**
     * The value of both of these keywords MUST be a string.
     *
     * Both of these keywords can be used to decorate a user interface with
     * information about the data produced by this user interface.  A title will
     * preferrably be short, whereas a description will provide explanation
     * about the purpose of the instance described by this schema.The value of
     * both of these keywords MUST be a string. Both of these keywords can be
     * used to decorate a user interface with information about the data
     * produced by this user interface.  A title will preferrably be short,
     * whereas a description will provide explanation about the purpose of the
     * instance described by this schema.
     *
     * Both of these keywords MAY be used in root schemas, and in any
     * subschemas.
     */
    title?: string;
    /**
     * The value of both of these keywords MUST be a string.
     *
     * Both of these keywords can be used to decorate a user interface with
     * information about the data produced by this user interface.  A title will
     * preferrably be short, whereas a description will provide explanation
     * about the purpose of the instance described by this schema.The value of
     * both of these keywords MUST be a string. Both of these keywords can be
     * used to decorate a user interface with information about the data
     * produced by this user interface.  A title will preferrably be short,
     * whereas a description will provide explanation about the purpose of the
     * instance described by this schema.
     *
     * Both of these keywords MAY be used in root schemas, and in any
     * subschemas.
     *
     * [CommonMark syntax](https://spec.commonmark.org/) _MAY_ be used for rich
     * text representation.
     */
    description?: string;
}

interface BaseComposition extends Omit<BaseSchema, 'discriminator'> {
    /**
     * Adds support for polymorphism. The discriminator is an object name that
     * is used to differentiate between other schemas which may satisfy the
     * payload description. See [Composition and
     * Inheritance](https://spec.openapis.org/oas/v3.0.3#schemaComposition) for
     * more details.
     */
    discriminator?: Discriminator;
}

export interface OneOfSchema extends Omit<BaseComposition, 'oneOf'> {
    /**
     * Inline or referenced schema _MUST_ be of a [Schema
     * Object](https://spec.openapis.org/oas/v3.0.3#schemaObject) and not a
     * standard JSON Schema.
     */
    oneOf: Array<Schema | Reference>;
}

export interface AnyOfSchema extends Omit<BaseComposition, 'anyOf'> {
    /**
     * Inline or referenced schema _MUST_ be of a [Schema
     * Object](https://spec.openapis.org/oas/v3.0.3#schemaObject) and not a
     * standard JSON Schema.
     */
    anyOf: Array<Schema | Reference>;
}

export interface AllOfSchema extends Omit<BaseComposition, 'allOf'> {
    /**
     * Inline or referenced schema _MUST_ be of a [Schema
     * Object](https://spec.openapis.org/oas/v3.0.3#schemaObject) and not a
     * standard JSON Schema.
     */
    allOf: Array<Schema | Reference>;
}

export interface NotSchema extends Omit<BaseSchema, 'not'> {
    /**
     * Inline or referenced schema _MUST_ be of a [Schema
     * Object](https://spec.openapis.org/oas/v3.0.3#schemaObject) and not a
     * standard JSON Schema.
     */
    not: Schema | Reference;
}

export type CompositionSchema = OneOfSchema | AnyOfSchema | AllOfSchema | NotSchema;

export type SchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object';

export interface TypedSchema
    extends Omit<
        BaseSchema,
        | 'type'
        | 'nullable'
        | 'discriminator'
        | 'readOnly'
        | 'writeOnly'
        | 'xml'
        | 'externalDocs'
        | 'example'
        | 'deprecated'
        | 'enum'
        | 'default'
    > {}

/**
 * @see https://spec.openapis.org/oas/v3.0.3#properties
 * @see https://datatracker.ietf.org/doc/html/draft-wright-json-schema-00
 * @see
 * https://datatracker.ietf.org/doc/html/draft-wright-json-schema-validation-00
 */
export interface TypedSchema {
    /**
     * The value of this keyword MUST be either a string or an array.  If it is
     * an array, elements of the array MUST be strings and MUST be unique.
     *
     * String values MUST be one of the seven primitive types defined by the
     * core specification.
     *
     * An instance matches successfully if its primitive type is one of the
     * types defined by keyword.  Recall: "number" includes "integer". Value
     * _MUST_ be a string. Multiple types via an array are not supported.
     */
    type?: SchemaType;
}

/**
 * @see https://spec.openapis.org/oas/v3.0.3#fixed-fields-19
 */
export interface TypedSchema {
    /**
     * A `true` value adds `"null"` to the allowed type specified by the `type`
     * keyword, only if `type` is explicitly defined within the same Schema
     * Object. Other Schema Object constraints retain their defined behavior,
     * and therefore may disallow the use of `null` as a value. A `false` value
     * leaves the specified or default `type` unmodified. The default value is
     * `false`.
     */
    nullable?: boolean;
    /**
     * Relevant only for Schema `"properties"` definitions. Declares the
     * property as “read only”. This means that it _MAY_ be sent as part of a
     * response but _SHOULD NOT_ be sent as part of the request. If the property
     * is marked as `readOnly` being `true` and is in the `required` list, the
     * `required` will take effect on the response only. A property _MUST NOT_
     * be marked as both `readOnly` and `writeOnly` being `true`. Default value
     * is `false`.
     */
    readOnly?: boolean;
    /**
     * Relevant only for Schema `"properties"` definitions. Declares the
     * property as “write only”. Therefore, it _MAY_ be sent as part of a
     * request but _SHOULD NOT_ be sent as part of the response. If the property
     * is marked as `writeOnly` being `true` and is in the `required` list, the
     * `required` will take effect on the request only. A property _MUST NOT_ be
     * marked as both `readOnly` and `writeOnly` being `true`. Default value is
     * `false`.
     */
    writeOnly?: boolean;
    /**
     * This _MAY_ be used only on properties schemas. It has no effect on root
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
     */
    example?: any;
    /**
     * Specifies that a schema is deprecated and _SHOULD_ be transitioned out of
     * usage.
     *
     * @default false
     */
    deprecated?: boolean;
    /**
     * The value of this keyword MUST be an array.  This array SHOULD have at
     * least one element.  Elements in the array SHOULD be unique.
     *
     * Elements in the array MAY be of any type, including null.
     *
     * An instance validates successfully against this keyword if its value is
     * equal to one of the elements in this keyword's array value.
     */
    enum?: any[];
    /**
     * There are no restrictions placed on the value of this keyword.
     *
     * This keyword can be used to supply a default JSON value associated with a
     * particular schema.  It is RECOMMENDED that a default value be valid
     * against the associated schema.
     *
     * This keyword MAY be used in root schemas, and in any subschemas.
     *
     * The default value represents what would be assumed by the consumer of the
     * input as the value of the schema if one is not provided. Unlike JSON
     * Schema, the value _MUST_ conform to the defined type for the Schema
     * Object defined at the same level. For example, if `type` is `string`,
     * then `default` can be `"foo"` but cannot be `1`.
     */
    default?: any;
}

export type SchemaNumberFormat = 'float' | 'double';

interface BaseNumberSchema
    extends Omit<TypedSchema, 'multipleOf' | 'maximum' | 'exclusiveMaximum' | 'minimum' | 'exclusiveMinimum'> {
    /**
     * The value of "multipleOf" MUST be a number, strictly greater than 0.
     *
     * A numeric instance is only valid if division by this keyword's value
     * results in an integer.
     */
    multipleOf?: number;
    /**
     * The value of "maximum" MUST be a number, representing an upper limit for
     * a numeric instance.
     *
     * If the instance is a number, then this keyword validates if
     * "exclusiveMaximum" is true and instance is less than the provided value,
     * or else if the instance is less than or exactly equal to the provided
     * value.
     */
    maximum?: number;
    /**
     * The value of "exclusiveMaximum" MUST be a boolean, representing whether
     * the limit in "maximum" is exclusive or not.  An undefined value is the
     * same as false.
     *
     * If "exclusiveMaximum" is true, then a numeric instance SHOULD NOT be
     * equal to the value specified in "maximum".  If "exclusiveMaximum" is
     * false (or not specified), then a numeric instance MAY be equal to the
     * value of "maximum".
     *
     * @default false
     */
    exclusiveMaximum?: boolean;
    /**
     * The value of "minimum" MUST be a number, representing a lower limit for a
     * numeric instance.
     *
     * If the instance is a number, then this keyword validates if
     * "exclusiveMinimum" is true and instance is greater than the provided
     * value, or else if the instance is greater than or exactly equal to the
     * provided value.
     */
    minimum?: number;
    /**
     * The value of "exclusiveMinimum" MUST be a boolean, representing whether
     * the limit in "minimum" is exclusive or not.  An undefined value is the
     * same as false.
     *
     * If "exclusiveMinimum" is true, then a numeric instance SHOULD NOT be
     * equal to the value specified in "minimum".  If "exclusiveMinimum" is
     * false (or not specified), then a numeric instance MAY be equal to the
     * value of "minimum".
     *
     * @default false
     */
    exclusiveMinimum?: boolean;
}

export interface NumberSchema extends Omit<BaseNumberSchema, 'format'> {
    type?: 'number';
    /**
     * See [Data Type
     * Formats](https://spec.openapis.org/oas/v3.0.3#dataTypeFormat) for further
     * details. While relying on JSON Schema’s defined formats, the OAS offers a
     * few additional predefined formats.
     */
    format?: SchemaNumberFormat;
    default?: number;
}

export type SchemaIntegerFormat = 'int32' | 'int64';

export interface IntegerSchema extends Omit<BaseNumberSchema, 'format'> {
    type?: 'integer';
    /**
     * See [Data Type
     * Formats](https://spec.openapis.org/oas/v3.0.3#dataTypeFormat) for further
     * details. While relying on JSON Schema’s defined formats, the OAS offers a
     * few additional predefined formats.
     */
    format?: SchemaIntegerFormat;
    default?: number;
}

export interface StringSchema extends Omit<TypedSchema, 'format' | 'pattern' | 'minLength' | 'maxLength'> {
    type?: 'string';
    /**
     * See [Data Type
     * Formats](https://spec.openapis.org/oas/v3.0.3#dataTypeFormat) for further
     * details. While relying on JSON Schema’s defined formats, the OAS offers a
     * few additional predefined formats.
     */
    format?: string;
    /**
     * The value of this keyword MUST be a non-negative integer.
     *
     * The value of this keyword MUST be an integer.  This integer MUST be
     * greater than, or equal to, 0.
     *
     * A string instance is valid against this keyword if its length is less
     * than, or equal to, the value of this keyword.
     *
     * The length of a string instance is defined as the number of its
     * characters as defined by RFC 7159 [RFC7159].
     */
    maxLength?: number;
    /**
     * A string instance is valid against this keyword if its length is greater
     * than, or equal to, the value of this keyword.
     *
     * The length of a string instance is defined as the number of its
     * characters as defined by RFC 7159 [RFC7159].
     *
     * The value of this keyword MUST be an integer.  This integer MUST be
     * greater than, or equal to, 0.
     *
     * "minLength", if absent, may be considered as being present with integer
     * value 0.
     *
     * @default 0
     */
    minLength?: number;
    /**
     * The value of this keyword MUST be a string.  This string SHOULD be a
     * valid regular expression, according to the ECMA 262 regular expression
     * dialect.
     *
     * A string instance is considered valid if the regular expression matches
     * the instance successfully.  Recall: regular expressions are not
     * implicitly anchored.
     */
    pattern?: string;
    default?: string;
}

export interface BooleanSchema extends Omit<TypedSchema, 'default'> {
    type?: 'boolean';
    default?: boolean;
}

export interface ArraySchema extends Omit<TypedSchema, 'items' | 'maxItems' | 'minItems' | 'uniqueItems'> {
    type?: 'array';
    /**
     * Value _MUST_ be an object and not an array. Inline or referenced schema
     * _MUST_ be of a [Schema
     * Object](https://spec.openapis.org/oas/v3.0.3#schemaObject) and not a
     * standard JSON Schema. `items` _MUST_ be present if the `type` is `array`.
     */
    items: CompositionSchema | NormalSchema | Reference;
    /**
     * The value of this keyword MUST be an integer.  This integer MUST be
     * greater than, or equal to, 0.
     *
     * An array instance is valid against "maxItems" if its size is less than,
     * or equal to, the value of this keyword.
     */
    maxItems?: number;
    /**
     * The value of this keyword MUST be an integer.  This integer MUST be
     * greater than, or equal to, 0.
     *
     * An array instance is valid against "minItems" if its size is greater
     * than, or equal to, the value of this keyword.
     *
     * If this keyword is not present, it may be considered present with a value
     * of 0.
     */
    minItems?: number;
    /**
     * The value of this keyword MUST be a boolean.
     *
     * If this keyword has boolean value false, the instance validates
     * successfully.  If it has boolean value true, the instance validates
     * successfully if all of its elements are unique.
     *
     * If not present, this keyword may be considered present with boolean value
     * false.
     */
    uniqueItems?: boolean;
    default?: any[];
}

export interface ObjectSchema extends Omit<TypedSchema, 'properties' | 'required'> {
    type?: 'object';
    /**
     * Property definitions _MUST_ be a [Schema
     * Object](https://spec.openapis.org/oas/v3.0.3#schemaObject) and not a
     * standard JSON Schema (inline or referenced).
     */
    properties: Record<string, Schema>;
    /**
     * The value of this keyword MUST be an array.  This array MUST have at
     * least one element.  Elements of this array MUST be strings, and MUST be
     * unique.
     *
     * An object instance is valid against this keyword if its property set
     * contains all elements in this keyword's array value.
     */
    required?: string[];
    default?: any;
}

export interface FreeFormObjectSchema
    extends Omit<TypedSchema, 'additionalProperties' | 'minProperties' | 'maxProperties'> {
    type?: 'object';
    /**
     * The value of "additionalProperties" MUST be a boolean or a schema.
     *
     * If "additionalProperties" is absent, it may be considered present with an
     * empty schema as a value.
     *
     * If "additionalProperties" is true, validation always succeeds.
     *
     * If "additionalProperties" is false, validation succeeds only if the
     * instance is an object and all properties on the instance were covered by
     * "properties" and/or "patternProperties".
     *
     * If "additionalProperties" is an object, validate the value as a schema to
     * all of the properties that weren't validated by "properties" nor
     * "patternProperties".
     *
     * Value can be boolean or object. Inline or referenced schema MUST be of a
     * Schema Object and not a standard JSON Schema.
     *
     * @default true
     */
    additionalProperties?: boolean | Schema;
    /**
     * The value of this keyword MUST be an integer.  This integer MUST be
     * greater than, or equal to, 0.
     *
     * An object instance is valid against "maxProperties" if its number of
     * properties is less than, or equal to, the value of this keyword.
     */
    maxProperties?: number;
    /**
     * The value of this keyword MUST be an integer.  This integer MUST be
     * greater than, or equal to, 0.
     *
     * An object instance is valid against "minProperties" if its number of
     * properties is greater than, or equal to, the value of this keyword.
     *
     * If this keyword is not present, it may be considered present with a value
     * of 0.
     */
    minProperties?: number;
    default?: any;
}

export type NormalSchema =
    | NumberSchema
    | IntegerSchema
    | StringSchema
    | BooleanSchema
    | ArraySchema
    | ObjectSchema
    | FreeFormObjectSchema;

export type Schema = CompositionSchema | NormalSchema | Reference;

export {};
