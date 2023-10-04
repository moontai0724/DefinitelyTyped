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
 *
 * @see https://spec.openapis.org/oas/v3.1.0#discriminator-object
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
 * @see https://spec.openapis.org/oas/v3.1.0#xml-object
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
     * The URI of the namespace definition. This _MUST_ be in the form of an
     * absolute URI.
     */
    namespace?: string;
    /**
     * The prefix to be used for the
     * [name](https://spec.openapis.org/oas/v3.1.0#xmlName).
     */
    prefix?: string;
    /**
     * Declares whether the property definition translates to an attribute
     * instead of an element. Default value is `false`.
     */
    attribute?: boolean;
    /**
     * _MAY_ be used only for an array definition. Signifies whether the array
     * is wrapped (for example, `<books><book/><book/></books>`) or unwrapped
     * (`<book/><book/>`). Default value is `false`. The definition takes effect
     * only when defined alongside `type` being `array` (outside the `items`).
     *
     * @default false
     */
    wrapped?: boolean;
}

export interface BaseSchema {
    /**
     * The value of both of these keywords MUST be a string.
     *
     * Both of these keywords can be used to decorate a user interface with
     * information about the data produced by this user interface. A title will
     * preferably be short, whereas a description will provide explanation about
     * the purpose of the instance described by this schema.
     */
    title?: string;
    /**
     * The value of both of these keywords MUST be a string.
     *
     * Both of these keywords can be used to decorate a user interface with
     * information about the data produced by this user interface. A title will
     * preferably be short, whereas a description will provide explanation about
     * the purpose of the instance described by this schema.
     *
     * [CommonMark syntax](https://spec.commonmark.org/) _MAY_ be used for rich
     * text representation.
     */
    description?: string;
    /**
     * The "$schema" keyword is both used as a JSON Schema dialect identifier
     * and as the identifier of a resource which is itself a JSON Schema, which
     * describes the set of valid schemas written for this particular dialect.
     *
     * The value of this keyword MUST be a URI
     * \[[RFC3986](https://datatracker.ietf.org/doc/html/rfc3986)\] (containing
     * a scheme) and this URI MUST be normalized. The current schema MUST be
     * valid against the meta-schema identified by this URI.
     *
     * If this URI identifies a retrievable resource, that resource SHOULD be of
     * media type "application/schema+json".
     *
     * The "$schema" keyword SHOULD be used in the document root schema object,
     * and MAY be used in the root schema objects of embedded schema resources.
     * It MUST NOT appear in non-resource root schema objects. If absent from
     * the document root schema, the resulting behavior is
     * implementation-defined.
     *
     * Values for this property are defined elsewhere in this and other
     * documents, and by other parties.
     */
    $schema?: string;
    /**
     * The "$vocabulary" keyword is used in meta-schemas to identify the
     * vocabularies available for use in schemas described by that meta- schema.
     * It is also used to indicate whether each vocabulary is required or
     * optional, in the sense that an implementation MUST understand the
     * required vocabularies in order to successfully process the schema.
     * Together, this information forms a dialect. Any vocabulary that is
     * understood by the implementation MUST be processed in a manner consistent
     * with the semantic definitions contained within the vocabulary.
     *
     * The value of this keyword MUST be an object. The property names in the
     * object MUST be URIs (containing a scheme) and this URI MUST be
     * normalized. Each URI that appears as a property name identifies a
     * specific set of keywords and their semantics.
     *
     * The URI MAY be a URL, but the nature of the retrievable resource is
     * currently undefined, and reserved for future use. Vocabulary authors MAY
     * use the URL of the vocabulary specification, in a human-readable media
     * type such as text/html or text/plain, as the vocabulary URI. \[\[CREF1:
     * Vocabulary documents may be added in forthcoming drafts. For now,
     * identifying the keyword set is deemed sufficient as that, along with
     * meta-schema validation, is how the current "vocabularies" work today. Any
     * future vocabulary document format will be specified as a JSON document,
     * so using text/html or other non-JSON formats in the meantime will not
     * produce any future ambiguity. \]\]
     *
     * The values of the object properties MUST be booleans. If the value is
     * true, then implementations that do not recognize the vocabulary MUST
     * refuse to process any schemas that declare this meta-schema with
     * "$schema". If the value is false, implementations that do not recognize
     * the vocabulary SHOULD proceed with processing such schemas. The value has
     * no impact if the implementation understands the vocabulary.
     *
     * Per 6.5, unrecognized keywords SHOULD be treated as annotations. This
     * remains the case for keywords defined by unrecognized vocabularies. It is
     * not currently possible to distinguish between unrecognized keywords that
     * are defined in vocabularies from those that are not part of any
     * vocabulary.
     *
     * The "$vocabulary" keyword SHOULD be used in the root schema of any schema
     * document intended for use as a meta-schema. It MUST NOT appear in
     * subschemas.
     *
     * The "$vocabulary" keyword MUST be ignored in schema documents that are
     * not being processed as a meta-schema. This allows validating a
     * meta-schema M against its own meta-schema M' without requiring the
     * validator to understand the vocabularies declared by M.
     *
     * If "$vocabulary" is absent, an implementation MAY determine behavior
     * based on the meta-schema if it is recognized from the URI value of the
     * referring schema's "$schema" keyword. This is how behavior (such as
     * Hyper-Schema usage) has been recognized prior to the existence of
     * vocabularies.
     *
     * If the meta-schema, as referenced by the schema, is not recognized, or is
     * missing, then the behavior is implementation-defined. If the
     * implementation proceeds with processing the schema, it MUST assume the
     * use of the core vocabulary. If the implementation is built for a specific
     * purpose, then it SHOULD assume the use of all of the most relevant
     * vocabularies for that purpose.
     *
     * For example, an implementation that is a validator SHOULD assume the use
     * of all vocabularies in this specification and the companion Validation
     * specification.
     */
    $vocabulary?: Record<string, boolean>;
    /**
     * The "$id" keyword identifies a schema resource with its canonical
     * \[[RFC6596](https://datatracker.ietf.org/doc/html/rfc6596)\] URI.
     *
     * Note that this URI is an identifier and not necessarily a network
     * locator. In the case of a network-addressable URL, a schema need not be
     * downloadable from its canonical URI.
     *
     * If present, the value for this keyword MUST be a string, and MUST
     * represent a valid URI-reference
     * \[[RFC3986](https://datatracker.ietf.org/doc/html/rfc3986)\]. This
     * URI-reference SHOULD be normalized, and MUST resolve to an absolute-URI
     * \[[RFC3986](https://datatracker.ietf.org/doc/html/rfc3986)\] (without a
     * fragment). Therefore, "$id" MUST NOT contain a non-empty fragment, and
     * SHOULD NOT contain an empty fragment.
     *
     * Since an empty fragment in the context of the application/schema+json
     * media type refers to the same resource as the base URI without a
     * fragment, an implementation MAY normalize a URI ending with an empty
     * fragment by removing the fragment. However, schema authors SHOULD NOT
     * rely on this behavior across implementations. \[\[CREF3: This is
     * primarily allowed because older meta-schemas have an empty fragment in
     * their $id (or previously, id). A future draft may outright forbid even
     * empty fragments in "$id". \]\]
     *
     * This URI also serves as the base URI for relative URI-references in
     * keywords within the schema resource, in accordance with [RFC 3986
     * section 5.1.1](https://datatracker.ietf.org/doc/html/rfc3986#section-5.1.1)
     * \[[RFC3986](https://datatracker.ietf.org/doc/html/rfc3986)\] regarding
     * base URIs embedded in content.
     *
     * The presence of "$id" in a subschema indicates that the subschema
     * constitutes a distinct schema resource within a single schema document.
     * Furthermore, in accordance with [RFC 3986
     * section 5.1.2](https://datatracker.ietf.org/doc/html/rfc3986#section-5.1.2)
     * \[[RFC3986](https://datatracker.ietf.org/doc/html/rfc3986)\] regarding
     * encapsulating entities, if an "$id" in a subschema is a relative
     * URI-reference, the base URI for resolving that reference is the URI of
     * the parent schema resource.
     *
     * If no parent schema object explicitly identifies itself as a resource
     * with "$id", the base URI is that of the entire document, as established
     * by the steps given in the previous section. ([Section
     * 9.1.1](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-9.1.1))
     */
    $id?: string;
    /**
     * Using JSON Pointer fragments requires knowledge of the structure of the
     * schema. When writing schema documents with the intention to provide
     * re-usable schemas, it may be preferable to use a plain name fragment that
     * is not tied to any particular structural location. This allows a
     * subschema to be relocated without requiring JSON Pointer references to be
     * updated.
     *
     * The "$anchor" and "$dynamicAnchor" keywords are used to specify such
     * fragments. They are identifier keywords that can only be used to create
     * plain name fragments, rather than absolute URIs as seen with "$id".
     *
     * The base URI to which the resulting fragment is appended is the canonical
     * URI of the schema resource containing the "$anchor" or "$dynamicAnchor"
     * in question. As discussed in the previous section, this is either the
     * nearest "$id" in the same or parent schema object, or the base URI for
     * the document as determined according to [RFC
     * 3986](https://datatracker.ietf.org/doc/html/rfc3986).
     *
     * Separately from the usual usage of URIs, "$dynamicAnchor" indicates that
     * the fragment is an extension point when used with the "$dynamicRef"
     * keyword. This low-level, advanced feature makes it easier to extend
     * recursive schemas such as the meta-schemas, without imposing any
     * particular semantics on that extension. See the section on "$dynamicRef"
     * ([Section
     * 8.2.3.2](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-8.2.3.2))
     * for details.
     *
     * In most cases, the normal fragment behavior both suffices and is more
     * intuitive. Therefore it is RECOMMENDED that "$anchor" be used to create
     * plain name fragments unless there is a clear need for "$dynamicAnchor".
     *
     * If present, the value of this keyword MUST be a string and MUST start
     * with a letter (\[A-Za-z\]) or underscore ("\_"), followed by any number
     * of letters, digits (\[0-9\]), hyphens ("-"), underscores ("\_"), and
     * periods ("."). This matches the US-ASCII part of XML's NCName production
     * \[[xml-names](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#ref-xml-names)\].
     * \[\[CREF4: Note that the anchor string does not include the "#"
     * character, as it is not a URI-reference. An "$anchor": "foo" becomes the
     * fragment "#foo" when used in a URI. See below for full examples. \]\]
     *
     * The effect of specifying the same fragment name multiple times within the
     * same resource, using any combination of "$anchor" and/or
     * "$dynamicAnchor", is undefined. Implementations MAY raise an error if
     * such usage is detected.
     */
    $anchor?: string;
    /**
     * Using JSON Pointer fragments requires knowledge of the structure of the
     * schema. When writing schema documents with the intention to provide
     * re-usable schemas, it may be preferable to use a plain name fragment that
     * is not tied to any particular structural location. This allows a
     * subschema to be relocated without requiring JSON Pointer references to be
     * updated.
     *
     * The "$anchor" and "$dynamicAnchor" keywords are used to specify such
     * fragments. They are identifier keywords that can only be used to create
     * plain name fragments, rather than absolute URIs as seen with "$id".
     *
     * The base URI to which the resulting fragment is appended is the canonical
     * URI of the schema resource containing the "$anchor" or "$dynamicAnchor"
     * in question. As discussed in the previous section, this is either the
     * nearest "$id" in the same or parent schema object, or the base URI for
     * the document as determined according to [RFC
     * 3986](https://datatracker.ietf.org/doc/html/rfc3986).
     *
     * Separately from the usual usage of URIs, "$dynamicAnchor" indicates that
     * the fragment is an extension point when used with the "$dynamicRef"
     * keyword. This low-level, advanced feature makes it easier to extend
     * recursive schemas such as the meta-schemas, without imposing any
     * particular semantics on that extension. See the section on "$dynamicRef"
     * ([Section
     * 8.2.3.2](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-8.2.3.2))
     * for details.
     *
     * In most cases, the normal fragment behavior both suffices and is more
     * intuitive. Therefore it is RECOMMENDED that "$anchor" be used to create
     * plain name fragments unless there is a clear need for "$dynamicAnchor".
     *
     * If present, the value of this keyword MUST be a string and MUST start
     * with a letter (\[A-Za-z\]) or underscore ("\_"), followed by any number
     * of letters, digits (\[0-9\]), hyphens ("-"), underscores ("\_"), and
     * periods ("."). This matches the US-ASCII part of XML's NCName production
     * \[[xml-names](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#ref-xml-names)\].
     * \[\[CREF4: Note that the anchor string does not include the "#"
     * character, as it is not a URI-reference. An "$anchor": "foo" becomes the
     * fragment "#foo" when used in a URI. See below for full examples. \]\]
     *
     * The effect of specifying the same fragment name multiple times within the
     * same resource, using any combination of "$anchor" and/or
     * "$dynamicAnchor", is undefined. Implementations MAY raise an error if
     * such usage is detected.
     */
    $dynamicAnchor?: string;
    /**
     * The "$ref" keyword is an applicator that is used to reference a
     * statically identified schema. Its results are the results of the
     * referenced schema. \[\[CREF5: Note that this definition of how the
     * results are determined means that other keywords can appear alongside of
     * "$ref" in the same schema object. \]\]
     *
     * The value of the "$ref" keyword MUST be a string which is a URI-
     * Reference. Resolved against the current URI base, it produces the URI of
     * the schema to apply. This resolution is safe to perform on schema load,
     * as the process of evaluating an instance cannot change how the reference
     * resolves.
     */
    $ref?: string;
    /**
     * The "$dynamicRef" keyword is an applicator that allows for deferring the
     * full resolution until runtime, at which point it is resolved each time it
     * is encountered while evaluating an instance.
     *
     * Together with "$dynamicAnchor", "$dynamicRef" implements a cooperative
     * extension mechanism that is primarily useful with recursive schemas
     * (schemas that reference themselves). Both the extension point and the
     * runtime-determined extension target are defined with "$dynamicAnchor",
     * and only exhibit runtime dynamic behavior when referenced with
     * "$dynamicRef".
     *
     * The value of the "$dynamicRef" property MUST be a string which is a
     * URI-Reference. Resolved against the current URI base, it produces the URI
     * used as the starting point for runtime resolution. This initial
     * resolution is safe to perform on schema load.
     *
     * If the initially resolved starting point URI includes a fragment that was
     * created by the "$dynamicAnchor" keyword, the initial URI MUST be replaced
     * by the URI (including the fragment) for the outermost schema resource in
     * the dynamic scope ([Section
     * 7.1](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-7.1))
     * that defines an identically named fragment with "$dynamicAnchor".
     *
     * Otherwise, its behavior is identical to "$ref", and no runtime resolution
     * is needed.
     *
     * For a full example using these keyword, see [appendix
     * C](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#appendix-C).
     * \[\[CREF6: The difference between the hyper-schema meta-schema in
     * pre-2019 drafts and an this draft dramatically demonstrates the utility
     * of these keywords. \]\]
     */
    $dynamicRef?: string;
    /**
     * The "$defs" keyword reserves a location for schema authors to inline
     * re-usable JSON Schemas into a more general schema. The keyword does not
     * directly affect the validation result.
     *
     * This keyword's value MUST be an object. Each member value of this object
     * MUST be a valid JSON Schema.
     */
    $defs?: Record<string, Schema>;
    /**
     * This keyword reserves a location for comments from schema authors to
     * readers or maintainers of the schema.
     *
     * The value of this keyword MUST be a string. Implementations MUST NOT
     * present this string to end users. Tools for editing schemas SHOULD
     * support displaying and editing this keyword. The value of this keyword
     * MAY be used in debug or error output which is intended for developers
     * making use of schemas.
     *
     * Schema vocabularies SHOULD allow "$comment" within any object containing
     * vocabulary keywords. Implementations MAY assume "$comment" is allowed
     * unless the vocabulary specifically forbids it. Vocabularies MUST NOT
     * specify any effect of "$comment" beyond what is described in this
     * specification.
     *
     * Tools that translate other media types or programming languages to and
     * from application/schema+json MAY choose to convert that media type or
     * programming language's native comments to or from "$comment" values. The
     * behavior of such translation when both native comments and "$comment"
     * properties are present is implementation-dependent.
     *
     * Implementations MAY strip "$comment" values at any point during
     * processing. In particular, this allows for shortening schemas when the
     * size of deployed schemas is a concern.
     *
     * Implementations MUST NOT take any other action based on the presence,
     * absence, or contents of "$comment" properties. In particular, the value
     * of "$comment" MUST NOT be collected as an annotation result.
     */
    $comment?: string;
}

