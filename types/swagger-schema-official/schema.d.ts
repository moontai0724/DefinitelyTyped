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
 */
export interface BaseSchema {
    $schema?: string;
    $id?: string;
    title?: string;
    /**
     * A verbose explanation of the operation behavior. CommonMark syntax MAY be
     * used for rich text representation.
     *
     * @see https://spec.commonmark.org/
     */
    description?: string;
    /**
     * There are no restrictions placed on the value of this keyword.  When
     * multiple occurrences of this keyword are applicable to a single sub-
     * instance, implementations SHOULD remove duplicates.
     *
     * This keyword can be used to supply a default JSON value associated with a
     * particular schema.  It is RECOMMENDED that a default value be valid
     * against the associated schema.
     */
    default?: any;
    /**
     * The value of this keyword MUST be a boolean.  When multiple occurrences
     * of this keyword are applicable to a single sub-instance, applications
     * SHOULD consider the instance location to be deprecated if any occurrence
     * specifies a true value.
     *
     * If "deprecated" has a value of boolean true, it indicates that
     * applications SHOULD refrain from usage of the declared property.  It MAY
     * mean the property is going to be removed in the future.
     *
     * A root schema containing "deprecated" with a value of true indicates that
     * the entire resource being described MAY be removed in the future.
     *
     * The "deprecated" keyword applies to each instance location to which the
     * schema object containing the keyword successfully applies.  This can
     * result in scenarios where every array item or object property is
     * deprecated even though the containing array or object is not.
     *
     * Omitting this keyword has the same behavior as a value of false.
     */
    deprecated?: boolean;
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
    /**
     * The value of this keyword MUST be an array.  There are no restrictions
     * placed on the values within the array.  When multiple occurrences of this
     * keyword are applicable to a single sub-instance, implementations MUST
     * provide a flat array of all values rather than an array of arrays.
     *
     * This keyword can be used to provide sample JSON values associated with a
     * particular schema, for the purpose of illustrating usage.  It is
     * RECOMMENDED that these values be valid against the associated schema.
     *
     * Implementations MAY use the value(s) of "default", if present, as an
     * additional example.  If "examples" is absent, "default" MAY still be used
     * in this manner.
     */
    examples?: any[];
    /**
     * In addition to the JSON Schema properties comprising the OAS dialect, the
     * Schema Object supports keywords from any other vocabularies, or entirely
     * arbitrary properties.
     *
     * @see https://spec.openapis.org/oas/v3.1.0#properties
     */
    [any: string]: any;
}

/**
 * Unless stated otherwise, the property definitions follow those of JSON Schema
 * and do not add any additional semantics. Where JSON Schema indicates that
 * behavior is defined by the application (e.g. for annotations), OAS also
 * defers the definition of semantics to the application consuming the OpenAPI
 * document.
 *
 * @see https://spec.openapis.org/oas/v3.1.0#schema-object
 */
export interface BaseSchema {
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
    oneOf: Array<Reference | Schema>;
}

export interface AnyOfSchema extends BaseComposition {
    anyOf: Array<Reference | Schema>;
}

export interface AllOfSchema extends BaseComposition {
    allOf: Array<Reference | Schema>;
}

export interface NotSchema extends BaseSchema {
    not: Reference | Schema;
}

export type CompositionSchema = OneOfSchema | AnyOfSchema | AllOfSchema | NotSchema;

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/
 */
export type SchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object';

export interface TypedSchema extends BaseSchema {
    type?: SchemaType;
    /**
     * OpenAPI 3.0 does not have an explicit `null` type as in JSON Schema, but
     * you can use `nullable: true` to specify that the value may be `null`.
     * Note that `null` is different from an empty string "".
     *
     * In objects, a nullable property is not the same as an optional property,
     * but some tools may choose to map an optional property to the null value.
     */
    nullable?: boolean;
}

/**
 * @see https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00#section-6.2
 * @see https://swagger.io/docs/specification/data-models/data-types/#numbers
 */
interface BaseNumber extends TypedSchema {
    /**
     * The minimum valid value is greater than or exactly equal to the number.
     */
    minimum?: number;
    /**
     * The maximum valid value is less than or exactly equal to the number.
     */
    maximum?: number;
    /**
     * Specifies that a maximum value is valid, exclusive. Value is valid only
     * if it strictly less than (not equal to) the maximum.
     * @default false
     */
    exclusiveMaximum?: boolean;
    /**
     * Specifies that a minimum value is valid, exclusive. Value is valid only
     * if it strictly greater than (not equal to) the minimum.
     * @default false
     */
    exclusiveMinimum?: boolean;
    /**
     * Specifies that the number must be a multiple of the given value. Value is
     * valid only if division by this keyword's value results in an integer.
     */
    multipleOf?: number;
}

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/#number
 */
export type SchemaNumberFormat = 'float' | 'double';

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/#number
 */
export interface NumberSchema extends BaseNumber {
    type: 'number';
    /**
     * An optional format keyword serves as a hint for the tools to use a
     * specific numeric type:
     */
    format?: SchemaNumberFormat;
}

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/#number
 */
export type SchemaIntegerFormat = 'int32' | 'int64';

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/#number
 */