interface BaseComposition extends Omit<BaseSchema, 'discriminator'> {
    /**
     * Adds support for polymorphism. The discriminator is an object name that
     * is used to differentiate between other schemas which may satisfy the
     * payload description. See [Composition and
     * Inheritance](https://spec.openapis.org/oas/v3.1.0#schemaComposition) for
     * more details.
     */
    discriminator?: Discriminator;
}

export interface OneOfSchema extends Omit<BaseComposition, 'oneOf'> {
    /**
     * This keyword's value MUST be a non-empty array. Each item of the array
     * MUST be a valid JSON Schema.
     *
     * An instance validates successfully against this keyword if it validates
     * successfully against exactly one schema defined by this keyword's value.
     */
    oneOf: Schema[];
}

export interface AnyOfSchema extends Omit<BaseComposition, 'anyOf'> {
    /**
     * This keyword's value MUST be a non-empty array. Each item of the array
     * MUST be a valid JSON Schema.
     *
     * An instance validates successfully against this keyword if it validates
     * successfully against at least one schema defined by this keyword's value.
     * Note that when annotations are being collected, all subschemas MUST be
     * examined so that annotations are collected from each subschema that
     * validates successfully.
     */
    anyOf: Schema[];
}

export interface AllOfSchema extends Omit<BaseComposition, 'allOf'> {
    /**
     * This keyword's value MUST be a non-empty array. Each item of the array
     * MUST be a valid JSON Schema.
     *
     * An instance validates successfully against this keyword if it validates
     * successfully against all schemas defined by this keyword's value.
     */
    allOf: Schema[];
}

export interface NotSchema extends Omit<BaseSchema, 'not'> {
    /**
     * This keyword's value MUST be a valid JSON Schema.
     *
     * An instance is valid against this keyword if it fails to validate
     * successfully against the schema defined by this keyword.
     */
    not: Schema;
}

export interface ConditionalSchema extends Omit<BaseSchema, 'if' | 'then' | 'else'> {
    /**
     * This keyword's value MUST be a valid JSON Schema.
     *
     * This validation outcome of this keyword's subschema has no direct effect
     * on the overall validation result. Rather, it controls which of the "then"
     * or "else" keywords are evaluated.
     *
     * Instances that successfully validate against this keyword's subschema
     * MUST also be valid against the subschema value of the "then" keyword, if
     * present.
     *
     * Instances that fail to validate against this keyword's subschema MUST
     * also be valid against the subschema value of the "else" keyword, if
     * present.
     *
     * If annotations ([Section
     * 7.7](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-7.7))
     * are being collected, they are collected from this keyword's subschema in
     * the usual way, including when the keyword is present without either
     * "then" or "else".
     */
    if: Schema;
    /**
     * This keyword's value MUST be a valid JSON Schema.
     *
     * When "if" is present, and the instance successfully validates against its
     * subschema, then validation succeeds against this keyword if the instance
     * also successfully validates against this keyword's subschema.
     *
     * This keyword has no effect when "if" is absent, or when the instance
     * fails to validate against its subschema. Implementations MUST NOT
     * evaluate the instance against this keyword, for either validation or
     * annotation collection purposes, in such cases.
     */
    then?: Schema;
    /**
     * This keyword's value MUST be a valid JSON Schema.
     *
     * When "if" is present, and the instance fails to validate against its
     * subschema, then validation succeeds against this keyword if the instance
     * successfully validates against this keyword's subschema.
     *
     * This keyword has no effect when "if" is absent, or when the instance
     * successfully validates against its subschema. Implementations MUST NOT
     * evaluate the instance against this keyword, for either validation or
     * annotation collection purposes, in such cases.
     */
    else?: Schema;
}