export interface IntegerSchema extends BaseNumber {
    type: 'integer';
    /**
     * An optional format keyword serves as a hint for the tools to use a
     * specific numeric type:
     */
    format?: SchemaIntegerFormat;
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
 * @see https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00#section-6.3
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
     *
     * The value of this keyword MUST be a string.  This string SHOULD be a
     * valid regular expression, according to the ECMA-262 regular expression
     * dialect.
     *
     * The regular expression syntax used is from JavaScript (more specifically,
     * ECMA 262). Regular expressions are case-sensitive, that is, `[a-z]` and
     * `[A-Z]` are different expressions.
     */
    pattern?: string;
    /**
     * The value of this keyword MUST be a non-negative integer.
     *
     * A string instance is valid against this keyword if its length is greater
     * than, or equal to, the value of this keyword.
     */
    minLength?: number;
    /**
     * The value of this keyword MUST be a non-negative integer.
     *
     * A string instance is valid against this keyword if its length is less
     * than, or equal to, the value of this keyword.
     */
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
 * @see https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00#section-6.4
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
    items: Schema | Schema[];
    /**
     * The `maxItems` keyword specifies the maximum number of items that can be
     * contained in the array.
     *
     * The value of this keyword MUST be a non-negative integer.
     *
     * An array instance is valid against "maxItems" if its size is less than,
     * or equal to, the value of this keyword.
     */
    maxItems?: number;
    /**
     * The `minItems` keyword specifies the minimum number of items that can be
     * contained in the array. Without `minItems`, an empty array is considered
     * valid.
     *
     * The value of this keyword MUST be a non-negative integer.
     *
     * An array instance is valid against "minItems" if its size is greater
     * than, or equal to, the value of this keyword.
     *
     * Omitting this keyword has the same behavior as a value of 0.
     */
    minItems?: number;
    /**
     * The `uniqueItems` keyword specifies that all items in the array MUST be
     * unique.
     *
     * If this keyword has boolean value false, the instance validates
     * successfully.  If it has boolean value true, the instance validates
     * successfully if all of its elements are unique.
     *
     * Omitting this keyword has the same behavior as a value of false.
     *
     * @default false
     */
    uniqueItems?: boolean;
    /**
     * The value of this keyword MUST be a non-negative integer.
     *
     * If "contains" is not present within the same schema object, then this
     * keyword has no effect.
     *
     * An instance array is valid against "maxContains" in two ways, depending
     * on the form of the annotation result of an adjacent "contains" keyword.
     * The first way is if the annotation result is an array and the length of
     * that array is less than or equal to the "maxContains" value.  The second
     * way is if the annotation result is a boolean "true" and the instance
     * array length is less than or equal to the "maxContains" value.
     *
     * @see https://github.com/swagger-api/swagger-core/wiki/Swagger-2.X---OpenAPI-3.1
     */
    maxContains?: number;
    /**
     * The value of this keyword MUST be a non-negative integer.
     *
     * If "contains" is not present within the same schema object, then this
     * keyword has no effect.
     *
     * An instance array is valid against "minContains" in two ways, depending
     * on the form of the annotation result of an adjacent "contains"
     * [json-schema] keyword.  The first way is if the annotation result is an
     * array and the length of that array is greater than or equal to the
     * "minContains" value.  The second way is if the annotation result is a
     * boolean "true" and the instance array length is greater than or equal to
     * the "minContains" value.
     *
     * A value of 0 is allowed, but is only useful for setting a range of
     * occurrences from 0 to the value of "maxContains".  A value of 0 with no
     * "maxContains" causes "contains" to always pass validation.
     *
     * Omitting this keyword has the same behavior as a value of 1.
     */
    minContains?: number;
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
     *
     * The value of this keyword MUST be an array.  Elements of this array, if
     * any, MUST be strings, and MUST be unique.
     *
     * An object instance is valid against this keyword if every item in the
     * array is the name of a property in the instance.
     *
     * Omitting this keyword has the same behavior as an empty array.
     *
     * @default []
     */
    required?: string[];
}

/**
 * @see https://swagger.io/docs/specification/data-models/data-types/#free-form
 */
export interface FreeFormObjectSchema extends ObjectSchema {
    additionalProperties?: boolean | Schema;
    /**
     * The value of this keyword MUST be a non-negative integer.
     *
     * An object instance is valid against "minProperties" if its number of
     * properties is greater than, or equal to, the value of this keyword.
     *
     * Omitting this keyword has the same behavior as a value of 0.
     *
     * @default 0
     */
    minProperties?: number;
    /**
     * The value of this keyword MUST be a non-negative integer.
     *
     * An object instance is valid against "maxProperties" if its number of
     * properties is less than, or equal to, the value of this keyword.
     */
    maxProperties?: number;
    /**
     * The value of this keyword MUST be an object.  Properties in this object,
     * if any, MUST be arrays.  Elements in each array, if any, MUST be strings,
     * and MUST be unique.
     *
     * This keyword specifies properties that are required if a specific other
     * property is present.  Their requirement is dependent on the presence of
     * the other property.
     *
     * Validation succeeds if, for each name that appears in both the instance
     * and as a name within this keyword's value, every item in the
     * corresponding array is also the name of a property in the instance.
     *
     * Omitting this keyword has the same behavior as an empty object.
     *
     * @default {}
     */
    dependentRequired?: Record<string, string[]>;
}

export type NormalSchema =
    | NumberSchema
    | IntegerSchema
    | StringSchema
    | BooleanSchema
    | ArraySchema
    | ObjectSchema
    | FreeFormObjectSchema;

/**
 * @see https://spec.openapis.org/oas/v3.1.0#schema-object
 * @see https://datatracker.ietf.org/doc/html/rfc8259
 * @see https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00
 * @see https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00
 * @see https://swagger.io/docs/specification/data-models/data-types
 *
 * For Supported JSON Schema features, see:
 *
 * @see https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00#section-6.4.4
 */
export type Schema = CompositionSchema | Reference | NormalSchema | TypedSchema;