export type CompositionSchema = OneOfSchema | AnyOfSchema | AllOfSchema | NotSchema;

export type SchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null';

export interface TypedSchema
    extends Omit<
        BaseSchema,
        | 'type'
        | 'xml'
        | 'externalDocs'
        | 'example'
        | 'enum'
        | 'const'
        | 'default'
        | 'deprecated'
        | 'readOnly'
        | 'writeOnly'
        | 'examples'
    > {}

export interface TypedSchema {
    /**
     * The value of this keyword MUST be either a string or an array.  If it is
     * an array, elements of the array MUST be strings and MUST be unique.
     *
     * String values MUST be one of the six primitive types ("null", "boolean",
     * "object", "array", "number", or "string"), or "integer" which matches any
     * number with a zero fractional part.
     *
     * An instance validates if and only if the instance is in any of the sets
     * listed for this keyword.
     */
    type?: SchemaType | SchemaType[];
}

/**
 * @see https://spec.openapis.org/oas/v3.1.0#fixed-fields-19
 */
export interface TypedSchema {
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
     *
     * @deprecated The `example` property has been deprecated in favor of the
     * JSON Schema `examples` keyword. Use of `example` is discouraged, and
     * later versions of this specification may remove it.
     */
    example?: any;
}

export interface TypedSchema {
    /**
     * The value of this keyword MUST be an array.  This array SHOULD have at
     * least one element.  Elements in the array SHOULD be unique.
     *
     * An instance validates successfully against this keyword if its value is
     * equal to one of the elements in this keyword's array value.
     *
     * Elements in the array might be of any type, including null.
     */
    enum?: any[];
    /**
     * The value of this keyword MAY be of any type, including null.
     *
     * Use of this keyword is functionally equivalent to an "enum" ([Section
     * 6.1.2](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00#section-6.1.2))
     * with a single value.
     *
     * An instance validates successfully against this keyword if its value is
     * equal to the value of the keyword.
     */
    const?: any;
    /**
     * There are no restrictions placed on the value of this keyword. When
     * multiple occurrences of this keyword are applicable to a single sub-
     * instance, implementations SHOULD remove duplicates.
     *
     * This keyword can be used to supply a default JSON value associated with a
     * particular schema. It is RECOMMENDED that a default value be valid
     * against the associated schema.
     */
    default?: any;
    /**
     * The value of this keyword MUST be a boolean. When multiple occurrences of
     * this keyword are applicable to a single sub-instance, applications SHOULD
     * consider the instance location to be deprecated if any occurrence
     * specifies a true value.
     *
     * If "deprecated" has a value of boolean true, it indicates that
     * applications SHOULD refrain from usage of the declared property. It MAY
     * mean the property is going to be removed in the future.
     *
     * A root schema containing "deprecated" with a value of true indicates that
     * the entire resource being described MAY be removed in the future.
     *
     * The "deprecated" keyword applies to each instance location to which the
     * schema object containing the keyword successfully applies. This can
     * result in scenarios where every array item or object property is
     * deprecated even though the containing array or object is not.
     *
     * Omitting this keyword has the same behavior as a value of false.
     *
     * @default false
     */
    deprecated?: boolean;
    /**
     * The value of these keywords MUST be a boolean. When multiple occurrences
     * of these keywords are applicable to a single sub- instance, the resulting
     * behavior SHOULD be as for a true value if any occurrence specifies a true
     * value, and SHOULD be as for a false value otherwise.
     *
     * If "readOnly" has a value of boolean true, it indicates that the value of
     * the instance is managed exclusively by the owning authority, and attempts
     * by an application to modify the value of this property are expected to be
     * ignored or rejected by that owning authority.
     *
     * An instance document that is marked as "readOnly" for the entire document
     * MAY be ignored if sent to the owning authority, or MAY result in an
     * error, at the authority's discretion.
     *
     * For example, "readOnly" would be used to mark a database-generated serial
     * number as read-only, while "writeOnly" would be used to mark a password
     * input field.
     *
     * These keywords can be used to assist in user interface instance
     * generation. In particular, an application MAY choose to use a widget that
     * hides input values as they are typed for write-only fields.
     *
     * Omitting these keywords has the same behavior as values of false.
     *
     * @default false
     */
    readOnly?: boolean;
    /**
     * The value of these keywords MUST be a boolean. When multiple occurrences
     * of these keywords are applicable to a single sub- instance, the resulting
     * behavior SHOULD be as for a true value if any occurrence specifies a true
     * value, and SHOULD be as for a false value otherwise.
     *
     * If "writeOnly" has a value of boolean true, it indicates that the value
     * is never present when the instance is retrieved from the owning
     * authority. It can be present when sent to the owning authority to update
     * or create the document (or the resource it represents), but it will not
     * be included in any updated or newly created version of the instance.
     *
     * An instance document that is marked as "writeOnly" for the entire
     * document MAY be returned as a blank document of some sort, or MAY produce
     * an error upon retrieval, or have the retrieval request ignored, at the
     * authority's discretion.
     *
     * For example, "readOnly" would be used to mark a database-generated serial
     * number as read-only, while "writeOnly" would be used to mark a password
     * input field.
     *
     * These keywords can be used to assist in user interface instance
     * generation. In particular, an application MAY choose to use a widget that
     * hides input values as they are typed for write-only fields.
     *
     * Omitting these keywords has the same behavior as values of false.
     *
     * @default false
     */
    writeOnly?: boolean;
    /**
     * The value of this keyword MUST be an array. There are no restrictions
     * placed on the values within the array. When multiple occurrences of this
     * keyword are applicable to a single sub-instance, implementations MUST
     * provide a flat array of all values rather than an array of arrays.
     *
     * This keyword can be used to provide sample JSON values associated with a
     * particular schema, for the purpose of illustrating usage. It is
     * RECOMMENDED that these values be valid against the associated schema.
     *
     * Implementations MAY use the value(s) of "default", if present, as an
     * additional example. If "examples" is absent, "default" MAY still be used
     * in this manner.
     */
    examples?: any[];
}

/**
 * @see https://spec.openapis.org/oas/v3.1.0#data-types
 */
export type SchemaNumberFormat = 'float' | 'double';

interface BaseNumberSchema
    extends Omit<TypedSchema, 'multipleOf' | 'maximum' | 'exclusiveMaximum' | 'minimum' | 'exclusiveMinimum'> {
    /**
     * The value of "multipleOf" MUST be a number, strictly greater than 0.
     *
     * A numeric instance is valid only if division by this keyword's value
     * results in an integer.
     */
    multipleOf?: number;
    /**
     * The value of "maximum" MUST be a number, representing an inclusive upper
     * limit for a numeric instance.
     *
     * If the instance is a number, then this keyword validates only if the
     * instance is less than or exactly equal to "maximum".
     */
    maximum?: number;
    /**
     * The value of "exclusiveMaximum" MUST be a number, representing an
     * exclusive upper limit for a numeric instance.
     *
     * If the instance is a number, then the instance is valid only if it has a
     * value strictly less than (not equal to) "exclusiveMaximum".
     */
    exclusiveMaximum?: number;
    /**
     * The value of "minimum" MUST be a number, representing an inclusive lower
     * limit for a numeric instance.
     *
     * If the instance is a number, then this keyword validates only if the
     * instance is greater than or exactly equal to "minimum".
     */
    minimum?: number;
    /**
     * The value of "exclusiveMinimum" MUST be a number, representing an
     * exclusive lower limit for a numeric instance.
     *
     * If the instance is a number, then the instance is valid only if it has a
     * value strictly greater than (not equal to) "exclusiveMinimum".
     */
    exclusiveMinimum?: number;
}

export interface NumberSchema extends Omit<BaseNumberSchema, 'format'> {
    type?: 'number';
    format?: SchemaNumberFormat;
    default?: number;
}

/**
 * @see https://spec.openapis.org/oas/v3.1.0#data-types
 */
export type SchemaIntegerFormat = 'int32' | 'int64';

export interface IntegerSchema extends Omit<BaseNumberSchema, 'format'> {
    type?: 'integer';
    format?: SchemaIntegerFormat;
    default?: number;
}

export interface StringSchema
    extends Omit<
        TypedSchema,
        | 'type'
        | 'format'
        | 'maxLength'
        | 'minLength'
        | 'pattern'
        | 'contentEncoding'
        | 'contentMediaType'
        | 'contentSchema'
        | 'default'
    > {
    type?: 'string';
    format?: string;
    /**
     * The value of this keyword MUST be a non-negative integer.
     *
     * A string instance is valid against this keyword if its length is less
     * than, or equal to, the value of this keyword.
     *
     * The length of a string instance is defined as the number of its
     * characters as defined by [RFC
     * 8259](https://datatracker.ietf.org/doc/html/rfc8259)
     * \[[RFC8259](https://datatracker.ietf.org/doc/html/rfc8259)\].
     */
    maxLength?: number;
    /**
     * The value of this keyword MUST be a non-negative integer.
     *
     * A string instance is valid against this keyword if its length is greater
     * than, or equal to, the value of this keyword.
     *
     * The length of a string instance is defined as the number of its
     * characters as defined by [RFC
     * 8259](https://datatracker.ietf.org/doc/html/rfc8259)
     * \[[RFC8259](https://datatracker.ietf.org/doc/html/rfc8259)\].
     *
     * Omitting this keyword has the same behavior as a value of 0.
     *
     * @default 0
     */
    minLength?: number;
    /**
     * The value of this keyword MUST be a string. This string SHOULD be a valid
     * regular expression, according to the ECMA-262 regular expression dialect.
     *
     * A string instance is considered valid if the regular expression matches
     * the instance successfully. Recall: regular expressions are not implicitly
     * anchored.
     */
    pattern?: string;
    /**
     * If the instance value is a string, this property defines that the string
     * SHOULD be interpreted as binary data and decoded using the encoding named
     * by this property.
     *
     * Possible values indicating base 16, 32, and 64 encodings with several
     * variations are listed in [RFC
     * 4648](https://datatracker.ietf.org/doc/html/rfc4648)
     * \[[RFC4648](https://datatracker.ietf.org/doc/html/rfc4648)\].
     * Additionally, sections 6.7 and 6.8 of [RFC
     * 2045](https://datatracker.ietf.org/doc/html/rfc2045)
     * \[[RFC2045](https://datatracker.ietf.org/doc/html/rfc2045)\] provide
     * encodings used in MIME. As "base64" is defined in both RFCs, the
     * definition from [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648)
     * SHOULD be assumed unless the string is specifically intended for use in a
     * MIME context. Note that all of these encodings result in strings
     * consisting only of 7-bit ASCII characters. Therefore, this keyword has no
     * meaning for strings containing characters outside of that range.
     *
     * If this keyword is absent, but "contentMediaType" is present, this
     * indicates that the encoding is the identity encoding, meaning that no
     * transformation was needed in order to represent the content in a UTF-8
     * string.
     *
     * The value of this property MUST be a string.
     */
    contentEncoding?: string;
    /**
     * If the instance is a string, this property indicates the media type of
     * the contents of the string. If "contentEncoding" is present, this
     * property describes the decoded string.
     *
     * The value of this property MUST be a string, which MUST be a media type,
     * as defined by [RFC 2046](https://datatracker.ietf.org/doc/html/rfc2046)
     * \[[RFC2046](https://datatracker.ietf.org/doc/html/rfc2046)\].
     */
    contentMediaType?: string;
    /**
     * If the instance is a string, and if "contentMediaType" is present, this
     * property contains a schema which describes the structure of the string.
     *
     * This keyword MAY be used with any media type that can be mapped into JSON
     * Schema's data model.
     *
     * The value of this property MUST be a valid JSON schema. It SHOULD be
     * ignored if "contentMediaType" is not present.
     */
    contentSchema?: Schema;
    default?: string;
}

export interface BooleanSchema extends Omit<TypedSchema, 'default'> {
    type?: 'boolean';
    default?: boolean;
}

export interface ArraySchema
    extends Omit<
        TypedSchema,
        | 'type'
        | 'prefixItems'
        | 'items'
        | 'contains'
        | 'maxItems'
        | 'minItems'
        | 'uniqueItems'
        | 'maxContains'
        | 'minContains'
        | 'default'
    > {
    type?: 'array';
    /**
     * The value of "prefixItems" MUST be a non-empty array of valid JSON
     * Schemas.
     *
     * Validation succeeds if each element of the instance validates against the
     * schema at the same position, if any. This keyword does not constrain the
     * length of the array. If the array is longer than this keyword's value,
     * this keyword validates only the prefix of matching length.
     *
     * This keyword produces an annotation value which is the largest index to
     * which this keyword applied a subschema. The value MAY be a boolean true
     * if a subschema was applied to every index of the instance, such as is
     * produced by the "items" keyword. This annotation affects the behavior of
     * "items" and "unevaluatedItems".
     *
     * Omitting this keyword has the same assertion behavior as an empty array.
     *
     * @default []
     */
    prefixItems?: Schema[];
    /**
     * The value of "items" MUST be a valid JSON Schema.
     *
     * This keyword applies its subschema to all instance elements at indexes
     * greater than the length of the "prefixItems" array in the same schema
     * object, as reported by the annotation result of that "prefixItems"
     * keyword. If no such annotation result exists, "items" applies its
     * subschema to all instance array elements. \[\[CREF11: Note that the
     * behavior of "items" without "prefixItems" is identical to that of the
     * schema form of "items" in prior drafts. When "prefixItems" is present,
     * the behavior of "items" is identical to the former "additionalItems"
     * keyword. \]\]
     *
     * If the "items" subschema is applied to any positions within the instance
     * array, it produces an annotation result of boolean true, indicating that
     * all remaining array elements have been evaluated against this keyword's
     * subschema.
     *
     * Omitting this keyword has the same assertion behavior as an empty schema.
     *
     * Implementations MAY choose to implement or optimize this keyword in
     * another way that produces the same effect, such as by directly checking
     * for the presence and size of a "prefixItems" array. Implementations that
     * do not support annotation collection MUST do so.
     */
    items?: Schema;
    /**
     * The value of this keyword MUST be a valid JSON Schema.
     *
     * An array instance is valid against "contains" if at least one of its
     * elements is valid against the given schema. The subschema MUST be applied
     * to every array element even after the first match has been found, in
     * order to collect annotations for use by other keywords. This is to ensure
     * that all possible annotations are collected.
     *
     * Logically, the validation result of applying the value subschema to each
     * item in the array MUST be ORed with "false", resulting in an overall
     * validation result.
     *
     * This keyword produces an annotation value which is an array of the
     * indexes to which this keyword validates successfully when applying its
     * subschema, in ascending order. The value MAY be a boolean "true" if the
     * subschema validates successfully when applied to every index of the
     * instance. The annotation MUST be present if the instance array to which
     * this keyword's schema applies is empty.
     */
    contains?: Schema;
    /**
     * The value of "unevaluatedItems" MUST be a valid JSON Schema.
     *
     * The behavior of this keyword depends on the annotation results of
     * adjacent keywords that apply to the instance location being validated.
     * Specifically, the annotations from "prefixItems", "items", and
     * "contains", which can come from those keywords when they are adjacent to
     * the "unevaluatedItems" keyword. Those three annotations, as well as
     * "unevaluatedItems", can also result from any and all adjacent in-place
     * applicator ([Section
     * 10.2](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-10.2))
     * keywords. This includes but is not limited to the in-place applicators
     * defined in this document.
     *
     * If no relevant annotations are present, the "unevaluatedItems" subschema
     * MUST be applied to all locations in the array. If a boolean true value is
     * present from any of the relevant annotations, "unevaluatedItems" MUST be
     * ignored. Otherwise, the subschema MUST be applied to any index greater
     * than the largest annotation value for "prefixItems", which does not
     * appear in any annotation value for "contains".
     *
     * This means that "prefixItems", "items", "contains", and all in-place
     * applicators MUST be evaluated before this keyword can be evaluated.
     * Authors of extension keywords MUST NOT define an in-place applicator that
     * would need to be evaluated after this keyword.
     *
     * If the "unevaluatedItems" subschema is applied to any positions within
     * the instance array, it produces an annotation result of boolean true,
     * analogous to the behavior of "items".
     *
     * Omitting this keyword has the same assertion behavior as an empty schema.
     *
     * @default {}
     */
    unevaluatedItems?: Schema;
    /**
     * The value of this keyword MUST be a non-negative integer.
     *
     * An array instance is valid against "maxItems" if its size is less than,
     * or equal to, the value of this keyword.
     */
    maxItems?: number;
    /**
     * The value of this keyword MUST be a non-negative integer.
     *
     * An array instance is valid against "minItems" if its size is greater
     * than, or equal to, the value of this keyword.
     *
     * Omitting this keyword has the same behavior as a value of 0.
     *
     * @default 0
     */
    minItems?: number;
    /**
     * The value of this keyword MUST be a boolean.
     *
     * If this keyword has boolean value false, the instance validates
     * successfully. If it has boolean value true, the instance validates
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
     * on the form of the annotation result of an adjacent "contains"
     * \[[json-schema](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00#ref-json-schema)\]
     * keyword. The first way is if the annotation result is an array and the
     * length of that array is less than or equal to the "maxContains" value.
     * The second way is if the annotation result is a boolean "true" and the
     * instance array length is less than or equal to the "maxContains" value.
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
     * \[[json-schema](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00#ref-json-schema)\]
     * keyword. The first way is if the annotation result is an array and the
     * length of that array is greater than or equal to the "minContains" value.
     * The second way is if the annotation result is a boolean "true" and the
     * instance array length is greater than or equal to the "minContains"
     * value.
     *
     * A value of 0 is allowed, but is only useful for setting a range of
     * occurrences from 0 to the value of "maxContains". A value of 0 with no
     * "maxContains" causes "contains" to always pass validation.
     *
     * Omitting this keyword has the same behavior as a value of 1.
     *
     * @default 1
     */
    minContains?: number;
    default?: any[];
}

type RegexPattern = string;

export interface ObjectSchema
    extends Omit<
        TypedSchema,
        | 'type'
        | 'properties'
        | 'patternProperties'
        | 'additionalProperties'
        | 'propertyNames'
        | 'maxProperties'
        | 'minProperties'
        | 'required'
        | 'dependentRequired'
        | 'dependentSchemas'
        | 'default'
    > {
    type?: 'object';
    /**
     * The value of "properties" MUST be an object. Each value of this object
     * MUST be a valid JSON Schema.
     *
     * Validation succeeds if, for each name that appears in both the instance
     * and as a name within this keyword's value, the child instance for that
     * name successfully validates against the corresponding schema.
     *
     * The annotation result of this keyword is the set of instance property
     * names matched by this keyword.
     *
     * Omitting this keyword has the same assertion behavior as an empty object.
     *
     * @default {}
     */
    properties?: Record<string, Schema>;
    /**
     * The value of "patternProperties" MUST be an object. Each property name of
     * this object SHOULD be a valid regular expression, according to the
     * ECMA-262 regular expression dialect. Each property value of this object
     * MUST be a valid JSON Schema.
     *
     * Validation succeeds if, for each instance name that matches any regular
     * expressions that appear as a property name in this keyword's value, the
     * child instance for that name successfully validates against each schema
     * that corresponds to a matching regular expression.
     *
     * The annotation result of this keyword is the set of instance property
     * names matched by this keyword.
     *
     * Omitting this keyword has the same assertion behavior as an empty object.
     *
     * @default {}
     */
    patternProperties?: Record<RegexPattern, Schema>;
    /**
     * The value of "additionalProperties" MUST be a valid JSON Schema.
     *
     * The behavior of this keyword depends on the presence and annotation
     * results of "properties" and "patternProperties" within the same schema
     * object. Validation with "additionalProperties" applies only to the child
     * values of instance names that do not appear in the annotation results of
     * either "properties" or "patternProperties".
     *
     * For all such properties, validation succeeds if the child instance
     * validates against the "additionalProperties" schema.
     *
     * The annotation result of this keyword is the set of instance property
     * names validated by this keyword's subschema.
     *
     * Omitting this keyword has the same assertion behavior as an empty schema.
     *
     * Implementations MAY choose to implement or optimize this keyword in
     * another way that produces the same effect, such as by directly checking
     * the names in "properties" and the patterns in "patternProperties" against
     * the instance property set. Implementations that do not support annotation
     * collection MUST do so.
     *
     * @default {}
     */
    additionalProperties?: Schema;
    /**
     * The value of "propertyNames" MUST be a valid JSON Schema.
     *
     * If the instance is an object, this keyword validates if every property
     * name in the instance validates against the provided schema. Note the
     * property name that the schema is testing will always be a string.
     *
     * Omitting this keyword has the same behavior as an empty schema.
     *
     * @default {}
     */
    propertyNames?: Schema;
    /**
     * The value of "unevaluatedProperties" MUST be a valid JSON Schema.
     *
     * The behavior of this keyword depends on the annotation results of
     * adjacent keywords that apply to the instance location being validated.
     * Specifically, the annotations from "properties", "patternProperties", and
     * "additionalProperties", which can come from those keywords when they are
     * adjacent to the "unevaluatedProperties" keyword. Those three annotations,
     * as well as "unevaluatedProperties", can also result from any and all
     * adjacent in-place applicator ([Section
     * 10.2](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-10.2))
     * keywords. This includes but is not limited to the in-place applicators
     * defined in this document.
     *
     * Validation with "unevaluatedProperties" applies only to the child values
     * of instance names that do not appear in the "properties",
     * "patternProperties", "additionalProperties", or "unevaluatedProperties"
     * annotation results that apply to the instance location being validated.
     *
     * For all such properties, validation succeeds if the child instance
     * validates against the "unevaluatedProperties" schema.
     *
     * This means that "properties", "patternProperties",
     * "additionalProperties", and all in-place applicators MUST be evaluated
     * before this keyword can be evaluated. Authors of extension keywords MUST
     * NOT define an in-place applicator that would need to be evaluated after
     * this keyword.
     *
     * The annotation result of this keyword is the set of instance property
     * names validated by this keyword's subschema.
     *
     * Omitting this keyword has the same assertion behavior as an empty schema.
     *
     * @default {}
     */
    unevaluatedProperties?: Schema;
    /**
     * The value of this keyword MUST be a non-negative integer.
     *
     * An object instance is valid against "maxProperties" if its number of
     * properties is less than, or equal to, the value of this keyword.
     */
    maxProperties?: number;
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
     * The value of this keyword MUST be an array. Elements of this array, if
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
    /**
     * The value of this keyword MUST be an object. Properties in this object,
     * if any, MUST be arrays. Elements in each array, if any, MUST be strings,
     * and MUST be unique.
     *
     * This keyword specifies properties that are required if a specific other
     * property is present. Their requirement is dependent on the presence of
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
    /**
     * This keyword specifies subschemas that are evaluated if the instance is
     * an object and contains a certain property.
     *
     * This keyword's value MUST be an object. Each value in the object MUST be
     * a valid JSON Schema.
     *
     * If the object key is a property in the instance, the entire instance must
     * validate against the subschema. Its use is dependent on the presence of
     * the property.
     *
     * Omitting this keyword has the same behavior as an empty object.
     *
     * @default {}
     */
    dependentSchemas?: Record<string, Schema>;
    default?: any;
}

export type NormalSchema = NumberSchema | IntegerSchema | StringSchema | BooleanSchema | ArraySchema | ObjectSchema;

/**
 * The Schema Object allows the definition of input and output data types. These
 * types can be objects, but also primitives and arrays. This object is a
 * superset of the [JSON Schema Specification Draft
 * 2020-12](https://tools.ietf.org/html/draft-bhutton-json-schema-00).
 *
 * For more information about the properties, see [JSON Schema
 * Core](https://tools.ietf.org/html/draft-bhutton-json-schema-00) and [JSON
 * Schema
 * Validation](https://tools.ietf.org/html/draft-bhutton-json-schema-validation-00).
 *
 * Unless stated otherwise, the property definitions follow those of JSON Schema
 * and do not add any additional semantics. Where JSON Schema indicates that
 * behavior is defined by the application (e.g. for annotations), OAS also
 * defers the definition of semantics to the application consuming the OpenAPI
 * document.
 *
 * @see https://spec.openapis.org/oas/v3.1.0#schema-object
 */
export type Schema = CompositionSchema | NormalSchema | Reference;

export {};
